import { motion } from 'framer-motion'
import { FaLaptopCode, FaServer, FaShoppingCart } from 'react-icons/fa'

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-300 leading-relaxed space-y-6"
          >
            <p className="text-lg">
              I'm a passionate <span className="text-primary-400 font-semibold">Full Stack Developer</span> and an Information Technology graduate from the University of Cebu – Banilad. My core focus lies in engineering <span className="text-primary-400 font-semibold">modern web applications</span>, designing robust system architectures, and delivering seamless database integrations.
            </p>

            <p className="text-lg">
              With a strong foundation in both frontend and backend technologies, I've developed custom <span className="text-primary-400 font-semibold">full-stack systems</span> from the ground up. Professionally, I also bring experience managing high-traffic <span className="text-primary-400 font-semibold">e-commerce platforms</span>, handling complex Shopify integrations, and delivering highly tailored web solutions for clients.
            </p>

            <div className="pt-4 flex items-center space-x-4">
              <div className="h-px bg-gray-700 flex-grow"></div>
              <p className="text-gray-400 italic">Looking for new challenges</p>
              <div className="h-px bg-gray-700 flex-grow"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Cards for visual appeal */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-colors group">
              <FaLaptopCode className="text-4xl text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">Web Dev</h3>
              <p className="text-gray-400 text-sm">Building scalable, responsive, and modern frontends.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-colors group">
              <FaServer className="text-4xl text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">Systems</h3>
              <p className="text-gray-400 text-sm">Developing robust backends and API integrations.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-colors group sm:col-span-2">
              <FaShoppingCart className="text-4xl text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">E-Commerce</h3>
              <p className="text-gray-400 text-sm">Specializing in Shopify, WordPress, and custom online stores.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
