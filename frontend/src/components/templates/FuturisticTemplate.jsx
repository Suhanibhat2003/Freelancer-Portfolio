import React, { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { MdPsychology } from 'react-icons/md';

function FuturisticTemplate({ portfolio, projects }) {
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
    <div style={{ fontFamily: customization.fontFamily || 'Inter, sans-serif' }} className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-black">
        {/* Pink accent shape */}
        <div className="absolute top-0 left-0 w-full h-1/2 z-0" style={{ background: 'linear-gradient(120deg, #FAA5BB 0%, #FAA5BB 100%)', clipPath: 'ellipse(70% 40% at 50% 0%)' }} />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center gap-8 text-center py-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg mt-10">{hero.title}</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white/90">{hero.subtitle}</h2>
          <p className="text-base md:text-lg mb-4 text-white/80 max-w-xl mx-auto">{hero.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
            <button
              onClick={handleViewWork}
              className="px-8 py-3 rounded-lg font-semibold bg-[#FAA5BB] hover:bg-pink-700 text-white shadow-lg transition-all duration-300 mb-2 sm:mb-0"
            >
              {hero.ctaText}
            </button>
            <button
              onClick={handleContactMe}
              className="px-8 py-3 rounded-lg font-semibold border border-[#FAA5BB] text-[#FAA5BB] hover:bg-[#FAA5BB] hover:text-white transition-all duration-300"
            >
              Contact Me
            </button>
          </div>
          {/* Social Links below buttons */}
          {(contact.linkedin || contact.github) && (
            <div className="flex gap-6 justify-center mt-6">
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#FAA5BB] transition-colors" title="GitHub">
                  <FaGithub />
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#FAA5BB] transition-colors" title="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
            </div>
          )}
          {about.image && (
            <div className="flex items-center justify-center mt-8">
              <div className="rounded-full border-8 border-[#FAA5BB] shadow-xl overflow-hidden w-64 h-64 bg-white">
                <img src={about.image} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className={`${spacing} bg-white text-black`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {about.image && (
              <div className="flex-shrink-0">
                <div className="rounded-full border-8 border-[#FAA5BB] shadow-xl overflow-hidden w-40 h-40 bg-white">
                  <img src={about.image} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FAA5BB' }}>{about.title}</h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-800">{about.bio}</p>
              {about.skills && about.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {about.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-pink-100 text-[#FAA5BB] border border-pink-200 font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className={`${spacing} bg-black text-white`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: '#FAA5BB' }}>Projects</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-[#FAA5BB] transition-all duration-300 shadow-lg"
              >
                {project.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-pink-100 text-[#FAA5BB] border border-pink-200 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#FAA5BB] hover:text-pink-300 transition-colors">
                        <FaGithub className="text-xl" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#FAA5BB] hover:text-pink-300 transition-colors">
                        <FaGlobe className="text-xl" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className={`${spacing} bg-white text-black`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: '#FAA5BB' }}>Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow p-6 border border-pink-100">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#FAA5BB' }}>{exp.title}</h3>
                  <p className="text-gray-700 mb-1">{exp.company} {exp.location && <>| {exp.location}</>}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} -
                    {exp.current ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString()}` : ''}
                  </p>
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded bg-pink-100 border border-pink-200 text-[#FAA5BB]">{tech}</span>
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
        <section className={`${spacing} bg-white text-black`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: '#FAA5BB' }}>Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow p-6 border border-pink-100">
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#FAA5BB' }}>{cert.name}</h3>
                  <p className="text-gray-700 mb-1">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : 'N/A'}
                    {cert.expiryDate && ` - Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                  </p>
                  <p className="text-gray-700 mb-2">{cert.description}</p>
                  {cert.credentialURL && (
                    <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: '#FAA5BB' }}>Verify Credential</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section ref={contactRef} className={`${spacing} bg-white text-black`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: '#FAA5BB' }}>Get in Touch</h2>
            <div className={`grid ${contact.location ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-8 justify-center`}>
              <div className="bg-gray-100 rounded-2xl p-8 border" style={{ borderColor: '#FAA5BB22' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#FAA5BB' }}>Contact Information</h3>
                <div className="space-y-4">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 text-gray-800 hover:text-[#FAA5BB] transition-colors"
                    >
                      <FaEnvelope className="" style={{ color: '#FAA5BB' }} />
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <span className="flex items-center gap-3 text-gray-800">
                      Phone: {contact.phone}
                    </span>
                  )}
                  {contact.website && (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-800 hover:text-[#FAA5BB] transition-colors"
                    >
                      <FaGlobe style={{ color: '#FAA5BB' }} />
                      Website
                    </a>
                  )}
                </div>
              </div>
              {contact.location && (
                <div className="bg-gray-100 rounded-2xl p-8 border" style={{ borderColor: '#FAA5BB22' }}>
                  <h3 className="text-xl font-bold mb-6" style={{ color: '#FAA5BB' }}>Location</h3>
                  <p className="text-gray-800">{contact.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FuturisticTemplate; 