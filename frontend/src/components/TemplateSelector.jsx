import { FaRocket, FaLeaf, FaBriefcase, FaPalette, FaGem, FaBook, FaRobot, FaRegLightbulb, FaSpaceShuttle } from 'react-icons/fa';

const templates = [
  {
    id: 'modern',
    name: 'Creative',
    icon: <FaRocket className="text-purple-600 text-3xl mb-2" />,
    description: 'Clean, bold header, grid projects, and strong call-to-action.',
    preview: null,
    defaultValues: {
      hero: {
        title: 'Welcome to My Portfolio',
        subtitle: 'Full Stack Developer',
        background: {
          type: 'gradient',
          gradient: {
            from: '#4F3B78',
            to: '#6B4F9E',
            direction: 'to bottom'
          }
        },
        ctaText: 'View My Work'
      },
      customization: {
        primaryColor: '#4F3B78',
        secondaryColor: '#6B4F9E',
        fontFamily: 'Inter',
        layout: 'modern',
        spacing: 'comfortable'
      }
    },
    jsxPreview: (
      <div className="rounded-lg overflow-hidden border shadow bg-gradient-to-b from-purple-600 to-purple-400 p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2">
          <FaRocket className="text-purple-600 text-3xl" />
        </div>
        <div className="w-full h-4 bg-white/80 rounded mb-2" />
        <div className="w-3/4 h-3 bg-white/60 rounded mb-4" />
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="h-8 bg-white/90 rounded" />
          <div className="h-8 bg-white/90 rounded" />
          <div className="h-8 bg-white/90 rounded" />
        </div>
      </div>
    )
  },
  {
    id: 'minimal',
    name: 'Minimal',
    icon: <FaLeaf className="text-green-600 text-3xl mb-2" />,
    description: 'Simple, lots of whitespace, left-aligned text, and soft cards.',
    preview: null,
    defaultValues: {
      hero: {
        title: 'Hello, I\'m a Developer',
        subtitle: 'Building digital experiences',
        background: {
          type: 'color',
          color: '#ffffff'
        },
        ctaText: 'Explore Projects'
      },
      customization: {
        primaryColor: '#2D3748',
        secondaryColor: '#4A5568',
        fontFamily: 'Inter',
        layout: 'minimal',
        spacing: 'compact'
      }
    },
    jsxPreview: (
      <div className="rounded-lg overflow-hidden border shadow bg-white p-4 flex flex-col items-start">
        <div className="w-12 h-12 rounded bg-green-100 flex items-center justify-center mb-2">
          <FaLeaf className="text-green-600 text-2xl" />
        </div>
        <div className="w-2/3 h-4 bg-gray-200 rounded mb-2" />
        <div className="w-1/2 h-3 bg-gray-100 rounded mb-4" />
        <div className="flex flex-col gap-2 w-full">
          <div className="h-6 bg-gray-100 rounded" />
          <div className="h-6 bg-gray-100 rounded" />
        </div>
      </div>
    )
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: <FaBriefcase className="text-blue-700 text-3xl mb-2" />,
    description: 'Corporate, card-based, with a strong header and subtle accents.',
    preview: null,
    defaultValues: {
      hero: {
        title: 'Professional Portfolio',
        subtitle: 'Showcasing My Expertise',
        background: {
          type: 'color',
          color: '#e5e7eb'
        },
        ctaText: 'Contact Me'
      },
      customization: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e293b',
        fontFamily: 'Roboto',
        layout: 'professional',
        spacing: 'comfortable'
      }
    },
    jsxPreview: (
      <div className="rounded-lg overflow-hidden border-2 border-blue-200 shadow bg-gradient-to-br from-blue-100 to-white p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2">
          <FaBriefcase className="text-blue-700 text-3xl" />
        </div>
        <div className="w-full h-4 bg-blue-200 rounded mb-2" />
        <div className="w-2/3 h-3 bg-blue-100 rounded mb-4" />
        <div className="flex gap-2 w-full">
          <div className="h-8 w-1/2 bg-blue-50 rounded" />
          <div className="h-8 w-1/2 bg-blue-200 rounded" />
        </div>
      </div>
    )
  },
  {
    id: 'elegant',
    name: 'Elegant',
    icon: <FaGem className="text-indigo-500 text-3xl mb-2" />,
    description: 'Sophisticated, serif fonts, soft gradients, and subtle shadows.',
    preview: null,
    defaultValues: {
      hero: {
        title: 'Elegant Portfolio',
        subtitle: 'Refined. Polished. Professional.',
        background: {
          type: 'gradient',
          gradient: {
            from: '#a18cd1',
            to: '#fbc2eb',
            direction: 'to right'
          }
        },
        ctaText: 'Discover More'
      },
      customization: {
        primaryColor: '#a18cd1',
        secondaryColor: '#fbc2eb',
        fontFamily: 'Georgia',
        layout: 'elegant',
        spacing: 'comfortable'
      }
    },
    jsxPreview: (
      <div className="rounded-xl border-2 border-indigo-200 shadow bg-gradient-to-r from-indigo-100 via-pink-100 to-white p-4 flex flex-col items-center font-serif">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 border-2 border-indigo-300">
          <FaGem className="text-indigo-500 text-3xl" />
        </div>
        <div className="w-full h-4 bg-indigo-100 rounded mb-2" />
        <div className="w-2/3 h-3 bg-pink-100 rounded mb-4" />
        <div className="flex gap-2 w-full">
          <div className="h-8 w-1/2 bg-indigo-50 rounded" />
          <div className="h-8 w-1/2 bg-pink-50 rounded" />
        </div>
      </div>
    )
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: <FaBook className="text-gray-200 text-3xl mb-2" />,
    description: 'Dark, modern, with clear sections and a professional look.',
    preview: null,
    defaultValues: {
      hero: {
        title: 'Dark Portfolio',
        subtitle: 'Experience. Knowledge. Trust.',
        background: {
          type: 'color',
          color: '#232b36'
        },
        ctaText: 'Browse Portfolio'
      },
      customization: {
        primaryColor: '#fff',
        secondaryColor: '#a0aec0',
        fontFamily: 'Inter',
        layout: 'dark',
        spacing: 'compact'
      }
    },
    jsxPreview: (
      <div className="rounded-xl border-2 border-gray-800 shadow bg-[#232b36] p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2 border-2 border-gray-600">
          <FaBook className="text-gray-200 text-3xl" />
        </div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2" />
        <div className="w-2/3 h-3 bg-gray-600 rounded mb-4" />
        <div className="flex gap-2 w-full">
          <div className="h-8 w-1/2 bg-gray-800 rounded" />
          <div className="h-8 w-1/2 bg-gray-700 rounded" />
        </div>
      </div>
    )
  },
  {
    id: 'futuristic',
    name: 'Modern',
    icon: <FaRegLightbulb className="text-black text-3xl mb-2" />,
    description: 'Modern, tech-focused design with animated elements and soft pink accents.',
    preview: null,
    defaultValues: {
      hero: {
        title: 'Welcome to the Future',
        subtitle: 'Innovative Developer & Creator',
        background: {
          type: 'gradient',
          gradient: {
            from: '#FFC2D1',
            to: '#FFC2D1',
            direction: 'to bottom'
          }
        },
        ctaText: 'Explore Projects'
      },
      customization: {
        primaryColor: '#FFC2D1',
        secondaryColor: '#FFC2D1',
        fontFamily: 'Inter',
        layout: 'futuristic',
        spacing: 'comfortable'
      }
    },
    jsxPreview: (
      <div className="rounded-2xl border-2 border-[#FFC2D1] shadow-xl bg-[#FFC2D1] p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 border-2 border-[#FFC2D1]">
          <FaRegLightbulb className="text-black text-3xl" />
        </div>
        <div className="w-full h-4 bg-white rounded mb-2" />
        <div className="w-3/4 h-3 bg-black/10 rounded mb-4" />
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="h-8 bg-white rounded" />
          <div className="h-8 bg-white rounded" />
        </div>
        <div className="mt-4 w-full h-1 bg-black/10 rounded-full" />
      </div>
    )
  }
];

function TemplateSelector({ onSelect, currentTemplate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col items-center p-4 shadow-lg bg-gray-50 hover:scale-105 ${
            currentTemplate === template.id
              ? 'ring-4 ring-purple-400 border-purple-500'
              : 'border-gray-200 hover:border-purple-300'
          }`}
          onClick={() => onSelect(template.defaultValues, template.id)}
        >
          {template.icon}
          <h3 className="font-semibold text-lg mb-1 text-center">{template.name}</h3>
          <p className="text-gray-600 text-xs mb-2 text-center">{template.description}</p>
          <div className="w-full flex justify-center items-center min-h-[120px]">
            {template.jsxPreview}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TemplateSelector; 