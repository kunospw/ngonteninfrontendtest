import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../constants/theme';

const BookList = ({ books, error }) => {
  const [expandedBooks, setExpandedBooks] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(!books || books.length === 0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previousBooks, setPreviousBooks] = useState([]);

  // Update initial load state when books arrive
  React.useEffect(() => {
    // Handle initial load
    if (books && books.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);
      setPreviousBooks(books);
      return;
    }

    // Handle refresh when books change (but not from empty to filled)
    if (books && books.length > 0 && previousBooks.length > 0) {
      // Check if books actually changed
      const booksChanged = JSON.stringify(books) !== JSON.stringify(previousBooks);
      if (booksChanged) {
        setIsRefreshing(true);
        // Reset refresh state after animation
        const timer = setTimeout(() => {
          setIsRefreshing(false);
        }, 600);
        setPreviousBooks(books);
        return () => clearTimeout(timer);
      }
    }

    // Handle empty state
    if ((!books || books.length === 0) && previousBooks.length > 0) {
      setPreviousBooks([]);
    }

    // Update previous books whenever books change
    if (books) {
      setPreviousBooks(books);
    }
  }, [books]);

  const toggleBookExpansion = (bookId) => {
    setExpandedBooks(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  // Show loading state during initial load
  if (isInitialLoad && !error) {
    return (
      <motion.div 
        className="shadow-md rounded-lg p-6 h-full" 
        style={{ backgroundColor: COLORS.primary }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h2 
          className="text-xl font-bold mb-4" 
          style={{ color: 'white' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          📚 Book Lists
        </motion.h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" 
              style={{ borderColor: 'white' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className="text-lg font-medium" 
              style={{ color: 'white' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Gathering the books...
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show error state
  if (error) {
    return (
      <motion.div 
        className="shadow-md rounded-lg p-6 h-full" 
        style={{ backgroundColor: COLORS.primary }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h2 
          className="text-xl font-bold mb-4" 
          style={{ color: 'white' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          📚 Book Lists
        </motion.h2>
        <div className="flex items-center justify-center h-64">
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
              style={{ color: 'white' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {error}
            </motion.p>
            <motion.p 
              className="text-sm mt-2" 
              style={{ color: 'white', opacity: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Try using the refresh button above
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show empty state
  if (!books || books.length === 0) {
    return (
      <motion.div 
        className="shadow-md rounded-lg p-6 h-full" 
        style={{ backgroundColor: COLORS.primary }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h2 
          className="text-xl font-bold mb-4" 
          style={{ color: 'white' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          📚 Book Lists
        </motion.h2>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center justify-center h-64 w-full rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="text-center">
              <motion.div 
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                📚
              </motion.div>
              <motion.p 
                className="text-lg font-medium" 
                style={{ color: 'white' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                All the books poofed:C
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="shadow-md rounded-lg p-6 h-full" 
      style={{ backgroundColor: COLORS.primary }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2 
        className="text-xl font-bold mb-4" 
        style={{ color: 'white' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        📚 Book Lists
      </motion.h2>
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        key={isRefreshing ? "refreshing" : "normal"} // Force re-render on refresh
      >
        <AnimatePresence mode="wait">
          {isRefreshing ? (
            // Show refresh animation
            <motion.div
              key="refreshing"
              className="flex items-center justify-center h-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-white border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.p
                  className="text-white font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  📚 Refreshing books...
                </motion.p>
              </div>
            </motion.div>
          ) : (
            // Show books with staggered animation
            <motion.div
              key="books"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {books.map((book, index) => {
                const isExpanded = expandedBooks[book.id];
                
                return (
                  <motion.div 
                    key={book.id} 
                    className='shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border'
                    style={{ backgroundColor: 'white', borderColor: 'rgba(191, 84, 74, 0.2)' }}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    layout
                  >
                    {/* Title and Author */}
                    <motion.h3 
                      className="text-lg font-semibold mb-2" 
                      style={{ color: COLORS.text }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + 0.2 }}
                    >
                      {book.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm mb-3" 
                      style={{ color: COLORS.text, opacity: 0.8 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + 0.3 }}
                    >
                      by {book.author}
                    </motion.p>

                    {/* Expanded View - Additional Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          className="mt-4 pt-4 space-y-3" 
                          style={{ borderTop: '1px solid rgba(191, 84, 74, 0.2)' }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div 
                            className="text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <span className="font-semibold" style={{ color: COLORS.text }}>Genre:</span>
                            <span className="ml-1" style={{ color: COLORS.text, opacity: 0.8 }}>{book.genre}</span>
                          </motion.div>
                          <motion.div 
                            className="text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <span className="font-semibold" style={{ color: COLORS.text }}>Published:</span>
                            <span className="ml-1" style={{ color: COLORS.text, opacity: 0.8 }}>{book.published}</span>
                          </motion.div>
                          <motion.div 
                            className="text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="font-semibold" style={{ color: COLORS.text }}>Publisher:</span>
                            <span className="ml-1" style={{ color: COLORS.text, opacity: 0.8 }}>{book.publisher}</span>
                          </motion.div>
                          <motion.div 
                            className="text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <span className="font-semibold" style={{ color: COLORS.text }}>Description:</span>
                            <p className="mt-1 leading-relaxed" style={{ color: COLORS.text, opacity: 0.8 }}>{book.description}</p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Toggle Button */}
                    <motion.button 
                      onClick={() => toggleBookExpansion(book.id)}
                      className="w-full px-4 py-2 text-white text-sm rounded hover:opacity-90 transition-opacity mt-3"
                      style={{ backgroundColor: COLORS.primary }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index * 0.1) + 0.4 }}
                    >
                      📖 {isExpanded ? 'Hide Details' : 'View Details'}
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BookList;