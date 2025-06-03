import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useState } from 'react';
import { FaRegClone } from 'react-icons/fa';
import ReviewForm from './ReviewForm';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const onLogout = async () => {
    try {
      await dispatch(logout());
      await dispatch(reset());
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="shadow-sm" style={{ backgroundColor: '#4F3B78' }}>
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-xl font-bold gap-2" style={{ color: '#fff' }}>
            <FaRegClone className="w-7 h-7 text-white" />
            Portfolio Pro
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-purple-200"
                  style={{ color: '#e0d7f7' }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className="hover:text-purple-200"
                  style={{ color: '#e0d7f7' }}
                >
                  Projects
                </Link>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="hover:text-purple-200"
                  style={{ color: '#e0d7f7' }}
                >
                  Review
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded hover:bg-purple-900 transition duration-200"
                  style={{ backgroundColor: '#a259e6', color: '#fff' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-purple-200"
                  style={{ color: '#e0d7f7' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded hover:bg-purple-900 transition duration-200"
                  style={{ backgroundColor: '#a259e6', color: '#fff' }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Write a Review</h2>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ReviewForm
              onReviewSubmitted={() => {
                setShowReviewForm(false);
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 