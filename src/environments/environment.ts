// src/environments/environment.ts

export const environment = {
  production: false,
  auth: {
    domain: 'auth0-angular-sample.us.auth0.com',
    clientId: '0w6wUUGqSjhOwTXKjXaco8kqVbHGM6Te',
    redirectUri: window.location.origin,
  },
  dev: {
    serverUrl: 'http://localhost:4040',
  },
};
