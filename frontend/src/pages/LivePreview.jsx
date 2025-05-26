import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';

function LivePreview() {
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const projectsRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching portfolio for username:', username);
        const response = await axios.get(`http://localhost:5000/api/portfolios/public/${username}`);
        console.log('Portfolio API response:', response.data);
        console.log('Hero section data:', response.data.portfolio.hero);
        
        if (!response.data.portfolio) {
          throw new Error('Portfolio data not found');
        }
        
        setPortfolio(response.data.portfolio);
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error('Error fetching portfolio:', error.response || error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load portfolio';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPortfolio();
    } else {
      setError('Username not provided');
      setLoading(false);
    }

    // Handle hash navigation after component mounts
    const handleHashNavigation = () => {
      if (window.location.hash === '#projects' && projectsRef.current) {
        const yOffset = -80; // Adjust this value based on your header height
        const element = projectsRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    // Call once on mount
    handleHashNavigation();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, [username]);

  const handleViewWork = () => {
    if (projectsRef.current) {
      const yOffset = -80; // Adjust this value based on your header height
      const element = projectsRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleDownload = () => {
    const element = portfolioRef.current;
    const opt = {
      margin: 1,
      filename: `${username}-portfolio.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    toast.info('Generating PDF, please wait...');
    
    html2pdf().set(opt).from(element).save()
      .then(() => {
        toast.success('Portfolio downloaded successfully!');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        toast.error('Failed to generate PDF. Please try again.');
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#4F3B78' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <div className="text-gray-600">Please make sure you have created a portfolio and made it public.</div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">No portfolio data available</div>
          <div className="text-gray-500">Please create and publish your portfolio first.</div>
        </div>
      </div>
    );
  }

  const { customization = {}, hero = {}, about = {}, contact = {}, experience = [], certifications = [] } = portfolio;
  const spacing = {
    comfortable: 'py-20',
    compact: 'py-12',
    spacious: 'py-32'
  }[customization.spacing || 'comfortable'];

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition duration-300 shadow-lg"
          style={{
            backgroundColor: customization?.primaryColor || '#4F3B78'
          }}
        >
          <FaDownload />
          <span>Download Portfolio</span>
        </button>
      </div>
      <div 
        ref={portfolioRef}
        style={{ 
          fontFamily: customization?.fontFamily || 'Inter',
          backgroundColor: portfolio?.theme === 'dark' ? '#1a1a1a' : '#ffffff',
          color: portfolio?.theme === 'dark' ? '#ffffff' : '#000000'
        }}
      >
        {/* Hero Section */}
        <section
          className={`relative min-h-screen flex items-center ${spacing}`}
          style={{
            background: (() => {
              console.log('Hero background data:', hero.background);
              const bg = hero.background || {};
              switch (bg.type) {
                case 'gradient':
                  return `linear-gradient(${bg.gradient?.direction || 'to bottom'}, ${bg.gradient?.from || '#4F3B78'}, ${bg.gradient?.to || '#6B4F9E'})`;
                case 'image':
                  return bg.image ? `url(${bg.image}) center/cover no-repeat` : '#808080';
                case 'color':
                default:
                  console.log('Using color:', bg.color);
                  return bg.color || '#808080';
              }
            })(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay for image backgrounds */}
          {hero.background?.type === 'image' && hero.background?.overlay && (
            <div 
              className="absolute inset-0 bg-black"
              style={{ opacity: hero.background.overlayOpacity || 0.5 }}
            ></div>
          )}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              {hero.subtitle}
            </p>
            <button
              onClick={handleViewWork}
              className="inline-block px-8 py-3 text-lg font-semibold rounded-lg transition duration-300"
              style={{
                backgroundColor: customization?.primaryColor || '#4F3B78',
                color: '#ffffff'
              }}
            >
              {hero.ctaText || 'View My Work'}
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className={spacing}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: customization?.primaryColor || '#4F3B78' }}>
                {about.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {about.image && (
                  <div className="relative">
                    <div className="absolute inset-0 transform translate-x-2 translate-y-2 rounded-lg" style={{ backgroundColor: customization?.primaryColor || '#4F3B78' }}></div>
                    <img
                      src={about.image}
                      alt="Profile"
                      className="relative z-10 w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
                <div className={about.image ? '' : 'md:col-span-2'}>
                  <div className="prose max-w-none" style={{ color: portfolio?.theme === 'dark' ? '#ffffff' : '#000000' }}>
                    <p className="text-lg mb-6">{about.bio}</p>
                    {about.skills && about.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {about.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-full"
                            style={{
                              backgroundColor: customization?.primaryColor || '#4F3B78',
                              color: '#ffffff'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className={spacing} style={{ backgroundColor: portfolio?.theme === 'dark' ? '#2d2d2d' : '#F5F3FF' }}>
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: customization?.primaryColor || '#4F3B78' }}>
                  Experience
                </h2>
                <div className="space-y-12">
                  {experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold mb-2" style={{ color: customization?.primaryColor || '#4F3B78' }}>
                          {exp.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {new Date(exp.startDate).toLocaleDateString()} - 
                          {exp.current ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString()}` : ''}
                        </p>
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2" style={{ color: customization?.primaryColor || '#4F3B78' }}>
                              Key Responsibilities:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {exp.responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-sm rounded"
                                style={{
                                  backgroundColor: '#F5F3FF',
                                  color: customization?.primaryColor || '#4F3B78'
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        <section className={spacing}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: customization?.primaryColor || '#4F3B78' }}>
                Certifications
              </h2>
              {(!certifications || certifications.length === 0) ? (
                <p className="text-center text-gray-500">No certifications added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-bold mb-2" style={{ color: customization?.primaryColor || '#4F3B78' }}>
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{cert.issuer}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : 'N/A'}
                        {cert.expiryDate && ` - Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                      </p>
                      {cert.description && (
                        <p className="text-gray-700 mb-4">{cert.description}</p>
                      )}
                      {cert.credentialURL && (
                        <a
                          href={cert.credentialURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block hover:underline transition duration-300"
                          style={{ color: customization?.primaryColor || '#4F3B78' }}
                        >
                          Verify Credential
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          ref={projectsRef}
          id="projects"
          className={`${spacing} bg-opacity-50`}
          style={{
            backgroundColor: portfolio.theme === 'dark' ? '#2d2d2d' : '#f3f4f6'
          }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: customization.primaryColor }}>
              Projects
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${projects.length < 3 ? 'justify-items-center' : ''} ${projects.length === 1 ? 'lg:grid-cols-1 md:grid-cols-1' : projects.length === 2 ? 'lg:grid-cols-2 md:grid-cols-2' : ''}`}>
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 w-full max-w-md"
                  style={{
                    backgroundColor: portfolio.theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="mb-4" style={{
                      color: portfolio.theme === 'dark' ? '#d1d5db' : '#4b5563'
                    }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-sm rounded"
                          style={{
                            backgroundColor: `${customization.primaryColor}20`,
                            color: customization.primaryColor
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          style={{ color: customization.primaryColor }}
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          style={{ color: customization.primaryColor }}
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={spacing} style={{ backgroundColor: portfolio?.theme === 'dark' ? '#2d2d2d' : '#F5F3FF' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: customization?.primaryColor || '#4F3B78' }}>
                Get in Touch
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 hover:underline transition duration-300"
                    style={{ color: customization?.primaryColor || '#4F3B78' }}
                  >
                    <FaEnvelope />
                    <span>{contact.email}</span>
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 hover:underline transition duration-300"
                    style={{ color: customization?.primaryColor || '#4F3B78' }}
                  >
                    <FaPhone />
                    <span>{contact.phone}</span>
                  </a>
                )}
                {contact.location && (
                  <div
                    className="flex items-center gap-2"
                    style={{ color: customization?.primaryColor || '#4F3B78' }}
                  >
                    <FaMapMarkerAlt />
                    <span>{contact.location}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-6 mt-8">
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:opacity-75 transition duration-300"
                    style={{ color: customization?.primaryColor || '#4F3B78' }}
                  >
                    <FaGithub />
                  </a>
                )}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:opacity-75 transition duration-300"
                    style={{ color: customization?.primaryColor || '#4F3B78' }}
                  >
                    <FaLinkedin />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LivePreview; 