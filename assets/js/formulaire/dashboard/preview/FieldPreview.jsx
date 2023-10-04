import React from "react";
import InputPreview from "./InputPreview";

export default function FieldPreview(props) {
  const field = props.field;
  // console.log(field);
  function fieldSize() {
    if (field.size == 1) {
      return "col-6";
    } else {
      return "col-12";
    }
  }

  return (
    <>
      <div className={fieldSize()}>
        <div className="mb-3 row me-1">
          <label htmlFor={field.label} className="form-label">
            {field.label}
            {field.is_required && <span className="ms-2">*</span>}
          </label>
          <InputPreview field={field} />
        </div>
      </div>
    </>
  );
}
