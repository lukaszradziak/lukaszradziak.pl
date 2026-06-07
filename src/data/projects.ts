export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  link?: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: 'race-gps',
    title: 'Race GPS',
    description:
      'Application for acceleration and dynamometer measurements. Uses an ESP32 microcontroller with GPS module to record and visualise performance data in real time.',
    tags: ['React', 'Arduino', 'C++'],
    link: 'https://github.com/lukaszradziak/race-gps',
    featured: true,
  },
  {
    slug: 'desk3d',
    title: 'Desk3D',
    description:
      'Library for woodworkers and DIY enthusiasts to design furniture in 3D directly in the browser.',
    tags: ['React', 'Three.js', 'Laravel'],
    link: 'https://desk3d.pl/',
  },
  {
    slug: 'volvo-monitor',
    title: 'Volvo Monitor',
    description:
      'Tool for logging Volvo parameters (MY 2000–2009) — engine speed, boost pressure, AFR and more.',
    tags: ['React', 'Arduino', 'C++'],
    link: 'https://github.com/lukaszradziak/volvo-monitor',
  },
  {
    slug: 'laravel-social-app',
    title: 'Laravel Social App',
    description:
      'Simple social application with real-time features built on Laravel 8 and Laravel Nova.',
    tags: ['Laravel', 'Nova', 'MySQL', 'Pusher'],
    link: 'https://github.com/lukaszradziak/laravel-social-app',
  },
  {
    slug: 'no-code',
    title: 'No-Code / Freelance',
    description:
      'Freelancing portfolio — WordPress-based sites and PHP customisations delivered for small business clients.',
    tags: ['WordPress', 'PHP'],
    link: 'https://activesoft.pl/',
  },
  {
    slug: 'dsj2-discord',
    title: 'DSJ2 Discord Bot',
    description:
      'Discord bot providing scoreboard functionality for a DSJ2 gaming community.',
    tags: ['JavaScript', 'Prisma', 'Discord'],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio',
    description:
      'This personal website — built with React, Vite, shadcn/ui and Three.js for the 3D MacBook viewer.',
    tags: ['React', 'Next.js', 'Three.js'],
    link: 'https://github.com/lukaszradziak/lukaszradziak.pl',
  },
]