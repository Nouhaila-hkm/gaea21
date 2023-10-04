import React from 'react';

export default class GaeaContact extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <React.Fragment>
            <h1 className="titleGaeaContacte">Contactez-nous !</h1>
            <p>Vous avez collaboré avec gaea21 et vous voulez nous partager votre expérience ?<br/> Faire un témoignage ?<br/> Faite nous une demande ici !</p>
            <form action="/humansGaea21/newMessage" methode="post" className="formContact" >
                <FormChamp nom="nom" valeur="Nom : " typeChamp="text" require={true}/>
                <FormChamp nom="prenom" valeur="Prénom : " typeChamp="text"/>
                <FormChamp nom="mail" valeur="Adresse mail :" typeChamp="text" require={true}/>
                <div className="champsMessage">
                    <label htmlFor="message" className='messageLabel'>Message : </label>
                    <textarea name="message"
                        id="message" className="contMessage" required={true}>

                    </textarea>
                </div>

                <button type="submit" className="send"><p className="butText">Envoyer</p></button>
            </form>
        </React.Fragment>
            
    }
}


///Un champs du formulaire
class FormChamp extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            value : ""
        }
        this.valueChanged = this.valueChanged.bind(this);
    }

    valueChanged(e){
        this.setState(
            {value : e.target.value}
            
        )

        this.props.valueChanged(e.target.name, e.target.value);
    }

    render(){
        return <div className="formChamps">
            <label htmlFor={this.props.nom} className='fromLabel' value={this.props.valeur}> {this.props.valeur}</label>
            <input className="champsCont" type={this.props.typeChamp} name={this.props.nom} 
                id={this.props.nom}  required={this.props.require}   
            ></input>
            
        </div>
    }
}

FormChamp.defaultProps = {
    require: false
}