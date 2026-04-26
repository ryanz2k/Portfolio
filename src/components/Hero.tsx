import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import profileImg from '../assets/profile.jpg'

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-4"
            >
              John Ryan Gomez
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-400 mb-2 font-light tracking-wide"
            >
              BSIT Graduate
            </motion.p>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-primary-400 font-medium mb-8 tracking-wide"
            >
              Web Developer | E-Commerce Specialist | Software Engineer
            </motion.p>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 max-w-xl mx-auto md:mx-0 mb-12 leading-relaxed"
            >
              I build web applications and work on e-commerce platforms. Always learning 
              and looking for new challenges.
            </motion.p>
          
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center md:justify-start space-x-6"
            >
              <a
                href="https://github.com/ryanz2k"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={32} />
              </a>
              <a
                href="https://www.linkedin.com/in/ryanz2k/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="mailto:JohnRyanGomez812@gmail.com"
                className="text-gray-400 hover:text-primary-400 hover:scale-110 transition-all"
                aria-label="Email"
              >
                <FaEnvelope size={32} />
              </a>
            </motion.div>
          
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 mb-8 md:mb-0"
            >
              <a
                href="#contact"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-500 hover:scale-105 transition-all shadow-lg hover:shadow-primary-500/50"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-primary-500/40 rounded-full blur-3xl"></div>
            <img 
              src={profileImg}
              alt="John Ryan Gomez" 
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-gray-800 shadow-2xl z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
