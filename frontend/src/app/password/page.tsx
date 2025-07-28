'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [locationStatus, setLocationStatus] = useState<'checking' | 'allowed' | 'blocked'>('checking')
  const router = useRouter()

  useEffect(() => {
    // Check user's location when page loads
    checkLocation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const checkLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported, redirecting to blocked')
      setLocationStatus('blocked')
      router.push('/blocked')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log('User location:', latitude, longitude)
        
        // Manchester coordinates and 5km radius check
        const manchesterLat = 53.4808
        const manchesterLng = -2.2426
        const distance = calculateDistance(latitude, longitude, manchesterLat, manchesterLng)
        console.log('Distance from Manchester:', distance, 'km')
        
        if (distance <= 5) {
          console.log('User in Manchester area, allowing access')
          setLocationStatus('allowed')
          document.cookie = `location-verified=true; max-age=${60 * 60 * 24}; path=/`
        } else {
          console.log('User outside Manchester area, blocking access')
          setLocationStatus('blocked')
          router.push('/blocked')
        }
      },
      (error) => {
        console.log('Geolocation error:', error.message)
        // For development, let's be more permissive with location errors
        if (error.code === error.PERMISSION_DENIED) {
          console.log('Location permission denied, redirecting to blocked')
          setLocationStatus('blocked')
          router.push('/blocked')
        } else {
          // For timeout or other errors, allow access for now
          console.log('Location error but allowing access for development')
          setLocationStatus('allowed')
          document.cookie = `location-verified=true; max-age=${60 * 60 * 24}; path=/`
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
    )
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Check if password is correct
    if (password.toLowerCase() === 'madoka') {
      // Set password cookie
      document.cookie = `password-entered=true; max-age=${60 * 60 * 24}; path=/`
      
      // Redirect to login page
      router.push('/login')
    } else {
      setError('Incorrect password. Only invited users can access Kasumi 💔')
      setPassword('')
    }
    
    setLoading(false)
  }

  if (locationStatus === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="kasumi-card text-center max-w-md mx-auto">
          <div className="text-6xl mb-6 kasumi-float">🌸</div>
          <h1 className="text-2xl font-bold kasumi-title mb-4">Checking your location...</h1>
          <p className="kasumi-subtitle">Please allow location access to continue</p>
          <div className="mt-6">
            <div className="kasumi-loading w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (locationStatus === 'blocked') {
    return null // Will redirect to /blocked
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-2xl kasumi-float opacity-30">🎀</div>
        <div className="absolute top-20 right-20 text-2xl kasumi-float opacity-30" style={{animationDelay: '0.5s'}}>✟</div>
        <div className="absolute bottom-20 left-20 text-2xl kasumi-float opacity-30" style={{animationDelay: '1s'}}>🌸</div>
        <div className="absolute bottom-10 right-10 text-2xl kasumi-float opacity-30" style={{animationDelay: '1.5s'}}>💕</div>
      </div>

      <div className="w-full max-w-md">
        {/* Main Password Card */}
        <div className="kasumi-card kasumi-card-bow relative overflow-hidden">
          {/* Lace Border Pattern */}
          <div className="absolute top-0 left-0 right-0 h-6 opacity-20"
               style={{
                 background: `url("data:image/svg+xml,%3Csvg width='40' height='24' viewBox='0 0 40 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12C5.5 6 14.5 6 20 12C25.5 6 34.5 6 40 12V0H0V12Z' fill='%23ff69b4'/%3E%3C/svg%3E") repeat-x`
               }}>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 opacity-20 rotate-180"
               style={{
                 background: `url("data:image/svg+xml,%3Csvg width='40' height='24' viewBox='0 0 40 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12C5.5 6 14.5 6 20 12C25.5 6 34.5 6 40 12V0H0V12Z' fill='%23ff69b4'/%3E%3C/svg%3E") repeat-x`
               }}>
          </div>

          {/* Diamond Pattern Background */}
          <div className="absolute inset-0 opacity-5"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L20 10L10 20L0 10L10 0Z' fill='%23ff69b4'/%3E%3C/svg%3E")`,
                 backgroundSize: '20px 20px'
               }}>
          </div>

          <div className="relative z-10 text-center p-8">
            {/* Logo/Title */}
            <div className="mb-8">
              <div className="text-5xl mb-4 kasumi-float">🌸</div>
              <h1 className="text-4xl font-bold kasumi-title mb-2">Kasumi</h1>
              <p className="kasumi-subtitle text-sm">Private Botanical Sanctuary</p>
            </div>

            {/* Ornate Frame for Password Input */}
            <div className="relative mb-6">
              <div className="absolute -top-3 -left-3 text-pink-400 text-xl">🎀</div>
              <div className="absolute -top-3 -right-3 text-pink-400 text-xl">✟</div>
              <div className="absolute -bottom-3 -left-3 text-pink-400 text-xl">✟</div>
              <div className="absolute -bottom-3 -right-3 text-pink-400 text-xl">🎀</div>
              
              <div className="border-2 border-pink-400/30 rounded-lg p-6 bg-black/20">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium kasumi-subtitle mb-2">
                      Enter the magic word ✨
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="kasumi-input text-center text-lg tracking-widest"
                      placeholder="••••••"
                      disabled={loading}
                      autoFocus
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-400 text-sm bg-red-900/20 border border-red-400/30 rounded-lg p-3">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading || !password}
                    className="kasumi-btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="kasumi-loading w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Checking...
                      </span>
                    ) : (
                      <>🔮 Enter Kasumi</>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Decorative Message */}
            <div className="text-xs kasumi-subtitle opacity-70">
              <p>🌿 Invitation required • Private access only 🌿</p>
              <p className="mt-2">Made with 💕 for trusted friends</p>
            </div>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-8 text-2xl opacity-50">
          <span className="kasumi-float">🎀</span>
          <span className="kasumi-float" style={{animationDelay: '0.5s'}}>✟</span>
          <span className="kasumi-float" style={{animationDelay: '1s'}}>🌸</span>
          <span className="kasumi-float" style={{animationDelay: '1.5s'}}>💕</span>
        </div>
      </div>
    </div>
  )
}