import { FaGraduationCap, FaCalendarAlt, FaAward } from 'react-icons/fa'
import { motion } from 'framer-motion'
import ucLogo from '../assets/uc-logo.png'

interface EducationItem {
  institution: string
  degree: string
  period: string
}

interface Award {
  title: string
  issuer?: string
}

const Education = () => {
  const education: EducationItem[] = [
    {
      institution: 'University of Cebu - Banilad',
      degree: 'Bachelor of Science in Information Technology',
      period: '2022 - 2026'
    },
    {
      institution: 'University of Cebu - Pri',
      degree: 'Senior High School',
      period: '2015 - 2021'
    }
  ]

  const certificates: Award[] = [
    { title: 'NC II Certificate (Computer Systems Servicing)' },
    { title: 'Get Connected', issuer: 'Cisco' },
    { title: 'Introduction to IoT', issuer: 'Cisco' },
    { title: 'Introduction to Cybersecurity', issuer: 'Cisco' },
    { title: 'Entrepreneurship', issuer: 'Cisco' },
    { title: 'Introduction to Packet Tracer', issuer: 'Cisco' },
    { title: 'Networking Essentials', issuer: 'Cisco' },
    { title: 'CCNA: Switching, Routing, and Wireless Essentials', issuer: 'Cisco' }
  ]

  const honors: Award[] = [
    { title: 'High Honors' },
    { title: "Dean's Lister", issuer: '4x' }
  ]

  return (
    <section id="education" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Education</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Education */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Academic Background</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:shadow-primary-500/10 transition-all border border-gray-700 hover:border-primary-500/50 group"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="bg-primary-500/10 p-4 rounded-xl border border-primary-500/20 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all">
                        {edu.institution.includes('University of Cebu') ? (
                          <img
                            src={ucLogo}
                            alt="UC Logo"
                            className="w-12 h-12 object-contain bg-white rounded p-1"
                          />
                        ) : null}
                        <FaGraduationCap className={`text-primary-400 text-2xl ${edu.institution.includes('University of Cebu') ? 'hidden' : ''}`} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xl font-bold text-gray-100 mb-2">{edu.institution}</h4>
                      <p className="text-lg text-primary-400 font-semibold mb-3">{edu.degree}</p>
                      <div className="flex items-center text-gray-400">
                        <FaCalendarAlt className="mr-2" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/80 transition-colors border border-gray-700 hover:border-primary-500/40"
                >
                  <div className="flex items-center h-full">
                    <FaAward className="text-primary-400 mr-3 flex-shrink-0 text-xl" />
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-100 font-medium">{cert.title}</p>
                      {cert.issuer && (
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Honors & Awards */}
          <div>
            <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Honors & Awards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {honors.map((honor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/80 transition-colors border border-gray-700 hover:border-primary-500/40"
                >
                  <div className="flex items-center h-full">
                    <FaAward className="text-primary-400 mr-3 flex-shrink-0 text-xl" />
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-100 font-medium">{honor.title}</p>
                      {honor.issuer && (
                        <p className="text-sm text-gray-400">{honor.issuer}</p>
                      )}
                    </div>
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
