import React, { useRef } from 'react';

function ModernTemplate({ portfolio, projects }) {
  const { customization = {}, hero = {}, about = {}, contact = {}, experience = [], certifications = [] } = portfolio;
  const spacing = {
    comfortable: 'py-20',
    compact: 'py-12',
    spacious: 'py-32'
  }[customization.spacing || 'comfortable'];

  // Refs for sections
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const handleViewWork = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactMe = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ fontFamily: customization.fontFamily }}>
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative"
        style={{
          background: hero.background?.type === 'gradient'
            ? `linear-gradient(${hero.background.gradient.direction}, ${hero.background.gradient.from}, ${hero.background.gradient.to})`
            : hero.background?.type === 'image'
            ? `url(${hero.background.image}) center/cover no-repeat`
            : hero.background?.color || '#808080'
        }}
      >
        {hero.background?.type === 'image' && hero.background?.overlay && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, ' + (hero.background.overlayOpacity || 0.5) + ')' }}
          />
        )}
        <div className="text-center text-white z-10 relative">
          <h1 className="text-5xl font-bold mb-4">{hero.title}</h1>
          <p className="text-xl mb-8">{hero.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <button
              className="px-8 py-3 rounded-lg transition duration-300"
              style={{ backgroundColor: customization.primaryColor, color: '#fff' }}
              onClick={handleViewWork}
            >
              {hero.ctaText}
            </button>
            <button
              className="px-8 py-3 rounded-lg transition duration-300 border-2"
              style={{ borderColor: '#fff', color: '#fff' }}
              onClick={handleContactMe}
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      {(about.title || about.bio || (about.skills && about.skills.length > 0)) && (
        <section className={`${spacing} bg-white`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: customization.primaryColor }}>{about.title || 'About Me'}</h2>
            {about.bio && <p className="text-lg text-gray-700 mb-4 text-center">{about.bio}</p>}
            {about.skills && about.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {about.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm rounded-full bg-gray-100 border border-gray-200 text-gray-800">{skill}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section ref={projectsRef} className={`${spacing} bg-white`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: customization.primaryColor }}>Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {project.image && (
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: customization.primaryColor }}>GitHub</a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: customization.primaryColor }}>Live Demo</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className={`${spacing} bg-gray-50`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: customization.primaryColor }}>Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold mb-1" style={{ color: customization.primaryColor }}>{exp.title}</h3>
                  <p className="text-gray-600 mb-1">{exp.company} {exp.location && <>| {exp.location}</>}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} -
                    {exp.current ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString()}` : ''}
                  </p>
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded bg-gray-100 border border-gray-200" style={{ color: customization.primaryColor }}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className={`${spacing} bg-white`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: customization.primaryColor }}>Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: customization.primaryColor }}>{cert.name}</h3>
                  <p className="text-gray-600 mb-1">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : 'N/A'}
                    {cert.expiryDate && ` - Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                  </p>
                  <p className="text-gray-700 mb-2">{cert.description}</p>
                  {cert.credentialURL && (
                    <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: customization.primaryColor }}>Verify Credential</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - Always rendered */}
      <section ref={contactRef} className={`${spacing} bg-gray-50`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: customization.primaryColor }}>Get in Touch</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="text-lg font-medium hover:underline" style={{ color: customization.primaryColor }}>Email: {contact.email}</a>
            )}
            {contact.phone && (
              <span className="text-lg font-medium" style={{ color: customization.primaryColor }}>Phone: {contact.phone}</span>
            )}
            {contact.location && (
              <span className="text-lg font-medium" style={{ color: customization.primaryColor }}>Location: {contact.location}</span>
            )}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-75 transition duration-300" style={{ color: customization.primaryColor }}>GitHub</a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-75 transition duration-300" style={{ color: customization.primaryColor }}>LinkedIn</a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModernTemplate; 