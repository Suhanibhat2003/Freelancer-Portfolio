import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import DarkTemplate from '../components/templates/DarkTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import FuturisticTemplate from '../components/templates/FuturisticTemplate';
import { FaDownload } from 'react-icons/fa';

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
        const response = await axios.get(`http://localhost:5000/api/portfolios/public/${username}`);
        if (!response.data.portfolio) {
          // Try to auto-create a default public portfolio if user is authenticated
          if (username) {
            try {
              await axios.post('http://localhost:5000/api/portfolios', {
                template: 'dark',
                isPublic: true,
                hero: { title: 'Dark Portfolio', subtitle: 'Experience. Knowledge. Trust.' },
                about: { title: 'About Me', bio: '', skills: [], image: '' },
                experience: [],
                certifications: [],
                contact: { email: '', linkedin: '', github: '', phone: '', location: '' },
                customization: { primaryColor: '#fff', secondaryColor: '#a0aec0', fontFamily: 'Inter', layout: 'dark', spacing: 'compact' },
                theme: 'dark',
              }, { withCredentials: true });
              toast.success('Default dark portfolio created. Please refresh.');
              window.location.reload();
              return;
            } catch (createErr) {
              toast.error('Failed to auto-create portfolio: ' + (createErr.response?.data?.message || createErr.message));
            }
          }
          throw new Error('Portfolio data not found');
        }
        setPortfolio(response.data.portfolio);
        setProjects(response.data.projects || []);
      } catch (error) {
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
  }, [username]);

  const handleDownload = () => {
    if (!portfolioRef.current) return;
    const htmlContent = portfolioRef.current.innerHTML;
    const tailwindCdn = `<link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\">`;
    const blob = new Blob([
      `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Portfolio</title>${tailwindCdn}</head><body style='margin:0;'>${htmlContent}</body></html>`
    ], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <div className="text-gray-600 mb-4">Please make sure you have created a portfolio and made it public.</div>
          {/* Debug panel for portfolio and template */}
          <div className="bg-gray-100 text-left text-xs text-gray-800 p-4 rounded shadow max-w-2xl mx-auto overflow-x-auto">
            <div className="mb-2 font-bold">Debug Info:</div>
            <div><b>portfolio:</b> <pre>{JSON.stringify(portfolio, null, 2)}</pre></div>
            <div><b>template:</b> {portfolio?.template?.toString() || 'N/A'}</div>
          </div>
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

  let templateComponent;
  switch (portfolio.template) {
    case 'minimal':
      templateComponent = <MinimalTemplate portfolio={portfolio} projects={projects} />;
      break;
    case 'professional':
      templateComponent = <ProfessionalTemplate portfolio={portfolio} projects={projects} />;
      break;
    case 'dark':
      templateComponent = <DarkTemplate portfolio={portfolio} projects={projects} />;
      break;
    case 'elegant':
      templateComponent = <ElegantTemplate portfolio={portfolio} projects={projects} />;
      break;
    case 'futuristic':
      templateComponent = <FuturisticTemplate portfolio={portfolio} projects={projects} />;
      break;
    case 'modern':
    default:
      templateComponent = <ModernTemplate portfolio={portfolio} projects={projects} />;
      break;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating Download Button */}
      <button
        onClick={handleDownload}
        className="fixed top-20 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-pink-400 to-blue-400 hover:from-blue-600 hover:to-pink-500 text-white font-bold rounded-full shadow-2xl transition-all text-lg border-4 border-white/80"
        style={{ boxShadow: '0 8px 32px 0 rgba(80, 36, 143, 0.18)' }}
      >
        <FaDownload className="text-xl" />
        Download as HTML
      </button>
      <div ref={portfolioRef}>
        {templateComponent}
      </div>
    </div>
  );
}

export default LivePreview; 