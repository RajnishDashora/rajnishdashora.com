# Google Analytics Implementation Plan

## Overview
Implement Google Analytics 4 tracking in the React + TypeScript + Vite application using the gtag.js approach (direct implementation without external libraries for minimal overhead).

## Implementation Approach

We'll use **direct gtag.js implementation** instead of react-ga4 library because:
- ✅ No additional dependencies
- ✅ Official Google implementation
- ✅ Better TypeScript support
- ✅ Full control over tracking
- ✅ Smaller bundle size

## Architecture

```
index.html (gtag.js script loaded conditionally)
    ↓
main.tsx (initialize GA with Measurement ID)
    ↓
App.tsx (track route changes with React Router)
    ↓
analytics.ts (utility functions)
```

## Step-by-Step Implementation

### Step 1: Add Measurement ID to Environment Variables

**Files to modify:**
- `.env.local` (create if doesn't exist)
- `.env.example` (create for documentation)

**Changes:**
```bash
# .env.local
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# .env.example
VITE_GA_MEASUREMENT_ID=your-measurement-id-here
```

**Why:**
- Environment variables keep sensitive IDs out of code
- Can be different for dev/staging/prod environments
- Vite requires `VITE_` prefix for client-side access

### Step 2: Add gtag.js Script to HTML

**File to modify:** `index.html`

**Changes:**
```html
<head>
  <!-- Existing meta tags -->

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</head>
```

**Why:**
- Loads Google Analytics library from CDN
- Initializes gtag function
- Starts tracking immediately

**Important:** We'll inject the actual Measurement ID at build time or use a template replacement.

### Step 3: Create Analytics Utility Module

**File to create:** `src/utils/analytics.ts`

**Purpose:**
- Initialize Google Analytics
- Track page views
- Track custom events (future)
- TypeScript type definitions for gtag

**Functions:**
```typescript
- initGA(): Initialize GA with Measurement ID
- trackPageView(path: string): Track page views
- trackEvent(name: string, params?: object): Track custom events
```

### Step 4: Initialize Analytics in Main Entry Point

**File to modify:** `src/main.tsx`

**Changes:**
- Import analytics utility
- Initialize GA on app startup
- Only initialize in production (not in development)

**Why main.tsx:**
- Runs once when app starts
- Before React Router initializes
- Ensures GA is ready for all pages

### Step 5: Track Route Changes

**File to modify:** `src/App.tsx`

**Changes:**
- Add useEffect hook to listen to route changes
- Call trackPageView on route change
- Use useLocation from react-router-dom

**Why:**
- React Router is a SPA (Single Page Application)
- Default GA only tracks initial page load
- Need manual tracking for client-side navigation

### Step 6: Add TypeScript Definitions

**File to modify:** `src/vite-env.d.ts`

**Changes:**
- Add gtag types
- Add Window interface extension

**Why:**
- TypeScript needs to know about gtag global function
- Prevents compilation errors
- Provides IDE autocomplete

## Code Implementation

### File 1: `.env.local` (create)
```bash
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### File 2: `.env.example` (create)
```bash
# Google Analytics - Replace with your actual Measurement ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### File 3: `src/utils/analytics.ts` (create)
```typescript
// Google Analytics utility functions

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// Get the GA Measurement ID from environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Check if we're in production and GA is configured
export const isGAEnabled = (): boolean => {
  return !!(
    GA_MEASUREMENT_ID &&
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
    import.meta.env.PROD
  );
};

// Initialize Google Analytics
export const initGA = (): void => {
  if (!isGAEnabled()) {
    console.log('Google Analytics is disabled (dev mode or not configured)');
    return;
  }

  // gtag.js is loaded via script tag in index.html
  // Just verify it's available
  if (typeof window.gtag === 'function') {
    console.log('Google Analytics initialized:', GA_MEASUREMENT_ID);
  }
};

// Track page views
export const trackPageView = (path: string): void => {
  if (!isGAEnabled() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });

  console.log('GA Page View:', path);
};

// Track custom events (for future use)
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!isGAEnabled() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, eventParams);
  console.log('GA Event:', eventName, eventParams);
};
```

### File 4: `index.html` (modify)
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rajnish Dashora - Engineering Leader</title>

    <!-- Google Analytics - Only load in production -->
    <script>
      // Inject GA Measurement ID from environment at build time
      window.GA_MEASUREMENT_ID = '%VITE_GA_MEASUREMENT_ID%';
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### File 5: `src/main.tsx` (modify)
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initGA } from './utils/analytics'

