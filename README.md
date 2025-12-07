# Rajnish Dashora - Personal Portfolio

A modern, professional personal portfolio built with React, TypeScript, and Tailwind CSS, showcasing engineering leadership experience, technical insights, and professional journey.

## About

This is the source code for [rajnishdashora.com](https://rajnishdashora.com), a single-page portfolio website featuring:

- **Professional Profile**: VP of Engineering at realfast.ai with extensive experience in engineering leadership at Gojek and McKinsey & Company
- **Technical Writing**: Articles covering engineering leadership, functional programming, product delivery, and team building
- **Modern Design**: Beautiful animations, responsive layout, and professional aesthetics
- **Easy Navigation**: Single-page design with smooth scrolling between sections

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: GitHub Pages via GitHub Actions

## Project Structure

```
.
├── src/
│   ├── components/         # React components
│   │   ├── Hero.tsx       # Hero section with social links
│   │   ├── About.tsx      # About section
│   │   ├── Writing.tsx    # Blog posts section
│   │   ├── Connect.tsx    # Social links section
│   │   └── Footer.tsx     # Footer
│   ├── data/
│   │   └── posts.ts       # Blog posts data
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles & animations
├── public/                # Static assets
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions deployment workflow
```

## Local Development Setup

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **npm** (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/rajnishdashora/rajnishdashora.com.git
cd rajnishdashora.com
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- TypeScript type checking

### Step 4: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Step 5: Preview Production Build

```bash
npm run preview
```

## Adding New Blog Posts

Blog posts are defined in `src/data/posts.ts`. To add a new post:

1. Open `src/data/posts.ts`
2. Add a new entry to the `blogPosts` array:

```typescript
{
  id: '6',
  title: 'Your Post Title',
  date: 'Month Day, Year',
  excerpt: 'A brief description of your post...',
  slug: 'YYYY-MM-DD-post-slug'
}
```

The posts will automatically appear on the Writing section of the homepage.

## Deployment

The site automatically deploys to GitHub Pages using GitHub Actions whenever you push to the `main` branch.

### Deployment Process

1. **Trigger**: Push to `main` branch or manual workflow dispatch
2. **Build**:
   - Sets up Node.js 20
   - Installs dependencies
   - Runs `npm run build`
   - Uploads build artifacts
3. **Deploy**: Deploys to GitHub Pages

The workflow is defined in `.github/workflows/deploy.yml`.

### Manual Deployment

To deploy manually:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Actions will automatically build and deploy the site.

## Customization

### Colors

The site uses a professional blue color scheme. To customize colors, edit `tailwind.config.js` or modify the class names in the components.

### Content

- **Hero Section**: Edit `src/components/Hero.tsx`
- **About Section**: Edit `src/components/About.tsx`
- **Blog Posts**: Edit `src/data/posts.ts`
- **Social Links**: Edit links in `Hero.tsx` and `Connect.tsx`

### Animations

Custom animations are defined in `src/index.css`. The site includes:
- Fade-in animations
- Blob animations for background effects
- Hover transitions on cards and links
- Smooth scrolling between sections

## Features

- ✨ Modern, professional design
- 🎨 Beautiful blue gradient theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Lightning-fast with Vite
- 🎭 Smooth animations and transitions
- ♿ Accessible design
- 🔗 Prominent social links
- 📝 Blog posts showcase
- 🚀 Optimized for performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Custom Domain

The site uses a custom domain configured via the `CNAME` file. The domain `rajnishdashora.com` points to GitHub Pages.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

## Social Links

- **GitHub**: [@rajnishdashora](https://github.com/rajnishdashora)
- **LinkedIn**: [rajnish-dashora](https://www.linkedin.com/in/rajnish-dashora-89470242)
- **Twitter**: [@rajnishdashora](https://twitter.com/rajnishdashora)

## License

All blog content is © Rajnish Dashora. Code is open source for reference and learning purposes.

---

Built with React, TypeScript, and Tailwind CSS • Deployed on GitHub Pages
