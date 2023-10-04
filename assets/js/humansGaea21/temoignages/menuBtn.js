

import React from 'react';
import ReactDOM from 'react-dom';
import TemoignagesEcrits from './TemoignagesEcrits';
import GaeaVideos from './GaeaVideos';
import Contenu from './Contenu';
import NavBarDep from './NavBarDep.js';
import NavBarPro from './NavBarPro';
import GaeaPodcast from './GaeaPodcast';

export default class BtnMenu extends React.Component {

    constructor(props) {
        super(props);

        this.btn;

        this.state = {
            index: 0
        }

        this.onHandleCLick = this.onHandleCLick.bind(this);

    }

    componentDidMount() {

        this.btn = document.getElementsByClassName('btnMenu');
    }

    rendreContenu() {
        return new Promise((resolve, reject) => {
            ReactDOM.render(<Contenu />, document.getElementById('contenue'));
            resolve();
        })
    }

    async onHandleCLick(e) {
        //Rendre le contenu comme il est
        await this.rendreContenu();


        ReactDOM.render(<NavBarDep setFiltre={this.props.setFiltre} />, document.getElementById("navBarDep"));
        ReactDOM.render(<NavBarPro />, document.getElementById("NavBarPro"));
        document.getElementById("somLettre").style.display = "flex";

        var index = -1;
        for (let i = 0; i < 3; i++) {
            var elem = this.btn[i];
            if (elem.textContent == e.target.textContent) {
                elem.className = "btnMenu clicked";
                index = i;
            } else
                elem.className = "btnMenu";
        }

        this.setState({ index: index });

        if (index == 0) {
            ReactDOM.render(<GaeaVideos filtre={this.props.filtre} />, document.getElementById('videoTem'));
        } else if (index == 1) {
            ReactDOM.render(<TemoignagesEcrits filtre={this.props.filtre} />, document.getElementById('videoTem'));
        } else {
            ReactDOM.render(<GaeaPodcast filtre={this.props.filtre} />, document.getElementById('videoTem'));
        }
    }

    componentDidUpdate() {
        if (this.state.index == 1) {
            ReactDOM.render(<TemoignagesEcrits filtre={this.props.filtre} />, document.getElementById('videoTem'));
        } else if (this.state.index == 0) {
            ReactDOM.render(<GaeaVideos filtre={this.props.filtre} />, document.getElementById('videoTem'));
        } else {
            ReactDOM.render(<GaeaPodcast filtre={this.props.filtre} />, document.getElementById('videoTem'));
        }
    }


    render() {
        return <div className="listBtnMenu">
            <button className="btnMenu clicked" onClick={this.onHandleCLick}> Vidéos </button>
            <button className="btnMenu" onClick={this.onHandleCLick}> Témoignages écrits </button>
            <button className="btnMenu" onClick={this.onHandleCLick}> Podcasts </button>
        </div>
    }
}