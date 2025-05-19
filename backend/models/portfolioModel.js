const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: String,
  company: String,
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

const experienceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  current: {
    type: Boolean,
    default: false,
  },
  description: String,
  responsibilities: [String],
  technologies: [String]
});

const certificationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expiryDate: Date,
  credentialID: String,
  credentialURL: String,
  description: String
});

const portfolioSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    hero: {
      title: String,
      subtitle: String,
      background: {
        type: {
          type: String,
          enum: ['color', 'gradient', 'image'],
          default: 'color'
        },
        color: {
          type: String,
          default: '#808080'
        },
        gradient: {
          from: {
            type: String,
            default: '#4F3B78'
          },
          to: {
            type: String,
            default: '#6B4F9E'
          },
          direction: {
            type: String,
            default: 'to bottom'
          }
        },
        image: String,
        overlay: {
          type: Boolean,
          default: true
        },
        overlayOpacity: {
          type: Number,
          min: 0,
          max: 1,
          default: 0.5
        }
      },
      ctaText: {
        type: String,
        default: 'View My Work'
      },
      ctaLink: {
        type: String,
        default: '#projects'
      }
    },
    about: {
      title: {
        type: String,
        default: 'About Me'
      },
      bio: String,
      skills: [String],
      image: String
    },
    experience: [experienceSchema],
    certifications: [certificationSchema],
    contact: {
      email: String,
      linkedin: String,
      github: String,
      phone: String,
      location: String
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    customDomain: String,
    testimonials: [testimonialSchema],
    isPublic: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    customization: {
      primaryColor: {
        type: String,
        default: '#4F3B78'
      },
      secondaryColor: {
        type: String,
        default: '#6B4F9E'
      },
      fontFamily: {
        type: String,
        default: 'Inter'
      },
      layout: {
        type: String,
        enum: ['classic', 'modern', 'minimal'],
        default: 'modern'
      },
      spacing: {
        type: String,
        enum: ['comfortable', 'compact', 'spacious'],
        default: 'comfortable'
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema); 