import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { HiCode } from 'react-icons/hi'

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 p-4 rounded-full">
                <HiCode className="text-white text-5xl" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            John Ryan Gomez
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            Information Technology Student
          </p>
          
          <p className="text-lg md:text-xl text-primary-600 font-medium mb-8">
            Web Developer | E-Commerce Specialist | Software Engineer
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Motivated academic achiever with hands-on experience in web development, 
            system development, and database integration. Eager to contribute 
            technical skills and learn from industry professionals.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/ryanz2k"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/ryanz2k/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href="mailto:JohnRyanGomez812@gmail.com"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={32} />
            </a>
          </div>
          
          <div className="mt-12">
            <a
              href="#contact"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

