import React, { useRef } from 'react';

function MinimalTemplate({ portfolio, projects }) {
  const { customization = {}, hero = {}, about = {}, contact = {}, experience = [], certifications = [] } = portfolio;
  const spacing = {
    comfortable: 'py-20',
    compact: 'py-12',
    spacious: 'py-32'
  }[customization.spacing || 'comfortable'];

  // Pastel gradient for overlays
  const pastelGradient = 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)';
  const pastelBox = 'bg-gradient-to-br from-purple-100 via-blue-100 to-white';
  const accentGradient = 'linear-gradient(45deg, #e0c3fc 0%, #8ec5fc 50%, #e0c3fc 100%)';

  // Ref for projects section
  const projectsRef = useRef(null);

  const handleExploreProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ fontFamily: customization.fontFamily, background: '#f9fafb', color: '#222' }}>
      {/* Hero Section with extended background */}
      <div className="relative">
        <div className="absolute inset-0" style={{ background: pastelGradient }} />
        <div className="relative z-10">
          <section className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{hero.title}</h1>
              <p className="text-lg md:text-xl mb-6 text-white/90">{hero.subtitle}</p>
              <button 
                className="px-6 py-2 rounded border font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors" 
                style={{ borderColor: 'white', color: 'white' }}
                onClick={handleExploreProjects}
              >
                {hero.ctaText}
              </button>
            </div>
          </section>

          {/* About Section */}
          <section className={`${spacing} relative`}>
            <div className="absolute inset-0 bg-white" />
            <div className="relative z-10 max-w-5xl mx-auto px-4">
              <div className="w-full max-w-3xl mx-auto p-8 rounded-2xl shadow-xl border border-gray-200" style={{ background: accentGradient }}>
                <h2 className="text-2xl font-bold mb-4 text-center text-black">{about.title || 'About Me'}</h2>
                <p className="mb-4 text-black/90 text-center">{about.bio}</p>
                {about.skills && about.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {about.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 text-sm rounded-full bg-white/80 border border-white/20 text-gray-800">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section ref={projectsRef} className={`${spacing} relative`}>
            <div className="absolute inset-0 bg-gray-50" />
            <div className="relative z-10 max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#222' }}>Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <div key={project._id} className={`relative rounded-2xl shadow-xl border border-gray-200 p-6 overflow-hidden ${pastelBox}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-0" style={{ background: pastelGradient, borderRadius: '0 0 0 100px' }} />
                    <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center">
                      {project.image && <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded-xl shadow-lg" />}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1" style={{ color: '#222'}}>{project.title}</h3>
                        <p className="text-gray-600 mb-2">{project.description}</p>
                        <div className="flex gap-4 mt-2">
                          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline" style={{ color: '#222' }}>GitHub</a>}
                          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline" style={{ color: '#222'}}>Live Demo</a>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          {experience.length > 0 && (
            <section className={`${spacing} relative`}>
              <div className="absolute inset-0 bg-white" />
              <div className="relative z-10 max-w-5xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#222' }}>Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {experience.map((exp, idx) => (
                    <div key={idx} className={`relative rounded-2xl shadow-xl border border-gray-200 p-6 overflow-hidden ${pastelBox}`}>
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-20 z-0" style={{ background: pastelGradient, borderRadius: '0 0 0 80px' }} />
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#222' }}>{exp.title}</h3>
                      <p className="text-gray-600 mb-1">{exp.company} {exp.location && <>| {exp.location}</>}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} -
                        {exp.current ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString()}` : ''}
                      </p>
                      <p className="text-gray-700 mb-2">{exp.description}</p>
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-1 text-xs rounded-full bg-white/80 border border-gray-200 text-black">{tech}</span>
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
            <section className={`${spacing} relative`}>
              <div className="absolute inset-0 bg-gray-50" />
              <div className="relative z-10 max-w-5xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#222' }}>Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className={`relative rounded-2xl shadow-xl border border-gray-200 p-6 overflow-hidden ${pastelBox}`}>
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-20 z-0" style={{ background: pastelGradient, borderRadius: '0 0 0 80px' }} />
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#222' }}>{cert.name}</h3>
                      <p className="text-gray-600 mb-1">{cert.issuer}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : 'N/A'}
                        {cert.expiryDate && ` - Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                      </p>
                      <p className="text-gray-700 mb-2">{cert.description}</p>
                      {cert.credentialURL && (
                        <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: '#222' }}>Verify Credential</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Contact Section */}
          {contact && (
            <section className={`${spacing} relative`}>
              <div className="absolute inset-0 bg-white" />
              <div className="relative z-10 max-w-5xl mx-auto px-4">
                <div className="w-full max-w-3xl mx-auto p-8 rounded-2xl shadow-xl border border-gray-200" style={{ background: accentGradient }}>
                  <h2 className="text-2xl font-bold mb-8 text-center text-black">Get in Touch</h2>
                  <div className="flex flex-wrap justify-center gap-8">
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="text-lg font-medium hover:underline text-white">Email: {contact.email}</a>
                    )}
                    {contact.phone && (
                      <span className="text-lg font-medium text-white">Phone: {contact.phone}</span>
                    )}
                    {contact.location && (
                      <span className="text-lg font-medium text-white">Location: {contact.location}</span>
                    )}
                  </div>
                  <div className="flex justify-center gap-6 mt-6">
                    {contact.github && (
                      <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-75 transition duration-300 text-white">GitHub</a>
                    )}
                    {contact.linkedin && (
                      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl hover:opacity-75 transition duration-300 text-white">LinkedIn</a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default MinimalTemplate; 