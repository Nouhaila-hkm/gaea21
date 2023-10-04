import React from 'react'

export default class HeaderAlumni extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show : false,
            src : "../../images/humansGaea21/Groupe 957@2x.jpg"
        }
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        this.paragraphe = document.getElementById("parag");
    }

    handleClick(e){
        if(this.state.show == false){
            this.setState({
                show: true,
                src: "../../images/humansGaea21/Groupe 958@2x.jpg"
            })

            this.paragraphe.classList.add("show");
        }else{
            this.setState({
                show: false,
                src: "../../images/humansGaea21/Groupe 957@2x.jpg"
            })

            this.paragraphe.classList.remove("show");
        }
    }
    render() {
        return <React.Fragment>
            <h1>Alumni</h1>
            <p id="parag">Alumni est un projet au sein du département Marketing de gaea21 créé pour garantir une continuité de l’association. Un passage au sein de gaea21 est marqué par une date de début mais aussi de fin, cependant gaea21 souhaite que cette dernière ne soit pas une séparation définitive de l’association Les alumnis gaea21 sont les anciens membres passés au travers de l'association et ce projet a pour but de maintenir les liens de camaraderie et les valeurs tissés au sein de gaea21.<br/> <br/>  Avec ce projet alumni, gaea21 met à disposition de tous ses alumnis un site qui leur est entièrement dédié : toute personne ayant travaillé pour gaea21, quel que soit leur temps de travail, formation ou langue. gaea21 offre un réseau aux anciens membres gaea, ainsi qu’un accompagnement sur mesure et un suivi dans la gestion de carrière. Cet accompagnement efficace concerne la recherche d’emploi, la préparation aux entretiens et un soutien pour mener à bien son processus de recrutement.<br/><br/> Pour poursuivre sa sensibilisation au développement durable, gaea21 donne aussi l’opportunité à ses membres alumnis d’accéder au programme Sustainable Living Programme : Green coaching, consom’action, Grown your own, Economie collaborative, Green events series mais également l’accès au programme Répertoire vert qui permet de retrouver les entreprise vertes autour de chez vous.</p>
            <img  id="controleText" src={this.state.src} onClick={this.handleClick}/>
        </React.Fragment>
    }
}