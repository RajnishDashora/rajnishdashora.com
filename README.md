# Rajnish Dashora - Personal Portfolio

A personal portfolio and blog website built with Jekyll, showcasing professional journey, technical insights, and engineering leadership experiences.

## About

This is the source code for [rajnishdashora.com](https://rajnishdashora.com), a personal portfolio website featuring:

- **Professional Profile**: VP of Engineering at realfast.ai with extensive experience in engineering leadership at Gojek and McKinsey & Company
- **Technical Blog**: Articles covering topics like Clojure, functional programming, engineering culture, product delivery, and work-life balance
- **Journey Timeline**: A chronological view of blog posts documenting professional experiences and learnings

## Tech Stack

- **Static Site Generator**: Jekyll 4.3.3
- **Theme**: Minima 2.5
- **Ruby Version**: 3.2.2
- **Deployment**: GitHub Pages via GitHub Actions
- **Plugins**:
  - jekyll-feed (RSS feed generation)
  - jekyll-seo-tag (SEO optimization)

## Project Structure

```
.
├── _config.yml              # Jekyll configuration
├── _posts/                  # Blog posts in markdown
│   ├── 2017-03-31-clojure-at-gojek.markdown
│   ├── 2017-08-19-gojek-bootcamp-2017.markdown
│   ├── 2019-09-14-clojure-ring-file-upload-and-data-csv.markdown
│   ├── 2019-11-20-learnings-outlived.markdown
│   └── 2020-06-20-pursuit-of-balance-among-product-delivery-engineering-quality-and-life.markdown
├── index.markdown           # Home page
├── about.markdown           # About page
├── 404.html                 # Custom 404 page
├── Gemfile                  # Ruby dependencies
├── Gemfile.lock             # Locked dependency versions
├── .ruby-version            # Ruby version specification
├── CNAME                    # Custom domain configuration
└── .github/
    └── workflows/
        └── jekyll.yml       # GitHub Actions deployment workflow
```

## Local Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Ruby 3.2.2** (exact version specified in `.ruby-version`)
2. **Bundler** (Ruby dependency manager)

### Step 1: Install Ruby 3.2.2

Using rbenv (recommended):

```bash
# Install rbenv if not already installed
brew install rbenv ruby-build

# Install Ruby 3.2.2
rbenv install 3.2.2

# Set Ruby 3.2.2 as the local version for this project
rbenv local 3.2.2

# Verify installation
ruby --version
# Should output: ruby 3.2.2
```

Alternatively, using RVM:

```bash
# Install RVM if not already installed
curl -sSL https://get.rvm.io | bash -s stable

# Install Ruby 3.2.2
rvm install 3.2.2

# Use Ruby 3.2.2
rvm use 3.2.2

# Verify installation
ruby --version
```

### Step 2: Install Bundler

```bash
gem install bundler
```

### Step 3: Install Dependencies

```bash
# Install all project dependencies
bundle install
```

This will install Jekyll 4.3.3, Minima theme, and all required plugins specified in the Gemfile.

### Step 4: Run the Development Server

```bash
# Start the Jekyll development server
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

The server includes:
- Live reload (automatically rebuilds when files change)
- Draft posts preview (use `--drafts` flag to include drafts)
- Incremental builds for faster regeneration

#### Additional Server Options

```bash
# Serve with drafts included
bundle exec jekyll serve --drafts

# Serve on a different port
bundle exec jekyll serve --port 4001

# Enable incremental builds (faster regeneration)
bundle exec jekyll serve --incremental

# Serve and make accessible on your local network
bundle exec jekyll serve --host 0.0.0.0
```

### Step 5: Build for Production

```bash
# Generate static site files in _site directory
bundle exec jekyll build

# Build with production environment
JEKYLL_ENV=production bundle exec jekyll build
```

## Writing Blog Posts

Blog posts are stored in the `_posts` directory and follow the naming convention:

```
YYYY-MM-DD-title-with-hyphens.markdown
```

### Post Template

Create a new file in `_posts/` with the following front matter:

```markdown
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +05:30
---

Your content here in Markdown format...
```

### Example Post Structure

```markdown
---
layout: post
title: "My Awesome Blog Post"
date: 2025-12-07 14:00:00 +05:30
---

## Introduction

Your introduction here...

## Main Content

Your main content with **bold**, *italic*, and [links](https://example.com).

### Code Examples

```ruby
puts "Hello, World!"
```

## Conclusion

Wrap up your thoughts...
```

## Configuration

The site is configured via `_config.yml`:

- **Site Metadata**: Title, email, description, social links
- **Theme Settings**: Using the Minima theme
- **Plugins**: Jekyll Feed for RSS generation
- **Build Settings**: Standard Jekyll configuration

To modify site settings, edit `_config.yml` and restart the development server.

## Deployment

The site automatically deploys to GitHub Pages using GitHub Actions:

1. **Trigger**: Pushes to the `main` branch
2. **Build Process**:
   - Checks out the repository
   - Sets up Ruby 3.2.2
   - Installs dependencies with Bundler
   - Builds the Jekyll site
   - Uploads artifact to GitHub Pages
3. **Deployment**: Deploys the built site to GitHub Pages

The workflow is defined in `.github/workflows/jekyll.yml`.

### Manual Deployment

To deploy manually:

1. Ensure all changes are committed
2. Push to the `main` branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Actions will automatically build and deploy the site.

## Custom Domain

The site uses a custom domain configured via the `CNAME` file. The domain `rajnishdashora.com` is configured to point to GitHub Pages.

## Troubleshooting

### Common Issues

1. **Bundle Install Fails**
   ```bash
   # Clear the bundle cache and reinstall
   bundle clean --force
   bundle install
   ```

2. **Jekyll Build Errors**
   ```bash
   # Clear the Jekyll cache
   bundle exec jekyll clean
   bundle exec jekyll build
   ```

3. **Port Already in Use**
   ```bash
   # Use a different port
   bundle exec jekyll serve --port 4001
   ```

4. **Ruby Version Mismatch**
   ```bash
   # Ensure you're using Ruby 3.2.2
   ruby --version

   # If using rbenv
   rbenv local 3.2.2
   ```

## Development Workflow

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/my-new-post
   ```

2. Make your changes (write posts, update pages, etc.)

3. Test locally:
   ```bash
   bundle exec jekyll serve
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Add new blog post about XYZ"
   git push origin feature/my-new-post
   ```

5. Create a pull request or merge to `main` to deploy

## Content Guidelines

- **Blog Posts**: Technical insights, engineering experiences, leadership learnings
- **Tagline**: "Structure Chaos, Build Teams, Solve Problem, Write Code, Repeat"
- **Topics**: Engineering leadership, functional programming (Clojure), product delivery, team building, work-life balance

## Links & Resources

- **Live Site**: [rajnishdashora.com](https://rajnishdashora.com)
- **Jekyll Documentation**: [jekyllrb.com/docs](https://jekyllrb.com/docs/)
- **Minima Theme**: [github.com/jekyll/minima](https://github.com/jekyll/minima)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)

## Social Links

- **GitHub**: [@rajnishdashora](https://github.com/rajnishdashora)
- **Twitter**: [@rajnishdashora](https://twitter.com/rajnishdashora)
- **LinkedIn**: [rajnish-dashora](https://www.linkedin.com/in/rajnish-dashora-89470242)

## License

All blog content is © Rajnish Dashora. Code is open source for reference and learning purposes.

## Contact

For inquiries or collaboration, reach out via:
- Email: dashora.rajnish@gmail.com
- LinkedIn: [Rajnish Dashora](https://www.linkedin.com/in/rajnish-dashora-89470242)

---

Built with ❤️ using Jekyll and deployed on GitHub Pages
