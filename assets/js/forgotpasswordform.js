import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/createforms.scss';
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import '../styles/forgotPassword/forgotPassword.scss'
import '../styles/forgotPassword/reinitPassword.scss'


ReactDOM.render(
    <ForgotPassword />, document.getElementById('forgotpasswordform'));
