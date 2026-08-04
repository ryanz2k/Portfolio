import { motion } from 'framer-motion'

const SECTION_NUMBER = '02'

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
  return (
    <section id="experience" className="py-24" style={{ background: 'rgba(10,10,10,0.88)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-pixel text-primary-500/50" style={{ fontSize: '10px' }}>
            {SECTION_NUMBER}.
          </span>
          <h2 className="section-heading">EXPERIENCE</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-500/40 to-transparent" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {EXPERIENCES.map((exp, index) => {
            const typeStyle = TYPE_STYLES[exp.type]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex gap-6 mb-12 last:mb-0"
              >
                {/* Timeline connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-3 h-3 flex-shrink-0 mt-1"
                    style={{
                      background: '#FF2244',
                      boxShadow: '0 0 10px rgba(255,34,68,0.7)',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    }}
                  />
                  {index < EXPERIENCES.length - 1 && (
                    <div
                      className="w-px flex-1 mt-2"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,34,68,0.5), rgba(255,34,68,0.05))',
                        minHeight: '60px',
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className="arcade-card p-6 flex-1 group">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-pixel text-white text-xs tracking-wider mb-2">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-primary-400 text-sm">{exp.company}</p>
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
                      <span className="font-mono text-gray-500 text-xs">{exp.period}</span>
                    </div>
                  </div>

                  {/* Bullet list */}
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary-500 mt-0.5 flex-shrink-0 font-mono text-xs">▸</span>
                        <span className="font-mono text-gray-400 text-xs leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience

