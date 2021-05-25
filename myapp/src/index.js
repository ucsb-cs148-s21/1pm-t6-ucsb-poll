import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.js';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history"; // for auth0 routing
import { HashRouter } from 'react-router-dom';


ReactDOM.render((
  <HashRouter>
    <Auth0ProviderWithHistory>
      <App /> {/* The various pages will be displayed by the `Main` component. */}
    </Auth0ProviderWithHistory>
  </HashRouter>
  ), document.getElementById('root')
);

