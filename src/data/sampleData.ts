import { Job } from '../types';

export const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Join our team as a Senior Frontend Developer and help build the next generation of web applications.',
    requirements: ['React', 'TypeScript', 'GraphQL', '5+ years experience'],
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD'
    },
    postedAt: new Date('2024-03-01')
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Design Studio Inc',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our creative team as a Product Designer. Create beautiful, intuitive interfaces for our suite of products.',
    requirements: ['Figma', 'UI/UX', 'Design Systems', 'User Research'],
    salary: {
      min: 90000,
      max: 140000,
      currency: 'USD'
    },
    postedAt: new Date('2024-03-05')
  }
];