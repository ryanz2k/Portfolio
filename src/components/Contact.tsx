import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a conversation about technology. Feel free to reach out!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-500/20 p-3 rounded-lg border border-primary-500/30">
                  <FaEnvelope className="text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">Email</h3>
                  <a
                    href="mailto:JohnRyanGomez812@gmail.com"
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    JohnRyanGomez812@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-500/20 p-3 rounded-lg border border-primary-500/30">
                  <FaPhone className="text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">Phone</h3>
                  <a
                    href="tel:09760656704"
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    0976 065 6704
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 text-center">
                Connect with me
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/ryanz2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-gray-300 p-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors border border-gray-600"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ryanz2k/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-gray-300 p-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors border border-gray-600"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="mailto:JohnRyanGomez812@gmail.com"
                  className="bg-gray-700 text-gray-300 p-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors border border-gray-600"
                  aria-label="Email"
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
