import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../features/projects/projectSlice';
import { getPortfolio, createPortfolio } from '../features/portfolio/portfolioSlice';
import { toast } from 'react-toastify';
import { FaRegClone, FaFolderOpen, FaEye, FaRocket, FaBriefcase, FaGem, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MdMemory } from 'react-icons/md';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading: projectsLoading, isError, message } = useSelector(
    (state) => state.projects
  );
  const { portfolio, isLoading: portfolioLoading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
      return;
    }

    console.log('Current user data:', user);
    dispatch(getProjects());
    dispatch(getPortfolio());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handlePreview = async () => {
    try {
      console.log('Handle preview - user data:', user);
      if (!portfolio) {
        // Create a default portfolio if none exists
        await dispatch(createPortfolio({
          hero: {
            title: `${user.name}'s Portfolio`,
            subtitle: 'Welcome to my portfolio',
            ctaText: 'View My Work',
            ctaLink: '#projects'
          },
          about: {
            title: 'About Me',
            bio: 'Add your bio here',
            skills: []
          },
          contact: {
            email: user.email
          },
          isPublic: true,
          theme: 'light',
          customization: {
            primaryColor: '#3B82F6',
            fontFamily: 'Inter',
            layout: 'modern',
            spacing: 'comfortable'
          }
        })).unwrap();
        
        // Wait for the portfolio to be created and fetch it
        await dispatch(getPortfolio()).unwrap();
        toast.success('Portfolio created successfully');
      }
      
      if (!user?.username) {
        toast.error('Username not found. Please try logging out and logging in again.');
        return;
      }
      
      // Add a small delay to ensure the portfolio is saved
      setTimeout(() => {
        navigate(`/preview/${user.username}`);
      }, 500);
    } catch (error) {
      console.error('Preview error:', error);
      toast.error('Failed to create portfolio. Please try again.');
    }
  };

  if (projectsLoading || portfolioLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#4F3B78' }}></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full px-2 sm:px-4 py-8"
      style={{
        background: 'linear-gradient(120deg, #f3e8ff 0%, #ede9fe 100%)',
      }}
    >
      <section className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome, {user && user.name}</h1>
        <p className="text-gray-600 mb-8 text-base sm:text-lg">
          This is your portfolio dashboard. Here you can manage your projects and
          customize your portfolio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start sm:items-center min-h-[260px] group border border-gray-100 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80, 36, 143, 0.12)' }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4 shadow group-hover:bg-purple-200 transition">
              <FaRegClone className="text-purple-600 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center w-full">Portfolio</h2>
            <p className="text-gray-600 mb-4 text-center w-full">
              {portfolio ? 'Edit your portfolio content and appearance.' : 'Create your portfolio to showcase your work.'}
            </p>
            <Link
              to="/editor"
              className="inline-block text-white px-4 py-2 rounded-lg font-medium shadow transition duration-300 w-full text-center"
              style={{ backgroundColor: '#4F3B78' }}
            >
              {portfolio ? 'Edit Portfolio' : 'Create Portfolio'}
            </Link>
          </motion.div>

          {/* Projects Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start sm:items-center min-h-[260px] group border border-gray-100 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80, 36, 143, 0.12)' }}
          >
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 shadow group-hover:bg-blue-200 transition">
              <FaFolderOpen className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center w-full">Projects</h2>
            <p className="text-gray-600 mb-4 text-center w-full">
              {projects.length > 0
                ? `You have ${projects.length} project${projects.length === 1 ? '' : 's'}.`
                : 'Add your first project to showcase your work.'}
            </p>
            <Link
              to="/projects"
              className="inline-block text-white px-4 py-2 rounded-lg font-medium shadow transition duration-300 w-full text-center"
              style={{ backgroundColor: '#4F3B78' }}
            >
              Manage Projects
            </Link>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start sm:items-center min-h-[260px] group border border-gray-100 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80, 36, 143, 0.12)' }}
          >
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4 shadow group-hover:bg-green-200 transition">
              <FaEye className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center w-full">Live Preview</h2>
            <p className="text-gray-600 mb-4 text-center w-full">
              See how your portfolio looks to visitors.
            </p>
            <button
              onClick={handlePreview}
              className="inline-block text-white px-4 py-2 rounded-lg font-medium shadow transition duration-300 w-full text-center"
              style={{ backgroundColor: '#4F3B78' }}
            >
              View Preview
            </button>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Available Templates</h2>
        <div className="relative">
          <div className="overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex space-x-6 min-w-max px-2">
              {/* Creative Template */}
              <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                {/* Mini-preview for Creative */}
                <div className="h-48 relative overflow-hidden flex flex-col items-center justify-center p-3" style={{ background: '#6B4F9E' }}>
                  {/* Main hero card */}
                  <div className="w-11/12 mx-auto flex flex-col items-center py-3 px-2 mb-2">
                    <div className="text-[0.7rem] font-bold text-white mb-1 text-center whitespace-nowrap">Welcome to My Portfolio</div>
                    <div className="text-[0.6rem] text-purple-100 mb-2 text-center whitespace-nowrap">Full Stack Developer</div>
                    <div className="flex gap-2">
                      <div className="px-2 py-1 rounded bg-white/20 border border-transparent text-[0.65rem] font-semibold text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        View My Work
                      </div>
                      <div className="px-2 py-1 rounded border border-white text-[0.65rem] font-semibold text-white bg-transparent">
                        Contact Me
                      </div>
                    </div>
                  </div>
                  {/* Experience card */}
                  <div className="w-2/3 bg-white rounded-xl shadow mt-1 flex flex-col items-center py-1 px-2">
                    <div className="text-[0.6rem] font-semibold text-purple-700 mb-0.5">Experience</div>
                    <div className="text-[0.55rem] text-purple-500 text-center">Company Name</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Creative</h3>
                  <p className="text-gray-600 text-sm">Clean, bold header with grid projects and strong call-to-action.</p>
                </div>
              </div>

              {/* Professional Template */}
              <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                {/* Mini-preview for Professional */}
                <div className="h-48 relative overflow-hidden flex flex-col items-center justify-center p-3" style={{ background: 'linear-gradient(180deg, #e0ecff 0%, #f8fbff 100%)' }}>
                  {/* Main hero card */}
                  <div className="w-11/12 mx-auto flex flex-col items-center py-3 px-2 mb-2">
                    <div className="text-[0.7rem] font-bold text-blue-700 mb-1 text-center whitespace-nowrap">Professional Portfolio</div>
                    <div className="text-[0.6rem] text-blue-500 mb-2 text-center whitespace-nowrap">Showcasing My Expertise</div>
                    <div className="w-24 h-7 rounded bg-blue-600 flex items-center justify-center text-[0.65rem] font-semibold text-white shadow" style={{ background: '#2563eb' }}>
                      Contact Me
                    </div>
                  </div>
                  {/* Certifications card */}
                  <div className="w-2/3 bg-blue-50 rounded-xl shadow mt-1 flex flex-col items-center py-1 px-2 border border-blue-100">
                    <div className="text-[0.6rem] font-semibold text-blue-700 mb-0.5">Certifications</div>
                    <div className="text-[0.55rem] text-blue-500 text-center">your certifications</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Professional</h3>
                  <p className="text-gray-600 text-sm">Corporate, card-based design with strong header and subtle accents.</p>
                </div>
              </div>

              {/* Minimal Template */}
              <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                {/* Mini-preview for Minimal */}
                <div className="h-48 relative overflow-hidden flex flex-col items-center justify-center p-3" style={{ background: 'linear-gradient(120deg, #e9d8fd 0%, #c7d2fe 100%)' }}>
                  {/* Main hero card */}
                  <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-lg flex flex-col items-center py-3 px-2 mb-2">
                    <div className="text-[0.7rem] font-bold text-gray-700 mb-1 text-center whitespace-nowrap">Hello, I'm a Developer</div>
                    <div className="text-[0.6rem] text-gray-400 mb-2 text-center whitespace-nowrap">Building digital experiences</div>
                    <div className="w-24 h-7 rounded border border-gray-300 flex items-center justify-center text-[0.65rem] font-semibold text-gray-500" style={{ background: 'white' }}>
                      Explore Projects
                    </div>
                  </div>
                  {/* About Me card */}
                  <div className="w-2/3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow mt-1 flex flex-col items-center py-1 px-2">
                    <div className="text-[0.6rem] font-semibold text-gray-700 mb-0.5">About Me</div>
                    <div className="text-[0.55rem] text-gray-400 text-center">Add your bio here...</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Minimal</h3>
                  <p className="text-gray-600 text-sm">Simple, clean design focusing on content with minimal distractions.</p>
                </div>
              </div>

              {/* Dark Template */}
              <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                {/* Mini-preview for Dark */}
                <div className="h-48 relative overflow-hidden flex flex-col items-center justify-center p-3" style={{ background: 'linear-gradient(120deg, #232b36 0%, #181e26 100%)' }}>
                  {/* Main hero card */}
                  <div className="w-11/12 mx-auto flex flex-col items-center py-2 px-2 mb-1">
                    <div className="text-[0.7rem] font-bold text-white mb-1 text-center whitespace-nowrap">DARK PORTFOLIO</div>
                    <div className="text-[0.6rem] text-blue-300 mb-1 text-center whitespace-nowrap">Experience. Knowledge. Trust.</div>
                    <div className="flex gap-2 items-center justify-center mb-1">
                      <span className="text-[0.55rem] text-blue-200">📞</span>
                      <span className="text-[0.55rem] text-blue-200">✉️</span>
                      <span className="text-[0.55rem] text-blue-200">📍</span>
                    </div>
                  </div>
                  {/* Skills card */}
                  <div className="w-2/3 bg-[#232b36] rounded-xl shadow mt-1 flex flex-col items-center py-1 px-2 border border-gray-700">
                    <div className="text-[0.6rem] font-semibold text-blue-300 mb-0.5">Skills</div>
                    <div className="flex gap-1 flex-wrap justify-center">
                      <span className="px-2 py-0.5 rounded-full bg-blue-900 text-blue-200 text-[0.55rem] font-semibold">your skills</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Dark</h3>
                  <p className="text-gray-600 text-sm">Dark, modern theme with clear sections and professional look.</p>
                </div>
              </div>

              {/* Elegant Template */}
              <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                {/* Mini-preview for Elegant */}
                <div className="h-48 relative overflow-hidden flex flex-col items-center justify-center p-3" style={{ background: '#f5f0eb' }}>
                  {/* Main hero card */}
                  <div className="w-11/12 mx-auto flex flex-col items-center py-3 px-2 mb-2">
                    <div className="text-[1.2rem] font-bold text-gray-900 mb-1 text-center whitespace-nowrap font-serif tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      ELEGANT PORTFOLIO
                    </div>
                    <div className="text-[0.7rem] italic text-gray-700 mb-2 text-center whitespace-nowrap font-serif" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      Refined. Polished. Professional.
                    </div>
                  </div>
                  {/* About Me card */}
                  <div className="w-2/3 bg-white/90 rounded-xl shadow mt-1 flex flex-col items-center py-1 px-2 border border-gray-200">
                    <div className="text-[0.6rem] font-semibold text-gray-700 mb-0.5 font-serif">About Me</div>
                    <div className="text-[0.55rem] text-gray-500 text-center font-serif">Add your bio here...</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 font-serif">Elegant</h3>
                  <p className="text-gray-600 text-sm">Sophisticated, serif fonts, soft gradients, and subtle shadows for a refined look.</p>
                </div>
              </div>

              {/* Modern Template */}
              <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                {/* Mini-preview for Modern */}
                <div className="h-48 relative overflow-hidden flex flex-col items-center justify-center p-0" style={{ background: 'black' }}>
                  {/* Pink accent shape */}
                  <div className="absolute top-0 left-0 w-full h-16" style={{ background: '#FFC2D1', borderBottomLeftRadius: '60% 100%', borderBottomRightRadius: '60% 100%' }} />
                  <div className="relative z-10 w-full flex flex-col items-center justify-center pt-8">
                    <div className="text-[1.1rem] font-bold text-white mb-1 text-center whitespace-nowrap" style={{ fontFamily: 'Inter, serif' }}>
                      Welcome to the Future
                    </div>
                    <div className="text-[0.7rem] text-[#FAA5BB] mb-2 text-center whitespace-nowrap font-semibold">
                      Innovative Developer & Creator
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="px-3 py-1 rounded bg-[#FFC2D1] text-black text-[0.7rem] font-semibold shadow" style={{ background: '#FFC2D1' }}>
                        Explore Projects
                      </div>
                      <div className="px-3 py-1 rounded border border-[#FFC2D1] text-[#FFC2D1] text-[0.7rem] font-semibold bg-transparent">
                        Contact Me
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Modern</h3>
                  <p className="text-gray-600 text-sm">Modern, bold black and pink design with strong call-to-action and clean layout.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      {portfolio && user && (
        <motion.div
          className="mt-12 flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Portfolio Preview</h2>
          <p className="text-gray-700 mb-4 text-center text-lg">Your public portfolio is available at:</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-center">
            <a
              href={`/preview/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple-700 hover:underline text-lg break-all px-2 py-1 rounded transition"
              style={{ wordBreak: 'break-all' }}
            >
              {window.location.origin}/preview/{user.username}
            </a>
            <button
              className="ml-0 sm:ml-2 px-3 py-1 rounded bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium text-sm transition border border-purple-200 shadow"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/preview/${user.username}`);
              }}
              title="Copy URL"
            >
              Copy
            </button>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Dashboard; 