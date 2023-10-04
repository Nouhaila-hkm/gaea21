import React from "react";

export default function InputPreview(props) {
  const field = props.field;

  switch (field.type.typeName) {
    case "textarea":
      return (
        <textarea
          type="textarea"
          className="form-control"
          id={field.label}
          value={field.placeholder}
          aria-label="Disabled input"
          disabled
          readOnly
        />
      );
    case "phone":
      return (
        <input
          type="text"
          className="form-control"
          id={field.label}
          value={field.placeholder}
          aria-label="Disabled input"
          disabled
          readOnly
        />
      );
    case "select":
      return (
        <select className="form-select" aria-label="Select formulaire">
          <option value="-1">{field.placeholder}</option>
          {field.field_listdatas.map((options, index) => (
            <option key={index} value={index}>
              {options.value}
            </option>
          ))}
        </select>
      );
    case "password":
      return (
        <input
          type="password"
          className="form-control"
          id={field.label}
          value={field.placeholder}
          aria-label="Disabled input"
          disabled
          readOnly
        />
      );
    case "date":
      return (
        <input
          type="date"
          className="form-control"
          id={field.label}
          value={field.placeholder}
          aria-label="Disabled input"
          disabled
          readOnly
        />
      );
    case "email":
      return (
        <input
          type="email"
          className="form-control"
          id={field.label}
          value={field.placeholder}
          aria-label="Disabled input"
          disabled
          readOnly
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
                disabled
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
                name={options.value}
                id={options.value}
                disabled
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
                name={options.value}
                id={options.value}
                disabled
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
          value={field.placeholder}
          aria-label="Disabled input"
          disabled
          readOnly
        />
      );
    default:
      return (
        <input
          type="text"
          className="form-control"
          id={field.label}
          value={field.placeholder}
          aria-label="Disabled input"
          disabled
          readOnly
        />
      );
  }
}
