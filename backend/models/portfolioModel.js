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
    minlength: 2
  },
  company: {
    type: String,
    required: true,
    minlength: 2
  },
  location: {
    type: String,
    maxlength: 100
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || !this.startDate || value >= this.startDate;
      },
      message: 'End date must be after start date.'
    }
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    maxlength: 500
  },
  responsibilities: [String],
  technologies: [String]
});

const certificationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  issuer: {
    type: String,
    required: true,
    minlength: 2
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || !this.issueDate || value >= this.issueDate;
      },
      message: 'Expiry date must be after issue date.'
    }
  },
  credentialID: String,
  credentialURL: {
    type: String,
    validate: {
      validator: function(value) {
        if (!value) return true;
        try { new URL(value); return true; } catch { return false; }
      },
      message: 'Invalid URL.'
    }
  },
  description: {
    type: String,
    maxlength: 500
  }
});

const portfolioSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    template: {
      type: String,
      enum: ['modern', 'minimal', 'professional', 'elegant', 'dark', 'futuristic'],
      default: 'modern'
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
      email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Valid email required']
      },
      linkedin: {
        type: String,
        validate: {
          validator: function(value) {
            if (!value) return true;
            try { new URL(value); return true; } catch { return false; }
          },
          message: 'Invalid URL.'
        }
      },
      github: {
        type: String,
        validate: {
          validator: function(value) {
            if (!value) return true;
            try { new URL(value); return true; } catch { return false; }
          },
          message: 'Invalid URL.'
        }
      },
      phone: {
        type: String,
        validate: {
          validator: function(value) {
            if (!value) return true;
            return /^\d{10}$/.test(value);
          },
          message: 'Phone must be exactly 10 digits.'
        }
      },
      location: {
        type: String,
        maxlength: 100
      }
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
        enum: ['classic', 'modern', 'minimal', 'professional', 'dark','elegant','futuristic'],
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