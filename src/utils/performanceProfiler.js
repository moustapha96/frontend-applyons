import { useEffect } from 'react';

export const usePerformanceProfiler = (componentName) => {
  useEffect(() => {
    // Mesure du temps de chargement initial
    const initialLoadTime = performance.now();
    
    // Mesure du temps de rendu
    const renderTime = performance.now();
    
    // Mesure des métriques de performance
    const metrics = performance.getEntriesByType('paint');
    const firstPaint = metrics.find(metric => metric.name === 'first-paint');
    const firstContentfulPaint = metrics.find(metric => metric.name === 'first-contentful-paint');

    // Mesure des interactions utilisateur
    const interactionObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log(`${componentName} - Interaction Time:`, entry.startTime);
      });
    });
    interactionObserver.observe({ entryTypes: ['first-input'] });

    // Mesure des ressources
    const resourceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log(`${componentName} - Resource Load:`, entry.name, entry.duration);
      });
    });
    resourceObserver.observe({ entryTypes: ['resource'] });

    // Nettoyage
    return () => {
      interactionObserver.disconnect();
      resourceObserver.disconnect();
    };
  }, [componentName]);

  return {
    initialLoadTime,
    renderTime,
    performanceMetrics: {
      firstPaint,
      firstContentfulPaint
    }
  };
};
