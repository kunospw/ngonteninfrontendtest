import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../constants/theme';

const DogCard = ({ dogImage, error }) => {
  const [imageError, setImageError] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(!dogImage);

  // Update initial load state when dog image arrives
  React.useEffect(() => {
    if (dogImage) {
      setIsInitialLoad(false);
      setImageError(false); // Reset image error when new image arrives
    }
  }, [dogImage]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div 
      className="shadow-md rounded-lg p-6 h-full flex flex-col" 
      style={{ backgroundColor: COLORS.secondary }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <motion.h2 
        className="text-xl font-bold mb-4" 
        style={{ color: COLORS.text }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        🐕 Dog Picture
      </motion.h2>
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Show loading state during initial load */}
          {isInitialLoad && !error ? (
            <motion.div 
              key="loading"
              className="flex items-center justify-center h-64 w-full rounded-lg" 
              style={{ backgroundColor: 'rgba(29, 11, 10, 0.1)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.div 
                  className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" 
                  style={{ borderColor: COLORS.text }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.p 
                  className="text-lg font-medium" 
                  style={{ color: COLORS.text }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Gathering the dogs...
                </motion.p>
              </div>
            </motion.div>
          ) : error ? (
            /* Show error state */
            <motion.div 
              key="error"
              className="flex items-center justify-center h-64 w-full rounded-lg" 
              style={{ backgroundColor: 'rgba(29, 11, 10, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.div 
                  className="text-6xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  ❌
                </motion.div>
                <motion.p 
                  className="text-lg font-medium" 
                  style={{ color: COLORS.text }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {error}
                </motion.p>
                <motion.p 
                  className="text-sm mt-2" 
                  style={{ color: COLORS.text, opacity: 0.8 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Try using the refresh button above
                </motion.p>
              </div>
            </motion.div>
          ) : dogImage && !imageError ? (
            /* Show the actual dog image */
            <motion.img 
              key={dogImage}
              src={dogImage} 
              alt="Cute Dog" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
              onError={handleImageError}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            />
          ) : (
            /* Show fallback when no image or image failed to load */
            <motion.div 
              key="fallback"
              className="flex items-center justify-center h-64 w-full rounded-lg" 
              style={{ backgroundColor: 'rgba(29, 11, 10, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.div 
                  className="text-6xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  🐕
                </motion.div>
                <motion.p 
                  className="text-lg font-medium" 
                  style={{ color: COLORS.text }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {imageError ? "Failed to catch the dog:(" : "All the dogs had run away!"}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DogCard;