import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaLaptopCode, FaServer, FaShoppingCart } from 'react-icons/fa'
import SectionShell from './fx/SectionShell'
import TiltCard from './fx/TiltCard'
import Reveal from './fx/Reveal'
import { useParallaxY } from '../hooks/useMotionFX'

const ABOUT_CARDS = [
  {
    icon: <FaLaptopCode />,
    title: 'Web Dev',
    description: 'Building scalable, responsive, and modern full-stack web apps from the ground up.',
  },
  {
    icon: <FaServer />,
    title: 'Systems',
    description: 'Designing robust backends, REST APIs, and database integrations.',
  },
  {
    icon: <FaShoppingCart />,
    title: 'E-Commerce',
    description: 'Shopify, WordPress, Google Ads & Analytics — high-traffic platform management.',
  },
]

const About = () => {
  const columnsRef = useRef<HTMLDivElement>(null)

  // The two columns travel at different rates, which is what sells the depth.
  const bioY = useParallaxY(columnsRef, 34)
  const cardsY = useParallaxY(columnsRef, -30)

  return (
    <SectionShell id="about" number="01" title="ABOUT ME" tone="dim">
      <div ref={columnsRef} className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">

        {/* Bio */}
        <motion.div className="space-y-6" style={{ y: bioY }}>
          <Reveal from="left" distance={36}>
            <p className="font-mono text-sm leading-relaxed text-gray-300">
              I&apos;m a{' '}
              <span className="font-bold text-primary-400">Full Stack Developer</span>{' '}
              and Information Technology graduate from the{' '}
              <span className="text-accent-500">University of Cebu – Banilad</span>.
              My core focus lies in engineering modern web applications, designing
              robust system architectures, and delivering seamless database integrations.
            </p>
          </Reveal>

          <Reveal from="left" distance={36} delay={0.12}>
            <p className="font-mono text-sm leading-relaxed text-gray-300">
              With a strong foundation in both frontend and backend technologies, I&apos;ve
              developed custom{' '}
              <span className="font-bold text-primary-400">full-stack systems</span>{' '}
              from scratch. Professionally, I also bring experience managing high-traffic{' '}
              <span className="font-bold text-primary-400">e-commerce platforms</span>,
              handling complex Shopify integrations, and delivering highly tailored web
              solutions for clients.
            </p>
          </Reveal>

          <Reveal from="left" distance={36} delay={0.24}>
            <div className="relative flex items-center gap-4 py-4 pl-4">
              {/* Rule draws itself downward as the quote arrives */}
              <motion.span
                className="absolute left-0 top-0 w-[3px] origin-top bg-primary-500"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: '100%' }}
              />
              <p className="font-mono text-xs italic text-gray-500">
                // Always learning. Always shipping.
              </p>
            </div>
          </Reveal>
        </motion.div>

        {/* Capability cards */}
        <motion.div className="grid grid-cols-1 gap-4" style={{ y: cardsY }}>
          {ABOUT_CARDS.map(({ icon, title, description }, i) => (
            <Reveal key={title} from="right" distance={40} delay={i * 0.12}>
              <TiltCard max={6}>
                <div className="arcade-card group flex items-start gap-5 p-6">
                  <motion.div
                    className="mt-0.5 flex-shrink-0 text-3xl text-primary-500"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,34,68,0.5))' }}
                    whileHover={{ scale: 1.2, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    {icon}
                  </motion.div>
                  <div>
                    <h3 className="mb-2 font-pixel text-xs tracking-wider text-white">{title}</h3>
                    <p className="font-mono text-xs leading-relaxed text-gray-400">{description}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default About
