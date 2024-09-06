/*

TODO
CAMBIARR TODO ESTO



*/


// providers/ThemeProvider.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import PropTypes from "prop-types";

// Define your color palette
const theme = createTheme({
  palette: {
    amarillo: {
      main: '#F6BA27', // Your primary color
    },
    verde: {
      main: '#04B100', // Your secondary color
    },
    rojo: {
      main: '#D44D56', // Your secondary color
    },

    // Add more customizations as needed
  },
});

const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};