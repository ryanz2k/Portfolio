import { motion } from 'framer-motion'
import { FaAward } from 'react-icons/fa'
import ucLogo from '../assets/uc-logo.webp'
import SectionShell from './fx/SectionShell'
import Panel from './p5/Panel'

interface EducationItem {
  institution: string
  degree: string
  period: string
  isUC: boolean
}

interface AwardItem {
  title: string
  issuer?: string
}

const EDUCATION_ITEMS: EducationItem[] = [
  {
    institution: 'University of Cebu – Banilad',
    degree:      'Bachelor of Science in Information Technology',
    period:      '2022 – 2026',
    isUC:        true,
  },
  {
    institution: 'University of Cebu – Pri',
    degree:      'Senior High School',
    period:      '2015 – 2021',
    isUC:        true,
  },
]

const CERTIFICATES: AwardItem[] = [
  { title: 'NC II Certificate', issuer: 'Computer Systems Servicing' },
  { title: 'Get Connected',     issuer: 'Cisco' },
  { title: 'Introduction to IoT',             issuer: 'Cisco' },
  { title: 'Introduction to Cybersecurity',   issuer: 'Cisco' },
  { title: 'Entrepreneurship',                issuer: 'Cisco' },
  { title: 'Introduction to Packet Tracer',   issuer: 'Cisco' },
  { title: 'Networking Essentials',           issuer: 'Cisco' },
  { title: 'CCNA: Switching, Routing & Wireless Essentials', issuer: 'Cisco' },
]

const HONORS: AwardItem[] = [
  { title: 'High Honors' },
  { title: "Dean's Lister", issuer: '5× consecutive' },
]

/// Orchestration has to live in the parent's own variant — a `transition` prop
// with staggerChildren on it is ignored.
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

const STAR_PATH =
  'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'

const GroupHeading = ({ label, tilt = -2 }: { label: string; tilt?: number }) => (
  <motion.h3
    className="mb-8 inline-block"
    initial={{ opacity: 0, x: -160 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 360, damping: 26 }}
  >
    <span
      className="cut-b inline-block bg-p5-red px-4 py-1 font-display text-2xl uppercase tracking-wide text-white md:text-3xl"
      style={{ transform: `rotate(${tilt}deg)`, filter: 'drop-shadow(4px 4px 0 #fff)' }}
    >
      {label}
    </span>
  </motion.h3>
)

const Education = () => (
  <SectionShell id="education" number="05" title="EDUCATION" kicker="Report card" tone="black">
    <div className="mx-auto max-w-5xl space-y-20">

      {/* Academic record */}
      <div>
        <GroupHeading label="Academic record" />
        <div className="space-y-8">
          {EDUCATION_ITEMS.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: i % 2 ? 140 : -140 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              style={{ rotate: i % 2 ? 0.8 : -0.8 }}
            >
              <Panel tone="white" cut={i % 2 ? 'c' : 'a'} shadow="red" className="halftone flex items-center gap-6 p-6">
                {edu.isUC && (
                  <span className="cut-b flex-shrink-0 bg-white p-2 ring-4 ring-p5-ink transition-transform group-hover/panel:-rotate-6">
                    <img src={ucLogo} alt="University of Cebu logo" className="h-12 w-12 object-contain" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-display text-2xl uppercase leading-tight tracking-wide md:text-3xl">
                    {edu.institution}
                  </h4>
                  <p className="font-cond text-lg font-bold italic text-p5-red">{edu.degree}</p>
                  <p className="font-display text-lg sm:hidden">{edu.period}</p>
                </div>
                <span className="hidden flex-shrink-0 bg-p5-ink px-3 py-1 font-display text-xl text-white sm:block">
                  {edu.period}
                </span>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Honors, stamped like grades */}
      <div>
        <GroupHeading label="Honors & awards" tilt={1.5} />
        <div className="flex flex-wrap gap-10">
          {HONORS.map((honor, i) => (
            <motion.div
              key={honor.title}
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 3, rotate: -40 }}
              whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 6 : -6 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 380, damping: 16, delay: i * 0.15 }}
              whileHover={{ scale: 1.08, rotate: 0 }}
            >
              <span className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center">
                <span className="absolute inset-0 animate-spin-mid bg-p5-red" style={{ clipPath: STAR_PATH }} />
                <FaAward className="relative text-2xl text-white" />
              </span>
              <div className="border-4 border-white px-4 py-2">
                <p className="font-display text-3xl uppercase leading-none text-white">{honor.title}</p>
                {honor.issuer && (
                  <p className="font-cond text-sm font-extrabold uppercase italic tracking-widest text-p5-red">
                    {honor.issuer}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates as an item list */}
      <div>
        <GroupHeading label="Items acquired" tilt={-3} />
        <motion.ul
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {CERTIFICATES.map((cert, i) => (
            <motion.li
              key={cert.title}
              variants={itemVariants}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              className={`group cut-${i % 2 ? 'b' : 'd'} flex items-center gap-3 bg-p5-coal px-4 py-3 transition-colors duration-100 hover:bg-p5-red`}
            >
              <span
                aria-hidden
                className="h-4 w-4 flex-shrink-0 bg-p5-red transition-colors group-hover:bg-white"
                style={{ clipPath: STAR_PATH }}
              />
              <span className="flex-1 font-cond text-base font-bold uppercase tracking-wide text-white">
                {cert.title}
              </span>
              {cert.issuer && (
                <span className="font-cond text-sm italic text-white/60 group-hover:text-white">
                  {cert.issuer}
                </span>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  </SectionShell>
)

export default Education
