# React Google Login

A Google oAUth Log-in Component for React

## Installation

Clone or download zip file

```bash
npm run build
sudo npm link (in package)
npm link react-google-login (in your project folder)

```

Install also js-cookie [a link](https://www.npmjs.com/package/js-cookie)

## How to use

Login page

```javascript
import React, { Component } from 'react';
import GoogleLoginButton from 'react-google-login';
import { setCookie, getCookie } from './cookie';
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

export const headers = getHeaders();

export const login = (code) => {
  return new Promise(async (resolve, reject) => {
    const headers = getHeaders();
    const loginInfo = {
      code,
    };
    console.log(loginInfo);
    try {
      const response = await fetch(urlLogin, {
        method: 'POST',
        headers,
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      setCookie('access_token', result.token);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (getToken()) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="App">
        <GoogleLoginButton
          onError={(error) => {
            console.log(error);
          }}
          onLogin={(code) => {
            console.log(code);
            login(code)
              .then(() => {
                this.props.history.push('/');
              })
              .catch((error) => {
                console.log(error);
              });
          }}
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

  logout() {
    deleteCookie('access_token');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <h1>Welcome to home page.</h1>
        <button onClick={() => this.logout()}>Logout</button>
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
