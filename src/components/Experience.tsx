import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string[]
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'E-Commerce Specialist',
      company: 'Shopify & Google Integrations',
      period: '2023 - Present',
      description: [
        'Managed and optimized Shopify stores by integrating Google Ads, Merchant Center, and Analytics',
        'Troubleshot issues such as missing SKUs and disapproved products',
        'Implemented purchase conversion tracking to enhance campaign performance and ROI'
      ]
    },
    {
      title: 'WordPress Developer',
      company: 'Freelance',
      period: '2021 - Present',
      description: [
        'Managed, designed, and developed multiple WordPress websites for diverse professional clients',
        'Performed theme customization, plugin integration, SEO, and performance optimization',
        'Delivered solutions that meet specific business goals and requirements'
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FaBriefcase className="text-primary-600 text-xl" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                  <p className="text-xl text-primary-600 font-semibold mb-3">{exp.company}</p>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaCalendarAlt className="mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-primary-600 mr-2">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

