import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EasyEdit, { Types } from "react-easy-edit";
import Field from "./Field";

export default function Section(props) {
  const section = props.section;
  const mappedFields = orderMappedFields();
  const fields = setFieldsList();
  const [setformulaire, setLoading] = props.setFormulaire;
  const id = document.querySelector("#Form").dataset.id;

  function setFieldsList() {
    const fieldsArray = [];
    const fields = props.section.mappedFields.sort(
      (a, b) => a.field.list_order - b.field.list_order
    );
    fields.map((fielder, index) => (fieldsArray[index] = fielder.id));
    return fieldsArray;
  }

  function orderMappedFields() {
    props.section.mappedFields.sort((a, b) => {
      return a.field.list_order - b.field.list_order;
    });
    return props.section.mappedFields;
  }

  const deleteSection = () => {
    console.log(section);
    if (confirm("Voulez vous effacer la section?")) {
      axios
        .post("/form/api/section/delete", {
          id: section.id,
          formID: id,
          mappedID: props.mappedID,
          fields: section.mappedFields,
          props: props,
          section: section,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function addField(event) {
    event.preventDefault();
    if (confirm("Ajouter un field?")) {
      setLoading(true);
      axios
        .post("/form/api/field/add", {
          section: section,
          formID: id,
        })
        .then((response) => {
          props.updateSection(response.data);
        });
    }
  }

  const deleteField = (event, field) => {
    event.preventDefault();
    console.log(field.id);
    console.log(field);
    if (confirm("Effacer le field?")) {
      setLoading(true);
      axios
        .post("/form/api/field/delete", {
          field: field,
          formID: id,
        })
        .then((response) => {
          setformulaire(response.data);
          setLoading(false);
        });
    }
  };

  function updateFieldInfo(form) {
    props.updateSection(form);
  }

  function updateSectionInfo(value, type) {
    const newMappedSection = {
      ...props.mappedSection,
      ["section"]: { ...section, [type]: value },
    };
    const newSections = props.sections;
    newSections[props.index] = newMappedSection;

    const newForm = { ...props.formulaire, ["mappedSections"]: newSections };
    axios
      .post("/form/api/section/update", {
        section: { ...section, [type]: value },
      })
      .then(() => {
        props.updateSection(newForm);
      });
  }

  function ifConditionActive(type) {
    if (section[type]) {
      return "primary";
    } else {
      return "outline-primary";
    }
  }

  function switchCondition(type) {
    const opp = !section[type];
    updateSectionInfo(opp, type);
  }

  return (
    <div className="py-4 px-3 mb-4 sectionForm">
      <div className="row pb-4">
        <div className="col-6">
          <div className="label pb-4">
            Section Label
            <Button
              className="ms-3"
              variant={ifConditionActive("show_header")}
              onClick={() => switchCondition("show_header")}
            >
              Visible
            </Button>
          </div>
          <EasyEdit
            type={Types.TEXT}
            value={section.sectionName}
            onSave={(save) => updateSectionInfo(save, "sectionName")}
            deleteButtonLabel="delete"
            deleteButtonStyle="remove-class"
            hideDeleteButton={true}
            saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
            cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
            editMode={false}
          />
        </div>
        <div className="col-6 inputBar text-center">
          <Button className="btn" onClick={(event) => addField(event)}>
            Add Input
          </Button>
          <Button
            as="input"
            type="reset"
            value="Delete Section"
            className="btn btn-danger mt-3"
            onClick={() => deleteSection()}
          ></Button>
        </div>
      </div>
      <div className="row text-center componentForm">
        {mappedFields.map((mappedField, index) => (
          <div key={index} className="col-6 my-3">
            <div className="row align-items-center">
              <div className="col-10 fieldInfo">
                <Field
                  mappedField={mappedField}
                  form={props.formulaire}
                  section={section}
                  sectionKey={props.index}
                  field={mappedField.field}
                  fields={fields}
                  fieldKey={index}
                  formTypes={props.formTypes}
                  setFormulaire={props.setFormulaire}
                  updateField={(field, index) => updateFieldInfo(field, index)}
                  loading={props.loading}
                />
              </div>
              <div className="col-2">
                <Button
                  variant="danger"
                  onClick={(event) => deleteField(event, mappedField)}
                >
                  {<FontAwesomeIcon icon={faTimes} />}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-3">
        <div className="col-4"></div>
        <Button
          className="col-4 mx-4"
          variant={ifConditionActive("is_active")}
          onClick={() => switchCondition("is_active")}
        >
          Active
        </Button>
      </div>
    </div>
  );
}
