// src/features/simulator/hooks/useImagePreload.ts
import { useState, useEffect } from 'react';

export const useImagePreload = (imagePaths: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = imagePaths.map(path => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [imagePaths]);

  return imagesLoaded;
};