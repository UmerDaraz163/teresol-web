'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// Note: The following imports are for standard libraries in a Next.js project.
// The build environment may not have these installed, leading to resolution errors.
import Tilt from 'react-parallax-tilt'
import { gsap } from 'gsap'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Use the signIn function from next-auth
      const result = await signIn('credentials', {
        redirect: false, // Prevent NextAuth from redirecting automatically
        email,
        password,
      })

      if (result?.error) {
        // If there's an error, display it
        setError('Invalid email or password. Please try again.')
        gsap.fromTo('#login-card', { x: 0 }, { x: 10, yoyo: true, repeat: 5, duration: 0.05 })
      } else if (result?.ok) {
        // If login is successful, redirect to the admin dashboard
        router.push('/admin')
      }
    } catch (err) {
      // Catch any unexpected errors
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-[#25237b] to-[#8b0303] overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute w-[1000px] h-[1000px] bg-purple-500 rounded-full blur-3xl -top-40 -left-40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute w-[800px] h-[800px] bg-blue-500 rounded-full blur-3xl bottom-0 right-0"
      />

      {/* Login Card */}
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareColor="#fff" glareMaxOpacity={0.2}>
        <motion.form
          id="login-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
          className="relative z-10 p-8 bg-black rounded-2xl shadow-2xl border border-white/20 w-[450px] h-[480px]"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Login</h1>

          <motion.input
            whileFocus={{ scale: 1.05, borderColor: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 mb-4 text-black border border-white/30 rounded-lg outline-none"
          />
          <motion.input
            whileFocus={{ scale: 1.05, borderColor: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 mb-6 text-black border border-white/30 rounded-lg outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#8b0303', boxShadow: '0 0 15px #8b0303' }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-white p-3 rounded-lg font-semibold disabled:bg-gray-500"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </motion.button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Logo */}
          <div className="mt-6 flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </motion.form>
      </Tilt>
    </div>
  )
}
