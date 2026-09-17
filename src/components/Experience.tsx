import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionShell from './fx/SectionShell'
import TiltCard from './fx/TiltCard'

interface ExperienceItem {
  title: string
  company: string
  period: string
  type: 'REMOTE' | 'ON-SITE' | 'FREELANCE'
  description: string[]
}

const EXPERIENCES: ExperienceItem[] = [
  {
    title: 'Full-Stack Developer Intern',
    company: 'EL Glam',
    period: 'Jan 2026 – June 2026',
    type: 'ON-SITE',
    description: [
      'Engineered a custom multi-branch POS system and a PayPal-integrated e-commerce platform.',
      'Managed end-to-end deployment across four locations.',
      'Delivered automated financial reporting and Brevo marketing integrations.',
      'Conducted rigorous system testing and comprehensive staff training.',
    ],
  },
  {
    title: 'E-Commerce Specialist',
    company: 'Freelance',
    period: '2023 – Present',
    type: 'REMOTE',
    description: [
      'Managed and optimized Shopify stores by integrating Google Ads, Google Merchant Center, and Google Analytics.',
      'Troubleshot critical issues such as missing SKUs, disapproved products, and feed mismatches.',
      'Implemented purchase conversion tracking to enhance campaign performance and ROI.',
      'Configured automated reporting dashboards to monitor store metrics and ad spend efficiency.',
    ],
  },
  {
    title: 'WordPress Developer',
    company: 'Freelance',
    period: '2021 – Present',
    type: 'REMOTE',
    description: [
      'Managed, designed, and developed multiple WordPress websites for diverse professional clients.',
      'Performed theme customization, plugin integration, SEO optimization, and performance tuning.',
      'Built custom page layouts and WooCommerce storefronts aligned with client brand guidelines.',
      'Delivered solutions that meet specific business goals within agreed timelines.',
    ],
  },
]

const TYPE_STYLES: Record<ExperienceItem['type'], { color: string; glow: string }> = {
  'REMOTE':    { color: '#60a5fa', glow: 'rgba(96,165,250,0.4)' },
  'ON-SITE':   { color: '#FFE000', glow: 'rgba(255,224,0,0.4)' },
  'FREELANCE': { color: '#a78bfa', glow: 'rgba(167,139,250,0.4)' },
}

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  // The rail fills in step with how far the timeline has been scrolled through.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <SectionShell id="experience" number="02" title="EXPERIENCE" tone="base">
      <div ref={timelineRef} className="relative mx-auto max-w-3xl">

        {/* Track and the glowing fill that follows the scroll */}
        <div
          aria-hidden
          className="absolute bottom-6 left-[5px] top-2 w-px"
          style={{ background: 'rgba(255,34,68,0.12)' }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-6 left-[5px] top-2 w-px origin-top"
          style={{
            scaleY: railScale,
            background: 'linear-gradient(to bottom, #FF2244, rgba(255,34,68,0.25))',
            boxShadow: '0 0 10px rgba(255,34,68,0.6)',
          }}
        />

        {EXPERIENCES.map((exp, index) => {
          const typeStyle = TYPE_STYLES[exp.type]
          return (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-12 flex gap-6 last:mb-0"
            >
              {/* Timeline node */}
              <div className="flex flex-shrink-0 flex-col items-center">
                <motion.div
                  className="mt-1 h-3 w-3 flex-shrink-0"
                  style={{
                    background: '#FF2244',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{
                    scale: 1,
                    rotate: 0,
                    boxShadow: '0 0 14px rgba(255,34,68,0.9)',
                  }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16, delay: index * 0.1 }}
                />
              </div>

              <TiltCard max={5} className="flex-1">
                <div className="arcade-card group h-full p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="mb-2 font-pixel text-xs tracking-wider text-white transition-colors group-hover:text-primary-300">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-sm text-primary-400">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="font-pixel"
                        style={{
                          fontSize: '8px',
                          letterSpacing: '0.15em',
                          color: typeStyle.color,
                          textShadow: `0 0 8px ${typeStyle.glow}`,
                        }}
                      >
                        {exp.type}
                      </span>
                      <span className="font-mono text-xs text-gray-500">{exp.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 + idx * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 flex-shrink-0 font-mono text-xs text-primary-500">▸</span>
                        <span className="font-mono text-xs leading-relaxed text-gray-400">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>
    </SectionShell>
  )
}

export default Experience
