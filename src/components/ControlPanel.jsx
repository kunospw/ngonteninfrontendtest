import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants/theme';

const ControlPanel = ({ 
  onRefreshDogs, 
  onRefreshBooks, 
  onRefreshBoth, 
  onEmptyAll,
  isDisabled = false
}) => {
  return (
    <motion.div 
      className="flex flex-wrap items-center gap-4 p-4 rounded-lg shadow-sm" 
      style={{ backgroundColor: COLORS.background, border: '1px solid #e5e7eb' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p 
        className="font-medium" 
        style={{ color: COLORS.text }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Controls:
      </motion.p>
      
      {/* Refresh Books (Primary Color) */}
      <motion.button 
        onClick={onRefreshBooks}
        disabled={isDisabled}
        className="flex items-center gap-2 px-4 py-2 text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ backgroundColor: COLORS.primary }}
        title="Refresh book list"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      >
        📚 Refresh Books
      </motion.button>

      {/* Refresh Dogs (Secondary Color) */}
      <motion.button 
        onClick={onRefreshDogs}
        disabled={isDisabled}
        className="flex items-center gap-2 px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ backgroundColor: COLORS.secondary, color: COLORS.text }}
        title="Refresh dog image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      >
        🐕 Refresh Dogs
      </motion.button>

      {/* Refresh Both (Half and Half Gradient) */}
      <motion.button
        onClick={onRefreshBoth}
        disabled={isDisabled}
        className="flex items-center gap-2 px-4 py-2 text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ background: `linear-gradient(90deg, ${COLORS.primary} 50%, ${COLORS.secondary} 50%)` }}
        title="Refresh both sections"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      >
        📚🐕 Refresh Both
      </motion.button>

      {/* Empty All (Accent Color) */}
      <motion.button 
        onClick={onEmptyAll}
        disabled={isDisabled}
        className="flex items-center gap-2 px-4 py-2 text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ backgroundColor: COLORS.accent }}
        title="Clear all content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
      >
        🗑️ Empty All
      </motion.button>
    </motion.div>
  );
};

export default ControlPanel;