/**
 * DEFAULT THEME
 * 
 * To create a new theme:
 * 1. Create a new folder in src/themes/ (e.g., 'neon', 'dark', 'minimal')
 * 2. Copy this file and customize the colors
 * 3. Update the theme import in App.tsx or create a theme switcher
 */

export const defaultTheme = {
  colors: {
    primary: {
      50: '#fdf6f0',
      100: '#faebe0',
      500: '#d97744',
      600: '#c85f32',
      700: '#a64b29',
      900: '#6d3522',
    },
    accent: {
      500: '#c99a6d',
      600: '#b87d4f',
    },
    background: {
      primary: '#faf8f5',
      secondary: '#f5f0e8',
      dark: '#5f3e2e',
    },
    text: {
      primary: '#6d3522',
      secondary: '#724834',
      light: '#faf8f5',
    },
    urgency: '#c85f32',
    success: '#8b5638',
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Lora', serif",
  },
  gradients: {
    hero: 'linear-gradient(135deg, #a64b29 0%, #863e26 50%, #6d3522 100%)',
    cta: 'linear-gradient(135deg, #d97744 0%, #c85f32 100%)',
  },
};
