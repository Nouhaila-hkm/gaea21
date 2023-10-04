

import '../../styles/topbar.scss';
import '../../styles/humansGaea21/temoignages/temoignages.scss'



import React from 'react';
import ReactDOM from 'react-dom';

import NavBarDep from './temoignages/NavBarDep.js'
import NavBarPro from './temoignages/NavBarPro.js'
import BtnMenu from './temoignages/menuBtn';
import TemoignageVideo from './temoignages/GaeaVideos.js';
import GaeaFooter from './temoignages/GaeaFooter.js';
import Filtre from './temoignages/Filtre.js';
import Header from './temoignages/HeaderTem.js';

class App {
    constructor() {
        this.filtre = {
            lettre: 'a',
            dep: 'Marketing'
        }

        this.setFiltre = this.setFiltre.bind(this);


        ReactDOM.render(<Header setFiltre={this.setFiltre} filtre={this.filtre} />, document.getElementById("hearderTemoignage"));
        ReactDOM.render(<BtnMenu setFiltre={this.setFiltre} filtre={this.filtre} />, document.getElementById("menuTemoignages"));

        ReactDOM.render(<Filtre setFiltre={this.setFiltre} />, document.getElementById("somLettre"));

        ReactDOM.render(<NavBarDep setFiltre={this.setFiltre} />, document.getElementById("navBarDep"));

        ReactDOM.render(<NavBarPro setFiltre={this.setFiltre} />, document.getElementById("NavBarPro"));

        ReactDOM.render(<TemoignageVideo filtre={this.filtre} />, document.getElementById('videoTem'));


        ReactDOM.render(<GaeaFooter />, document.getElementById('humansFooter'));

    }

    ////Si index = 0 alors changer la lettre , si index = 1 alors changer le departement 
    setFiltre(index, c) {
        if (index == 0)
            this.filtre.lettre = c;
        else if (index == 1)
            this.filtre.dep = c;

        ReactDOM.render(<BtnMenu filtre={this.filtre} />, document.getElementById("menuTemoignages"));
    }

}

new App;