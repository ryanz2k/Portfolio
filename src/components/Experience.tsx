import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionShell from './fx/SectionShell'
import Panel from './p5/Panel'

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

const NUMERALS = ['I', 'II', 'III', 'IV', 'V']
const CUTS = ['a', 'd', 'b'] as const

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  // The rail fills in step with how far the timeline has been scrolled through.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <SectionShell id="experience" number="02" title="EXPERIENCE" kicker="Confidant files" tone="red">
      <div ref={timelineRef} className="relative mx-auto max-w-4xl">

        {/* Rail: an ink track that fills white as you scroll */}
        <div aria-hidden className="absolute bottom-8 left-[27px] top-4 hidden w-2 bg-p5-ink/40 sm:block" />
        <motion.div
          aria-hidden
          className="absolute bottom-8 left-[27px] top-4 hidden w-2 origin-top bg-white sm:block"
          style={{ scaleY: railScale }}
        />

        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: index % 2 ? 120 : -120, rotate: index % 2 ? 4 : -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="relative mb-14 flex gap-6 last:mb-0 sm:gap-10"
          >
            {/* Numeral badge on the rail */}
            <motion.div
              className="relative z-10 hidden flex-shrink-0 sm:block"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: -8 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 420, damping: 14, delay: 0.15 }}
            >
              <span
                className="cut-c flex h-16 w-16 items-center justify-center bg-p5-ink font-display text-3xl text-white"
                style={{ filter: 'drop-shadow(4px 4px 0 #fff)' }}
              >
                {NUMERALS[index]}
              </span>
            </motion.div>

            <div className="flex-1">
              <Panel tone="black" cut={CUTS[index % CUTS.length]} shadow="white" className="p-6 md:p-8">
                {/* Type stamp */}
                <span
                  className="absolute right-5 top-5 border-[3px] border-p5-red px-2 font-display text-lg tracking-widest text-p5-red"
                  style={{ transform: 'rotate(8deg)' }}
                >
                  {exp.type}
                </span>

                <p className="p5-label mb-1 text-p5-red">{exp.period}</p>
                <h3 className="mb-3 pr-28 font-display text-3xl uppercase leading-tight tracking-wide transition-colors group-hover/panel:text-p5-bright md:text-4xl">
                  {exp.title}
                </h3>
                <span className="cut-sm mb-6 inline-block bg-white px-3 py-0.5 font-heavy text-sm uppercase text-p5-ink">
                  {exp.company}
                </span>

                <ul className="space-y-3">
                  {exp.description.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28, delay: 0.2 + idx * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-3 w-3 flex-shrink-0 bg-p5-red"
                        style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%, 25% 50%)' }}
                      />
                      <span className="font-body text-sm leading-relaxed text-white/85">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Panel>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

export default Experience
