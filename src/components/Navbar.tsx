import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS } from '../data/navigation'

interface NavbarProps {
  activeSection: string
}


const Navbar = ({ activeSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 top-0 z-50"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.7)',
          borderBottom: '1px solid rgba(255,34,68,0.4)',
          backdropFilter: 'blur(10px)',
          boxShadow: scrolled ? '0 4px 30px rgba(255,34,68,0.15)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">

            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="font-pixel text-xs tracking-wider text-primary-500 transition-colors group-hover:text-primary-400"
                style={{ textShadow: '0 0 10px rgba(255,34,68,0.6)' }}
                animate={{ opacity: [1, 0.72, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                [JRG]
              </motion.span>
              <span className="hidden font-mono text-xs text-gray-500 sm:block">
                _portfolio.exe
              </span>
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative px-3 py-2 font-mono text-xs tracking-widest transition-colors duration-150"
                    style={{ color: isActive ? '#FF2244' : '#9ca3af' }}
                  >
                    <span className="mr-1 font-pixel text-primary-500/50" style={{ fontSize: '9px' }}>
                      {item.number}
                    </span>
                    <span
                      className="transition-colors group-hover:text-primary-400"
                      style={isActive ? { textShadow: '0 0 8px rgba(255,34,68,0.5)' } : undefined}
                    >
                      {item.label}
                    </span>

                    {/* One indicator that slides between items rather than fading per item */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px]"
                        style={{
                          background: '#FF2244',
                          boxShadow: '0 0 8px rgba(255,34,68,0.9)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}

                    {/* Hover wash */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 scale-y-0 bg-primary-500/10 transition-transform duration-200 group-hover:scale-y-100"
                      style={{ transformOrigin: 'bottom' }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Mobile burger */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-500 transition-colors hover:text-primary-400 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              whileTap={{ scale: 0.85 }}
            >
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
            className="fixed inset-y-0 right-0 z-40 flex w-72 flex-col"
            style={{
              background: 'rgba(10,10,10,0.95)',
              borderLeft: '1px solid rgba(255,34,68,0.4)',
              boxShadow: '-8px 0 40px rgba(255,34,68,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center justify-between border-b border-primary-500/20 px-6 py-4">
              <span className="font-pixel text-xs text-primary-500">MENU</span>
              <button onClick={() => setIsOpen(false)} className="text-primary-500" aria-label="Close menu">
                <FaTimes size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: 48, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.05, type: 'spring', stiffness: 300, damping: 26 }}
                    onClick={() => scrollToSection(item.id)}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center gap-4 px-4 py-3 text-left transition-all"
                    style={{
                      background: isActive ? 'rgba(255,34,68,0.1)' : 'transparent',
                      borderLeft: isActive ? '3px solid #FF2244' : '3px solid transparent',
                    }}
                  >
                    <span className="font-pixel text-primary-500/60" style={{ fontSize: '9px' }}>
                      {item.number}
                    </span>
                    <span
                      className="font-mono text-sm tracking-widest transition-colors group-hover:text-primary-400"
                      style={{ color: isActive ? '#FF2244' : '#d1d5db' }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
