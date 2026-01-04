import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a conversation about technology. Feel free to reach out!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FaEnvelope className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:JohnRyanGomez812@gmail.com"
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    JohnRyanGomez812@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FaPhone className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                  <a
                    href="tel:09760656704"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    0976 065 6704
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 md:col-span-2">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-700">
                    Magsaysay St., Suba, Cebu City 6000
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Connect with me
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/ryanz2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ryanz2k/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="mailto:JohnRyanGomez812@gmail.com"
                  className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
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

