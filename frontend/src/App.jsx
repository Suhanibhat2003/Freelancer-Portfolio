import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PortfolioEditor from './pages/PortfolioEditor';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import LivePreview from './pages/LivePreview';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {user && <Header />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preview/:username" element={<LivePreview />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<PortfolioEditor />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects" element={<Projects />} />
          </Route>

          {/* Fallback route - redirect to dashboard if logged in, otherwise to landing page */}
          <Route path="*" element={user ? <Dashboard /> : <LandingPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App; 