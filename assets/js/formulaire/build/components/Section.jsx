import React from "react";
import Field from "./Field";

export default function Section(props) {
  const section = props.section.section;

  orderMappedFields();

  function orderMappedFields() {
    section.mappedFields.sort(
      (a, b) => a.field.list_order - b.field.list_order
    );
  }
  return (
    <div className="row">
      {section.show_header ? (
        <div className="sectionHeader mt-4">{section.sectionHeader}</div>
      ) : (
        <></>
      )}
      {section.mappedFields.map((field, index) => (
        <Field
          field={field.field}
          key={index}
          register={props.register}
          state={props.state}
          fieldState={props.fieldState}
        />
      ))}
    </div>
  );
}
