import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa'

const SECTION_NUMBER = '06'

const CONTACT_ITEMS = [
  {
    icon: <FaEnvelope />,
    label: 'EMAIL',
    value: 'JohnRyanGomez812@gmail.com',
    href:  'mailto:JohnRyanGomez812@gmail.com',
  },
  {
    icon: <FaPhone />,
    label: 'PHONE',
    value: '0976 065 6704',
    href:  'tel:09760656704',
  },
  {
    icon: <FaGithub />,
    label: 'GITHUB',
    value: 'github.com/ryanz2k',
    href:  'https://github.com/ryanz2k',
    external: true,
  },
  {
    icon: <FaLinkedin />,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/ryanz2k',
    href:  'https://www.linkedin.com/in/ryanz2k/',
    external: true,
  },
]

const Contact = () => {
  return (
    <section id="contact" className="py-24" style={{ background: 'rgba(10,10,10,0.88)' }}>
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
          <h2 className="section-heading">CONTACT</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-500/40 to-transparent" />
        </motion.div>

        <div className="max-w-2xl mx-auto text-center">



          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-gray-400 text-sm mb-12 leading-relaxed"
          >
            Open to new opportunities, freelance work, and interesting projects.
            <br />
            <span className="text-primary-400">Ping me anytime.</span>
          </motion.p>

          {/* Contact cards grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
          >
            {CONTACT_ITEMS.map(({ icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="arcade-card p-5 flex items-center gap-4 group text-left transition-all duration-150"
              >
                <span
                  className="text-primary-500 text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-150"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,34,68,0.5))' }}
                >
                  {icon}
                </span>
                <div className="min-w-0">
                  <p className="font-pixel text-gray-500 mb-1" style={{ fontSize: '8px', letterSpacing: '0.2em' }}>
                    {label}
                  </p>
                  <p className="font-mono text-gray-200 text-xs group-hover:text-primary-400 transition-colors truncate">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Big CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a
              href="mailto:JohnRyanGomez812@gmail.com"
              className="arcade-btn inline-block text-sm"
            >
              SEND MESSAGE
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

