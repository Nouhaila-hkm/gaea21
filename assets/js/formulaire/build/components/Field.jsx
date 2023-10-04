import React, { useRef } from "react";

export default function Field(props) {
  const field = props.field;
  const fieldType = field.type;
  const input = useRef(null);
  const register = props.register;
  const state = props.state;

  const fieldStateFunc = props.fieldState;
  const fieldState = fieldStateFunc(field.label);
  // console.log(props);
  var rules = {
    required: false,
    maxLength: {
      value: 255,
      message: `${field.label} est trop long`,
    },
    minLength: {
      value: 1,
      message: `${field.label} est trop court`,
    },
  };

  // console.log(field);

  if (fieldType.rule) {
    rules = {
      ...rules,
      ["pattern"]: {
        value: new RegExp(fieldType.rule),
        message: `Erreur du format de l'information`,
      },
    };
  }
  if (fieldType.typeName == "textarea") {
    rules = {
      ...rules,
      ["maxLength"]: {
        value: 1000,
        message: `${field.label} est trop long`,
      },
    };
  }

  if (field.is_required) {
    rules = { ...rules, ["required"]: `${field.label} est requis` };
  }

  function ErrorMessage() {
    if (state[field.id] != undefined) {
      return (
        <div className="mt-3 form-field-error">{state[field.id].message}</div>
      );
    }
  }
  const handleButtonClick = function () {
    console.log(input.current.value);
  };
  // console.log(field);
  var fieldSizeBool = "col-6";
  if (field.size != 1) {
    fieldSizeBool = "col-12";
  }
  var fieldErrorDiv = "mb-3 row me-1 my-4 px-3";
  if (state[field.id] != undefined) {
    fieldErrorDiv = "mb-3 row me-1 my-4 px-3 error";
  }

  function placeHolder() {
    if (field.show_label) {
      if (field.is_required) {
        return `${field.placeholder} *`;
      } else {
        return field.placeholder;
      }
    } else {
      if (
        field.placeholder == "Default Placeholder" ||
        field.placeholder == "Hint" ||
        field.placeholder == ""
      ) {
        if (field.is_required) {
          return `${field.label} *`;
        } else {
          return field.label;
        }
      } else {
        if (field.is_required) {
          return `${field.placeholder} *`;
        } else {
          return field.placeholder;
        }
      }
    }
  }
  // console.log(field);

  function Input() {
    switch (fieldType.typeName) {
      case "textarea":
        return (
          <textarea
            {...register(field.id.toString(), rules)}
            className="form-control"
            placeholder={placeHolder()}
            rows="6"
          />
        );
      case "phone":
        return (
          <input
            {...register(field.id.toString(), rules)}
            className="form-control"
            placeholder={placeHolder()}
          />
        );
      case "select":
        return (
          <select
            {...register(field.id.toString(), rules)}
            className="form-select"
            aria-label="Select formulaire"
            defaultValue={-1}
          >
            <option value="-1" disabled>
              {field.placeholder}
            </option>
            {field.field_listdatas.map((options, index) => (
              <option key={index} value={options.value}>
                {options.value}
              </option>
            ))}
          </select>
        );
      //TODO SPECIAL RULES TO DISPLAY TO, but only send one etc.
      case "password":
        return (
          <input
            type="password"
            ref={input}
            className="form-control"
            id={field.label}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
        );
      case "date":
        return (
          <input
            type="date"
            ref={input}
            className="form-control"
            id={field.label}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
        );
      case "email":
        return (
          <input
            {...register(field.id.toString(), rules)}
            className="form-control"
            placeholder={placeHolder()}
          />
        );
      case "radio":
        return (
          <div className="form-check row">
            {field.field_listdatas.map((options, index) => (
              <div className="col-10 offset-2" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={options.value}
                  id={options.value}
                />
                <label className="form-check-label" htmlFor={options.value}>
                  {options.value}
                </label>
              </div>
            ))}
          </div>
        );
      case "question":
        return (
          <div className="form-check row">
            {field.field_listdatas.map((options, index) => (
              <div className="col-10 offset-2" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  ref={input}
                  name={options.value}
                  id={options.value}
                />
                <label className="form-check-label" htmlFor={options.value}>
                  {options.value}
                </label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="form-check row">
            {field.field_listdatas.map((options, index) => (
              <div className="col-4" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  ref={input}
                  name={options.value}
                  id={options.value}
                />
                <label className="form-check-label" htmlFor={options.value}>
                  {options.value}
                </label>
              </div>
            ))}
          </div>
        );
      case "url":
        return (
          <input
            type="url"
            className="form-control"
            id={field.label}
            ref={input}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
        );
      default:
        return (
          <input
            {...register(field.id.toString(), rules)}
            className="form-control"
            placeholder={placeHolder()}
          />
        );
    }
  }

  return (
    <>
      <div className={fieldSizeBool}>
        <div className={fieldErrorDiv}>
          {field.show_label ? (
            <label htmlFor={field.label} className="form-label">
              {field.label}
              {field.is_required && <span className="text-danger ms-2">*</span>}
            </label>
          ) : (
            <></>
          )}
          {Input()}
          <ErrorMessage />
        </div>
      </div>
    </>
  );
}
