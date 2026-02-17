'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Three.js components
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />,
})

const OrbitControls = dynamic(
  () => import('@react-three/drei').then(mod => mod.OrbitControls),
  { ssr: false }
)

const Environment = dynamic(
  () => import('@react-three/drei').then(mod => mod.Environment),
  { ssr: false }
)

function SofaModel() {
  return (
    <mesh rotation={[0, Math.PI / 4, 0]}>
      {/* Simplified sofa representation - in production, load actual 3D model */}
      <group>
        {/* Seat */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2, 0.4, 1]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        {/* Back */}
        <mesh position={[0, 0.8, -0.4]}>
          <boxGeometry args={[2, 0.8, 0.2]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        {/* Armrest Left */}
        <mesh position={[-0.9, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.6, 1]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        {/* Armrest Right */}
        <mesh position={[0.9, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.6, 1]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      </group>
    </mesh>
  )
}

export default function VirtualShowroom() {
  const [activeRoom, setActiveRoom] = useState<'living' | 'bedroom' | 'office'>('living')
  const [viewMode, setViewMode] = useState<'3d' | 'ar'>('3d')

  const rooms = [
    { id: 'living' as const, name: 'Living Room', icon: '🛋️' },
    { id: 'bedroom' as const, name: 'Bedroom', icon: '🛏️' },
    { id: 'office' as const, name: 'Home Office', icon: '💼' },
  ]

  return (
    <section id="showroom" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Virtual Showroom
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Visualize your sofa in different spaces before you buy
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                viewMode === '3d'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              3D View
            </button>
            <button
              onClick={() => setViewMode('ar')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                viewMode === 'ar'
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              AR View
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Room Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Select a Room</h3>
            {rooms.map(room => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  activeRoom === room.id
                    ? 'border-premium-gold bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{room.icon}</span>
                  <span className="font-semibold text-lg">{room.name}</span>
                  {activeRoom === room.id && (
                    <svg
                      className="w-5 h-5 text-premium-gold ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}

            {/* Room Details */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h4 className="font-semibold mb-3">Interactive Controls</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">🖱️</span>
                  <span>Click and drag to rotate</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔍</span>
                  <span>Scroll to zoom in/out</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📱</span>
                  <span>Pinch to zoom on mobile</span>
                </li>
              </ul>
            </div>

            {/* AR Instructions */}
            {viewMode === 'ar' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold mb-2 flex items-center">
                  <span className="mr-2">📱</span>
                  AR View Instructions
                </h4>
                <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                  <li>Open this page on your mobile device</li>
                  <li>Tap "View in Your Space"</li>
                  <li>Point camera at your floor</li>
                  <li>Place and move the sofa</li>
                </ol>
              </div>
            )}
          </div>

          {/* 3D/AR Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {viewMode === '3d' ? (
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200">
                  <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse" />}>
                    <Canvas
                      camera={{ position: [3, 2, 3], fov: 50 }}
                      className="w-full h-full"
                    >
                      <ambientLight intensity={0.5} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                      <pointLight position={[-10, -10, -10]} />
                      <SofaModel />
                      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                      <Environment preset="apartment" />
                    </Canvas>
                  </Suspense>
                </div>
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-2xl font-bold mb-2">AR View</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      To experience augmented reality, please open this page on a mobile device with AR capabilities
                    </p>
                    <div className="inline-flex gap-4">
                      <img 
                        src="/images/qr-code.png" 
                        alt="QR Code to open on mobile"
                        className="w-32 h-32 bg-white p-2 rounded-xl shadow-md"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Scan QR code with your phone camera
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">360°</div>
                <div className="text-sm font-semibold">Full Rotation</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">📏</div>
                <div className="text-sm font-semibold">True Scale</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">🎨</div>
                <div className="text-sm font-semibold">See All Colors</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">📸</div>
                <div className="text-sm font-semibold">Take Photos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
