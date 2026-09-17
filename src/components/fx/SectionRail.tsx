import { motion } from 'framer-motion'

interface SectionRailProps {
  sections: { id: string; label: string }[]
  activeSection: string
}

/**
 * Vertical stage-select rail on the right edge. Each diamond is a section; the
 * active one lights up and its label slides out. Desktop only — on small
 * screens the burger menu already covers navigation.
 */
const SectionRail = ({ sections, activeSection }: SectionRailProps) => {
  const jumpTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <button
            key={id}
            onClick={() => jumpTo(id)}
            className="group flex items-center gap-3"
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className="font-pixel whitespace-nowrap text-primary-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ fontSize: '8px', letterSpacing: '0.2em' }}
            >
              {label}
            </span>
            <motion.span
              className="block"
              animate={{
                width: isActive ? 14 : 8,
                height: isActive ? 14 : 8,
                backgroundColor: isActive ? '#FF2244' : 'rgba(255,34,68,0.25)',
                boxShadow: isActive
                  ? '0 0 12px rgba(255,34,68,0.9)'
                  : '0 0 0 rgba(255,34,68,0)',
                rotate: isActive ? 0 : 45,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            />
          </button>
        )
      })}
    </nav>
  )
}

export default SectionRail
