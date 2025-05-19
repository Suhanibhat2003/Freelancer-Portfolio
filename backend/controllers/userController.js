const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExists) {
    res.status(400);
    throw new Error(
      userExists.email === email
        ? "Email already exists"
        : "Username already taken"
    );
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, role } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
const updateAvatar = asyncHandler(async (req, res) => {
  const { avatarUrl } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.avatar = avatarUrl;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update social links
// @route   PUT /api/users/social-links
// @access  Private
const updateSocialLinks = asyncHandler(async (req, res) => {
  const { socialLinks } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.socialLinks = { ...user.socialLinks, ...socialLinks };
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update skills
// @route   PUT /api/users/skills
// @access  Private
const updateSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.skills = skills;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Upload resume
// @route   POST /api/users/resume
// @access  Private
const uploadResume = asyncHandler(async (req, res) => {
  const { resumeUrl } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.resumeUrl = resumeUrl;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  // Validate input
  if (!email || !newPassword) {
    res.status(400);
    throw new Error("Please provide both email and new password");
  }

  // Validate email format
  if (!email.endsWith("@gmail.com")) {
    res.status(400);
    throw new Error("Please use valid email address");
  }

  // Validate password length
  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  console.log("Attempting to find user with email:", email); // Debug log

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    console.log("No user found with email:", email); // Debug log
    res.status(404);
    throw new Error("User not found with this email");
  }

  try {
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;

    // Save and verify the update
    const savedUser = await user.save();
    if (!savedUser || savedUser.password !== hashedPassword) {
      console.error("Password update verification failed"); // Debug log
      res.status(500);
      throw new Error("Failed to update password. Please try again.");
    }

    console.log("Password successfully reset for user:", email); // Debug log

    // Return success with user ID for verification
    res.status(200).json({
      message: "Password reset successful",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during password reset:", error); // Debug log
    res.status(500);
    throw new Error("Failed to reset password. Please try again.");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  updateAvatar,
  updateSocialLinks,
  updateSkills,
  uploadResume,
  resetPassword,
};
