import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BookList from './components/BookList';
import ControlPanel from './components/ControlPanel';
import DogCard from './components/DogCard';
import { fetchBooks, fetchDogImage, fetchBooksAndDog } from './services/api';
import { COLORS } from './constants/theme';

const App = () => {
  const [books, setBooks] = useState([]);
  const [dogImage, setDogImage] = useState('');
  const [booksError, setBooksError] = useState(null);
  const [dogError, setDogError] = useState(null);
  
  // Simple debounce timers
  const debounceTimers = useRef({});

  // Simple debounce function - prevents rapid clicking
  const debounce = (key, func, delay = 300) => {
    // Clear previous timer if exists
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    
    // Set new timer
    debounceTimers.current[key] = setTimeout(() => {
      func();
      delete debounceTimers.current[key]; // Clean up
    }, delay);
  };

  // Initial data load
  useEffect(() => {
    let cancelled = false;
    
    // Load initial data independently for each section
    const loadInitialData = async () => {
      if (cancelled) return;
      
      try {
        const { books, dogImage } = await fetchBooksAndDog(4);
        
        if (!cancelled) {
          setBooks(books);
          setDogImage(dogImage);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load initial data:', error);
          // Set error states for both sections
          setBooksError('Failed to catch the books:(');
          setDogError('Failed to catch the dog:(');
        }
      }
    };

    loadInitialData();

    // Cleanup function to cancel the request if component unmounts
    return () => {
      cancelled = true;
    };
  }, []);

  // Button click handlers with simple debouncing
  const handleRefreshDogs = () => {
    debounce('dogs', async () => {
      try {
        setDogError(null);
        const newDogImage = await fetchDogImage();
        setDogImage(newDogImage);
      } catch (error) {
        console.error('Failed to refresh dog image:', error);
        setDogError('Failed to catch the dog:(');
      }
    });
  };

  const handleRefreshBooks = () => {
    debounce('books', async () => {
      try {
        setBooksError(null);
        const newBooks = await fetchBooks(4);
        setBooks(newBooks);
      } catch (error) {
        console.error('Failed to refresh books:', error);
        setBooksError('Failed to catch the books:(');
      }
    });
  };

  const handleRefreshBoth = () => {
    debounce('both', async () => {
      try {
        setBooksError(null);
        setDogError(null);
        const { books: newBooks, dogImage: newDogImage } = await fetchBooksAndDog(4);
        setBooks(newBooks);
        setDogImage(newDogImage);
      } catch (error) {
        console.error('Failed to refresh both:', error);
        setBooksError('Failed to catch the books:(');
        setDogError('Failed to catch the dog:(');
      }
    });
  };

  const handleEmptyAll = () => {
    debounce('empty', () => {
      setBooks([]);
      setDogImage('');
      setBooksError(null);
      setDogError(null);
    });
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: COLORS.background }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          className="w-full mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center" style={{ color: COLORS.text }}>
            React Frontend Test: Books & Dog Viewer
          </h1>
        </motion.div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ControlPanel 
            onRefreshDogs={handleRefreshDogs}
            onRefreshBooks={handleRefreshBooks}
            onRefreshBoth={handleRefreshBoth}
            onEmptyAll={handleEmptyAll}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BookList books={books} error={booksError} />
          </motion.div>
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <DogCard dogImage={dogImage} error={dogError} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default App;
