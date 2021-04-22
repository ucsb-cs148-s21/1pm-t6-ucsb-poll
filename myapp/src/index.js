import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom"; // must be ancestor of auth0-provider-with-history
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history"; // for auth0 routing


ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
