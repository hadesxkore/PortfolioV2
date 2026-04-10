import type { Project, Certification, Seminar, Skill, SocialLink } from '@/types';
import resumePdf from '@/assets/resume (2).pdf';

// ── Profile ──────────────────────────────────────────────────────────────────
export const profile = {
  name: 'Kobie O. Villanueva',
  firstName: 'Kobie',
  role: 'Information Technology Student',
  taglines: [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'React Developer',
    'Firebase Developer',
    'Problem Solver',
  ],
  bio: `I'm a dedicated IT student at Bataan Peninsula State University with a passion for building modern, scalable web applications. I specialize in full-stack development using React, Next.js, Firebase, and Node.js — crafting clean, functional, and visually compelling digital experiences.`,
  email: 'Kobievillanueva26@gmail.com',
  phone: '0963-517-8265',
  location: 'Balanga City, Bataan, Philippines',
  photo: '/images/mypicture.jpg',
  resumeUrl: resumePdf,
  available: true,
};

// ── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/hadesxkore',
    icon: 'github',
  },
  {
    platform: 'Email',
    url: 'mailto:Kobievillanueva26@gmail.com',
    icon: 'mail',
  },
];

// ── Skills ───────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', icon: 'react', category: 'frontend', level: 4 },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', level: 4 },
  { name: 'Vue.js', icon: 'vuejs', category: 'frontend', level: 3 },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', level: 4 },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend', level: 5 },
  { name: 'HTML & CSS', icon: 'html', category: 'frontend', level: 5 },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend', level: 5 },
  { name: 'shadcn/ui', icon: 'shadcn', category: 'frontend', level: 4 },
  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend', level: 4 },
  { name: 'Express.js', icon: 'express', category: 'backend', level: 4 },
  { name: 'Firebase', icon: 'firebase', category: 'backend', level: 4 },
  // Database
  { name: 'MongoDB', icon: 'mongodb', category: 'database', level: 4 },
  { name: 'Cloudinary', icon: 'cloudinary', category: 'database', level: 3 },
  // Tools & Design
  { name: 'Figma', icon: 'figma', category: 'design', level: 4 },
  { name: 'Vercel', icon: 'vercel', category: 'tools', level: 4 },
  { name: 'Git', icon: 'git', category: 'tools', level: 4 },
];

// ── Projects ─────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'bhss-web-monitoring',
    title: 'BHSS Web Monitoring System',
    description: 'A comprehensive web-based monitoring system for Bataan Heritage Secondary School.',
    longDescription:
      'A full-featured web monitoring system designed for Bataan Heritage Secondary School. Built with React and Firebase, it provides real-time data monitoring, administrative controls, and reporting tools for school management.',
    tech: ['React', 'MongoDB', 'TypeScript', 'shadcn/ui', 'Tailwind CSS', 'Express', 'Node.js'],
    images: [
      '/images/BhssWebMonitoring/image.png',
      '/images/BhssWebMonitoring/image copy.png',
      '/images/BhssWebMonitoring/image copy 2.png',
      '/images/BhssWebMonitoring/image copy 3.png',
      '/images/BhssWebMonitoring/image copy 4.png',
      '/images/BhssWebMonitoring/image copy 5.png',
      '/images/BhssWebMonitoring/image copy 6.png',
      '/images/BhssWebMonitoring/image copy 7.png',
      '/images/BhssWebMonitoring/image copy 8.png',
    ],
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'pgo-event-scheduler',
    title: 'PGO Event Scheduler',
    description: 'An event scheduling and management system built for the Provincial Government Office.',
    longDescription:
      'A robust event management platform created for the Provincial Government Office. Features event creation, scheduling, attendee management, and calendar views with full admin control.',
    tech: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
    images: [
      '/images/pgoEventScheduler/1.png',
      '/images/pgoEventScheduler/2.png',
      '/images/pgoEventScheduler/3.png',
      '/images/pgoEventScheduler/4.png',
      '/images/pgoEventScheduler/5.png',
      '/images/pgoEventScheduler/6.png',
      '/images/pgoEventScheduler/7.png',
      '/images/pgoEventScheduler/8.png',
      '/images/pgoEventScheduler/9.png',
      '/images/pgoEventScheduler/10.png',
    ],
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'pgo-document-file-sharing',
    title: 'PGO Document File Sharing',
    description: 'A secure document sharing and management system for the Provincial Government Office.',
    longDescription:
      'A document management and file-sharing platform built for the Provincial Government Office. Supports secure upload, categorization, search, and role-based access control for government documents.',
    tech: ['React', 'Firebase', 'Cloudinary', 'Tailwind CSS', 'JavaScript'],
    images: [
      '/images/pgoDocumentFileSharing/1.png',
      '/images/pgoDocumentFileSharing/2.png',
      '/images/pgoDocumentFileSharing/3.png',
      '/images/pgoDocumentFileSharing/4.png',
      '/images/pgoDocumentFileSharing/5.png',
    ],
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'pgo-inventory-system',
    title: 'PGO Inventory System',
    description: 'A full-featured inventory tracking system for the Provincial Government Office.',
    longDescription:
      'An inventory management system developed for the Provincial Government Office. Tracks assets, equipment, and supplies with real-time updates, reporting, and administrative dashboards.',
    tech: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
    images: [
      '/images/pgoInventorySystem/1.png',
      '/images/pgoInventorySystem/2.png',
      '/images/pgoInventorySystem/3.png',
      '/images/pgoInventorySystem/4.png',
      '/images/pgoInventorySystem/5.png',
      '/images/pgoInventorySystem/6.png',
      '/images/pgoInventorySystem/7.png',
    ],
    category: 'fullstack',
    featured: false,
  },
  {
    id: 'event-scheduler-v2',
    title: 'Event Scheduler V2',
    description: 'An upgraded event scheduling system with enhanced admin controls and UI.',
    longDescription:
      'The second version of the Event Scheduler with improved UI, admin panel enhancements, multi-role support, and a more intuitive calendar-based event management experience.',
    tech: ['React', 'MongoDB', 'TypeScript', 'shadcn/ui', 'Tailwind CSS', 'Express', 'Node.js'],
    images: [
      '/images/EventScheduler02/image.png',
      '/images/EventScheduler02/image copy.png',
      '/images/EventScheduler02/image copy 2.png',
      '/images/EventScheduler02/image copy 3.png',
      '/images/EventScheduler02/image copy 4.png',
      '/images/EventScheduler02/image copy 5.png',
      '/images/EventScheduler02/image copy 6.png',
      '/images/EventScheduler02/Admin/image.png',
      '/images/EventScheduler02/Admin/image copy.png',
      '/images/EventScheduler02/Admin/image copy 2.png',
      '/images/EventScheduler02/Admin/image copy 3.png',
      '/images/EventScheduler02/Admin/image copy 4.png',
    ],
    category: 'fullstack',
    featured: false,
  },
  {
    id: 'sales-inventory',
    title: 'Sales & Inventory System',
    description: 'A sales and inventory management system with real-time tracking and reporting.',
    longDescription:
      'A comprehensive sales and inventory system providing product management, sales tracking, stock monitoring, and business analytics. Built with a clean, responsive dashboard interface.',
    tech: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
    images: [
      '/images/SalesInventory/1.png',
      '/images/SalesInventory/2.png',
      '/images/SalesInventory/3.png',
      '/images/SalesInventory/4.png',
      '/images/SalesInventory/5.png',
      '/images/SalesInventory/6.png',
      '/images/SalesInventory/7.png',
      '/images/SalesInventory/8.png',
      '/images/SalesInventory/9.png',
      '/images/SalesInventory/10.png',
      '/images/SalesInventory/11.png',
    ],
    category: 'fullstack',
    featured: false,
  },
];

