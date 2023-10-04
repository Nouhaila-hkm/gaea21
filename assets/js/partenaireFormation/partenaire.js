import React from 'react';


export default class Partenaire extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <React.Fragment>
            <BottomBar />
        </React.Fragment>
    }
}


class BottomBar extends React.Component {
    constructor(props) {
        super(props);

        this.notes = [
            {
                title: "A PROPOS ",
                contenu: [
                    "Vision", "Modèle", "Stratégie", "Organisation", "Charte"
                ]
            },
            {
                title: "SITE MAP",
                contenu: [
                    "Accueil", "Gaea21", "Projets", "Communauté", "Produits Et Services", "Rejoignez-Nous"
                ]
            },
            {
                title: "MENTIONS LÉGALES ",
                contenu: [
                    "Statuts", "Conditions", "Copyright", "©Gaea21 2012", "Design : Eco-Mind.Ch"
                ]
            },
            {
                title: "PARTENAIRES ",
                contenu: [
                    "Synlab Suisse", "Heartical", "Meltravel International"
                ]
            },
            {
                title: "CONTACT ",
                contenu: [
                    "Facebook", "Twitter", "Linkedin", "Rss", "Email"
                ]
            }
        ]
    }

    render() {
        return <div className="bottomBar">
            {this.notes.map((note, index) => <Note key={index} title={note.title} contenu={note.contenu} />)}
        </div>
    }
}

class Note extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className="noteGaea">
            <h1 className="noteTitle">{this.props.title}</h1>
            <div className="noteBody">
                {this.props.contenu.map((elem, index) => <NoteBody key={index} text={elem} />)}
            </div>
        </div>
    }
}

class NoteBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className="noteText">{this.props.text}</p>
    }
}