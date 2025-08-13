// Theme colors used throughout the application
export const COLORS = {
    text: '#1d0b0a',
    background: '#fbf5f5',
    primary: '#bf544a', // Books theme color
    secondary: '#98dbb8', // Dogs theme color
    accent: '#76b2cf', // Utility actions color
};

// Common styling patterns
export const STYLES = {
    card: {
        base: 'shadow-md rounded-lg p-6',
        hover: 'hover:shadow-lg transition-shadow',
    },
    button: {
        base: 'flex items-center gap-2 px-4 py-2 rounded transition-opacity',
        hover: 'hover:opacity-90',
    },
    text: {
        heading: 'text-xl font-bold',
        body: 'text-sm',
        muted: { opacity: 0.8 },
    },
};

// Debounce delay for user interactions
export const DEBOUNCE_DELAY = 300; // milliseconds