'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Mock user database (you'll replace this with Supabase later)
  const mockUsers = [
    { username: 'sarah', password: 'sarah123', name: 'Sarah' },
    { username: 'jamie', password: 'jamie123', name: 'Jamie' },
    { username: 'alex', password: 'alex123', name: 'Alex' },
    // Add your friends' accounts here
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check credentials
    const user = mockUsers.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    )
    
    if (user) {
      // Set user session cookie
      document.cookie = `user-session=${user.username}; max-age=${60 * 60 * 24 * 7}; path=/`
      
      // Redirect to main app
      router.push('/')
    } else {
      setError('Invalid username or password 💔')
    }
    
    setLoading(false)
  }

  const handleForgotPassword = () => {
    alert('Text me for password reset! 💕\n\nThis keeps everything private and secure.')
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
        {/* Main Login Card */}
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

          <div className="relative z-10 p-8">
            {/* Welcome Back */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4 kasumi-float">👋</div>
              <h1 className="text-3xl font-bold kasumi-title mb-2">Welcome Back</h1>
              <p className="kasumi-subtitle">Sign in to your Kasumi account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium kasumi-subtitle mb-2">
                  Username ✨
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="kasumi-input"
                  placeholder="Enter your username"
                  disabled={loading}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="loginPassword" className="block text-sm font-medium kasumi-subtitle mb-2">
                  Password 🔐
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="kasumi-input"
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-400/30 rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading || !username || !password}
                className="kasumi-btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="kasumi-loading w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </span>
                ) : (
                  <>🌸 Enter Kasumi</>
                )}
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-pink-400 hover:text-pink-300 text-sm transition-colors"
                >
                  Forgot password? Text me! 💕
                </button>
              </div>
            </form>

            {/* Demo Accounts Info */}
            <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <p className="text-xs kasumi-subtitle text-center mb-2">Demo accounts for testing:</p>
              <div className="text-xs space-y-1 text-center opacity-70">
                <p>sarah / sarah123</p>
                <p>jamie / jamie123</p>
                <p>alex / alex123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-6 text-center text-xs kasumi-subtitle opacity-70">
          <p>🌿 Private accounts only • No public registration 🌿</p>
        </div>
      </div>
    </div>
  )
}