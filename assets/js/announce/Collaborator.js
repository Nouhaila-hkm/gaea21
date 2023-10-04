import React from 'react';

export default class Collaborator extends React.Component {
    constructor(props) {
      super(props);
      this.handleClickAdd = this.handleClickAdd.bind(this);
      this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    
    //A chaque clique sur le bouton ajouter, on remplit le tableau de collaborateurs
    handleClickAdd (e){
        e.preventDefault();

        document.getElementById("collaboratorAnnounceMessage").innerHTML = "";

        const lastname = document.getElementById("CollaboratorAnnounceLastname").value;
        const firstname = document.getElementById("CollaboratorAnnounceFirstname").value;

        if(lastname === "" || firstname === "")
            document.getElementById("collaboratorAnnounceMessage").innerHTML = "Veuillez renseigner le champ";
        else{
            //Vide les champs input
            document.getElementById("CollaboratorAnnounceLastname").value = "";
            document.getElementById("CollaboratorAnnounceFirstname").value = "";
            //On ajoute le collaborateur au groupe
            this.props.collaborators.push([firstname, lastname]);

            console.log("collaborators after add : "+this.props.collaborators);

            this.props.handleChangeCollaborators(this.props.collaborators);

        }
    }

    handleClickDelete(e){
        e.preventDefault();

        const indexToDelete = e.target.parentNode.getAttribute("id1");
        this.props.collaborators.splice(indexToDelete, 1);

        console.log("collaborators after delete : "+this.props.collaborators);

        this.props.handleChangeCollaborators(this.props.collaborators);
    }
  
    render() {
      return (
        <div>
            <label for="collaboratorAnnounce" className="formLabel">Ajouter un collaborateur</label>
            <p>Nom </p><input type="text" id="CollaboratorAnnounceLastname" name="_collaboratorAnnounceLastname"/>
            <p>Prénom </p><input type="text" id="CollaboratorAnnounceFirstname" name="_collaboratorAnnounceFirstname"/>
            <div id="collaboratorAnnounceMessage"></div>
            <div id="collaboratorAnnounceLogin">
                <ul>
                    {this.props.collaborators.map((collaborator, index) =>
                        <li key={index} id1={index}>{collaborator[0]+" "+collaborator[1]}<button onClick={this.handleClickDelete}>X</button></li>
                    )}
                </ul>
            </div>
 
            <button onClick={this.handleClickAdd} id="newCollaboratorButton" type="submit" className="addButton">Ajouter</button>
        </div>
      );
    }
}
