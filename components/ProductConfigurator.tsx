'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ConfigOption {
  id: string
  name: string
  price: number
  image: string
}

const sizes: ConfigOption[] = [
  { id: 'loveseat', name: 'Loveseat (2-Seater)', price: 1299, image: '/images/loveseat.jpg' },
  { id: 'standard', name: 'Standard (3-Seater)', price: 1799, image: '/images/standard.jpg' },
  { id: 'large', name: 'Large (4-Seater)', price: 2299, image: '/images/large.jpg' },
]

const fabrics: ConfigOption[] = [
  { id: 'linen', name: 'Premium Linen', price: 0, image: '/images/fabric-linen.jpg' },
  { id: 'velvet', name: 'Luxury Velvet', price: 300, image: '/images/fabric-velvet.jpg' },
  { id: 'leather', name: 'Italian Leather', price: 800, image: '/images/fabric-leather.jpg' },
]

const colors = [
  { id: 'cloud', name: 'Cloud White', hex: '#F5F5F5' },
  { id: 'charcoal', name: 'Charcoal Gray', hex: '#36454F' },
  { id: 'navy', name: 'Navy Blue', hex: '#000080' },
  { id: 'sage', name: 'Sage Green', hex: '#9DC183' },
  { id: 'terracotta', name: 'Terracotta', hex: '#E2725B' },
]

const addons = [
  { id: 'ottoman', name: 'Matching Ottoman', price: 399 },
  { id: 'pillows', name: 'Premium Pillow Set (4)', price: 199 },
  { id: 'throws', name: 'Cashmere Throw Blanket', price: 249 },
  { id: 'protection', name: '5-Year Protection Plan', price: 299 },
]

export default function ProductConfigurator() {
  const [selectedSize, setSelectedSize] = useState(sizes[1])
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0])
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  const calculateTotal = () => {
    let total = selectedSize.price + selectedFabric.price
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId)
      if (addon) total += addon.price
    })
    return total
  }

  return (
    <section id="configurator" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Design Your Perfect Sofa
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Customize every detail to match your style and space
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Visual Preview */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden aspect-[4/3]">
                <div className="relative w-full h-full">
                  <picture>
                    <source 
                      media="(max-width: 640px)" 
                      srcSet={`${selectedSize.image}?w=640&fm=webp`}
                      type="image/webp"
                    />
                    <source 
                      media="(min-width: 641px)" 
                      srcSet={`${selectedSize.image}?w=1200&fm=webp`}
                      type="image/webp"
                    />
                    <img 
                      src={selectedSize.image}
                      alt={`${selectedSize.name} in ${selectedColor.name} ${selectedFabric.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <div 
                    className="absolute inset-0 mix-blend-multiply opacity-30"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-semibold">${selectedSize.price}</span>
                </div>
                {selectedFabric.price > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">{selectedFabric.name}</span>
                    <span className="font-semibold">+${selectedFabric.price}</span>
                  </div>
                )}
                {selectedAddons.map(addonId => {
                  const addon = addons.find(a => a.id === addonId)
                  return addon ? (
                    <div key={addonId} className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">{addon.name}</span>
                      <span className="font-semibold">+${addon.price}</span>
                    </div>
                  ) : null
                })}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-premium-gold">
                      ${calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Size Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Choose Your Size</h3>
              <div className="grid grid-cols-1 gap-4">
                {sizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedSize.id === size.id
                        ? 'border-premium-gold bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{size.name}</div>
                        <div className="text-sm text-gray-600">Starting at ${size.price}</div>
                      </div>
                      {selectedSize.id === size.id && (
                        <svg className="w-6 h-6 text-premium-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">2. Select Fabric</h3>
              <div className="grid grid-cols-1 gap-4">
                {fabrics.map(fabric => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedFabric.id === fabric.id
                        ? 'border-premium-gold bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{fabric.name}</div>
                        <div className="text-sm text-gray-600">
                          {fabric.price > 0 ? `+$${fabric.price}` : 'Included'}
                        </div>
                      </div>
                      {selectedFabric.id === fabric.id && (
                        <svg className="w-6 h-6 text-premium-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">3. Pick Your Color</h3>
              <div className="flex flex-wrap gap-4">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      selectedColor.id === color.id
                        ? 'border-premium-gold bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">4. Enhance Your Experience</h3>
              <div className="space-y-3">
                {addons.map(addon => (
                  <label
                    key={addon.id}
                    className="flex items-center p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="w-5 h-5 text-premium-gold rounded focus:ring-premium-gold"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-semibold">{addon.name}</div>
                      <div className="text-sm text-gray-600">+${addon.price}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
