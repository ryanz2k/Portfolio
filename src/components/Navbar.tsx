import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS } from '../data/navigation'
import { navigateTo } from '../lib/navigate'
import Starburst from './p5/Starburst'
import CalendarHUD from './p5/CalendarHUD'

interface NavbarProps {
  activeSection: string
}

// Each mobile menu item sits at its own angle and indent, like the P5 pause menu.
const MENU_TILTS = [-6, -3, -7, -2, -5, -8, -4]
const MENU_INDENTS = [0, 28, 8, 40, 16, 48, 24]

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  // Lock the page behind the full-screen menu.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const go = (id: string) => {
    setIsOpen(false)
    navigateTo(id)
  }

  // The red slab follows the hovered item, and rests on the active one.
  const highlighted = hovered ?? activeSection

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 top-[5px] z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.2 }}
      >
        <div
          className="border-b-4 border-p5-red bg-p5-ink"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)', paddingBottom: 6 }}
        >
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Logo */}
            <button
              onClick={() => go('hero')}
              className="group flex items-center gap-2"
              aria-label="Back to top"
            >
              <span className="cut-b bg-p5-red px-2 py-0.5 font-display text-2xl text-white transition-transform group-hover:-rotate-6 group-hover:scale-110">
                JRG
              </span>
              <span className="hidden font-cond text-sm font-extrabold italic tracking-[0.2em] text-white/70 sm:block">
                PHANTOM PORTFOLIO
              </span>
            </button>

            <div className="hidden xl:block">
              <CalendarHUD activeSection={activeSection} />
            </div>

            {/* Desktop menu */}
            <div className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
              {NAV_ITEMS.slice(1).map((item) => {
                const isActive = activeSection === item.id
                const isLit = highlighted === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    onMouseEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onBlur={() => setHovered(null)}
                    aria-current={isActive ? 'true' : undefined}
                    className="relative px-3 py-2 lg:px-4"
                  >
                    {isLit && (
                      <motion.span
                        layoutId="nav-slab"
                        aria-hidden
                        className="absolute inset-x-0 -inset-y-0.5 bg-p5-red"
                        style={{ clipPath: 'polygon(6% 10%, 100% 0, 94% 92%, 0 100%)' }}
                        transition={{ type: 'spring', stiffness: 600, damping: 34 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-2 -bottom-1 h-1 bg-white"
                        transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative inline-block font-display text-lg tracking-wider transition-transform lg:text-xl ${
                        isLit ? '-rotate-6 scale-110 text-white' : 'text-white/80'
                      } ${isActive && isLit ? 'animate-jitter' : ''}`}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(true)}
              className="cut-a bg-p5-red p-2 text-white md:hidden"
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile pause menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[60] overflow-hidden bg-p5-red md:hidden"
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute -right-1/2 -top-1/4 h-[150vmax] w-[150vmax] opacity-20">
              <Starburst color="#000" rays={28} className="h-full w-full animate-spin-mid" />
            </div>
            <div className="halftone absolute inset-0" />

            <button
              onClick={() => setIsOpen(false)}
              className="cut-b absolute right-4 top-5 z-10 bg-p5-ink p-3 text-white"
              aria-label="Close menu"
            >
              <FaTimes size={20} />
            </button>

            <nav className="relative flex h-full flex-col justify-center gap-1 px-6">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className="flex items-center gap-3 self-start"
                    style={{ marginLeft: MENU_INDENTS[i], rotate: MENU_TILTS[i] }}
                    initial={{ x: -260, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26, delay: 0.12 + i * 0.04 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <span className="font-cond text-lg font-extrabold italic text-p5-ink">{item.number}</span>
                    <span
                      className={`cut-a px-3 font-display text-5xl leading-tight ${
                        isActive ? 'bg-p5-ink text-white' : 'text-white'
                      }`}
                      style={{ textShadow: isActive ? 'none' : '3px 3px 0 #000' }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
