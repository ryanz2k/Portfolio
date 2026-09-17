import { useState, useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import ArcadeBackground from './components/ArcadeBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { NAV_ITEMS } from './data/navigation'

import BootScreen from './components/fx/BootScreen'
import ScrollProgress from './components/fx/ScrollProgress'
import SectionRail from './components/fx/SectionRail'
import TechMarquee from './components/fx/TechMarquee'

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

const MARQUEE_TOP = [
  'REACT', 'TYPESCRIPT', 'NODE.JS', 'NEXT.JS', 'MONGODB', 'PRISMA', 'TAILWIND',
]
const MARQUEE_MID = [
  'SHOPIFY', 'WORDPRESS', 'FIREBASE', 'UNITY', 'EXPRESS', 'RAILWAY', 'VITE',
]

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  // A band across the middle of the viewport decides which section is current:
  // whichever section is crossing it wins. Simpler and steadier than measuring
  // offsets on every scroll event.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // The last section can end above the band once the page bottoms out.
    const pinLastSection = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
      if (atBottom) setActiveSection(SECTION_IDS[SECTION_IDS.length - 1])
    }

    window.addEventListener('scroll', pinLastSection, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', pinLastSection)
    }
  }, [])

  return (
    <div className="min-h-screen bg-arcade-bg">
      <BootScreen />
      <CustomCursor />
      <ArcadeBackground />

      {/* Everything above the canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar activeSection={activeSection} />
        <ScrollProgress />
        <SectionRail sections={NAV_ITEMS} activeSection={activeSection} />

        <main>
          <Hero />
          <TechMarquee items={MARQUEE_TOP} />
          <About />
          <Experience />
          <Projects />
          <TechMarquee items={MARQUEE_MID} reverse />
          <Skills />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
