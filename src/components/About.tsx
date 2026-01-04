const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto text-gray-300 leading-relaxed">
            <p className="text-lg mb-6">
              I am a motivated Information Technology student at the University of Cebu – Banilad, 
              with a passion for creating innovative solutions through web development, system 
              development, and database integration.
            </p>
            
            <p className="text-lg mb-6">
              With hands-on experience gained through academic projects and professional work, 
              I have developed expertise in building scalable web applications, managing 
              e-commerce platforms, and optimizing digital experiences. My journey includes 
              working as an E-Commerce Specialist with Shopify integrations and serving as a 
              WordPress Developer for diverse professional clients.
            </p>
            
            <p className="text-lg">
              I am actively seeking opportunities to apply my technical skills, learn from 
              industry professionals, and contribute meaningfully to forward-thinking companies 
              while taking on new challenges that drive my growth as a developer.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
