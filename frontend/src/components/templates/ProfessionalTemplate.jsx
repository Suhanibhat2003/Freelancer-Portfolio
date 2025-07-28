import React, { useRef } from 'react';

function ProfessionalTemplate({ portfolio, projects }) {
  const { customization = {}, hero = {}, about = {}, contact = {}, experience = [], certifications = [] } = portfolio;
  const spacing = {
    comfortable: 'py-20',
    compact: 'py-12',
    spacious: 'py-32'
  }[customization.spacing || 'comfortable'];

  // Ref for contact section
  const contactRef = useRef(null);
  const handleContactMe = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ fontFamily: customization.fontFamily, background: '#f3f4f6', color: '#1e293b' }}>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center px-4 bg-gradient-to-br from-blue-100 to-white">
        <h1 className="text-5xl font-extrabold mb-3" style={{ color: customization.primaryColor }}>{hero.title}</h1>
        <p className="text-2xl mb-6" style={{ color: customization.secondaryColor }}>{hero.subtitle}</p>
        <button className="px-8 py-3 rounded-lg font-semibold shadow" style={{ backgroundColor: customization.primaryColor, color: '#fff' }} onClick={handleContactMe}>{hero.ctaText}</button>
      </section>

      {/* About Section */}
      {(about.title || about.bio || (about.skills && about.skills.length > 0)) && (
        <section className={`${spacing} bg-white`}> 
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: customization.primaryColor }}>{about.title || 'About Me'}</h2>
            {about.bio && <p className="text-lg text-gray-700 mb-4 text-center">{about.bio}</p>}
            {about.skills && about.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {about.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm rounded-full bg-blue-100 border border-blue-200 text-gray-800">{skill}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section className={`${spacing} bg-white`}> 
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: customization.primaryColor }}>Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="bg-white border-2 border-blue-100 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
                {project.image && <img src={project.image} alt={project.title} className="w-40 h-40 object-cover rounded-lg" />}
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: customization.primaryColor }}>{project.title}</h3>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  <div className="flex gap-4">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline" style={{ color: customization.primaryColor }}>GitHub</a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline" style={{ color: customization.primaryColor }}>Live Demo</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className={`${spacing} bg-blue-50`}> 
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: customization.primaryColor }}>Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-100 rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-1" style={{ color: customization.primaryColor }}>{exp.title}</h3>
                  <p className="text-gray-600 mb-1">{exp.company} {exp.location && <>| {exp.location}</>}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} -
                    {exp.current ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString()}` : ''}
                  </p>
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded bg-blue-100 border border-blue-200" style={{ color: customization.primaryColor }}>{tech}</span>
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
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: customization.primaryColor }}>Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, idx) => (
                <div key={idx} className="bg-blue-50 border-2 border-blue-100 rounded-xl shadow p-6">
                  <h3 className="text-lg font-bold mb-1" style={{ color: customization.primaryColor }}>{cert.name}</h3>
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

      {/* Contact Section */}
      {contact && (
        <section ref={contactRef} className={`${spacing} bg-blue-50`}> 
          <div className="max-w-5xl mx-auto px-4">
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
      )}
    </div>
  );
}

export default ProfessionalTemplate; 