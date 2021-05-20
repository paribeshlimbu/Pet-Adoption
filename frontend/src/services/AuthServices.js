// NPM Modules
import Axios from 'axios';
import Querystring from 'querystring';
// Material UI
// Own modules
import Session from '../models/Session';
// Assets
// CSS

// Endpoint
const API_URL = `${process.env.REACT_APP_API_URL}/authenticate`;

/**
* Objet API
*/
export default {
  
  /**
  */
  login: (login, password) => {
    // Endpoint
    let baseURL = `${API_URL}`;
    // Call endpoint and return
    return Axios.post(
      baseURL, 
      Querystring.stringify({ login, password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then(res => new Session(res.data.user));
  },

  /**
  */
  loginWithToken: (jwt) => {
    // Endpoint
    let baseURL = `${API_URL}/token`;
    // Call endpoint and return
    return Axios.post(baseURL,  { headers: { 'Authorization': `Bearer ${jwt}`}})
    .then(res => new Session(res.data.user));
  },

  /**
  */
  logout: (jwt) => {
    // Endpoint
    let baseURL = `${API_URL}/logout`;
    // Call endpoint and return
    return Axios.post(
      baseURL, 
      { headers: { 'Authorization': `Bearer ${jwt}`} }
    )
    .then(res => 'JWT invalidated');
  },

  /**
  */
  activate: (token) => {
    // Endpoint
    let baseURL = `${API_URL}/activate/${token}`;
    // Call endpoint and return
    return Axios.get(
      baseURL,
    )
    .then(res => res);
  },

  /**
  */
  resetRequest: (email) => {
    // Endpoint
    let baseURL = `${API_URL}/reset`;
    // Call endpoint and return
    return Axios.post(
      baseURL, 
      Querystring.stringify({ email }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then(res => res);
  },

  /**
  */
  reset: (token, password) => {
    // Endpoint
    let baseURL = `${API_URL}/reset/${token}`;
    // Call endpoint and return
    return Axios.post(
      baseURL, 
      Querystring.stringify({ password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then(res => res);
  },
}