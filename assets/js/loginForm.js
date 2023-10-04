import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/createforms.scss';
import '../styles/login/pagelogin.scss';
import Login from './components/login/login';


/**
 * This function is used to render the login form and the success message if the registration is a success
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    // Get the success boolean from the page datasets
    const isSuccess = document.getElementById('loginForm').dataset.success;

    let $successMessage = isSuccess ? "Votre compte à été créé avec succès." : null;

    return (
        <>
        <Login success={ $successMessage }/>
        </>
    );
}

ReactDOM.render(
    <App />, document.getElementById('loginForm'));
