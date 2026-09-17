import { motion } from 'framer-motion'
import { FaAward } from 'react-icons/fa'
import ucLogo from '../assets/uc-logo.webp'
import SectionShell from './fx/SectionShell'
import TiltCard from './fx/TiltCard'

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

// Orchestration has to live in the parent's own variant — a `transition` prop
// with staggerChildren on it is ignored.
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

const GroupHeading = ({ label }: { label: string }) => (
  <motion.p
    className="mb-8 font-pixel text-xs tracking-widest text-gray-600"
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    ── {label}
  </motion.p>
)

const Education = () => (
  <SectionShell id="education" number="05" title="EDUCATION" tone="dim">
    <div className="mx-auto max-w-4xl space-y-16">

      {/* Academic record */}
      <div>
        <GroupHeading label="ACADEMIC RECORD" />
        <div className="space-y-4">
          {EDUCATION_ITEMS.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard max={5}>
                <div className="arcade-card group flex items-center gap-6 p-6">
                  {edu.isUC && (
                    <motion.div
                      className="flex-shrink-0 rounded bg-white p-1.5"
                      style={{ border: '1px solid rgba(255,34,68,0.3)' }}
                      whileHover={{ scale: 1.12, rotate: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                    >
                      <img src={ucLogo} alt="University of Cebu logo" className="h-10 w-10 object-contain" />
                    </motion.div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 font-pixel text-xs tracking-wide text-white">
                      {edu.institution}
                    </h4>
                    <p className="mb-2 font-mono text-sm text-primary-400">{edu.degree}</p>
                    <span className="font-mono text-xs text-gray-500">{edu.period}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Honors */}
      <div>
        <GroupHeading label="HONORS & AWARDS" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HONORS.map((honor, i) => (
            <motion.div
              key={honor.title}
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="arcade-card flex items-center gap-4 p-4"
            >
              <motion.span
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                <FaAward
                  className="flex-shrink-0 text-2xl text-accent-500"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,224,0,0.5))' }}
                />
              </motion.span>
              <div>
                <p className="font-mono text-sm font-bold text-white">{honor.title}</p>
                {honor.issuer && (
                  <p className="font-mono text-xs text-gray-500">{honor.issuer}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <GroupHeading label="CERTIFICATES UNLOCKED" />
        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {CERTIFICATES.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                scale: 1.03,
                x: 4,
                borderColor: 'rgba(255,224,0,0.45)',
                backgroundColor: 'rgba(255,224,0,0.04)',
              }}
              className="group flex items-center gap-3 p-4"
              style={{
                border: '1px solid rgba(255,34,68,0.2)',
                backgroundColor: 'rgba(255,34,68,0.03)',
              }}
            >
              <span
                className="flex-shrink-0 font-pixel text-primary-500 transition-colors group-hover:text-accent-500"
                style={{ fontSize: '10px' }}
              >
                ✦
              </span>
              <div>
                <p className="font-mono text-xs font-medium text-gray-200">{cert.title}</p>
                {cert.issuer && (
                  <p className="font-mono text-xs text-gray-600">{cert.issuer}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </SectionShell>
)

export default Education
