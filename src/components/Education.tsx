import { motion } from 'framer-motion'
import { FaAward } from 'react-icons/fa'
import ucLogo from '../assets/uc-logo.webp'

const SECTION_NUMBER = '05'

interface EducationItem {
  institution: string
  degree: string
  period: string
  isUC: boolean
}

interface AwardItem {
  title: string
  issuer?: string
  unlocked?: boolean
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
  { title: 'NC II Certificate', issuer: 'Computer Systems Servicing', unlocked: true },
  { title: 'Get Connected',     issuer: 'Cisco', unlocked: true },
  { title: 'Introduction to IoT',             issuer: 'Cisco', unlocked: true },
  { title: 'Introduction to Cybersecurity',   issuer: 'Cisco', unlocked: true },
  { title: 'Entrepreneurship',                issuer: 'Cisco', unlocked: true },
  { title: 'Introduction to Packet Tracer',   issuer: 'Cisco', unlocked: true },
  { title: 'Networking Essentials',           issuer: 'Cisco', unlocked: true },
  { title: 'CCNA: Switching, Routing & Wireless Essentials', issuer: 'Cisco', unlocked: true },
]

const HONORS: AwardItem[] = [
  { title: 'High Honors',  unlocked: true },
  { title: "Dean's Lister", issuer: '5× consecutive', unlocked: true },
]

const Education = () => {
  return (
    <section id="education" className="py-24" style={{ background: 'rgba(15,15,15,0.85)' }}>
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
          <h2 className="section-heading">EDUCATION</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-500/40 to-transparent" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">

          {/* Academic background */}
          <div>
            <p className="font-pixel text-gray-600 text-xs tracking-widest mb-8">
              ── ACADEMIC RECORD
            </p>
            <div className="space-y-4">
              {EDUCATION_ITEMS.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  className="arcade-card p-6 flex items-center gap-6 group"
                >
                  {edu.isUC && (
                    <div
                      className="flex-shrink-0 bg-white rounded p-1.5 group-hover:scale-105 transition-transform"
                      style={{ border: '1px solid rgba(255,34,68,0.3)' }}
                    >
                      <img src={ucLogo} alt="UC Logo" className="w-10 h-10 object-contain" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-pixel text-white text-xs tracking-wide mb-1">
                      {edu.institution}
                    </h4>
                    <p className="font-mono text-primary-400 text-sm mb-2">{edu.degree}</p>
                    <span className="font-mono text-gray-500 text-xs">{edu.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Honors */}
          <div>
            <p className="font-pixel text-gray-600 text-xs tracking-widest mb-8">
              ── HONORS & AWARDS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HONORS.map((honor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  className="arcade-card p-4 flex items-center gap-4"
                >
                  <FaAward
                    className="text-accent-500 flex-shrink-0 text-2xl"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,224,0,0.5))' }}
                  />
                  <div>
                    <p className="font-mono text-white text-sm font-bold">{honor.title}</p>
                    {honor.issuer && (
                      <p className="font-mono text-gray-500 text-xs">{honor.issuer}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <p className="font-pixel text-gray-600 text-xs tracking-widest mb-8">
              ── CERTIFICATES UNLOCKED
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATES.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 group transition-all duration-150"
                  style={{
                    border: '1px solid rgba(255,34,68,0.2)',
                    background: 'rgba(255,34,68,0.03)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,224,0,0.4)'
                    e.currentTarget.style.background   = 'rgba(255,224,0,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,34,68,0.2)'
                    e.currentTarget.style.background   = 'rgba(255,34,68,0.03)'
                  }}
                >
                  <span className="font-pixel text-primary-500 flex-shrink-0" style={{ fontSize: '10px' }}>
                    ✦
                  </span>
                  <div>
                    <p className="font-mono text-gray-200 text-xs font-medium">{cert.title}</p>
                    {cert.issuer && (
                      <p className="font-mono text-gray-600 text-xs">{cert.issuer}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Education

