export interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Pursuit of Balance among Product Delivery, Engineering Quality and Life',
    date: 'June 20, 2020',
    excerpt: 'Exploring the delicate equilibrium between shipping features, maintaining code quality, and personal well-being in engineering leadership.',
    slug: '2020-06-20-pursuit-of-balance'
  },
  {
    id: '2',
    title: 'Learnings Outlived',
    date: 'November 20, 2019',
    excerpt: 'Reflections on timeless engineering principles and leadership lessons that remain relevant across different roles and companies.',
    slug: '2019-11-20-learnings-outlived'
  },
  {
    id: '3',
    title: 'Clojure Ring File Upload and Data CSV',
    date: 'September 14, 2019',
    excerpt: 'A practical guide to handling file uploads and CSV processing in Clojure using the Ring framework.',
    slug: '2019-09-14-clojure-ring-file-upload'
  },
  {
    id: '4',
    title: 'Gojek Bootcamp 2017',
    date: 'August 19, 2017',
    excerpt: 'Insights from building and running an engineering bootcamp at Gojek to onboard and train new developers at scale.',
    slug: '2017-08-19-gojek-bootcamp-2017'
  },
  {
    id: '5',
    title: 'Clojure at GOJEK',
    date: 'March 31, 2017',
    excerpt: 'How Gojek adopted Clojure for high-scale services, the challenges faced, and the benefits of functional programming in production.',
    slug: '2017-03-31-clojure-at-gojek'
  }
]
