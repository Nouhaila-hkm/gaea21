import React from 'react';
import Modal from 'react-bootstrap/Modal'

export default class ListeInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="info">
            <Info titre="Staff"
                contenue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo odio sed turpis vestibulum molestie. Morbi ut ornare purus. Curabitur ac augue sit amet mi posuere venenatis. Etiam consequat quam ex, eget aliquet dui lacinia eu. Maecenas quis orci et eros tincidunt iaculis. "
                lien="../../images/humansGaea21/Groupe de masques 62.png"
                href="staff"
            />
            <Info titre="Alumni"
                contenue="Alumni est un projet au sein du département Marketing de gaea21 créé pour garantir une continuité de l’association. Un passage au sein de gaea21 est marqué par une date de début mais aussi de fin, cependant gaea21 souhaite que cette dernière ne soit pas une séparation définitive de l’association. "
                lien="../../images/humansGaea21/Groupe de masques 56.png"
                href="alumni"
            />
            <Info titre="Programme humans of gaea21"
                contenue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo odio sed turpis vestibulum molestie. Morbi ut ornare purus. Curabitur ac augue sit amet mi posuere venenatis. Etiam consequat quam ex, eget aliquet dui lacinia eu. Maecenas quis orci et eros tincidunt iaculis. Aenean eu malesuada orci. "
                lien="../../images/humansGaea21/Groupe de masques 41.png"
                href="programme"
            />
            <Info titre="Magazine humans of gaea21"
                contenue="Humans of gaea21 est un magazine qui s’inspire du fameux blog Humans of New York, créé par Brandon Stanton, dont le but est d’associer à chaque habitant de la mégalopole une histoire en quelques mots et une photo. Le magazine donne ainsi la parole à ses alumnis et ses membres actuels afin qu’ils puissent partager et témoigner de leur parcours."
                lien="../../images/humansGaea21/Groupe de masques 58.png"
                href="magazine"
            />
        </div>
    }
}



class Info extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("clicked")
        window.location.href = "/humansGaea21/" + this.props.href;
    }

    render() {
        return <div className="elemInfo" onClick={this.handleClick}>
            <div className="divTitre" onClick={this.handleClick}><AfficheTitre texte={this.props.titre} /></div>
            <p className="infoContenue" onClick={this.handleClick}>{this.props.contenue}</p>
            <img className="infoImage" src={this.props.lien} onClick={this.handleClick} />
        </div>
    }
}

class AfficheTitre extends React.Component {
    constructor(props) {
        super(props);
        this.mots = this.props.texte.split(' ');

        this.taille = this.mots.length;

        this.mots.reverse();

        this.affichage = this.affichage.bind(this)
    }

    affichage(elem, index) {
        if (index == 0)
            return <h1 key={index} className="lastMot lastLigne">{elem}</h1>
        else if (index == this.taille - 1)
            return <h1 key={index} className="infoTitre">{elem}</h1>
        else {
            return <h1 key={index} className="infoTitre lastLigne">{elem}</h1>
        }
    }

    render() {
        return this.mots.map((elem, index) => this.affichage(elem, index))
    }
}