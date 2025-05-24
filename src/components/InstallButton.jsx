import { useState, useEffect } from 'react';
import { installApp, isAppInstalled } from '../utils/pwa';

export default function InstallButton() {
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if install prompt is available
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setShowInstall(true);
    };

    // Handle successful installation
    const handleAppInstalled = () => {
      setShowInstall(false);
      setIsInstalling(false);
    };

    // Check if already installed
    if (isAppInstalled()) {
      setShowInstall(false);
    } else {
      // Show install button after a delay if not installed
      setTimeout(() => {
        if (!isAppInstalled()) {
          setShowInstall(true);
        }
      }, 3000);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        setShowInstall(false);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  if (!showInstall) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="install-content">
        <div className="install-icon">📱</div>
        <div className="install-text">
          <h3>Install Dashboard App</h3>
          <p>Add to your home screen for quick access</p>
        </div>
        <div className="install-actions">
          <button 
            className="install-btn"
            onClick={handleInstall}
            disabled={isInstalling}
          >
            {isInstalling ? 'Installing...' : 'Install'}
          </button>
          <button 
            className="dismiss-btn"
            onClick={() => setShowInstall(false)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
