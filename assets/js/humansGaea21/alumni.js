
import '../../styles/topbar.scss';
import '../../styles/humansGaea21/alumni/alumni.scss'



import React from 'react';
import ReactDOM from 'react-dom';
import GaeaFooter from './temoignages/GaeaFooter.js';
import HeaderAlumni from './alumni/headerAlumni.js';
import Logo from './alumni/Logo.js';



ReactDOM.render(<HeaderAlumni/>, document.getElementById('contenu'));
ReactDOM.render(<Logo/>, document.getElementById("listeLogo"));
ReactDOM.render(<GaeaFooter/>, document.getElementById('humansFooter'));

