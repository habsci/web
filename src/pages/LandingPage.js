import React, { Component } from 'react';
import { LINEN, CHARCOAL } from '../constants';

class LandingPage extends Component
{
  render()
  {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: LINEN }}>
        <h1 style={{ color: CHARCOAL }}>Let's check how our box is doing</h1>
      </div>
    );
  }
}

export default LandingPage;