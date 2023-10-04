
import '../../styles/topbar.scss';
import '../../styles/humansGaea21/staff/staff.scss';
import '../../styles/humansGaea21/staff/autocomplete.scss';
import '../../styles/humansGaea21/staff/modalstaff.scss';

import React from 'react';
import ReactDOM from 'react-dom';


import NavBarDep from './staff/NavBarDep.js';
import NavBarPro from './staff/NavBarPro.js';

import Filtre from './staff/Filtre.js';
import Header from './staff/Header.js';
import GaeaStaff from './staff/GaeaStaff.js';
import GaeaFooter from './temoignages/GaeaFooter.js';
import RandomPictures from './staff/RandomPictures.js';


class App {

    constructor() {

        this.filtre = {
            lettre: '',
            dep: '',
            project: '',
            subProject: ''
        }

        this.setFiltre = this.setFiltre.bind(this);

        ReactDOM.render(<RandomPictures setFiltre={this.setFiltre} filtre={this.filtre} />, document.getElementById("randomPictures"));

        ReactDOM.render(<Header setFiltre={this.setFiltre} filtre={this.filtre} />, document.getElementById("headerStaff"));

        ReactDOM.render(<Filtre setFiltre={this.setFiltre} />, document.getElementById("somLettre"));

        ReactDOM.render(<NavBarDep setFiltre={this.setFiltre} />, document.getElementById("navBarDep"));

        ReactDOM.render(<NavBarPro setFiltre={this.setFiltre} projectType={"project"} />, document.getElementById("NavBarPro"));

        ReactDOM.render(<NavBarPro setFiltre={this.setFiltre} projectType={"subProject"} />, document.getElementById("NavBarSubPro"));

        ReactDOM.render(<GaeaStaff filtre={this.filtre} />, document.getElementById('listeStaff'));

        ReactDOM.render(<GaeaFooter />, document.getElementById('humansFooter'));


    }

    ////Si index = 0 alors changer la lettre , si index = 1 alors changer le departement 
    setFiltre(index, c) {
        if (index == 0)
            this.filtre.lettre = c;
        else if (index == 1)
            this.filtre.dep = c;
        else if (index == 2)
            this.filtre.project = c;
        else if (index == 3)
            this.filtre.subProject = c;
        ReactDOM.render(<GaeaStaff filtre={this.filtre} />, document.getElementById('listeStaff'));
    }

}

new App;