import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'kasumi 🌸',
  description: 'Your private botanical garden',
  // Hide from search engines for privacy
  robots: 'noindex, nofollow',
  // Prevent sharing previews
  openGraph: {
    title: 'kasumi',
    description: 'Private access only',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Main app container */}
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          {/* Navigation Bar */}
          <nav className="kasumi-nav sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold kasumi-title">Kasumi</span>
                <span className="text-lg">🌸</span>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="/" className="kasumi-subtitle hover:text-white transition-colors">
                  Browse
                </a>
                <a href="/orders" className="kasumi-subtitle hover:text-white transition-colors">
                  Orders
                </a>
                <a href="/profile" className="kasumi-subtitle hover:text-white transition-colors">
                  Profile
                </a>
              </div>
              
              {/* User Actions */}
              <div className="flex items-center space-x-3">
                {/* Cart Icon */}
                <button className="kasumi-btn-secondary px-3 py-2">
                  🛒
                </button>
                
                {/* Profile Menu */}
                <button className="kasumi-btn-primary px-4 py-2">
                  ✨ Menu
                </button>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          <main className="relative">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="mt-20 border-t border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="kasumi-title text-xl">Kasumi</span>
                <span>🌸</span>
              </div>
              <p className="kasumi-subtitle text-sm">
                Private access only • Made with 💕
              </p>
              
              {/* Decorative elements */}
              <div className="mt-8 flex justify-center space-x-8 text-2xl">
                <span className="kasumi-float">🎀</span>
                <span className="kasumi-float" style={{animationDelay: '0.5s'}}>✟</span>
                <span className="kasumi-float" style={{animationDelay: '1s'}}>🌸</span>
                <span className="kasumi-float" style={{animationDelay: '1.5s'}}>💕</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}