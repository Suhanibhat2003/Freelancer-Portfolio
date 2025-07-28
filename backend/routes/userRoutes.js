const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updateSocialLinks,
  updateSkills,
  uploadResume,
  resetPassword,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Password reset route
router.post('/reset-password', resetPassword);

// Profile management routes
router.put('/profile', protect, updateProfile);
router.put('/social-links', protect, updateSocialLinks);
router.put('/skills', protect, updateSkills);
router.post('/resume', protect, uploadResume);

module.exports = router; 