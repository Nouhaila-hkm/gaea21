import React from 'react';
import RichTextEditor from './RichTextEditor';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import { convertToHTML } from 'draft-convert';
import {stateToHTML} from 'draft-js-export-html';

/* export default class Section extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        viewEditTitleButton: false,
        viewEditContentButton: false,
        indexSection: 0,
    };

      this.handleClickAdd = this.handleClickAdd.bind(this);
      this.handleClickDelete = this.handleClickDelete.bind(this);
      this.handleClickEdit = this.handleClickEdit.bind(this);
      this.handleClickEditFinal = this.handleClickEditFinal.bind(this);
    }
    
    //A chaque clique sur le bouton ajouter, on remplit le tableau de sections
    handleClickAdd (e){
        e.preventDefault();

        document.getElementById("SectionAnnounceMessage").innerHTML = "";
        
        const title = document.getElementById("titleSectionAnnounce").value;
        const content = document.getElementById("contenuSectionAnnounce").value;

        if((title === "") && (content === ""))
            document.getElementById("SectionAnnounceMessage").innerHTML = "Veuillez renseigner au moins un des champs";
        else{
            this.props.sections.push([title, content]);
            this.props.handleChangeSections(this.props.sections);
        }

        //Vide le champ des input
        document.getElementById("titleSectionAnnounce").value = "";
        document.getElementById("contenuSectionAnnounce").value = "";

        console.log("sections after add : "+this.props.sections);
    }

    handleClickDelete(e){
        e.preventDefault();

        const indexToDelete = e.target.parentNode.parentNode.getAttribute("id");
        const valToDelete = e.target.getAttribute("class");

        console.log(this.props.sections[indexToDelete][0]);
        console.log(this.props.sections[indexToDelete][1]);

        //valToDelete === "titleSectionDelete" ? this.props.sections[indexToDelete].splice(0, 1) : this.props.sections[indexToDelete].splice(1, 1);

        valToDelete === "titleSectionDelete" ? delete this.props.sections[indexToDelete][0] : delete this.props.sections[indexToDelete][1];


        if((this.props.sections[indexToDelete][0] === undefined || this.props.sections[indexToDelete][0] === null || this.props.sections[indexToDelete][0] === "")
            && (this.props.sections[indexToDelete][1] === undefined || this.props.sections[indexToDelete][1] === null || this.props.sections[indexToDelete][1] === "")){
                this.props.sections.splice(indexToDelete, 1);
        }
        
        console.log(document.getElementById(valToDelete))

        console.log("sections after delete : "+this.props.sections);
        this.props.handleChangeSections(this.props.sections);
    }

    handleClickEdit(e){
        e.preventDefault();

        console.log(e.target.parentNode.parentNode.getAttribute("id"));

        const indexToEdit = e.target.parentNode.parentNode.getAttribute("id");
        const valToEdit = e.target.getAttribute("class");

        if(valToEdit === "titleSectionEdit"){
            //afficher l'affichage dans un input text
            let editTitleInput = document.createElement("input");
            //Afficher le bouton
            this.setState({viewEditTitleButton: true, indexSection: indexToEdit});

            let contentEdit = this.props.sections[indexToEdit][0];

            //On efface l'affichage précédent.
            document.getElementById(indexToEdit).firstElementChild.firstElementChild.textContent = "";

            //Deplacer le contenu de editTitle dans titleSectionView
            document.getElementById(indexToEdit).firstElementChild.firstElementChild.prepend(editTitleInput);

            //insertion du titre dans l'input
            editTitleInput.value = contentEdit;
            editTitleInput.setAttribute("id", "editTitleInputValue");

            this.props.handleChangeSections(this.props.sections);

        }
        else{
             //afficher l'affichage dans un input text
             let editTitleInput = document.createElement("input");
             //Afficher le bouton
             this.setState({viewEditContentButton: true, indexSection: indexToEdit});
 
             let contentEdit = this.props.sections[indexToEdit][1];

             //On efface l'affichage précédent.
             document.getElementById(indexToEdit).lastElementChild.firstElementChild.textContent = "";
 
             //Deplacer le contenu de editTitle dans titleSectionView
             document.getElementById(indexToEdit).lastElementChild.firstElementChild.prepend(editTitleInput);
 
             //insertion du titre dans l'input
             editTitleInput.value = contentEdit;
             editTitleInput.setAttribute("id", "editContentInputValue");
 
             this.props.handleChangeSections(this.props.sections);
        }

    }

    handleClickEditFinal(e){
        e.preventDefault();

        //Evenement lorque l'on valide la modification
        
        const indexToUpdate = e.target.parentNode.parentNode.getAttribute("id");

        console.log(this.props.sections);
        console.log(this.props.sections[indexToUpdate][0]);
        console.log(this.props.sections[indexToUpdate][1]);

        if(this.state.viewEditTitleButton){
            //On enregistre la modif et on réaffiche en dûr
            this.props.sections[indexToUpdate][0] = document.getElementById("editTitleInputValue").value;
            document.getElementById("editTitleInputValue").remove();

            this.setState({viewEditTitleButton: false});
        }
        if(this.state.viewEditContentButton){
             //On enregistre la modif et on réaffiche en dûr
             this.props.sections[indexToUpdate][1] = document.getElementById("editContentInputValue").value;
             document.getElementById("editContentInputValue").remove();

             this.setState({viewEditContentButton: false});
        }

        this.props.handleChangeSections(this.props.sections);
    }
  
    render() {
      return (
        <div>
            <h3>Section</h3>

            <div id="contenuSectionAnnounceValidated">
                <ul>
                    {this.props.sections.map((section, index) =>
                        <li key={index} id={index}>
                            <div>
                                <h5 className="titleSectionView">{section[0]}</h5>
                            
                                {this.props.sections[index][0] ? (!this.state.viewEditTitleButton && !this.state.viewEditContentButton ? <button className="titleSectionDelete" onClick={this.handleClickDelete}>Supprimer</button> : "") : ""}
                                {this.props.sections[index][0] ? (!this.state.viewEditTitleButton && !this.state.viewEditContentButton ? <button className="titleSectionEdit" onClick={this.handleClickEdit}>Editer</button> : "") : ""}
                                {(this.state.viewEditTitleButton && this.state.indexSection == index) ? <button onClick={this.handleClickEditFinal}>Modifier</button> : ""}
                            </div>
                            <div>
                                <div className="contentSectionView">{section[1]}</div>
                                {this.props.sections[index][1] ? (!this.state.viewEditContentButton && !this.state.viewEditTitleButton ? <button onClick={this.handleClickDelete}>Supprimer</button> : "") : ""}
                                {this.props.sections[index][1] ? (!this.state.viewEditContentButton && !this.state.viewEditTitleButton ? <button onClick={this.handleClickEdit}>Editer</button> : "") : ""}
                                {(this.state.viewEditContentButton && this.state.indexSection == index) ? <button onClick={this.handleClickEditFinal}>Modifier</button> : ""}
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            <label for="titleSectionAnnounce" className="formLabel">Titre</label>
            <input type="text" id="titleSectionAnnounce" name="_titleSectionAnnounce"/>

            <label for="contenuSectionAnnounce" className="formLabel">Contenu</label>
            <textarea id="contenuSectionAnnounce" name="_contenuSectionAnnounce"/>

            <div id="SectionAnnounceMessage"></div>

            <button onClick={this.handleClickAdd} id="newSectionButton" type="submit" className="addButton">Ajouter</button>
        </div>
      );
    }
} */

