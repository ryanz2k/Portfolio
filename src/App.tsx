import { useState, useEffect } from 'react'
import CustomCursor    from './components/CustomCursor'
import ArcadeBackground from './components/ArcadeBackground'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Experience from './components/Experience'
import Projects   from './components/Projects'
import Skills     from './components/Skills'
import Education  from './components/Education'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      const windowHeight   = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i]
        const element   = document.getElementById(sectionId)
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        const isLastSection = i === sectionIds.length - 1
        const isAtBottom    = scrollPosition + windowHeight >= documentHeight - 50

        if (isLastSection && (scrollPosition >= offsetTop || isAtBottom)) {
          setActiveSection(sectionId)
          break
        } else if (!isLastSection && scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-arcade-bg" style={{ cursor: 'none' }}>
      <CustomCursor />
      <ArcadeBackground />
      {/* All page content sits above the canvas background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar activeSection={activeSection} />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
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
