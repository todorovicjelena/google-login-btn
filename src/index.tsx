import React, { Component } from 'react';
import './index.css';

export interface GoogleProps {
  [x: string]: any;
  client_id: string;
  redirect_uri: string;
  scope?: string;
  response_type?: string;
  access_type?: string;
  prompt?: string;
}

export interface LoginProps {
  googleProps: GoogleProps;
}

class GoogleLoginButton extends Component<LoginProps, {}> {
  constructor(props: Readonly<LoginProps>) {
    super(props);
    this.state = {};
  }
  
  getLoginUrl() {
    const googleParams = this.props.googleProps;
    const availableParams = [];
    if (googleParams.scope) {
      availableParams.push(`scope=${googleParams.scope}`);
    }
    if (googleParams.response_type) {
      availableParams.push(`response_type=${googleParams.response_type}`);
    }
    if (googleParams.client_id) {
      availableParams.push(`client_id=${googleParams.client_id}`);
    }
    if (googleParams.access_type) {
      availableParams.push(`access_type=${googleParams.access_type}`);
    }
    if (googleParams.redirect_uri) {
      availableParams.push(`redirect_uri=${googleParams.redirect_uri}`);
    }
    if (googleParams.prompt) {
      availableParams.push(`prompt=${googleParams.prompt}`);
    }

    const URL = `https://accounts.google.com/o/oauth2/v2/auth?${availableParams.join(
      '&'
    )}`;

    return URL;
  }

  render() {
    const url = this.getLoginUrl();
    return (
      <div className="GoogleLoginWrapper">
        <a className="GoogleLogin" href={url}>
          Sign in with your google account
        </a>
      </div>
    );
  }
}

export default GoogleLoginButton;
