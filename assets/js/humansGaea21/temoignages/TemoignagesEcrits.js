import React from 'react';
import ReactDOM from 'react-dom';

import DetailTem from './TemoignageEcrisDetail.js'

import {temoignages} from './TestTem.js'

export default class TemoignagesEcrits extends React.Component{
    
    constructor(props){
        super(props);
        this.temoignages = temoignages;

        this.affiche = this.temoignages;

        this.state = {
            temoignages : this.temoignages
        }

             
    }

    filtreHandel(){
        let newTem = []; 
        let c = this.props.filtre.lettre;
        let dep = this.props.filtre.dep;
        
        this.temoignages.forEach(function(elem){
            //eleminer les espace 
            dep = dep.trim();
            elem.department = elem.department.trim();
            
            if(elem.titre[0].toLowerCase() == c && dep.includes(elem.department))
                newTem.push(elem)  
        })
        this.affiche = newTem;
    }

    render(){
        this.filtreHandel();
        return <React.Fragment>
            {this.affiche.map((elem, indice) => (
                <Temoignage key={indice} indice={indice} titre={elem.titre} 
                    temoignage="Je m'appelle Miezan mon autre prénom est Estelle :) . J'ai 26 ans et j'habite à Genève. Pourquoi as-tu intégré gaea21 ? J'ai intégré l'association car je me suis dit que c'est doublement bénéfique d’acquérir une expérience dans le marketing digital et d’en apprendre davantage sur le développement durable. Quel poste as-tu occupé ? J'ai été coordinatrice de projet en cosmétique durable et dans plusieurs sous-projets en Community Management. …"
                />
            ))}        
        </React.Fragment>
    }
}


class Temoignage extends React.Component{
    constructor(props){
        super(props);

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    mouseEnter(){
        document.getElementById("btn-temoignage"+this.props.indice).src = "../../../images/humansGaea21/Groupe 797@2x.png";
    }

    mouseLeave(){
        document.getElementById("btn-temoignage"+this.props.indice).src = "../../../images/humansGaea21/Groupe 884@2x.png";
    }

    handleClick(){
        document.getElementById("somLettre").style.display = "none";
        ReactDOM.render(<DetailTem titre={this.props.titre}/>, document.getElementById('contenue'));
    }

    render(){
        return <div className="listTemoignage">
            <div className="imgTemEcrit">
                <img src="../../../images/humansGaea21/Capture d’écran 2022-05-18 à 18.59@2x.png"/>
            </div>
            <div>
                <h1>{this.props.titre}</h1>
                <p>{this.props.temoignage}</p>
                <div className="divButton">
                    <button onClick={this.handleClick} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                        <img  id={"btn-temoignage"+this.props.indice} className="temoignage" src="../../../images/humansGaea21/Groupe 884@2x.png"/>
                        Découvrir la suite du témoignages
                    </button>
                </div>
            </div>
        </div>
    }
}