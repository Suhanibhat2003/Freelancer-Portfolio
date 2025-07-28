import React from 'react';
import { MdCall, MdMail, MdLink, MdCode, MdLocationOn, MdPerson, MdWork, MdMemory, MdPsychology } from 'react-icons/md';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

function DarkTemplate({ portfolio, projects }) {
  const { hero = {}, about = {}, contact = {}, experience = [], certifications = [], customization = {} } = portfolio;
  const spacing = {
    comfortable: 'py-20',
    compact: 'py-12',
    spacious: 'py-32'
  }[customization.spacing || 'compact'];

  // Social links (add more as needed)
  const socials = [
    contact.twitter && { icon: <FaTwitter />, url: contact.twitter },
    contact.linkedin && { icon: <FaLinkedin />, url: contact.linkedin },
    contact.github && { icon: <FaGithub />, url: contact.github },
    contact.website && { icon: <FaGlobe />, url: contact.website },
  ].filter(Boolean);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative" style={{ fontFamily: customization.fontFamily || 'Inter, sans-serif', background: 'linear-gradient(120deg, #181e26 0%, #232b36 100%)' }}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-[#181e26] via-[#232b36] to-[#1a2230] opacity-90" style={{ pointerEvents: 'none' }} />
      {/* Top bar with social icons */}
      <div className="flex justify-end items-center px-8 pt-6 gap-4 text-gray-400 text-xl w-full z-10">
        {socials.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition drop-shadow-glow">
            {s.icon}
          </a>
        ))}
      </div>
      {/* Main card with glassmorphism and fade-in */}
      <div className="max-w-6xl w-full mx-auto mt-6 rounded-3xl shadow-2xl p-12 pb-16 border border-blue-900/40 bg-white/10 backdrop-blur-md z-10 animate-fadein text-lg md:text-xl" style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.45)' }}>
        {/* Avatar, name, subtitle, contact row */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-2 text-white uppercase drop-shadow-lg">{hero.title || 'Your Name'}</h1>
          <h2 className="text-2xl md:text-3xl font-medium text-blue-200 mb-5 tracking-widest drop-shadow">{hero.subtitle || 'Your Role'}</h2>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-lg mb-2">
            {contact.phone && <span className="flex items-center gap-1"><MdCall className="text-base" />{contact.phone}</span>}
            {contact.email && <span className="flex items-center gap-1"><MdMail className="text-base" />{contact.email}</span>}
            {contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition"><FaGithub className="text-base" />GitHub</a>}
            {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition"><FaLinkedin className="text-base" />LinkedIn</a>}
            {contact.website && <span className="flex items-center gap-1"><FaGlobe className="text-base" /><a href={contact.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.website.replace(/^https?:\/\//, '')}</a></span>}
          </div>
          {contact.location && (
            <div className="flex items-center gap-2 text-blue-300 text-lg mb-2"><MdLocationOn className="text-xl" />{contact.location}</div>
          )}
          <div className="w-full border-t border-gray-700 mt-4" />
        </div>
        {/* Main content: two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {/* Left column: About Me, Work Experience */}
          <div>
            {/* About Me */}
            <div className="mb-8">
              <h3 className="text-base font-bold mb-2 flex items-center gap-2 uppercase tracking-wider bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow"> <MdPerson className="text-lg text-blue-400" />About Me</h3>
              <p className="text-gray-200 text-lg leading-relaxed drop-shadow-sm">{about.bio || 'Summarise your career profile here.'}</p>
            </div>
            {/* Work Experience */}
            <div>
              <h3 className="text-base font-bold mb-2 flex items-center gap-2 uppercase tracking-wider bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow"><MdWork className="text-lg text-blue-400" />Work Experience</h3>
              {experience.length === 0 && <p className="text-gray-400 text-lg">No experience added yet.</p>}
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-6 rounded-xl bg-white/5 p-4 border border-blue-900/20 shadow-sm transition-all duration-200 hover:bg-blue-900/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-white text-lg">{exp.title}</span>
                    <span className="text-xs text-gray-400">{exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} - {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ''}</span>
                  </div>
                  <span className="text-xs text-gray-400 mb-1 block">{exp.company}{exp.location && ` | ${exp.location}`}</span>
                  <p className="text-gray-300 text-lg mb-1">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs rounded bg-blue-900/60 border border-blue-700 text-blue-200 shadow-sm">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Right column: Skills, Projects, Certifications */}
          <div>
            {/* Skills */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                <MdMemory className="text-2xl text-blue-400" />Skills
              </h3>
              {about.skills && about.skills.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {about.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-5 py-2 rounded-full bg-blue-900 text-blue-200 shadow-sm text-lg font-semibold border border-blue-700 hover:bg-blue-800 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-lg">No skills added yet.</p>
              )}
            </div>
            {/* Projects */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-wider bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow"><MdPsychology className="text-2xl text-blue-400" />Projects</h3>
              {projects && projects.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {projects.map((project, idx) => (
                    <div key={idx} className="bg-gray-800/80 rounded-xl p-5 border border-blue-900/30 shadow-md transition-all duration-200 hover:scale-[1.025] hover:border-blue-500/60 hover:shadow-blue-900/30">
                      <div className="font-semibold text-white text-lg mb-2">{project.title}</div>
                      <div className="text-gray-300 text-lg mb-2">{project.description}</div>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 text-xs rounded bg-blue-900/60 border border-blue-700 text-blue-200 shadow-sm">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-200 text-base">GitHub</a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-200 text-base">Live Demo</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-lg">No projects added yet.</p>
              )}
            </div>
            {/* Certifications */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-wider bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow"><MdCode className="text-2xl text-blue-400" />Certifications</h3>
              {certifications && certifications.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="bg-gray-900/80 rounded-xl p-4 border border-blue-900/30 shadow-sm">
                      <div className="font-semibold text-white text-lg mb-1">{cert.name}</div>
                      <div className="text-blue-200 text-lg mb-1">{cert.issuer}</div>
                      <div className="text-gray-400 text-lg mb-1">{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : ''}</div>
                      {cert.description && (
                        <div className="text-gray-300 text-base mb-1">{cert.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-lg">No certifications added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
        .drop-shadow-glow:hover {
          filter: drop-shadow(0 0 8px #2563ebcc);
        }
        .animate-fadein {
          animation: fadein 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

export default DarkTemplate; 