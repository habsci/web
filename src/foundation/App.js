import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

class App extends Component
{
  render()
  {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
