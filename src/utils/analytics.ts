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

/**
 * Check if Google Analytics is enabled
 * Only enabled in production with valid Measurement ID
 */
export const isGAEnabled = (): boolean => {
  return !!(
    GA_MEASUREMENT_ID &&
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' &&
    import.meta.env.PROD
  );
};

let isInitialized = false;

/**
 * Initialize Google Analytics
 * Loads gtag.js script and sets up tracking
 */
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

/**
 * Track page views
 * @param path - The page path to track
 */
export const trackPageView = (path: string): void => {
  if (!isGAEnabled() || !isInitialized) {
    return;
  }

  window.gtag!('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

/**
 * Track custom events
 * @param eventName - Name of the event
 * @param eventParams - Optional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!isGAEnabled() || !isInitialized) {
    return;
  }

  window.gtag!('event', eventName, eventParams);
};
