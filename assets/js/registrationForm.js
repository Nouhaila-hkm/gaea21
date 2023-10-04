import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/createforms.scss';
import '../styles/user/showUser.scss'
import '../styles/register/register.scss'
import Registration from './components/registration/Registration';

ReactDOM.render(
    <Registration />, document.getElementById('registrationForm'));