// ── Certifications ────────────────────────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: 'cert-cybersecurity',
    title: 'Cybersecurity',
    date: 'June 20, 2023',
    image: '/images/cert1.png',
    badge: '/images/badge1.png',
  },
  {
    id: 'cert-network-security',
    title: 'Network Security',
    date: 'May 28, 2024',
    image: '/images/cert2.png',
    badge: '/images/badge2.png',
  },
  {
    id: 'cert-it-specialist',
    title: 'IT Specialist in Networking',
    date: 'November 24, 2024',
    image: '/images/cert3.png',
    badge: '/images/badge3.png',
  },
  {
    id: 'cert-device-config',
    title: 'Device Configuration and Management',
    date: 'December 7, 2024',
    image: '/images/cert4.png',
    badge: '/images/badge4.png',
  },
];

// ── Seminars ──────────────────────────────────────────────────────────────────
export const seminars: Seminar[] = [
  {
    id: 'sem-1',
    title: 'International Research Conference on Information Technology Education',
    date: 'May 5, 2023',
    location: 'Bataan People\'s Center, City of Balanga, Bataan',
  },
  {
    id: 'sem-2',
    title: 'IPWebinar/Seminar Workshop: Information and Communication Technology',
    date: 'April 30, 2024',
    location: 'Online',
  },
  {
    id: 'sem-3',
    title: 'IPWebinar/Seminar Workshop: Patent Drafting 1',
    date: 'May 16, 2024',
    location: 'Online',
  },
  {
    id: 'sem-4',
    title: 'Introduction to Cybersecurity',
    date: 'October 11, 2024',
    location: 'Online',
  },
];

// ── Education ─────────────────────────────────────────────────────────────────
export const education = [
  {
    id: 'edu-1',
    level: 'Tertiary',
    school: 'Bataan Peninsula State University (Main Campus)',
    course: 'Bachelor of Science in Information Technology',
    address: 'Capitol Drive, City of Balanga, Bataan',
    period: '2021 – 2025',
  },
  {
    id: 'edu-2',
    level: 'Senior High School',
    school: 'City of Balanga National High School',
    course: 'Technical-Vocational-Livelihood',
    address: 'Phase III Talisay, City of Balanga, Bataan',
    period: '2019 – 2021',
  },
  {
    id: 'edu-3',
    level: 'Junior High School',
    school: 'City of Balanga National High School',
    course: '',
    address: 'Phase III Talisay, City of Balanga, Bataan',
    period: '2015 – 2019',
  },
  {
    id: 'edu-4',
    level: 'Elementary',
    school: 'Cupang Elementary School',
    course: '',
    address: 'Cupang Proper, Balanga City, Bataan',
    period: '2009 – 2015',
  },
];
