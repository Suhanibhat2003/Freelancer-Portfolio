import { useState } from 'react';
import axios from 'axios';

function ReviewForm({ onReviewSubmitted }) {
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post('http://localhost:5000/api/reviews', { quote }, config);
      setQuote('');
      setError('');
      if (onReviewSubmitted) {
        onReviewSubmitted(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting review');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quote">
            Your Review
          </label>
          <textarea
            id="quote"
            name="quote"
            value={quote}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm; 