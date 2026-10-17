import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa'
import SectionShell from './fx/SectionShell'
import Panel from './p5/Panel'
import RansomText from './p5/RansomText'

const CONTACT_ITEMS = [
  {
    icon: <FaEnvelope />,
    label: 'EMAIL',
    value: 'JohnRyanGomez812@gmail.com',
    href: 'mailto:JohnRyanGomez812@gmail.com',
  },
  {
    icon: <FaPhone />,
    label: 'PHONE',
    value: '0976 065 6704',
    href: 'tel:09760656704',
  },
  {
    icon: <FaGithub />,
    label: 'GITHUB',
    value: 'github.com/ryanz2k',
    href: 'https://github.com/ryanz2k',
    external: true,
  },
  {
    icon: <FaLinkedin />,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/ryanz2k',
    href: 'https://www.linkedin.com/in/ryanz2k/',
    external: true,
  },
]

const CUTS = ['a', 'b', 'c', 'd'] as const
const TILTS = [-1.5, 1, 1.5, -1]

// Orchestration has to live in the parent's own variant — a `transition` prop
// with staggerChildren on it is ignored.
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -8 },
  visible: { opacity: 1, y: 0, rotate: 0 },
}

const Contact = () => (
  <SectionShell id="contact" number="06" title="CONTACT" kicker="Send a calling card" tone="red">
    <div className="mx-auto max-w-4xl">

      {/* The calling card */}
      <motion.div
        className="mx-auto mb-16 max-w-2xl"
        initial={{ opacity: 0, scale: 2, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        style={{ filter: 'drop-shadow(10px 10px 0 #000)' }}
      >
        <div className="cut-a halftone bg-p5-paper px-6 py-10 text-center text-p5-ink sm:px-12">
          <p className="p5-label mb-4 text-p5-red">To whoever is reading this,</p>
          <RansomText text="LET'S WORK TOGETHER" seed={9} onLight className="text-3xl sm:text-5xl" />
          <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed">
            Open to new opportunities, freelance work, and interesting projects.{' '}
            <span className="bg-p5-red px-1 font-semibold text-white">Ping me anytime.</span>
          </p>
          <p className="mt-4 font-cond text-lg font-extrabold italic tracking-widest">— JRG</p>
        </div>
      </motion.div>

      <motion.div
        className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {CONTACT_ITEMS.map(({ icon, label, value, href, external }, i) => (
          <motion.a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            whileTap={{ scale: 0.96 }}
            className="block"
            style={{ rotate: TILTS[i] }}
          >
            <Panel tone="black" cut={CUTS[i]} shadow="white" className="flex items-center gap-4 p-5">
              <span className="cut-b flex h-12 w-12 flex-shrink-0 items-center justify-center bg-p5-red text-xl text-white transition-transform group-hover/panel:-rotate-12 group-hover/panel:scale-110">
                {icon}
              </span>
              <div className="min-w-0">
                <p className="p5-label text-p5-red">{label}</p>
                <p className="truncate font-display text-lg tracking-wide text-white group-hover/panel:text-p5-bright">
                  {value}
                </p>
              </div>
            </Panel>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.2 }}
      >
        <a href="mailto:JohnRyanGomez812@gmail.com" className="p5-btn text-2xl md:text-3xl">
          <span>Send message</span>
        </a>
      </motion.div>
    </div>
  </SectionShell>
)

export default Contact
