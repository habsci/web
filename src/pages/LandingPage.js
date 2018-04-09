import React, { Component } from 'react';
import { LINEN, CHARCOAL } from '../constants';
import GoogleLoginButton from '../components/GoogleLoginButton';

const emailWhitelist = [ 'jeffgold12@gmail.com' ];

class LandingPage extends Component
{
  responseGoogle(response)
  {
    if (emailWhitelist.includes(response.profileObj.email))
      this.props.history.push('/services');
  }

  render()
  {
    console.log(this.props.data);
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: LINEN
        }}
      >
        <h1 style={{ color: CHARCOAL, marginBottom: 50 }}>Sign into Google below</h1>
        <GoogleLoginButton
          clientId="956729694783-vqol1p70gpulncir89pbul7li5ni5pa8.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}

export default LandingPage;