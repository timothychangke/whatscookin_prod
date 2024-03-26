export const colourTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },

  //different shades of green (i justed used the canva colour wheel)
  primary: {
    50: '#dae7d9',
    100: '#bcd4bb',
    200: '#8ab388',
    300: '#71a36f',
    400: '#5a8a58',
    500: '#4a7249',
    600: '#3a5a39',
    700: '#2b422a',
    800: '#1e2d1d',
    900: '#131e13',
  },
};

//mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // colour palette values for dark mode
            primary: {
              dark: colourTokens.primary[200],
              main: colourTokens.primary[500],
              light: colourTokens.primary[800],
            },
            neutral: {
              dark: colourTokens.grey[100],
              main: colourTokens.grey[200],
              mediumMain: colourTokens.grey[300],
              medium: colourTokens.grey[400],
              light: colourTokens.grey[700],
            },
            background: {
              default: colourTokens.grey[900],
              alt: colourTokens.grey[800],
            },
          }
        : {
            // colour palette values for light mode (inverse of the dark mode one)
            primary: {
              dark: colourTokens.primary[700],
              main: colourTokens.primary[500],
              light: colourTokens.primary[50],
            },
            neutral: {
              dark: colourTokens.grey[700],
              main: colourTokens.grey[500],
              mediumMain: colourTokens.grey[400],
              medium: colourTokens.grey[300],
              light: colourTokens.grey[50],
            },
            background: {
              default: colourTokens.grey[10],
              alt: colourTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ['DM-sans', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['DM-sans', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['DM-sans', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['DM-sans', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['DM-sans', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['DM-sans', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['DM-sans', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
