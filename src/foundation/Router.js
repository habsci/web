import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import LandingPage from '../pages/LandingPage';
import ServicesPage from '../pages/ServicesPage';

class Router extends Component
{
  render()
  {
    return(
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/services" component={ServicesPage}/>
        </Switch>
      </main>
    );
  }
}

export default Router;