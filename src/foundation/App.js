import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';

import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
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