export default class Section extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        viewEditTitleButton: false,
        viewEditContentButton: false,
        indexSection: 0,
        richText: "",
    };

      this.handleClickAdd = this.handleClickAdd.bind(this);
      this.handleClickDelete = this.handleClickDelete.bind(this);
      this.handleClickEdit = this.handleClickEdit.bind(this);
      this.handleClickEditFinal = this.handleClickEditFinal.bind(this);
      this.handleChangeRich = this.handleChangeRich.bind(this);
    }

    handleChangeRich(newValue){
        //this.setState({richText: JSON.stringify(convertToRaw(newValue.getCurrentContent()))});
        this.setState({richText: stateToHTML(newValue.getCurrentContent())});
        console.log(this.state.richText);
    }
    
    //A chaque clique sur le bouton ajouter, on remplit le tableau de sections
    handleClickAdd (e){
        e.preventDefault();

        document.getElementById("SectionAnnounceMessage").innerHTML = "";
        
        const title = document.getElementById("titleSectionAnnounce").value;
        const content = this.state.richText;

        if((title === "") && (content === ""))
            document.getElementById("SectionAnnounceMessage").innerHTML = "Veuillez renseigner au moins un des champs";
        else{
            this.props.sections.push([title, content]);
            this.props.handleChangeSections(this.props.sections);
        }

        //Vide le champ des input
        document.getElementById("titleSectionAnnounce").value = "";
        document.getElementById("contenuSectionAnnounce").value = "";

        console.log("sections after add : "+this.props.sections);
    }

    handleClickDelete(e){
        e.preventDefault();

        const indexToDelete = e.target.parentNode.parentNode.getAttribute("id");
        const valToDelete = e.target.getAttribute("class");

        console.log(this.props.sections[indexToDelete][0]);
        console.log(this.props.sections[indexToDelete][1]);

        //valToDelete === "titleSectionDelete" ? this.props.sections[indexToDelete].splice(0, 1) : this.props.sections[indexToDelete].splice(1, 1);

        valToDelete === "titleSectionDelete" ? delete this.props.sections[indexToDelete][0] : delete this.props.sections[indexToDelete][1];


        if((this.props.sections[indexToDelete][0] === undefined || this.props.sections[indexToDelete][0] === null || this.props.sections[indexToDelete][0] === "")
            && (this.props.sections[indexToDelete][1] === undefined || this.props.sections[indexToDelete][1] === null || this.props.sections[indexToDelete][1] === "")){
                this.props.sections.splice(indexToDelete, 1);
        }
        
        console.log(document.getElementById(valToDelete))

        console.log("sections after delete : "+this.props.sections);
        this.props.handleChangeSections(this.props.sections);
    }

    handleClickEdit(e){
        e.preventDefault();

        console.log(e.target.parentNode.parentNode.getAttribute("id"));

        const indexToEdit = e.target.parentNode.parentNode.getAttribute("id");
        const valToEdit = e.target.getAttribute("class");

        if(valToEdit === "titleSectionEdit"){
            //afficher l'affichage dans un input text
            let editTitleInput = document.createElement("input");
            //Afficher le bouton
            this.setState({viewEditTitleButton: true, indexSection: indexToEdit});

            let contentEdit = this.props.sections[indexToEdit][0];

            //On efface l'affichage précédent.
            document.getElementById(indexToEdit).firstElementChild.firstElementChild.textContent = "";

            //Deplacer le contenu de editTitle dans titleSectionView
            document.getElementById(indexToEdit).firstElementChild.firstElementChild.prepend(editTitleInput);

            //insertion du titre dans l'input
            editTitleInput.value = contentEdit;
            editTitleInput.setAttribute("id", "editTitleInputValue");

            this.props.handleChangeSections(this.props.sections);

        }
        else{
             //afficher l'affichage dans un input text
             let editTitleInput = document.createElement("input");
             //Afficher le bouton
             this.setState({viewEditContentButton: true, indexSection: indexToEdit});
 
             let contentEdit = this.props.sections[indexToEdit][1];

             //On efface l'affichage précédent.
             document.getElementById(indexToEdit).lastElementChild.firstElementChild.textContent = "";
 
             //Deplacer le contenu de editTitle dans titleSectionView
             document.getElementById(indexToEdit).lastElementChild.firstElementChild.prepend(editTitleInput);
 
             //insertion du titre dans l'input
             editTitleInput.value = contentEdit;
             editTitleInput.setAttribute("id", "editContentInputValue");
 
             this.props.handleChangeSections(this.props.sections);
        }

    }

    handleClickEditFinal(e){
        e.preventDefault();

        //Evenement lorque l'on valide la modification
        
        const indexToUpdate = e.target.parentNode.parentNode.getAttribute("id");

        console.log(this.props.sections);
        console.log(this.props.sections[indexToUpdate][0]);
        console.log(this.props.sections[indexToUpdate][1]);

        if(this.state.viewEditTitleButton){
            //On enregistre la modif et on réaffiche en dûr
            this.props.sections[indexToUpdate][0] = document.getElementById("editTitleInputValue").value;
            document.getElementById("editTitleInputValue").remove();

            this.setState({viewEditTitleButton: false});
        }
        if(this.state.viewEditContentButton){
             //On enregistre la modif et on réaffiche en dûr
             this.props.sections[indexToUpdate][1] = document.getElementById("editContentInputValue").value;
             document.getElementById("editContentInputValue").remove();

             this.setState({viewEditContentButton: false});
        }

        this.props.handleChangeSections(this.props.sections);
    }
  
    render() {
      return (
        <div>
            <h3>Section</h3>

            <div id="contenuSectionAnnounceValidated">
                <ul>
                    {this.props.sections.map((section, index) =>
                        <li key={index} id={index}>
                            <div>
                                <h5 className="titleSectionView">{section[0]}</h5>
                            
                                {this.props.sections[index][0] ? (!this.state.viewEditTitleButton && !this.state.viewEditContentButton ? <button className="titleSectionDelete" onClick={this.handleClickDelete}>Supprimer</button> : "") : ""}
                                {this.props.sections[index][0] ? (!this.state.viewEditTitleButton && !this.state.viewEditContentButton ? <button className="titleSectionEdit" onClick={this.handleClickEdit}>Editer</button> : "") : ""}
                                {(this.state.viewEditTitleButton && this.state.indexSection == index) ? <button onClick={this.handleClickEditFinal}>Modifier</button> : ""}
                            </div>
                            <div>
                                <div dangerouslySetInnerHTML={{__html:section[1]}} className="contentSectionView" />
                                {this.props.sections[index][1] ? (!this.state.viewEditContentButton && !this.state.viewEditTitleButton ? <button onClick={this.handleClickDelete}>Supprimer</button> : "") : ""}
                                {this.props.sections[index][1] ? (!this.state.viewEditContentButton && !this.state.viewEditTitleButton ? <button onClick={this.handleClickEdit}>Editer</button> : "") : ""}
                                {(this.state.viewEditContentButton && this.state.indexSection == index) ? <button onClick={this.handleClickEditFinal}>Modifier</button> : ""}
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            <label for="titleSectionAnnounce" className="formLabel">Titre</label>
            <input type="text" id="titleSectionAnnounce" name="_titleSectionAnnounce"/>

            <label for="contenuSectionAnnounce" className="formLabel">Contenu</label>
            <div id="contenuSectionAnnounce" name="_contenuSectionAnnounce"><RichTextEditor handleChangeRichData={this.state.richText}  handleChangeRich={this.handleChangeRich} /></div>

            <div id="SectionAnnounceMessage"></div>

            <button onClick={this.handleClickAdd} id="newSectionButton" type="submit" className="addButton">Ajouter</button>
        </div>
      );
    }
}