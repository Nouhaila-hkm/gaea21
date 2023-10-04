import React, { Component, useState } from "react";
import AddRemoveInputField from "./AddRemoveInputField";
import ReactDOM from "react-dom";
import axios from "axios";
// import SectionForm_2 from "./createforms/SectionForm_2";
import { Button } from "react-bootstrap";
import "/assets/styles/createforms.scss";
import EasyEdit, { Types } from "react-easy-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default class ShowOneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulaire: [],
      section: [],
      mappedSections: [],
      label: [],
      loading: true,
      editMode: false,
      formValue: [{ name: '', mail: '' }]
    };


    const session = document.querySelector("#ShowOneForm").dataset.form_session;
  }


  componentDidMount() {
    this.getMappedSections();
  }

  getMappedSections() {

    const id = document.querySelector("#ShowOneForm").dataset.id;
    axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
    axios

        .get(`http://localhost:8000/api/show/${id}`)
        .then((response) => {
          this.setState({
            formulaire: response.data,
            section: response.section,
            mappedSections: response.data.mappedSections,
            loading: false,
          });

        })
        .catch((error) => {
          console.log(error.response);
        });
  }

  deleteFormById(id, event) {
    event.preventDefault();
    axios
        .delete(`http://localhost:8000/api/show/delete/${id}`)
        .then((res) => {
          this.getMappedSections();
          //console.log(res);
        })
        .then(function (res) {
          window.location.href = "http://localhost:8000/index";
        })
        .catch((error) => {
          console.log(error.response);
        });
  }


  render() {
    const loading = this.state.loading;

    return (
        <div >
          {loading ? (
              <div className={"row text-center"}>
                <span className="fa fa-spin fa-spinner fa-4x"></span>
              </div>
          ) : (
              <div>
                <h4 style={{ textAlign: "center" }}>
                  <EasyEdit

                      type={Types.TEXT}
                      value={this.state.formulaire.formName}
                      // onSave={(val) => console.log(val)}
                      onSave={(val) =>window.location.replace('http://127.0.0.1:8000/editForm?val='+val+'&id='+this.state.formulaire.id)}
                      deleteButtonLabel="delete"
                      deleteButtonStyle="remove-class"
                      hideDeleteButton={false}
                      saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                      cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                      editMode={this.state.editMode}
                  />
                  <br />
                  <EasyEdit
                      type={Types.TEXT}
                      value={this.state.formulaire.class}
                      // onSave={(val) => console.log(val)}
                      onSave={(val) =>window.location.replace('http://127.0.0.1:8000/editFormClass?val='+val+'&id='+this.state.formulaire.id)}
                      deleteButtonLabel="delete"
                      deleteButtonStyle="remove-class"
                      hideDeleteButton={false}
                      saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                      cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                      editMode={this.state.editMode}
                  />
                  <br />
                </h4>
                <div style={divStyle}>
                  {this.state.mappedSections.map((mappedSection, sectionid) => (
                      <SectionForm_2
                          key={sectionid}
                          section={mappedSection.section}
                      />

                  ))}
                </div>

              </div>
          )}
        </div>

    );
  }
}

const divStyle = {
  fontSize: '1rem',


};

const btn = {
  textAlign: 'center',
  position: 'relative',
  bottom: '-17rem',
};


ReactDOM.render(<ShowOneForm />, document.getElementById("ShowOneForm"));

