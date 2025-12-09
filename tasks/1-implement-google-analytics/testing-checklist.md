# Google Analytics Testing Checklist

## Prerequisites
- [ ] Google Analytics 4 account created
- [ ] Property and Data Stream set up
- [ ] Measurement ID obtained (format: G-XXXXXXXXXX)
- [ ] `.env.local` file created with `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

## Development Mode Testing

### ✅ Verify GA is Disabled in Development
- [ ] Start dev server: `npm run dev`
- [ ] Open browser console (F12)
- [ ] Look for message: "Google Analytics: Disabled in development mode"
- [ ] Verify no network requests to `google-analytics.com` or `googletagmanager.com`
- [ ] Navigate between pages (Home → Blog Post → Home)
- [ ] Confirm GA remains disabled

**Expected Behavior:** GA should NOT track anything in development mode.

## Production Build Testing

### Build and Preview Locally
1. [ ] Build the project:
   ```bash
   npm run build
   ```

2. [ ] Verify build succeeds without errors

3. [ ] Preview production build:
   ```bash
   npm run preview
   ```

4. [ ] Open browser to preview URL (usually http://localhost:4173)

### ✅ Verify GA is Enabled in Production Build
- [ ] Open browser console (F12)
- [ ] Look for message: "Google Analytics initialized: G-XXXXXXXXXX"
- [ ] Check Network tab for requests to:
  - `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`
  - `https://www.google-analytics.com/g/collect`
- [ ] Verify gtag.js script loaded successfully (Status 200)

### ✅ Page View Tracking
- [ ] Stay on homepage for a few seconds
- [ ] Navigate to a blog post
- [ ] Navigate back to homepage
- [ ] Check Network tab for GA collect requests with each navigation
- [ ] Each navigation should trigger a new tracking call

### ✅ Google Analytics Real-time Dashboard
1. [ ] Open Google Analytics: https://analytics.google.com
2. [ ] Go to Reports → Realtime
3. [ ] Keep preview site open in another tab
4. [ ] Verify:
   - [ ] Shows 1 active user (you)
   - [ ] Shows correct page path (e.g., "/")
   - [ ] When you navigate, page view updates in realtime
   - [ ] Location is detected correctly
   - [ ] Browser/Device info is correct

## Advanced Testing (Optional)

### Google Analytics Debugger Extension
1. [ ] Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) for Chrome
2. [ ] Enable the extension
3. [ ] Reload your preview site
4. [ ] Open console to see detailed GA debug logs
5. [ ] Verify all events are firing correctly

### Multiple Pages Test
- [ ] Test homepage: `/`
- [ ] Test blog post: `/posts/hello-world`
- [ ] Test another blog post: `/posts/building-effective-teams`
- [ ] Verify each page view is tracked separately
- [ ] Check page paths are correct in GA Realtime

### Browser Testing
Test in multiple browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)

### Mobile Testing
- [ ] Test on mobile device (or Chrome DevTools mobile emulation)
- [ ] Verify GA tracking works on mobile
- [ ] Check responsive design doesn't break tracking

## Production Deployment Testing

### After Deploying to GitHub Pages
1. [ ] Visit production site: https://rajnishdashora.com
2. [ ] Open browser console
3. [ ] Verify "Google Analytics initialized" message
4. [ ] Navigate between pages
5. [ ] Check GA Realtime dashboard
6. [ ] Verify production traffic is being tracked

### Environment Variable Verification
- [ ] Confirm `VITE_GA_MEASUREMENT_ID` is set in GitHub Actions secrets
- [ ] Check build logs to ensure env var is being used
- [ ] Verify build doesn't expose secret in public files

## Troubleshooting

### Issue: "Google Analytics: Disabled in development mode" in Production
**Possible Causes:**
- Environment variable not set in production
- `import.meta.env.PROD` not working correctly
- Build process not injecting env vars

**Solution:**
- Check `.env.local` file exists with correct Measurement ID
- Verify GitHub Actions has the secret configured
- Check build logs for env var injection

### Issue: No Data in Google Analytics
**Possible Causes:**
- Wrong Measurement ID
- Script blocked by ad blocker
- Browser privacy settings blocking GA
- GA not initialized before page view tracking

**Solution:**
- Double-check Measurement ID matches GA property
- Test with ad blocker disabled
- Check browser console for errors
- Verify initGA() is called in main.tsx

### Issue: Only Initial Page View Tracked
**Possible Causes:**
- Route change tracking not working
- useLocation hook not firing
- AppContent component not rendering

**Solution:**
- Verify useLocation is from react-router-dom
- Check AppContent is inside <Router>
- Add console.log in useEffect to debug

### Issue: Duplicate Page Views
**Possible Causes:**
- React.StrictMode causes double renders in development
- Multiple GA initializations

**Solution:**
- This is normal in dev mode (React.StrictMode)
- Verify only single tracking in production build
- Check isInitialized flag prevents duplicate init

## Success Criteria

✅ All of the following must be true:
- [ ] GA disabled in development mode (no tracking)
- [ ] GA enabled in production build (tracks correctly)
- [ ] Initial page view tracked on site load
- [ ] Route changes tracked (SPA navigation)
- [ ] Realtime data visible in GA dashboard
- [ ] No console errors
- [ ] No 404 errors for GA scripts
- [ ] Environment variables working correctly
- [ ] `.env.local` in gitignore (not committed)
- [ ] `.env.example` committed for documentation

## Post-Deployment Monitoring

### First 24 Hours
- [ ] Check GA for any tracking errors
- [ ] Verify page views are being recorded
- [ ] Monitor for any console errors from users

### First Week
- [ ] Review top pages in GA
- [ ] Check user engagement metrics
- [ ] Verify conversion tracking (if configured)
- [ ] Review traffic sources

### Ongoing
- [ ] Weekly check of GA data quality
- [ ] Monitor for tracking issues
- [ ] Review and act on insights

## Next Steps After Successful Implementation

1. **Custom Events**: Track specific user actions
   - Button clicks (GitHub, LinkedIn, Twitter)
   - Blog post reads
   - Scroll depth

2. **Privacy Compliance**:
   - Add privacy policy page
   - Consider cookie consent banner
   - Review GDPR/CCPA requirements

3. **Advanced Analytics**:
   - Set up conversion goals
   - Create custom dimensions
   - Set up event funnels

4. **Performance Monitoring**:
   - Add Core Web Vitals tracking
   - Monitor page load times
   - Track errors and exceptions

## Resources

- [GA4 Realtime Reports](https://support.google.com/analytics/answer/9271392)
- [GA4 Debugging](https://developers.google.com/analytics/devguides/collection/ga4/debug)
- [Troubleshooting GA4](https://support.google.com/analytics/answer/9267735)
- [Testing GA4 Implementation](https://support.google.com/analytics/answer/9973999)
