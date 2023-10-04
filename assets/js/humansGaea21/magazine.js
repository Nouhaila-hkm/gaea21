

import '../../styles/topbar.scss';
import '../../styles/humansGaea21/magazine/magazine.scss'



import React from 'react';
import ReactDOM from 'react-dom';
import GaeaFooter from './temoignages/GaeaFooter.js';
import MagazineBook from './magazine/MagazineBook';
import MiniaturesLastArchives from './magazine/MiniaturesLastArchives';
import ContenuePageArchive from './magazine/ContenuePageArchive';

class App extends React.Component{
    render() {
        return <React.Fragment>
            <h1>Magazine Humans of gaea21</h1>
            <p>Humans of gaea21 est un magazine qui s’inspire du fameux blog Humans of New York, créé par Brandon Stanton, dont le but est d’associer à chaque habitant de la mégalopole une histoire en quelques mots et une photo. Le magazine donne ainsi la parole à ses alumnis et ses membres actuels afin qu’ils puissent partager et témoigner de leur parcours, de l’ambiance et des compétences qu’ils ont acquis ou qu’ils sont en train d’acquérir lors de leur stage ou bénévolat au sein de l’association. Il a deux buts principaux. Tout d’abord, il vise à apporter plus de visibilité à ses membres et alumnis sur les actions et formations dans le domaine du développement durable que gaea21 propose, ainsi qu’à promouvoir l’expérience acquise par ses stagiaires et bénévoles. Ensuite, il récolte les témoignages de ses alumnis et de ses membres afin de les évaluer et de proposer des services de qualité à ses stagiaires et pour le recrutement des prochains membres de l’association. Les formats du magazine sont divers. Les formats audio et vidéo sont diffusés sur la page YouTube de l’association, tandis que le format écrit final est retranscrit dans le magazine Humans of gaea diffusé une fois par mois sur les réseaux sociaux de l’association. </p>

            <h1>Le magazine du mois !</h1>
        </React.Fragment>
    }
}


class PageMagazine{
    
    constructor(){
        this.magazines = [];

        this.handleArchiveClick = this.handleArchiveClick.bind(this)
        ReactDOM.render(<App />, document.getElementById("HeaderMagazine"));

        ReactDOM.render(<GaeaFooter/>, document.getElementById('humansFooter'));

    }

    chargerMagazines(){
        return new Promise(function (resolve){
            fetch("/humansGaea21/magazine/getMagazine")
            .then(res => res.json())
            .then(
                (result) => {
                    var res = [];
                    
                    result.forEach(function (elem){
                        let date =new Date(elem.magazineDate);
                        var magazine = {
                            month : date.getMonth(),
                            year : date.getFullYear(),
                            lien : elem.lienMagazine
                        }  
                        
                        res.push(magazine);
                    })
                    resolve(res);
                }
            )
        })
    }

    handleArchiveClick(){


        ReactDOM.unmountComponentAtNode(document.getElementById("Archive"));
        ReactDOM.unmountComponentAtNode(document.getElementById("goArchive"));
        ReactDOM.unmountComponentAtNode(document.getElementById("MagazineHumans"));
        ReactDOM.unmountComponentAtNode(document.getElementById("HeaderMagazine"));
        ReactDOM.render(<ContenuePageArchive magazines={this.magazines}/>, document.getElementById("HeaderMagazine"));
         
    }

    async chargerDonner(){
        this.magazines = await this.chargerMagazines();

        ReactDOM.render(<MagazineBook lienPdf={this.magazines[this.magazines.length-1].lien} idBook="0"/>, document.getElementById("MagazineHumans"));
        ReactDOM.render(<MiniaturesLastArchives magazines={this.magazines}/>, document.getElementById("Archive"));
        ReactDOM.render(<button id="btnArchive" onClick={this.handleArchiveClick}>Voir les archives &nbsp; {">"}</button> , document.getElementById("goArchive"));  
    }
}




class PageArchive extends React.Component{

    constructor(){
        super();
        ReactDOM.render(<ContenuePageArchive/>, document.getElementById("HeaderMagazine"));

        ReactDOM.render(<GaeaFooter/>, document.getElementById('humansFooter'));
    }

}

var pageMagazine = new PageMagazine(); 
pageMagazine.chargerDonner(); 

//var pageArchive = new PageArchive();
