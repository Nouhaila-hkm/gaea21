import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/navbar/NavbarComponent.jsx';


/**
 * This function is used to render the navbar component
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    return (
        <Navbar />
    );
}

ReactDOM.render(
    <App />, document.getElementById('navbar'));
