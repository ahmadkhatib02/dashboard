// PWA Service Worker Registration and Install Prompt

let deferredPrompt;
let isInstalled = false;

// Check if app is already installed
export const isAppInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true ||
         isInstalled;
};

// Register Service Worker
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Update available
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New content available, please refresh.');
            // You can show a notification to user here
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Handle install prompt
export const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('Install prompt available');
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button
    showInstallButton();
  });

  // Handle successful installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    isInstalled = true;
    hideInstallButton();
    deferredPrompt = null;
  });
};

// Show install button
const showInstallButton = () => {
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';
  }
};

// Hide install button
const hideInstallButton = () => {
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
};

// Trigger install prompt
export const installApp = async () => {
  if (!deferredPrompt) {
    console.log('Install prompt not available');
    return false;
  }

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      isInstalled = true;
    } else {
      console.log('User dismissed the install prompt');
    }
    
    deferredPrompt = null;
    return outcome === 'accepted';
  } catch (error) {
    console.error('Error during installation:', error);
    return false;
  }
};

// Check for updates
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      registration.update();
    }
  }
};

// Initialize PWA features
export const initializePWA = () => {
  // Register service worker
  registerServiceWorker();
  
  // Setup install prompt
  setupInstallPrompt();
  
  // Check if already installed
  if (isAppInstalled()) {
    console.log('App is running as PWA');
    hideInstallButton();
  }
  
  // Check for updates periodically
  setInterval(checkForUpdates, 60000); // Check every minute
};
