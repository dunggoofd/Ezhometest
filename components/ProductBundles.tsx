'use client'

import { useState } from 'react'

const bundles = [
  {
    id: 'essentials',
    name: 'Essentials Bundle',
    description: 'Perfect starter package for your new sofa',
    image: '/images/bundle-essentials.jpg',
    items: [
      'Standard 3-Seater Sofa',
      'Premium Pillow Set (4)',
      'Fabric Protection Spray',
    ],
    regularPrice: 2197,
    bundlePrice: 1899,
    savings: 298,
    popular: false,
  },
  {
    id: 'complete',
    name: 'Complete Living Room',
    description: 'Everything you need for the perfect living space',
    image: '/images/bundle-complete.jpg',
    items: [
      'Large 4-Seater Sofa',
      'Matching Ottoman',
      'Premium Pillow Set (4)',
      'Cashmere Throw Blanket',
      '5-Year Protection Plan',
    ],
    regularPrice: 3445,
    bundlePrice: 2999,
    savings: 446,
    popular: true,
  },
  {
    id: 'luxury',
    name: 'Luxury Collection',
    description: 'The ultimate in comfort and style',
    image: '/images/bundle-luxury.jpg',
    items: [
      'Large 4-Seater Sofa (Italian Leather)',
      'Matching Ottoman (Leather)',
      'Premium Pillow Set (6)',
      'Cashmere Throw Blanket (2)',
      '5-Year Protection Plan',
      'White Glove Delivery',
    ],
    regularPrice: 4896,
    bundlePrice: 3999,
    savings: 897,
    popular: false,
  },
]

export default function ProductBundles() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Curated Bundles
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Save more with our thoughtfully designed furniture packages
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map(bundle => (
            <div
              key={bundle.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl ${
                selectedBundle === bundle.id ? 'ring-4 ring-premium-gold' : ''
              }`}
            >
              {bundle.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-premium-gold text-black px-4 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Bundle Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <picture>
                  <source 
                    media="(max-width: 640px)" 
                    srcSet={`${bundle.image}?w=640&fm=webp`}
                    type="image/webp"
                  />
                  <img 
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    loading="lazy"
                  />
                </picture>
              </div>

              {/* Bundle Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                <p className="text-gray-600 mb-4">{bundle.description}</p>

                {/* Items Included */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-sm text-gray-700">
                    Includes:
                  </h4>
                  <ul className="space-y-2">
                    {bundle.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-bold text-premium-gold">
                      ${bundle.bundlePrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${bundle.regularPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    Save ${bundle.savings} ({Math.round((bundle.savings / bundle.regularPrice) * 100)}% off)
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedBundle(bundle.id)}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                    selectedBundle === bundle.id
                      ? 'bg-premium-gold text-black'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {selectedBundle === bundle.id ? 'Selected ✓' : 'Select Bundle'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Bundle CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Don't see the perfect bundle? Create your own!
          </p>
          <a
            href="#configurator"
            className="inline-block bg-white text-black border-2 border-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-all"
          >
            Build Custom Bundle
          </a>
        </div>
      </div>
    </section>
  )
}
