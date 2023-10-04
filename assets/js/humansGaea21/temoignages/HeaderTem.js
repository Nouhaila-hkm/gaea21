import React from "react";
import ReactDOM from "react-dom";
import TemoignagesEcrits from './TemoignagesEcrits';

import Contenu from './Contenu';
import NavBarDep from './NavBarDep.js';
import NavBarPro from './NavBarPro';


export default class HeaderTem extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleCLick = this.onHandleCLick.bind(this);
    }

    rendreContenu() {
        return new Promise((resolve, reject) => {
            ReactDOM.render(<Contenu />, document.getElementById('contenue'));
            resolve();
        })
    }

    async onHandleCLick(e) {

        if (document.getElementsByClassName("temDetail").length != 0) {
            //Rendre le contenu comme il est
            await this.rendreContenu();

            ReactDOM.render(<NavBarDep setFiltre={this.props.setFiltre} />, document.getElementById("navBarDep"));
            ReactDOM.render(<NavBarPro />, document.getElementById("NavBarPro"));
            document.getElementById("somLettre").style.display = "flex";

            ReactDOM.render(<TemoignagesEcrits filtre={this.props.filtre} />, document.getElementById('videoTem'));
        }
    }

    render() {
        return <React.Fragment>
            <h1 className="titreTemoignage">Témoignages</h1>
            <p className="titreParagraphe">Découvrez différents témoignages inspirants ! </p>
            <img className="back" onClick={this.onHandleCLick}
                src="../../../images/humansGaea21/Tracé 1105@2x.png"></img>
        </React.Fragment>
    }
}