// Initialize Google Analytics
initGA()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### File 6: `src/App.tsx` (modify)
Add this import and useEffect:
```typescript
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './utils/analytics'

function App() {
  const location = useLocation()

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  // Rest of your App component...
}
```

## Alternative: Using HTML Template Replacement

Since Vite doesn't do HTML template replacement by default, we have two options:

### Option A: Load gtag.js dynamically in React
```typescript
// In analytics.ts initGA function
const script = document.createElement('script');
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
script.async = true;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
window.gtag = function() { window.dataLayer.push(arguments); }
window.gtag('js', new Date());
window.gtag('config', GA_MEASUREMENT_ID);
```

### Option B: Use vite-plugin-html
Install plugin and configure in vite.config.ts (adds complexity)

**Recommendation:** Use Option A (dynamic loading) for simplicity.

## Revised Implementation (Recommended)

Let's use dynamic script loading to avoid HTML template issues:

### Revised `src/utils/analytics.ts`:
```typescript
// Google Analytics utility functions

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | any,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const isGAEnabled = (): boolean => {
  return !!(
    GA_MEASUREMENT_ID &&
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
    import.meta.env.PROD
  );
};

let isInitialized = false;

export const initGA = (): void => {
  if (!isGAEnabled() || isInitialized) {
    if (!import.meta.env.PROD) {
      console.log('Google Analytics: Disabled in development mode');
    }
    return;
  }

  // Load gtag.js script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  isInitialized = true;
  console.log('Google Analytics initialized:', GA_MEASUREMENT_ID);
};

export const trackPageView = (path: string): void => {
  if (!isGAEnabled() || !isInitialized) {
    return;
  }

  window.gtag!('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!isGAEnabled() || !isInitialized) {
    return;
  }

  window.gtag!('event', eventName, eventParams);
};
```

## Testing Plan

### 1. Development Testing
- Verify GA is disabled in dev mode
- Check console logs show "Disabled in development mode"
- No network requests to Google Analytics

### 2. Production Build Testing
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Check console for "Google Analytics initialized"
- Verify gtag.js script is loaded in Network tab

### 3. Live Testing
- Deploy to production
- Visit website
- Open Google Analytics Realtime report
- Should see 1 active user (you)
- Navigate to different pages
- Verify page views are tracked

### 4. Debugging Tools
- Install "Google Analytics Debugger" Chrome extension
- Open Console to see detailed GA events
- Verify events are firing correctly

## Deployment Checklist

- [ ] Create `.env.local` with Measurement ID
- [ ] Create `.env.example` for documentation
- [ ] Create `src/utils/analytics.ts`
- [ ] Modify `src/main.tsx` to initialize GA
- [ ] Modify `src/App.tsx` to track route changes
- [ ] Test in development (should be disabled)
- [ ] Test in production build (should be enabled)
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Verify CI/CD passes
- [ ] Verify tracking in GA Realtime after deployment

## Environment Variables in GitHub Actions

For production deployment, add the Measurement ID to GitHub Secrets:

1. Go to GitHub repo > Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `VITE_GA_MEASUREMENT_ID`
4. Value: Your GA Measurement ID (e.g., `G-1A2B3C4D5E`)
5. Click "Add secret"

Then in your GitHub Actions workflow, add:
```yaml
- name: Build
  run: npm run build
  env:
    VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
```

## Future Enhancements

1. **Custom Events:**
   - Track button clicks (GitHub, LinkedIn, Twitter)
   - Track blog post reads
   - Track time on page

2. **Cookie Consent:**
   - Add cookie consent banner
   - Only initialize GA after consent
   - Follow GDPR/CCPA requirements

3. **Privacy Policy:**
   - Add privacy policy page
   - Explain data collection
   - Link to Google's privacy policy

4. **Advanced Tracking:**
   - User engagement metrics
   - Scroll depth tracking
   - Outbound link tracking
   - Download tracking

5. **Performance Monitoring:**
   - Add web vitals tracking
   - Monitor page load times
   - Track errors and exceptions

## Resources

- [GA4 gtag.js Documentation](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [GA4 with SPAs](https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Router](https://reactrouter.com/en/main/hooks/use-location)
