'use client'

import { useState, useEffect } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

const PASSWORD = 'reshine2024'
const SESSION_KEY = 'reshine_admin_auth'

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') setAuthed(true)
    setChecking(false)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
    } else {
      setError(true)
      setInput('')
      setTimeout(() => setError(false), 2000)
    }
  }

  if (checking) return null

  if (authed) return <>{children}</>

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Access</h1>
          <p className="text-gray-600 text-sm mt-1">Reshine Auto Works — Staff Only</p>
        </div>

        <form
          onSubmit={submit}
          className={`bg-[#111] border rounded-xl p-6 transition-all duration-300 ${
            error ? 'border-red-500/50 shadow-lg shadow-red-900/20' : 'border-white/5'
          }`}
        >
          <label className="block text-gray-400 text-sm mb-2 font-medium">Password</label>
          <div className="relative mb-4">
            <input
              type={show ? 'text' : 'password'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 pr-11 text-white placeholder-gray-700 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-colors text-sm"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-3 text-center">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}
