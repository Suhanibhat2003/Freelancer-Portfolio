import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPortfolio, updatePortfolio, createPortfolio } from '../features/portfolio/portfolioSlice';
import { getProjects } from '../features/projects/projectSlice';
import TemplateSelector from '../components/TemplateSelector';

function PortfolioEditor() {
  const [formData, setFormData] = useState({
    hero: {
      title: '',
      subtitle: '',
      background: {
        type: 'color',
        color: '#808080',
        gradient: {
          from: '#4F3B78',
          to: '#6B4F9E',
          direction: 'to bottom'
        },
        image: '',
        overlay: true,
        overlayOpacity: 0.5
      },
      ctaText: 'View My Work',
      ctaLink: '#projects'
    },
    about: {
      title: 'About Me',
      bio: '',
      skills: [],
      image: ''
    },
    experience: [],
    certifications: [],
    contact: {
      email: '',
      linkedin: '',
      github: '',
      phone: '',
      location: ''
    },
    customization: {
      primaryColor: '#4F3B78',
      secondaryColor: '#6B4F9E',
      fontFamily: 'Inter',
      layout: 'modern',
      spacing: 'comfortable'
    },
    theme: '',
    isPublic: true,
    template: 'modern'
  });

  const [activeTab, setActiveTab] = useState('Hero');
  const tabs = ['Hero', 'About', 'Experience', 'Certifications', 'Contact', 'Templates'];

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    responsibilities: '',
    technologies: ''
  });

  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialID: '',
    credentialURL: '',
    description: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { portfolio, isLoading: portfolioLoading } = useSelector((state) => state.portfolio);
  const { projects, isLoading: projectsLoading } = useSelector((state) => state.projects);

  // Add validation state for Experience, Certifications, and Contact
  const [experienceErrors, setExperienceErrors] = useState({});
  const [certificationErrors, setCertificationErrors] = useState({});
  const [contactErrors, setContactErrors] = useState({});

  const customizeModernRef = useRef(null);

  // Validation helpers
  const isValidUrl = (url) => {
    try { new URL(url); return true; } catch { return false; }
  };
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\+?[0-9\-\s]{7,15}$/.test(phone);

  // Experience validation
  const validateExperience = (exp) => {
    const errors = {};
    if (!exp.title || exp.title.length < 2) errors.title = 'Title is required (min 2 chars)';
    if (!exp.company || exp.company.length < 2) errors.company = 'Company is required (min 2 chars)';
    if (!exp.startDate) errors.startDate = 'Start date is required';
    if (exp.endDate && exp.startDate && new Date(exp.endDate) < new Date(exp.startDate)) errors.endDate = 'End date must be after start date';
    if (exp.description && exp.description.length > 500) errors.description = 'Description max 500 chars';
    return errors;
  };
  // Certification validation
  const validateCertification = (cert) => {
    const errors = {};
    if (!cert.name || cert.name.length < 2) errors.name = 'Name is required (min 2 chars)';
    if (!cert.issuer || cert.issuer.length < 2) errors.issuer = 'Issuer is required (min 2 chars)';
    if (!cert.issueDate) errors.issueDate = 'Issue date is required';
    if (cert.expiryDate && cert.issueDate && new Date(cert.expiryDate) < new Date(cert.issueDate)) errors.expiryDate = 'Expiry must be after issue date';
    if (cert.credentialURL && cert.credentialURL.length > 0 && !isValidUrl(cert.credentialURL)) errors.credentialURL = 'Invalid URL';
    if (cert.description && cert.description.length > 500) errors.description = 'Description max 500 chars';
    return errors;
  };
  // Contact validation
  const validateContact = (contact) => {
    const errors = {};
    if (!contact.email || !isValidEmail(contact.email)) errors.email = 'Valid email required';
    if (contact.linkedin && contact.linkedin.length > 0 && !isValidUrl(contact.linkedin)) errors.linkedin = 'Invalid URL';
    if (contact.github && contact.github.length > 0 && !isValidUrl(contact.github)) errors.github = 'Invalid URL';
    if (contact.phone && contact.phone.length > 0 && !/^\d{10}$/.test(contact.phone)) errors.phone = 'Phone must be exactly 10 digits';
    if (contact.location && contact.location.length > 100) errors.location = 'Location max 100 chars';
    return errors;
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getPortfolio());
    dispatch(getProjects());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (portfolio) {
      console.log('Setting portfolio data:', portfolio);
      setFormData(prevState => ({
        ...prevState,
        hero: {
          ...prevState.hero,
          ...portfolio.hero,
          background: {
            type: portfolio.hero?.background?.type || 'color',
            color: portfolio.hero?.background?.color || '#808080',
            gradient: {
              from: portfolio.hero?.background?.gradient?.from || '#4F3B78',
              to: portfolio.hero?.background?.gradient?.to || '#6B4F9E',
              direction: portfolio.hero?.background?.gradient?.direction || 'to bottom'
            },
            image: portfolio.hero?.background?.image || '',
            overlay: portfolio.hero?.background?.overlay ?? true,
            overlayOpacity: portfolio.hero?.background?.overlayOpacity ?? 0.5
          }
        },
        about: portfolio.about || prevState.about,
        experience: portfolio.experience || [],
        certifications: portfolio.certifications || [],
        contact: portfolio.contact || prevState.contact,
        customization: portfolio.customization || prevState.customization,
        theme: portfolio.theme || prevState.theme,
        isPublic: typeof portfolio.isPublic === 'boolean' ? portfolio.isPublic : prevState.isPublic,
        template: portfolio.template || prevState.template
      }));
    }
  }, [portfolio]);

  const handleChange = (section, field, value) => {
    if (section === 'hero' && field === 'background') {
      setFormData(prevState => ({
        ...prevState,
        hero: {
          ...prevState.hero,
          background: {
            ...prevState.hero.background,
            ...value
          }
        }
      }));
    } else {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value
      }
    }));
    }
  };

  const handleSkillsChange = (skills) => {
    setFormData(prevState => ({
      ...prevState,
      about: {
        ...prevState.about,
        skills: skills.split(',').map(skill => skill.trim())
      }
    }));
  };

  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCertificationChange = (e) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addExperience = (e) => {
    e.preventDefault();
    const errors = validateExperience(newExperience);
    setExperienceErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix experience errors');
      return;
    }
    const responsibilities = newExperience.responsibilities.split('\n').filter(r => r.trim());
    const technologies = newExperience.technologies.split(',').map(t => t.trim()).filter(t => t);
    
    const experienceToAdd = {
      ...newExperience,
      responsibilities,
      technologies
    };

    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, experienceToAdd]
    }));

    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      responsibilities: '',
      technologies: ''
    });

    toast.success('Experience added successfully');
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
    toast.success('Experience removed successfully');
  };

  const addCertification = (e) => {
    e.preventDefault();
    const errors = validateCertification(newCertification);
    setCertificationErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix certification errors');
      return;
    }
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));

    setNewCertification({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialID: '',
      credentialURL: '',
      description: ''
    });

    toast.success('Certification added successfully');
  };

  const removeCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
    toast.success('Certification removed successfully');
  };

  const handleContactChange = (field, value) => {
    handleChange('contact', field, value);
    setContactErrors(validateContact({ ...formData.contact, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const loadingToast = toast.loading('Saving changes...');

      const updatedPortfolio = await dispatch(updatePortfolio({
        ...formData,
        hero: {
          ...formData.hero,
          title: formData.hero.title || `${user.name}'s Portfolio`,
          subtitle: formData.hero.subtitle || 'Welcome to my portfolio',
          ctaText: formData.hero.ctaText || 'View My Work',
          ctaLink: formData.hero.ctaLink || '#projects',
          background: {
            type: formData.hero.background?.type || 'color',
            color: formData.hero.background?.color || '#808080',
            gradient: {
              from: formData.hero.background?.gradient?.from || '#4F3B78',
              to: formData.hero.background?.gradient?.to || '#6B4F9E',
              direction: formData.hero.background?.gradient?.direction || 'to bottom'
            },
            image: formData.hero.background?.image || '',
            overlay: formData.hero.background?.overlay || true,
            overlayOpacity: formData.hero.background?.overlayOpacity || 0.5
          }
        },
        about: {
          ...formData.about,
          title: formData.about.title || 'About Me'
        },
        contact: {
          ...formData.contact,
          email: formData.contact.email || user.email
        },
        customization: {
          ...formData.customization,
          primaryColor: formData.customization.primaryColor || '#4F3B78',
          secondaryColor: formData.customization.secondaryColor || '#6B4F9E',
          fontFamily: formData.customization.fontFamily || 'Inter',
          layout: formData.customization.layout || 'modern',
          spacing: formData.customization.spacing || 'comfortable'
        },
        theme: formData.theme || 'light',
        isPublic: typeof formData.isPublic === 'boolean' ? formData.isPublic : true,
        template: formData.template || 'modern'
      })).unwrap();

      toast.update(loadingToast, {
        render: 'Portfolio saved successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      await dispatch(getPortfolio()).unwrap();
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save portfolio. Please try again.');
    }
  };

  const handlePreview = async () => {
    try {
      await dispatch(updatePortfolio(formData)).unwrap();
      toast.success('Portfolio saved successfully');
      navigate(`/preview/${user.username}`);
    } catch (error) {
      toast.error('Failed to save portfolio. Please try again.');
    }
  };

  const handleTemplateSelect = (templateValues, templateId) => {
    setFormData(prevState => ({
      ...prevState,
      hero: {
        ...prevState.hero,
        ...templateValues.hero
      },
      customization: {
        ...prevState.customization,
        ...templateValues.customization
      },
      template: templateId
    }));
    // Scroll to customize section if modern is selected
    if (templateId === 'modern') {
      setTimeout(() => {
        if (customizeModernRef.current) {
          customizeModernRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  if (portfolioLoading || projectsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-8" style={{ background: 'linear-gradient(120deg, #f3e8ff 0%, #ede9fe 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {portfolio ? 'Edit Portfolio' : 'Create Your Portfolio'}
            </h2>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Portfolio Editor</h1>
            <div className="space-x-4">
              <button
                onClick={handlePreview}
                className="px-4 py-2 text-white rounded-lg transition duration-300"
                style={{ backgroundColor: '#4F3B78', hover: { backgroundColor: '#6B4F9E' } }}
              >
                Preview
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white rounded-lg transition duration-300"
                style={{ backgroundColor: '#4F3B78', hover: { backgroundColor: '#6B4F9E' } }}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm transition duration-300 ${
                  activeTab === tab
                    ? 'border-b-2 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === tab ? { borderColor: formData.customization.primaryColor } : {}}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            {/* Hero Section */}
            {activeTab === 'Hero' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Hero Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => handleChange('hero', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter a title for your portfolio"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.hero.subtitle}
                      onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter a subtitle for your portfolio"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* About Section */}
            {activeTab === 'About' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">About Section</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={formData.about.bio}
                      onChange={(e) => handleChange('about', 'bio', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Write something about yourself"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.about.skills.join(', ')}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your skills, separated by commas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.about.image}
                      onChange={(e) => handleChange('about', 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter the URL of your profile image"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Experience Section */}
            {activeTab === 'Experience' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Experience</h2>
                {/* Experience form */}
                <form onSubmit={addExperience} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newExperience.title}
                        onChange={handleExperienceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {experienceErrors.title && <p className="text-red-500 text-xs">{experienceErrors.title}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={newExperience.company}
                        onChange={handleExperienceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {experienceErrors.company && <p className="text-red-500 text-xs">{experienceErrors.company}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={newExperience.location}
                        onChange={handleExperienceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={newExperience.startDate}
                        onChange={handleExperienceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {experienceErrors.startDate && <p className="text-red-500 text-xs">{experienceErrors.startDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={newExperience.endDate}
                        onChange={handleExperienceChange}
                        disabled={newExperience.current}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                      {experienceErrors.endDate && <p className="text-red-500 text-xs">{experienceErrors.endDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        I currently work here
                      </label>
                      <input
                        type="checkbox"
                        name="current"
                        checked={newExperience.current}
                        onChange={handleExperienceChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newExperience.description}
                        onChange={handleExperienceChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter a description of your experience"
                      />
                      {experienceErrors.description && <p className="text-red-500 text-xs">{experienceErrors.description}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsibilities (one per line)
                      </label>
                      <textarea
                        name="responsibilities"
                        value={newExperience.responsibilities}
                        onChange={handleExperienceChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter your responsibilities, one per line"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Technologies Used (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="technologies"
                        value={newExperience.technologies}
                        onChange={handleExperienceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter the technologies you used, separated by commas"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-4 py-2 text-white rounded-lg transition duration-300"
                    style={{ backgroundColor: '#4F3B78', hover: { backgroundColor: '#6B4F9E' } }}
                  >
                    Add Experience
                  </button>
                </form>
                {/* Experience list */}
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{exp.title}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <button
                          onClick={() => removeExperience(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(exp.startDate).toLocaleDateString()} - 
                        {exp.current ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString()}` : ''}
                      </p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {activeTab === 'Certifications' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
                {/* Certification form */}
                <form onSubmit={addCertification} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certification Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newCertification.name}
                        onChange={handleCertificationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {certificationErrors.name && <p className="text-red-500 text-xs">{certificationErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        name="issuer"
                        value={newCertification.issuer}
                        onChange={handleCertificationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {certificationErrors.issuer && <p className="text-red-500 text-xs">{certificationErrors.issuer}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        name="issueDate"
                        value={newCertification.issueDate}
                        onChange={handleCertificationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      {certificationErrors.issueDate && <p className="text-red-500 text-xs">{certificationErrors.issueDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={newCertification.expiryDate}
                        onChange={handleCertificationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                      {certificationErrors.expiryDate && <p className="text-red-500 text-xs">{certificationErrors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Credential ID
                      </label>
                      <input
                        type="text"
                        name="credentialID"
                        value={newCertification.credentialID}
                        onChange={handleCertificationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Credential URL
                      </label>
                      <input
                        type="text"
                        name="credentialURL"
                        value={newCertification.credentialURL}
                        onChange={handleCertificationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter the URL of your credential"
                      />
                      {certificationErrors.credentialURL && <p className="text-red-500 text-xs">{certificationErrors.credentialURL}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newCertification.description}
                        onChange={handleCertificationChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Enter a description of your certification"
                      />
                      {certificationErrors.description && <p className="text-red-500 text-xs">{certificationErrors.description}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-4 py-2 text-white rounded-lg transition duration-300"
                    style={{ backgroundColor: '#4F3B78', hover: { backgroundColor: '#6B4F9E' } }}
                  >
                    Add Certification
                  </button>
                </form>
                {/* Certification list */}
                <div className="space-y-4">
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{cert.name}</h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                        </div>
                        <button
                          onClick={() => removeCertification(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        {cert.expiryDate && ` - Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                      </p>
                      <p className="text-gray-700">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Section */}
            {activeTab === 'Contact' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                    {contactErrors.email && <p className="text-red-500 text-xs">{contactErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={formData.contact.linkedin}
                      onChange={(e) => handleContactChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                    {contactErrors.linkedin && <p className="text-red-500 text-xs">{contactErrors.linkedin}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={formData.contact.github}
                      onChange={(e) => handleContactChange('github', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                    {contactErrors.github && <p className="text-red-500 text-xs">{contactErrors.github}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={formData.contact.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                    {contactErrors.phone && <p className="text-red-500 text-xs">{contactErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.contact.location}
                      onChange={(e) => handleContactChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                    {contactErrors.location && <p className="text-red-500 text-xs">{contactErrors.location}</p>}
                  </div>
                </div>
              </section>
            )}

            {/* Templates Section */}
            {activeTab === 'Templates' && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Templates</h2>
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  {/* Directly display the templates for selection */}
                  <TemplateSelector
                    onSelect={handleTemplateSelect}
                    currentTemplate={formData.template}
                  />

                  {/* Customization options only for Modern template */}
                  {formData.template === 'modern' && (
                    <div ref={customizeModernRef} className="mt-8 pt-8 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-700 mb-4">Customize Modern Template</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Primary Color
                          </label>
                          <input
                            type="color"
                            value={formData.customization.primaryColor}
                            onChange={(e) => handleChange('customization', 'primaryColor', e.target.value)}
                            className="w-full h-10 border-none rounded-md cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Secondary Color
                          </label>
                          <input
                            type="color"
                            value={formData.customization.secondaryColor}
                            onChange={(e) => handleChange('customization', 'secondaryColor', e.target.value)}
                            className="w-full h-10 border-none rounded-md cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Font Family
                          </label>
                          <select
                            value={formData.customization.fontFamily}
                            onChange={(e) => handleChange('customization', 'fontFamily', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="Inter">Inter</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Poppins">Poppins</option>
                            <option value="Open Sans">Open Sans</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Spacing
                          </label>
                          <select
                            value={formData.customization.spacing}
                            onChange={(e) => handleChange('customization', 'spacing', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="comfortable">Comfortable</option>
                            <option value="compact">Compact</option>
                            <option value="spacious">Spacious</option>
                          </select>
                        </div>
                      </div>
                      {/* Modern template hero background controls */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Background Type
                          </label>
                          <select
                            value={formData.hero.background?.type || 'color'}
                            onChange={(e) => handleChange('hero', 'background', { ...formData.hero.background, type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="color">Solid Color</option>
                            <option value="gradient">Gradient</option>
                          </select>
                        </div>
                        {formData.hero.background?.type === 'color' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Background Color
                            </label>
                            <input
                              type="color"
                              value={formData.hero.background?.color || '#808080'}
                              onChange={(e) => handleChange('hero', 'background', { ...formData.hero.background, color: e.target.value })}
                              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                        )}
                        {formData.hero.background?.type === 'gradient' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gradient Start Color
                              </label>
                              <input
                                type="color"
                                value={formData.hero.background?.gradient?.from || '#4F3B78'}
                                onChange={(e) => handleChange('hero', 'background', {
                                  ...formData.hero.background,
                                  gradient: {
                                    ...formData.hero.background?.gradient,
                                    from: e.target.value
                                  }
                                })}
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gradient End Color
                              </label>
                              <input
                                type="color"
                                value={formData.hero.background?.gradient?.to || '#6B4F9E'}
                                onChange={(e) => handleChange('hero', 'background', {
                                  ...formData.hero.background,
                                  gradient: {
                                    ...formData.hero.background?.gradient,
                                    to: e.target.value
                                  }
                                })}
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gradient Direction
                              </label>
                              <select
                                value={formData.hero.background?.gradient?.direction || 'to bottom'}
                                onChange={(e) => handleChange('hero', 'background', {
                                  ...formData.hero.background,
                                  gradient: {
                                    ...formData.hero.background?.gradient,
                                    direction: e.target.value
                                  }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                              >
                                <option value="to bottom">Top to Bottom</option>
                                <option value="to right">Left to Right</option>
                                <option value="to bottom right">Diagonal</option>
                                <option value="45deg">45 Degrees</option>
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioEditor; 