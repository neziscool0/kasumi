'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function PasswordPage() {
  // State management - these variables store information React needs to remember
  const [password, setPassword] = useState('')     // What the user types in the password field
  const [error, setError] = useState('')           // Any error message to show
  const [loading, setLoading] = useState(false)    // Whether we're currently processing

  // Router - this gives us the power to navigate between pages
  const router = useRouter()

  // Function that runs when user submits the password form
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the browser from refreshing the page (default form behavior)
    e.preventDefault()
    
    // Set loading to true (we could show a spinner here if needed)
    setLoading(true)
    
    // Clear any previous error messages
    setError('')
    
    // Check if the password matches our secret word "madoka"
    // .toLowerCase() makes it case-insensitive, .trim() removes extra spaces
    if (password.toLowerCase().trim() === 'madoka') {
      // SUCCESS! Password is correct
      console.log('Password correct, navigating to login...')
      
      // Set a browser cookie to remember they entered the correct password
      // This cookie expires in 24 hours (60 * 60 * 24 seconds)
      document.cookie = `password-entered=true; max-age=${60 * 60 * 24}; path=/`
      
      // Navigate to the login page
      router.push('/login')
    } else {
      // FAILURE! Password is incorrect
      setError('Incorrect password. Only invited users can access Kasumi.')
      setPassword('') // Clear the input field so they can try again
    }
    
    // Turn off loading state
    setLoading(false)
  }

  // Function that runs when user clicks the arrow button
  const handleArrowClick = () => {
    // Only proceed if there's actually a password entered
    if (password.trim()) {
      // Create a fake form submission event to trigger our existing logic
      const fakeEvent = {
        preventDefault: () => {}
      } as React.FormEvent
      
      handleSubmit(fakeEvent)
    }
  }

  return (
    // Main container - takes up full screen height and allows positioning
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* 
        Background Image Layer
        This is your custom password page design
        It covers the entire screen and sits behind everything else
      */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/password-page.svg"           // Path to your custom SVG background
          alt="Kasumi Password Page Background"     // Description for screen readers
          fill                                      // Makes image cover entire container
          style={{ 
            objectFit: 'cover',                     // Like CSS background-size: cover
            objectPosition: 'center'                // Centers the image
          }}
          priority                                  // Load this image immediately (not lazy)
          className="z-0"                          // Put this layer behind everything (z-index: 0)
        />
      </div>
      
      {/* 
        Interactive Content Layer
        This sits on top of your background image and contains all the clickable elements
        It's invisible except for the form elements we position on it
      */}
      <div className="absolute inset-0 z-10">
        
        {/* Password Form - handles the password submission */}
        <form onSubmit={handleSubmit} className="relative w-full h-full">
          
          {/* 
            Password Input Field
            This transparent input field is positioned exactly where the white rounded rectangle 
            appears in your custom design
          */}
          <input
            type="password"                         // Hides the text with dots
            value={password}                        // Controlled by React state
            onChange={(e) => setPassword(e.target.value)}  // Updates state when user types
            placeholder=""                          // No placeholder text (your design shows the field clearly)
            disabled={loading}                      // Disable input while processing
            autoComplete="off"                      // Don't save passwords in browser
            className="absolute bg-white/90 backdrop-blur-sm rounded-full border-none outline-none text-center text-gray-800 font-medium transition-all duration-200 focus:bg-white focus:shadow-lg"
            style={{
              // Position this input exactly where it appears in your design
              // These percentages are based on analyzing your image
              top: '50%',                          // Vertically centered (adjust if needed)
              left: '50%',                         // Horizontally centered
              transform: 'translate(-50%, -50%)', // Perfect centering trick
              width: '320px',                      // Width of the white rounded rectangle
              height: '48px',                      // Height of the white rounded rectangle
              fontSize: '16px',                    // Readable text size
              letterSpacing: '2px'                 // Spaced out text for password dots
            }}
          />
          
          {/* 
            Submit Arrow Button
            This circular button is positioned where the purple circle with arrow appears in your design
          */}
          <button
            type="button"                          // Not a submit button (we handle click manually)
            onClick={handleArrowClick}             // Trigger password check when clicked
            disabled={loading || !password.trim()} // Disable if loading or no password entered
            className="absolute rounded-full flex items-center justify-center text-white font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              // Position this button exactly where it appears in your design
              top: '50%',                          // Same vertical position as input
              left: 'calc(50% + 180px)',          // To the right of the input field
              transform: 'translateY(-50%)',      // Center vertically
              width: '56px',                       // Circle diameter
              height: '56px',                      // Circle diameter
              backgroundColor: '#8b5cf6',          // Purple color matching your design
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'  // Subtle shadow
            }}
          >
            {/* Arrow symbol - using Unicode arrow character */}
            →
          </button>
          
        </form>
        
        {/* 
          Error Message Display
          This appears below the input field if the password is wrong
          It's positioned to not interfere with your design
        */}
        {error && (
          <div 
            className="absolute bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg shadow-lg"
            style={{
              top: '60%',                          // Below the input field
              left: '50%',                         // Centered horizontally
              transform: 'translateX(-50%)',      // Perfect horizontal centering
              width: '320px',                      // Same width as input field
              textAlign: 'center',                 // Center the error text
              fontSize: '14px'                     // Smaller text for errors
            }}
          >
            {error}
          </div>
        )}
        
        {/* 
          Loading Indicator (Optional)
          You could uncomment this to show a loading spinner while processing
        */}
        {loading && (
          <div 
            className="absolute bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2"
            style={{
              top: '65%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '14px'
            }}
          >
            Processing...
          </div>
        )}
        
      </div>
    </div>
  )
}