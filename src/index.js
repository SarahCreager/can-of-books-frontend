import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-6xlimb1s.us.auth0.com"
    clientId="hDujZcwb4fa1OvDVrAQOaf6EBDGKqJJI"
    redirectUri="http://localhost:3000"
  >
    <App />,
  </Auth0Provider>,
  document.getElementById('root')
);
