import React from 'react';
import Collaborator from './Collaborator';
import Section from './Section';
import axios from 'axios';

export default class Main extends React.Component{

    constructor(props){
        super(props);
 
        this.state = {
            collaborators: [],
            sections: [],
        };
        this.handleChangeCollaborators = this.handleChangeCollaborators.bind(this);
        this.handleChangeSections = this.handleChangeSections.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if(this.props.collaboratorsData || this.props.sectionsData){
            this.setState({ 
                collaborators: JSON.parse(this.props.collaboratorsData),
                sections: JSON.parse(this.props.sectionsData),
            });
        }
      }

    //Metre à jour les données enfants
    handleChangeCollaborators(newCollaborators){
        this.setState({
            collaborators: newCollaborators
        });
    }

    handleChangeSections(newSections){
        this.setState({
            sections: newSections
        });
    }

    //Envoyer à l'enregistrement.
    handleClick(e){
        e.preventDefault();
        
        let formData = new FormData();
                    
        let objArr = {
            "title": document.getElementById('titleAnnounce').value,
            "collaborators": this.state.collaborators,
            "sections": this.state.sections,
        };

        formData.append('objArr',JSON.stringify(objArr))

        console.log(this.props.announceId);
        //Si c'est une édition d'annonce
        if(this.props.announceId){
            
            axios.post('/api/rh/announce/edit/'+this.props.announceId, formData)
            .then(function (response) {
                console.log('Edition de l annonce');
                console.log(response)
                document.getElementById('submitAnnounceMessage').innerHTML = response.data.message;

                document.getElementById("titleAnnounce").value = "";

                setTimeout(function(){document.location.href="/rh/announce";}, 4000);
                
                
            })
            .catch(function (error) {
                console.log('error:');
                console.log(error);
            });
        }
        //Sinon c'est une nouvelle annonce
        else{
            //axios setUser + setAnnonce. Envoyer title, sections et collaborators.
            axios.post('/api/rh/announce/new', formData)
                        .then(function (response) {
                            console.log('Creation de l annonce');
                            console.log(response)
                            document.getElementById('submitAnnounceMessage').innerHTML = response.data.message;

                            document.getElementById("titleAnnounce").value = "";

                            setTimeout(function(){document.location.href="/rh/announce";}, 4000);
                            
                            
                        })
                        .catch(function (error) {
                            console.log('error:');
                            console.log(error);
                        });
        }
    }

    render() {
        return (
            <div>
                <form className="userForm">
                    <label for="titleAnnounce" className="formLabel">Titre</label>
                    <input type="text" id="titleAnnounce" name="_titleAnnounce" defaultValue={this.props.titleData} />
                    <div id="titleAnnounceMessage"></div>

                    <Collaborator collaborators={this.state.collaborators} handleChangeCollaborators={this.handleChangeCollaborators}/>

                    <Section sections={this.state.sections} handleChangeSections={this.handleChangeSections}/>

                    <button id="newAnnounceButton" type="submit" className="formButton" onClick={this.handleClick}>Enregistrer</button>
                </form>

                <div id="submitAnnounceMessage"></div>

            </div>
        );
    }
}
