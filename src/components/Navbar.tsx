import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  activeSection: string
}

const NAV_ITEMS = [
  { id: 'hero',       label: 'HOME',      number: '00' },
  { id: 'about',      label: 'ABOUT',     number: '01' },
  { id: 'experience', label: 'EXPERIENCE',number: '02' },
  { id: 'projects',   label: 'PROJECTS',  number: '03' },
  { id: 'skills',     label: 'SKILLS',    number: '04' },
  { id: 'education',  label: 'EDUCATION', number: '05' },
  { id: 'contact',    label: 'CONTACT',   number: '06' },
]

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.97)'
            : 'rgba(10,10,10,0.85)',
          borderBottom: '1px solid rgba(255,34,68,0.4)',
          backdropFilter: 'blur(8px)',
          boxShadow: scrolled ? '0 4px 30px rgba(255,34,68,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 group"
            >
              <span
                className="font-pixel text-primary-500 text-xs tracking-wider group-hover:text-primary-400 transition-colors"
                style={{ textShadow: '0 0 10px rgba(255,34,68,0.6)' }}
              >
                [JRG]
              </span>
              <span className="font-mono text-xs text-gray-500 hidden sm:block">
                _portfolio.exe
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-3 py-2 font-mono text-xs tracking-widest transition-all duration-150 group"
                    style={{
                      color: isActive ? '#FF2244' : '#9ca3af',
                    }}
                  >
                    <span
                      className="text-primary-500/50 mr-1 font-pixel"
                      style={{ fontSize: '9px' }}
                    >
                      {item.number}
                    </span>
                    <span
                      className="group-hover:text-primary-400 transition-colors"
                      style={isActive ? { textShadow: '0 0 8px rgba(255,34,68,0.5)' } : {}}
                    >
                      {item.label}
                    </span>
                    {/* Underline indicator — simple, no layout animation weirdness */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '8px',
                        right: '8px',
                        height: '2px',
                        background: '#FF2244',
                        boxShadow: '0 0 8px rgba(255,34,68,0.8)',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary-500 hover:text-primary-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-y-0 right-0 w-72 z-40 flex flex-col"
            style={{
              background: 'rgba(10,10,10,0.88)',
              borderLeft: '1px solid rgba(255,34,68,0.4)',
              boxShadow: '-8px 0 40px rgba(255,34,68,0.15)',
            }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-primary-500/20">
              <span className="font-pixel text-xs text-primary-500">MENU</span>
              <button onClick={() => setIsOpen(false)} className="text-primary-500">
                <FaTimes size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-1 p-4 mt-4">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-4 px-4 py-3 text-left transition-all group"
                    style={{
                      background: isActive ? 'rgba(255,34,68,0.1)' : 'transparent',
                      borderLeft: isActive ? '3px solid #FF2244' : '3px solid transparent',
                    }}
                  >
                    <span className="font-pixel text-primary-500/60" style={{ fontSize: '9px' }}>
                      {item.number}
                    </span>
                    <span
                      className="font-mono text-sm tracking-widest group-hover:text-primary-400 transition-colors"
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

      {/* Backdrop for mobile menu */}
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

