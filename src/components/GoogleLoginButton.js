import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'material-ui';
import GoogleLogo from '../static/images/google_logo.svg';

class GoogleLogin extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.state = {
      disabled: true
    }
  }
  componentDidMount() {
    const {
      clientId,
      cookiePolicy,
      loginHint,
      hostedDomain,
      autoLoad,
      isSignedIn,
      fetchBasicProfile,
      redirectUri,
      discoveryDocs,
      onFailure,
      uxMode,
      scope,
      accessType,
      responseType,
      jsSrc
    } = this.props
    ;((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
      let js = element
      js = d.createElement(s)
      js.id = id
      js.src = jsSrc
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs)
      } else {
        d.head.appendChild(js)
      }
      js.onload = cb
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        cookie_policy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
        scope,
        access_type: accessType
      }

      if (responseType === 'code') {
        params.access_type = 'offline'
      }

      window.gapi.load('auth2', () => {
        this.enableButton()
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            res => {
              if (isSignedIn && res.isSignedIn.get()) {
                this.handleSigninSuccess(res.currentUser.get())
              }
            },
            err => onFailure(err)
          )
        }
        if (autoLoad) {
          this.signIn()
        }
      })
    })
  }
  componentWillUnmount() {
    this.enableButton = () => {}
  }
  enableButton() {
    this.setState({
      disabled: false
    })
  }
  signIn(e) {
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      const { onSuccess, onRequest, onFailure, prompt, responseType } = this.props
      const options = {
        prompt
      }
      onRequest()
      if (responseType === 'code') {
        auth2.grantOfflineAccess(options).then(res => onSuccess(res), err => onFailure(err))
      } else {
        auth2.signIn(options).then(res => this.handleSigninSuccess(res), err => onFailure(err))
      }
    }
  }
  handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
    const basicProfile = res.getBasicProfile()
    const authResponse = res.getAuthResponse()
    res.googleId = basicProfile.getId()
    res.tokenObj = authResponse
    res.tokenId = authResponse.id_token
    res.accessToken = authResponse.access_token
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    }
    this.props.onSuccess(res)
  }

  render() {
    const { buttonText } = this.props

    return <Button
      variant="raised"
      color="primary"
      size="large"
      style={{
        backgroundColor: 'white',
        color: '#8B8B8B',
      }}
      onClick={this.signIn}
    >
      <img src={GoogleLogo} style={{ marginLeft: -10, marginRight: 15 }}/>
      { buttonText }
    </Button>
  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  type: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func
}

GoogleLogin.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Sign in with Google',
  scope: 'profile email',
  accessType: 'online',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6
  },
  onRequest: () => {},
  jsSrc: 'https://apis.google.com/js/client:platform.js'
}

export default GoogleLogin