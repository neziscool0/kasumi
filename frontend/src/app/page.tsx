export default function HomePage() {
  // This will eventually come from your Supabase database
  const mockStrains = [
    {
      id: 1,
      name: "Lemon Cherry Gelato",
      type: "Hybrid",
      thc: "28.5%",
      effects: ["Giggly", "Creative", "Relaxed"],
      flavors: ["Citrus", "Sweet", "Cherry"],
      price: 35,
      stock: 12,
      image: "/strains/lemon-cherry-gelato.jpg"
    },
    {
      id: 2,
      name: "Super Silver Haze",
      type: "Sativa",
      thc: "23.2%",
      effects: ["Energetic", "Focused", "Happy"],
      flavors: ["Earthy", "Citrus", "Spice"],
      price: 30,
      stock: 8,
      image: "/strains/super-silver-haze.jpg"
    },
    {
      id: 3,
      name: "Pink Runtz",
      type: "Hybrid",
      thc: "26.8%",
      effects: ["Euphoric", "Giggly", "Sleepy"],
      flavors: ["Fruity", "Sweet", "Candy"],
      price: 40,
      stock: 5,
      image: "/strains/pink-runtz.jpg"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="kasumi-float mb-6">
          <span className="text-6xl">🌸</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold kasumi-title mb-6">
          Welcome to Kasumi
        </h1>
        
        <p className="text-xl kasumi-subtitle max-w-2xl mx-auto mb-8">
          Your private botanical sanctuary. Curated selection, premium quality, 
          delivered with love and discretion.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="kasumi-btn-primary text-lg px-8 py-4">
            🌿 Browse Strains
          </button>
          <button className="kasumi-btn-secondary text-lg px-8 py-4">
            ✨ Learn More
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold kasumi-title">
            🔥 Trending This Week
          </h2>
          <button className="kasumi-btn-secondary">
            View All
          </button>
        </div>
        
        {/* Strain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockStrains.map((strain) => (
            <div key={strain.id} className="kasumi-card kasumi-card-bow kasumi-glow group">
              {/* Strain Image */}
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-800">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl">
                  🌿
                </div>
              </div>
              
              {/* Strain Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {strain.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: strain.type === 'Sativa' ? 'linear-gradient(45deg, #10b981, #059669)' :
                                   strain.type === 'Indica' ? 'linear-gradient(45deg, #8b5cf6, #7c3aed)' :
                                   'linear-gradient(45deg, #f59e0b, #d97706)'
                        }}>
                    {strain.type}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="kasumi-subtitle">THC: {strain.thc}</span>
                  <span className="kasumi-subtitle">Stock: {strain.stock}g</span>
                </div>
                
                {/* Effects */}
                <div className="flex flex-wrap gap-2">
                  {strain.effects.slice(0, 3).map((effect) => (
                    <span key={effect} 
                          className="px-2 py-1 rounded-lg text-xs bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {effect}
                    </span>
                  ))}
                </div>
                
                {/* Flavors */}
                <div className="flex flex-wrap gap-2">
                  {strain.flavors.slice(0, 3).map((flavor) => (
                    <span key={flavor} 
                          className="px-2 py-1 rounded-lg text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {flavor}
                    </span>
                  ))}
                </div>
                
                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="text-2xl font-bold kasumi-title">
                    £{strain.price}
                  </div>
                  <button className="kasumi-btn-primary px-6 py-2 text-sm group-hover:kasumi-pulse">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="kasumi-card kasumi-card-cross text-center">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="text-xl font-bold kasumi-title mb-2">Pickup Only</h3>
          <p className="kasumi-subtitle">
            Discreet, scheduled pickups at your convenience. No delivery stress.
          </p>
        </div>
        
        <div className="kasumi-card kasumi-card-bow text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold kasumi-title mb-2">Private Network</h3>
          <p className="kasumi-subtitle">
            Invite-only community. Your privacy and safety are our priority.
          </p>
        </div>
        
        <div className="kasumi-card kasumi-card-cross text-center">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-bold kasumi-title mb-2">Premium Quality</h3>
          <p className="kasumi-subtitle">
            Hand-selected strains, tested for quality, packaged with care.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center kasumi-card kasumi-glow">
        <h2 className="text-3xl font-bold kasumi-title mb-4">
          Ready to Join Kasumi?
        </h2>
        <p className="kasumi-subtitle mb-8 max-w-2xl mx-auto">
          Get access to premium strains, easy ordering, and a trusted community. 
          Invitation required.
        </p>
        <button className="kasumi-btn-primary text-lg px-8 py-4 kasumi-pulse">
          Request Invitation ✨
        </button>
      </section>
    </div>
  )
}