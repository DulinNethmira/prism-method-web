import { useState, useEffect } from 'react';

export function useCompanionStatus() {
  const [isInstalled, setIsInstalled] = useState(
    () => document.documentElement.dataset.prismCompanion === 'true'
  );

  useEffect(() => {
    const handleReady = () => setIsInstalled(true);
    window.addEventListener('prism-companion-ready', handleReady);
    
    // Fallback check in case the script ran late
    if (document.documentElement.dataset.prismCompanion === 'true') {
      setIsInstalled(true);
    }
    
    return () => window.removeEventListener('prism-companion-ready', handleReady);
  }, []);

  return isInstalled;
}
