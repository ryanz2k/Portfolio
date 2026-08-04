import { motion } from 'framer-motion'
import { FaLaptopCode, FaServer, FaShoppingCart } from 'react-icons/fa'

const SECTION_NUMBER = '01'

const ABOUT_CARDS = [
  {
    icon: <FaLaptopCode />,
    title: 'Web Dev',
    description: 'Building scalable, responsive, and modern full-stack web apps from the ground up.',
  },
  {
    icon: <FaServer />,
    title: 'Systems',
    description: 'Designing robust backends, REST APIs, and database integrations.',
  },
  {
    icon: <FaShoppingCart />,
    title: 'E-Commerce',
    description: 'Shopify, WordPress, Google Ads & Analytics — high-traffic platform management.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const About = () => {
  return (
    <section id="about" className="py-24" style={{ background: 'rgba(15,15,15,0.85)' }}>
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
          <h2 className="section-heading">ABOUT ME</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-500/40 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="font-mono text-gray-300 leading-relaxed text-sm">
              I'm a{' '}
              <span className="text-primary-400 font-bold">Full Stack Developer</span>{' '}
              and Information Technology graduate from the{' '}
              <span className="text-accent-500">University of Cebu – Banilad</span>.
              My core focus lies in engineering modern web applications, designing
              robust system architectures, and delivering seamless database integrations.
            </p>

            <p className="font-mono text-gray-300 leading-relaxed text-sm">
              With a strong foundation in both frontend and backend technologies, I've
              developed custom{' '}
              <span className="text-primary-400 font-bold">full-stack systems</span>{' '}
              from scratch. Professionally, I also bring experience managing high-traffic{' '}
              <span className="text-primary-400 font-bold">e-commerce platforms</span>,
              handling complex Shopify integrations, and delivering highly tailored web
              solutions for clients.
            </p>

            {/* Divider quote */}
            <div
              className="flex items-center gap-4 py-4"
              style={{ borderLeft: '3px solid #FF2244', paddingLeft: '16px' }}
            >
              <p className="font-mono text-xs text-gray-500 italic">
                // Always learning. Always shipping.
              </p>
            </div>

          
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4"
          >
            {ABOUT_CARDS.map(({ icon, title, description }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                className="arcade-card p-6 flex items-start gap-5 group"
              >
                <div
                  className="text-3xl text-primary-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,34,68,0.5))' }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="font-pixel text-white text-xs mb-2 tracking-wider">{title}</h3>
                  <p className="font-mono text-gray-400 text-xs leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

