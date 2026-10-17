import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaLaptopCode, FaServer, FaShoppingCart } from 'react-icons/fa'
import SectionShell from './fx/SectionShell'
import Reveal from './fx/Reveal'
import Panel from './p5/Panel'
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

const CARD_TILTS = [-2, 1.5, -1]
const CARD_CUTS = ['a', 'c', 'b'] as const

/** Red highlighter swipe behind a key phrase. */
const Mark = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-p5-red px-1 font-semibold text-white">{children}</span>
)

const About = () => {
  const columnsRef = useRef<HTMLDivElement>(null)

  // The two columns travel at different rates, which is what sells the depth.
  const bioY = useParallaxY(columnsRef, 30)
  const cardsY = useParallaxY(columnsRef, -26)

  return (
    <SectionShell id="about" number="01" title="ABOUT ME" kicker="Confidant profile" tone="black">
      <div ref={columnsRef} className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">

        {/* Bio */}
        <motion.div style={{ y: bioY }}>
          <Reveal from="left" distance={60}>
            <div className="-rotate-1">
              <Panel tone="white" cut="a" shadow="red" interactive={false} className="halftone p-7 md:p-9">
                <div className="space-y-5 font-body text-base leading-relaxed md:text-lg">
                  <p>
                    I&apos;m a <Mark>Full Stack Developer</Mark> and Information Technology
                    graduate from the{' '}
                    <span className="font-bold text-p5-red">University of Cebu – Banilad</span>.
                    My core focus lies in engineering modern web applications, designing
                    robust system architectures, and delivering seamless database integrations.
                  </p>
                  <p>
                    With a strong foundation in both frontend and backend technologies, I&apos;ve
                    developed custom <Mark>full-stack systems</Mark> from scratch. Professionally,
                    I also bring experience managing high-traffic{' '}
                    <Mark>e-commerce platforms</Mark>, handling complex Shopify integrations, and
                    delivering highly tailored web solutions for clients.
                  </p>
                </div>
              </Panel>
            </div>
          </Reveal>

          {/* Motto in a jagged speech bubble */}
          <Reveal from="scale" delay={0.25}>
            <div className="mt-10 inline-block rotate-[-4deg]" style={{ filter: 'drop-shadow(5px 5px 0 #E60012)' }}>
              <p
                className="bg-p5-ink px-8 py-4 font-display text-2xl uppercase tracking-wide text-white md:text-3xl"
                style={{ clipPath: 'polygon(0 10%, 100% 0, 97% 82%, 30% 86%, 14% 100%, 16% 86%, 3% 90%)', paddingBottom: '2rem' }}
              >
                Always learning. Always shipping.
              </p>
            </div>
          </Reveal>
        </motion.div>

        {/* Capability cards */}
        <motion.div className="grid grid-cols-1 gap-7" style={{ y: cardsY }}>
          {ABOUT_CARDS.map(({ icon, title, description }, i) => (
            <Reveal key={title} from="right" distance={80} delay={i * 0.1}>
              <div style={{ transform: `rotate(${CARD_TILTS[i]}deg)` }}>
                <Panel tone="red" cut={CARD_CUTS[i]} shadow="white" className="flex items-start gap-5 p-6">
                  <span className="cut-b flex h-14 w-14 flex-shrink-0 items-center justify-center bg-p5-ink text-2xl text-white transition-transform duration-150 group-hover/panel:-rotate-12 group-hover/panel:scale-110">
                    {icon}
                  </span>
                  <div>
                    <h3 className="mb-1 font-display text-3xl uppercase tracking-wide">{title}</h3>
                    <p className="font-body text-sm leading-relaxed text-white/90">{description}</p>
                  </div>
                </Panel>
              </div>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default About
