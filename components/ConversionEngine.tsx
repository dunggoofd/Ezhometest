'use client'

import { useState, useEffect } from 'react'

export default function ConversionEngine() {
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
    // Show exit-intent popup after 30 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('exitIntentShown')
      if (!hasSeenPopup) {
        setShowPopup(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log('Email submitted:', email)
    setShowPopup(false)
    alert('Thank you! Check your email for your exclusive discount.')
  }

  return (
    <>
      <section className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Proof */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-300 ml-2">+2,847 happy customers</span>
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-lg text-gray-300">
              Average rating: <span className="font-bold text-white">4.8/5</span> from 247 reviews
            </p>
          </div>

          {/* Urgency & Scarcity */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Limited Time Offer
              </h3>
              <p className="text-lg mb-4">
                Order in the next <span className="font-bold">48 hours</span> and get:
              </p>
              <ul className="inline-block text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free premium delivery ($199 value)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Complimentary white-glove assembly
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Extended 10-year warranty
                </li>
              </ul>
              <div className="text-sm text-white/80">
                Only <span className="font-bold text-white">7 sofas</span> remaining at this price
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">
              What Our Customers Say
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah M.',
                  location: 'New York, NY',
                  rating: 5,
                  text: 'I was skeptical about a sofa arriving in a box, but WOW! The quality is incredible, and it really did take only 10 minutes to assemble.',
                  image: '/images/testimonial-1.jpg',
                },
                {
                  name: 'Michael R.',
                  location: 'Austin, TX',
                  rating: 5,
                  text: 'Perfect for our small apartment. The compact shipping was a game-changer - no struggling to get it through the door!',
                  image: '/images/testimonial-2.jpg',
                },
                {
                  name: 'Jennifer L.',
                  location: 'Seattle, WA',
                  rating: 5,
                  text: 'The Italian leather option is stunning. Looks way more expensive than it is. Best furniture purchase I&apos;ve made.',
                  image: '/images/testimonial-3.jpg',
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600" />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h4 className="font-bold mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-400">On all orders over $1,000</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">↩️</div>
              <h4 className="font-bold mb-2">100-Day Trial</h4>
              <p className="text-sm text-gray-400">Risk-free returns</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="font-bold mb-2">5-Year Warranty</h4>
              <p className="text-sm text-gray-400">Full coverage included</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💳</div>
              <h4 className="font-bold mb-2">Easy Financing</h4>
              <p className="text-sm text-gray-400">0% APR for 12 months</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#configurator"
                className="bg-premium-gold text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all inline-block"
              >
                Start Designing Now
              </a>
              <a
                href="#showroom"
                className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all inline-block"
              >
                View in AR
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-scale-in">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold mb-2">Wait! Don&apos;t Leave Empty-Handed</h3>
              <p className="text-gray-600">
                Get <span className="font-bold text-premium-gold">15% OFF</span> your first order
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-gold text-black"
              />
              <button
                type="submit"
                className="w-full bg-premium-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Claim My Discount
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Plus get exclusive access to new designs and early sales
            </p>
          </div>
        </div>
      )}
    </>
  )
}
