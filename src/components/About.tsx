const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          About
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            In the dynamic landscape of technology, where chaos meets creativity, I've dedicated my career to transforming intricate challenges into streamlined solutions. My journey has taken me from engineering boots-on-the-ground at <span className="font-semibold text-gray-900">McKinsey & Company</span> to leading innovative teams at <span className="font-semibold text-gray-900">Gojek</span> and now steering engineering at <a href="https://www.realfast.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">realfast.ai</a>.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            At the heart of my work is the belief that technology is not just about solving problems—it's about unlocking potential. Whether improving operational efficiencies, enhancing team dynamics, or pioneering new AI capabilities, my drive comes from seeing tangible impacts: teams that thrive on collaboration, products that lead markets, and businesses that achieve unprecedented scalability.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
