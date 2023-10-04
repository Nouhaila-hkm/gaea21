import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import RadioForm from "./RadioForm";
import PasswordForm from "./PasswordForm";
import PhoneForm from "./PhoneForm";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Section(props) {
  const [section, setSection] = useState([]);
  //const [editMode, setEditMode] = useState([]);
  const [mappedField, setMappedField] = useState([]);

  const id = document.querySelector("#ShowOneForm").dataset.id;

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputTable = document.querySelectorAll(".allInputs");

    inputTable.forEach((input) => {
      if (input.dataset.typename) {
        console.log(input.dataset.typename);
      }
      axios
        .put("/api/mapped_form_datas/" + input.dataset.mappedformdataid, {
          answer: input.dataset.value,
          field: "/api/fields/" + input.dataset.fieldid,
        })
        .then(function (response) {
          //console.log( response.data );
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  useEffect(() => {
   // console.log(props.section.mappedFields);
    setSection(props.section);
   // console.log(props.section);
    setMappedField(props.section.mappedFields);
  }, []);

  const handleChange = (index, event) => {
    const input = [...mappedField];
    if (event.target.name === "labelForm") {
      input[index].labelForm = event.target.value;
    } else if (event.target.name === "inputForm") {
      input[index].inputForm = event.target.value;
    }
    setMappedField(input);
  };
  

  const handleRemoveFields = (index) => {
    const input = [...mappedField];
    input.splice(index, 1);
    setMappedField(input);
  };

 const  deleteSection = () => {
      var child = document.getElementById("child");
      var parent = document.getElementById("parent");
      parent.removeChild(child);
  }


  return (
    <div className="sectionForm" id="parent">
      <div id="child">
      <h4 >
        {section.sectionName}<Button
                as="input"
                type="reset"
                value="Delete"
                onClick={() =>
                  deleteSection()
                }
              ></Button>
      </h4>
      <form onSubmit={handleSubmit} method="post" className="componentForms">
        <ul className="componentForm">
          {mappedField.map((mappedField, index) => (
            <li
              key={index}
              className={`${mappedField.field.size === 2 ? "twoSize" : ""}`}
            >
              <div>
                {mappedField.field.type.typeName == "select" ? (
                  <SelectForm field={mappedField.field} />
                ) : mappedField.field.type.typeName == "radio" ? (
                  <RadioForm field={mappedField.field} />
                ) : mappedField.field.type.typeName == "password" ? (
                  <PasswordForm field={mappedField.field} />
                ) : mappedField.field.type.typeName == "phone" ? (
                  <PhoneForm field={mappedField.field} />
                ) : (
                  <InputForm field={mappedField.field} />
                )}
              </div>
              <Button
                variant="danger"
                onClick={(event) => handleRemoveFields(index, event)}
              >
                {<FontAwesomeIcon icon={faTimes} />}
              </Button>
            </li>
          ))}
        </ul>
      </form>
      </div>
    </div>
  );
}
