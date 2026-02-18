import { useState, useEffect } from 'react';

export const useAdvertisementPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Affiche la popup après le chargement de la page
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return { showPopup, handleClosePopup };
};
