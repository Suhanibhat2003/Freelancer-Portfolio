import React from 'react';

function ElegantTemplate({ portfolio, projects }) {
  const { hero = {}, about = {}, contact = {}, experience = [], certifications = [], customization = {} } = portfolio;
  return (
    <div style={{ fontFamily: '"Playfair Display", Georgia, serif', background: '#f5f0eb', color: '#222', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="w-full px-8 py-12 border-b border-gray-300 relative bg-[#f5f0eb]">
        <div className="absolute inset-0 pointer-events-none">
          {/* Geometric lines and shapes */}
          <svg width="100%" height="100%" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 100 Q 360 0 720 100 T 1440 100" stroke="#d6cfc7" strokeWidth="2" fill="none" />
            <circle cx="1200" cy="60" r="40" stroke="#d6cfc7" strokeWidth="2" fill="none" />
            <circle cx="200" cy="120" r="30" stroke="#d6cfc7" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 uppercase" style={{ letterSpacing: '0.04em' }}>{hero.title || 'Your Name'}</h1>
          <div className="text-lg md:text-2xl italic mb-4 tracking-wide">{hero.subtitle || 'Your Role'}</div>
          <div className="max-w-2xl text-center text-base md:text-lg mb-6 opacity-80">{hero.description || 'Presentations are communication tools that can be used as demonstrations, lectures, speeches, reports, and more.'}</div>
          <div className="flex gap-4 items-center mb-2">
            {contact.email && <span className="text-sm opacity-70">{contact.email}</span>}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: About, Experience */}
        <div>
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">About Me</h2>
          <div className="mb-8 text-lg leading-relaxed">{about.bio || 'Add your bio here.'}</div>
          <h2 className="text-2xl font-bold mb-4 mt-10">Experience</h2>
          <div className="space-y-6">
            {experience.length === 0 && <div className="text-gray-500">No experience added yet.</div>}
            {experience.map((exp, idx) => (
              <div key={idx} className="bg-white/80 rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-xl">{exp.title}</span>
                  <span className="text-sm text-gray-500">{exp.startDate ? new Date(exp.startDate).toLocaleDateString() : ''} - {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ''}</span>
                </div>
                <div className="text-gray-600 text-base mb-1">{exp.company}{exp.location && ` | ${exp.location}`}</div>
                <div className="text-gray-700 text-base">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Projects, Certifications, Contact */}
        <div>
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Projects</h2>
          <div className="space-y-6 mb-10">
            {projects && projects.length > 0 ? projects.map((project, idx) => (
              <div key={idx} className="bg-white/80 rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="font-semibold text-xl mb-1">{project.title}</div>
                <div className="text-gray-700 text-base">{project.description}</div>
              </div>
            )) : <div className="text-gray-500">No projects added yet.</div>}
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-10">Certifications</h2>
          <div className="space-y-6 mb-10">
            {certifications && certifications.length > 0 ? certifications.map((cert, idx) => (
              <div key={idx} className="bg-white/80 rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="font-semibold text-lg mb-1">{cert.name}</div>
                <div className="text-gray-600 text-base mb-1">{cert.issuer}</div>
                <div className="text-gray-500 text-sm">{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : ''}</div>
              </div>
            )) : <div className="text-gray-500">No certifications added yet.</div>}
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-10">Contact</h2>
          <div className="space-y-2 text-lg">
            {contact.email && <div>Email: <span className="font-medium">{contact.email}</span></div>}
            {contact.phone && <div>Phone: <span className="font-medium">{contact.phone}</span></div>}
            {contact.location && <div>Location: <span className="font-medium">{contact.location}</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElegantTemplate; 