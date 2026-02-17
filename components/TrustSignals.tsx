export default function TrustSignals() {
  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {/* Trust Badge 1 */}
          <div className="text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-bold text-lg">4.8/5 Rating</div>
            <div className="text-sm text-gray-600">247 Reviews</div>
          </div>

          {/* Trust Badge 2 */}
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-bold text-lg">Award Winning</div>
            <div className="text-sm text-gray-600">2024 Design Excellence</div>
          </div>

          {/* Trust Badge 3 */}
          <div className="text-center">
            <div className="text-3xl mb-2">🌍</div>
            <div className="font-bold text-lg">Eco-Friendly</div>
            <div className="text-sm text-gray-600">Sustainable Materials</div>
          </div>

          {/* Trust Badge 4 */}
          <div className="text-center">
            <div className="text-3xl mb-2">🇺🇸</div>
            <div className="font-bold text-lg">Made in USA</div>
            <div className="text-sm text-gray-600">Quality Craftsmanship</div>
          </div>
        </div>
      </div>
    </section>
  )
}
