# React Google Login

A Google oAUth Log-in Component for React

## Installation

Clone or download zip file

```bash
npm run build
sudo npm link (in package)
npm link google-login-btn (in your project folder)

```

Install also js-cookie [a link](https://www.npmjs.com/package/js-cookie)

## How to use

Login page

```javascript
import React, { Component } from 'react';
import * as H from 'history';

import GoogleLoginButton from 'google-login-btn';
import store from '../../../redux/config';

import {
  login,
  dispatchErrorMessage,
  ACCESS_TOKEN_COOKIE,
  USER_IMAGE,
  USER_ID,
} from '../../../services/connection';

import Logo from '../../../assets/svg/logo.svg';
import styles from './Login.module.scss';
import { setCookie } from '../../../services/cookie';
```

```javascript
export const CLIENT_ID = 'xxx';

export const domain = 'http://localhost:3000';
export const urlLogin = `${domain}/login`;

export const getToken = () => getCookie('access_token');

export const getHeaders = () => {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-type', 'application/json');
  headers.append('mode', 'no-cors');

  const token = getToken();

  if (token) {
    headers.append('token', token);
  }
  return headers;
};


export const login = (code) => {
  return new Promise(async (resolve, reject) => {
    const headers = getHeaders();
    const loginInfo = {
      code,
    };
    try {
      const response = await fetch(urlLogin, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(loginInfo),
      });
    const result = await response.json();
      if (result.token) {
        resolve(result);
      } else {
        dispatchErrorMessage('Login error!');
        reject();
      }
    } catch (error) {
      dispatchErrorMessage('Login error, try use another email.');
      reject(error);
    }
  });

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
    };
  }

  updateProgress(status: boolean) {
    this.setState({
      inProgress: status,
    });
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    this.updateProgress(!!code);

    if (code) {
      login(code)
        .then((result) => {
          setCookie(ACCESS_TOKEN_COOKIE, result.token);
          setCookie(USER_IMAGE, result.user.image);
          this.props.history.push('/');
        })
        .catch((error) => {
          this.updateProgress(false);
          dispatchErrorMessage('Login error.');
        });
    }
  }

  render() {
    const { inProgress } = this.state;

    return (
         <div className={`${styles.Login} Container `}>
        <div>
          <div className={styles.Login_logo}>
            <Logo />
          </div>
          {!inProgress && (
            <div>
              <GoogleLoginButton
                googleProps={{
                  client_id: CLIENT_ID,
                  redirect_uri: 'http://localhost:8080/login',
                  scope: [
                    'https://www.googleapis.com/auth/userinfo.email',
                    'https://www.googleapis.com/auth/userinfo.profile',
                  ].join(' '),
                  response_type: 'code',
                  access_type: 'offline',
                  prompt: 'consent',
                }}
              />
            </div>
          )}
          {inProgress && (
            <div className={styles.Login_loading}>
              <DotsLoader />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LoginPage;
```

Home page

```javascript
import React, { Component } from 'react';
import { getToken } from './LoginPage';
import { deleteCookie } from './cookie';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!getToken()) {
      this.props.history.push('/login');
    }
  }
  
  export const logout = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(urlLogout, {
        method: 'POST',
        headers: getHeaders(),
      });
      if (response.status !== 200) {
        dispatchErrorMessage('Logout error!');
        reject();
      } else {
        resolve();
      }
    } catch (error) {
      dispatchErrorMessage('Logout error');
      reject();
    }
  });


  handleLogout() {
    logout()
      .then(() => {
        this.props.history.push('/login');
        deleteCookie(ACCESS_TOKEN_COOKIE);
        deleteCookie(USER_IMAGE);
        deleteCookie(USER_ID);
      })
      .catch((error) => {
        dispatchErrorMessage('Logout Error');
      });
  }

  render() {
    return (
      <div>
        <h1>Welcome to home page.</h1>
        <button onClick={() => this.handleLogout()}>Logout</button>
      </div>
    );
  }
}

export default Home;
```

cookies.js

```javascript
import Cookies from 'js-cookie';

export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: 1,
    sameSite: 'strict',
  });
};

export const deleteCookie = (name) => Cookies.remove(name);

export const getCookie = (key) => Cookies.get(key);
```

App.js

```javascript
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}
```
