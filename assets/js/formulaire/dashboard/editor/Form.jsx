import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import EasyEdit, { Types } from "react-easy-edit";
import FormPreview from "../preview/FormPreview";
import Section from "./Section";
import "/assets/styles/form/formEditor.scss";

export default function Form() {
  const [formulaire, setFormulaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formTypes, setFormTypes] = useState([]);
  const formID = document.querySelector("#Form").dataset.id;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  useEffect(() => {
    async function getAPIFieldTypes() {
      try {
        const res = await axios.get("/form/api/formTypes");
        setFormTypes(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    async function getAPIForm() {
      try {
        const res = await axios.post(`/form/api/info/`, { id: formID });
        setFormulaire(res.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getAPIForm();
    getAPIFieldTypes();
  }, []);

  function updateFormInfo(value, key) {
    const form = { ...formulaire, [key]: value };
    setFormulaire(form);
    updateFormAPI(form);
  }

  function updateFormAPI(form) {
    if (confirm("Voulez vous mettre à jour le formulaire?")) {
      axios.post("/form/api/form/update", { state: form }).catch((error) => {
        console.log(error);
      });
    }
  }

  function archiveFormAPI(event) {
    event.preventDefault();
    if (confirm("Voulez vous supprimer le formulaire?")) {
      alert("Archiffage est en cours de mise en place");
      // WHEN DELETED DATA. WONT SHOW IN LIST WHY
      // axios
      //   .post("/form/api/form/delete", { id: formID })
      //   .then(function (res) {
      //     window.location.href = "/form/list";
      //   })
      //   .catch((error) => {
      //     console.error(error.response);
      //   });
    }
  }

  function newSection() {
    setLoading(true);
    if (confirm("Voulez vous rajouter une section au formulaire?")) {
      axios
        .post("/form/api/section/add", { state: formulaire })
        .then((response) => {
          setFormulaire(response.data);
          console.log(response.data);
          setLoading(false);
        });
    }
  }

  /**
   * Update form from child components able to send full form data
   * @param {formObjet} form
   */
  function updateSectionInfo(form) {
    setLoading(true);
    setFormulaire(form);
    setLoading(false);
  }

  /**
   * Show Emails associated to the Form
   * @returns JSX Element - Horizontal List Items of Emails
   */

  function showEmails() {
    if (formulaire.email != null && formulaire.email != "" && !loading) {
      const listEmail = formulaire.email.split(",");
      return listEmail.map((email, index) => (
        <li className="list-group-item" key={index}>
          <EasyEdit
            type={Types.TEXT}
            value={email}
            onSave={(v) => updateMail(v, index)}
            hideDeleteButton={true}
            saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
            cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
            editMode={false}
          />
          <span className="ms-2" onClick={(v) => deleteMail(v, index)}>
            x
          </span>
        </li>
      ));
    }
  }

  function addMail(email) {
    const list = getCurrentEmailArr();
    list.push(email);
    axiosUpdateMail(list);
  }

  function updateMail(email, index) {
    const list = getCurrentEmailArr();
    list[index] = email;
    axiosUpdateMail(list);
  }

  function deleteMail(event, index) {
    event.preventDefault();
    const list = getCurrentEmailArr();
    list.splice(index, 1);
    axiosUpdateMail(list);
  }

  function axiosUpdateMail(mailList) {
    setLoading(true);
    updateFormInfo(mailList.join(","), "email");
    setLoading(false);
  }

  function getCurrentEmailArr() {
    const emailInfo = document.getElementById("emailsInfo");
    const listItems = emailInfo.getElementsByTagName("li");
    const mailArray = [];
    for (let i = 0; i < listItems.length; i++) {
      mailArray[i] = listItems[i].textContent.slice(0, -1);
    }
    return mailArray;
  }

  function ifConditionActive(type) {
    if (formulaire[type]) {
      return "primary";
    } else {
      return "outline-primary";
    }
  }

  function switchCondition(type) {
    const opp = !formulaire[type];
    updateFormInfo(opp, type);
  }

  if (formulaire == null) return null;

  return (
    <>
      {loading ? (
        <div className="row text-center pt-5 gaea-full-height">
          <Spinner
            className="m-auto"
            animation="border"
            style={{ width: "10rem", height: "10rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="pt-3 pb-4" id="formInfo">
            <div className="container">
              <div className="row py-3 mx-3">
                <div className="col-2 align-items-center">
                  <a href="../list">Form List</a>
                </div>
                <div className="col-7">
                  <h2 className="text-center pt-4">
                    <span className="pe-4">Form Title -</span>
                    <EasyEdit
                      type={Types.TEXT}
                      value={formulaire.formName}
                      onSave={(v) => updateFormInfo(v, "formName")}
                      deleteButtonLabel="delete"
                      deleteButtonStyle="remove-class"
                      hideDeleteButton={true}
                      saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                      cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                      editMode={false}
                    />
                  </h2>
                </div>

                <div className="col-3 btn-group align-items-center">
                  <button className="btn btn-danger" onClick={archiveFormAPI}>
                    Delete Form
                  </button>
                </div>
              </div>
              <div>
                <div className="row text-center mx-3" id="formButtons">
                  <div className="col-4">
                    <Button variant="primary" onClick={newSection}>
                      Nouvelle Section
                    </Button>
                  </div>
                  <div className="col-4">
                    <Button
                      variant={ifConditionActive("show_label")}
                      onClick={() => switchCondition("show_label")}
                    >
                      Label
                    </Button>
                  </div>
                  <div className="col-4">
                    <Button
                      variant={ifConditionActive("show_description")}
                      onClick={() => switchCondition("show_description")}
                    >
                      Description
                    </Button>
                  </div>
                </div>
              </div>
              {formulaire.show_label || formulaire.show_description ? (
                <div className="row mx-3 form-label-description">
                  {formulaire.show_label ? (
                    <div className="col-6 pt-4">
                      <div className="label">Form Label</div>
                      <EasyEdit
                        type={Types.TEXT}
                        value={formulaire.label}
                        onSave={(v) => updateFormInfo(v, "label")}
                        deleteButtonLabel="delete"
                        deleteButtonStyle="remove-class"
                        hideDeleteButton={true}
                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                        editMode={false}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {formulaire.show_description ? (
                    <>
                      <div className="col-6 pt-4">
                        <div className="label">Form Description</div>
                        <EasyEdit
                          type="textarea"
                          value={formulaire.description}
                          onSave={(v) => updateFormInfo(v, "description")}
                          deleteButtonLabel="delete"
                          deleteButtonStyle="remove-class"
                          hideDeleteButton={true}
                          saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                          cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                          editMode={false}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              <div className="row mt-3 pb-4 mx-3" id="emailsInfo">
                <EasyEdit
                  type={Types.TEXT}
                  placeholder="Ajouter un mail"
                  onSave={(v) => addMail(v)}
                  hideDeleteButton={true}
                  saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                  cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                  editMode={false}
                />
                <ul
                  className="list-group list-group-horizontal"
                  id="email-list"
                >
                  {showEmails()}
                </ul>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row mt-3 mb-2" id="sectionsInfo">
              <div className="col-6">
                {formulaire.mappedSections.map((mappedSection, index) => (
                  <Section
                    key={index}
                    index={index}
                    mappedID={mappedSection.id}
                    mappedSection={mappedSection}
                    section={mappedSection.section}
                    updateSection={(section, index) =>
                      updateSectionInfo(section, index)
                    }
                    formTypes={formTypes}
                    formulaire={formulaire}
                    setFormulaire={[setFormulaire, setLoading]}
                    sections={formulaire.mappedSections}
                    loading={loading}
                  />
                ))}
              </div>
              <div className="col-5 offset-1 sticky-top previewForm">
                <FormPreview
                  form={formulaire}
                  formTypes={formTypes}
                  loading={loading}
                />
              </div>
            </div>
            <div className="col-8"></div>
            <div className="col-4 mb-4">
              <Button variant="primary" onClick={newSection}>
                Nouvelle Section
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("Form"));
root.render(<Form />);
