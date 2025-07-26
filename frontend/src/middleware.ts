import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Manchester coordinates
const MANCHESTER_LAT = 53.4808
const MANCHESTER_LNG = -2.2426
const MAX_DISTANCE_KM = 5

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Skip middleware for static files and API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if user has already been verified for location
  const locationVerified = request.cookies.get('location-verified')
  const passwordEntered = request.cookies.get('password-entered')
  
  // If trying to access password page, allow it
  if (url.pathname === '/password') {
    return NextResponse.next()
  }
  
  // If trying to access blocked page, allow it
  if (url.pathname === '/blocked') {
    return NextResponse.next()
  }

  // Get geolocation from headers (if available from client)
  const lat = request.headers.get('x-user-latitude')
  const lng = request.headers.get('x-user-longitude')
  
  // If we have coordinates, check if user is in Manchester area
  if (lat && lng) {
    const userLat = parseFloat(lat)
    const userLng = parseFloat(lng)
    const distance = calculateDistance(MANCHESTER_LAT, MANCHESTER_LNG, userLat, userLng)
    
    if (distance > MAX_DISTANCE_KM) {
      // User is outside Manchester area - redirect to blocked page
      url.pathname = '/blocked'
      return NextResponse.redirect(url)
    } else {
      // User is in Manchester - set location verified cookie
      const response = NextResponse.next()
      response.cookies.set('location-verified', 'true', {
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })
      return response
    }
  }
  
  // If no location data yet, redirect to password page for location check
  if (!locationVerified && !passwordEntered) {
    url.pathname = '/password'
    return NextResponse.redirect(url)
  }
  
  // If location verified but no password entered, redirect to password page
  if (locationVerified && !passwordEntered) {
    url.pathname = '/password'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}