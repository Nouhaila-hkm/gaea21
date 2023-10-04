import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EasyEdit, { Types } from "react-easy-edit";

export default function Field(props) {
  const [field, setField] = useState([]);
  const [setformulaire, setLoading] = props.setFormulaire;
  const [optionsData, setOptionsData] = useState([]);
  const [listData, setListData] = useState([]);
  const [optionGroupKey, setOptionGroupKey] = useState(-1);
  const [show, setShow] = useState(false);
  const [showOptionGroup, setShowOptionGroup] = useState(false);
  const [showFieldToOptionGroup, setShowFieldToOptionGroup] = useState(false);
  const [optionGroup, setOptionGroup] = useState([]);
  const [validOptionGroup, setValidOptionGroup] = useState(false);
  const [originalCount, setCount] = useState([]);
  const formTypes = props.formTypes;
  const fieldCount = props.section.mappedFields.length - 1;
  const fields = props.fields;

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    setField(props.field);
    setCount(props.field.list_order);
    if (props.field.field_listdatas.length > 0) {
      const options = getOptions();
      setOptionsData(options);
      setListData(props.field.field_listdatas);
    }
    if (props.section.optionGroups.length > 0) {
      setOptionGroup(props.section.optionGroups);
      setValidOptionGroup(true);
    }
  }, []);

  function setType(typeIndex) {
    setField({ ...field, ["type"]: formTypes[typeIndex] });
  }

  function getOptions() {
    const options = [];
    if (optionsData.length == 0) {
      props.field.field_listdatas.map(
        (option, index) =>
          (options[index] = { label: option.value, value: option.id })
      );
    } else {
      field.field_listdatas.map(
        (option, index) =>
          (options[index] = { label: option.value, value: option.id })
      );
    }
    return options;
  }

  const saveNewFieldOption = (value) => {
    const options = optionsData;
    const field_listdatas = field.field_listdatas;
    const object = { label: value, value: options.length };
    field_listdatas[options.length] = object;
    // console.log(options);
    options[options.length] = object;
    ({ ...field, ["field_listdatas"]: field_listdatas });
    // console.log(options);
    setOptionsData(options);
    const ul = document.getElementById("option-list");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(value));
    li.classList.add("list-group-item");
    ul.appendChild(li);
  };

  const updateFieldOption = (value, option) => {
    const field_listdatas = field.field_listdatas.map((optionChoice) => {
      if (optionChoice.id == option.value) {
        // console.log(option)
        console.log(optionChoice);
        // console.log(value)
        const choice = { ...optionChoice, value: value, label: value };
        // console.log(choice)
        return choice;
      }
      return optionChoice;
    });

    const options = [];
    field_listdatas.map(
      (option, index) =>
        (options[index] = { label: option.value, value: option.id })
    );

    setField({ ...field, ["field_listdatas"]: field_listdatas });
    setOptionsData(options);

    // field_listdatas[index] =
    // console.log(value)
    console.log(field);
  };

  function updateField(event) {
    event.preventDefault();
    if (confirm("Update field?")) {
      setLoading(true);
      if (props.field.list_order != field.list_order) {
        axios
          .post("/form/api/field/update", {
            field: field,
            formID: props.form.id,
            fields: fields,
          })
          .then((response) => {
            setformulaire(response.data);
            setLoading(false);
            handleClose;
          });
      } else {
        axios
          .post("/form/api/field/update", {
            field: field,
            formID: props.form.id,
          })
          .then((response) => {
            setformulaire(response.data);
            setLoading(false);
            handleClose;
          });
      }
    }
  }

  function ifConditionActive(type) {
    if (field[type]) {
      return "primary";
    } else {
      return "outline-primary";
    }
  }

  function setRequired(type) {
    if (field[type]) {
      setField({
        ...field,
        [type]: false,
      });
    } else {
      setField({
        ...field,
        [type]: true,
      });
    }
  }

  function fieldType(index, type) {
    // console.log(field);
    if (typeof field.type != "undefined" && type.id == field.type.id) {
      return (
        <option key={index} value={index} selected>
          {type.typeName}
        </option>
      );
    }
    return (
      <option key={index} value={index}>
        {type.typeName}
      </option>
    );
  }

  function deleteFieldOption(event, index) {
    event.preventDefault();
    console.table(listData[index]);
    if (confirm("Delete field option?")) {
      setLoading(true);
      axios
        .post("/form/api/delete/field/option", {
          option: listData[index],
          formID: props.form.id,
        })
        .then((response) => {
          setformulaire(response.data);
          setLoading(false);
          console.log(response);
        });
    }
  }

  function Select() {
    // console.log(field.type.id);
    if (
      field.type.typeName == "radio" ||
      field.type.typeName == "select" ||
      field.type.typeName == "checkbox" ||
      field.type.typeName == "question"
    ) {
      if (field.field_listdatas.length > 0) {
        return (
          <div className="mb-3 row justify-content-center">
            <div className="col-10 mb-2">
              <EasyEdit
                type="datalist"
                defaultValue="Vos Options"
                placeholder={`Ajouter des options pour ${field.label}`}
                onSave={saveNewFieldOption}
                options={optionsData}
                instructions="Ajouter des options!"
              />
            </div>
            <div className="row">
              <ul className="list-group" id="option-list">
                {optionsData.map((option, index) => (
                  <li key={index} className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col-9">
                        <EasyEdit
                          type={Types.TEXT}
                          onSave={(save) => updateFieldOption(save, option)}
                          value={option.label}
                        />
                      </div>
                      <div className="col-1 offset-1">
                        <button
                          type="button"
                          className="close"
                          aria-label="Close"
                          onClick={(event) => deleteFieldOption(event, index)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }
      return (
        <>
          <div className="mb-3 row justify-content-center">
            <div className="col-10 mb-2">
              <EasyEdit
                type="datalist"
                defaultValue="Vos Options"
                placeholder={`Ajouter des options pour ${field.label}`}
                onSave={saveNewFieldOption}
                options={optionsData}
                instructions="Ajouter des options!"
              />
            </div>
          </div>
          <div className="row">
            <ul className="list-group" id="option-list"></ul>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit - {field.label}
      </Button>

      <form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Input Formulaire - {field.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-3 my-2">
            <div className="mb-3 row">
              <label htlmfor="field-label" className="col-sm-5 col-form-label">
                Label
                <Button
                  className="ms-3"
                  variant={ifConditionActive("show_label")}
                  onClick={() => setRequired("show_label")}
                >
                  Visible
                </Button>
              </label>
              <div className="col-sm-7">
                <textarea
                  type="textarea"
                  className="form-control"
                  row="1"
                  id="field-label"
                  value={field.label}
                  onChange={(event) =>
                    setField({ ...field, ["label"]: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htlmfor="field-type" className="col-sm-5 col-form-label">
                Type d'input
              </label>
              <div className="col-sm-7">
                <select
                  className="form-select"
                  id="field-type"
                  onChange={(event) => setType(event.target.value)}
                >
                  {/* {console.log(field.type.id)} */}
                  {formTypes.map((type, index) => fieldType(index, type))}
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label htlmfor="field-size" className="col-sm-5 col-form-label">
                Size
              </label>
              <div className="col-sm-7">
                <select
                  className="form-select"
                  id="field-size"
                  defaultValue={field.size}
                  onChange={(event) =>
                    setField({ ...field, ["size"]: event.target.value })
                  }
                >
                  <option value="1">Petit</option>
                  <option value="2">Grand</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htlmfor="field-placeholder"
                className="col-sm-5 col-form-label"
              >
                Placeholder
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="field-placeholder"
                  value={field.placeholder}
                  onChange={(event) =>
                    setField({ ...field, ["placeholder"]: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htlmfor="field-size" className="col-sm-5 col-form-label">
                Ordre
              </label>
              <div className="col-sm-7">
                <input
                  type="number"
                  className="form-control form-list-order"
                  id="field-size"
                  min="0"
                  max={fieldCount}
                  value={field.list_order}
                  onChange={(event) =>
                    setField({ ...field, ["list_order"]: event.target.value })
                  }
                />
              </div>
            </div>
            <Select />
            <div className="row text-center">
              <div className="col-4">
                <Button
                  variant={ifConditionActive("is_active")}
                  onClick={() => setRequired("is_active")}
                >
                  Active
                </Button>
              </div>
              <div className="col-4">
                <Button
                  variant={ifConditionActive("is_required")}
                  onClick={() => setRequired("is_required")}
                >
                  Required
                </Button>
              </div>
              <div className="col-4">
                <Button
                  variant={ifConditionActive("is_unique")}
                  onClick={() => setRequired("is_unique")}
                >
                  Unique
                </Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="me-3" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => updateField(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}
