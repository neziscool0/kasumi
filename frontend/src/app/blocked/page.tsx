export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-2xl kasumi-float opacity-20">🥀</div>
        <div className="absolute top-20 right-20 text-2xl kasumi-float opacity-20" style={{animationDelay: '0.5s'}}>⛓️</div>
        <div className="absolute bottom-20 left-20 text-2xl kasumi-float opacity-20" style={{animationDelay: '1s'}}>🖤</div>
        <div className="absolute bottom-10 right-10 text-2xl kasumi-float opacity-20" style={{animationDelay: '1.5s'}}>💔</div>
      </div>

      <div className="w-full max-w-md">
        <div className="kasumi-card kasumi-card-cross relative overflow-hidden text-center">
          {/* Lace Border Pattern */}
          <div className="absolute top-0 left-0 right-0 h-6 opacity-20"
               style={{
                 background: `url("data:image/svg+xml,%3Csvg width='40' height='24' viewBox='0 0 40 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12C5.5 6 14.5 6 20 12C25.5 6 34.5 6 40 12V0H0V12Z' fill='%23666666'/%3E%3C/svg%3E") repeat-x`
               }}>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 opacity-20 rotate-180"
               style={{
                 background: `url("data:image/svg+xml,%3Csvg width='40' height='24' viewBox='0 0 40 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12C5.5 6 14.5 6 20 12C25.5 6 34.5 6 40 12V0H0V12Z' fill='%23666666'/%3E%3C/svg%3E") repeat-x`
               }}>
          </div>

          <div className="relative z-10 p-8">
            {/* Sad Icon */}
            <div className="text-6xl mb-6 kasumi-float opacity-70">🥀</div>
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-300 mb-4">
              Service Not Available
            </h1>
            
            {/* Message */}
            <div className="space-y-4 kasumi-subtitle">
              <p>
                Kasumi is currently only available in the Manchester area.
              </p>
              <p className="text-sm opacity-70">
                We're sorry, but our private botanical sanctuary 
                can only serve local friends at this time.
              </p>
            </div>

            {/* Decorative Divider */}
            <div className="my-8 flex items-center justify-center space-x-4">
              <span className="w-8 h-px bg-gray-600"></span>
              <span className="text-gray-500">🖤</span>
              <span className="w-8 h-px bg-gray-600"></span>
            </div>

            {/* Contact Info */}
            <div className="text-xs kasumi-subtitle opacity-50">
              <p>If you believe this is an error,</p>
              <p>please contact the garden keeper directly.</p>
            </div>

            {/* Decorative Bottom */}
            <div className="mt-8 flex justify-center space-x-6 text-xl opacity-30">
              <span className="kasumi-float">⛓️</span>
              <span className="kasumi-float" style={{animationDelay: '0.5s'}}>🥀</span>
              <span className="kasumi-float" style={{animationDelay: '1s'}}>🖤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}