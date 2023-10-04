import React from "react";
import { Accordion } from "react-bootstrap";
import FieldPreview from "./FieldPreview";

export default function SectionPreview(props) {
  const section = props.mappedSection.section;
  // props.section.mappedFields.sort(
  //   (a, b) => a.field.list_order - b.field.list_order
  // );
  // return props.section.mappedFields;
  const fields = orderMappedFields();

  function orderMappedFields() {
    props.mappedSection.section.mappedFields.sort(
      (a, b) => a.field.list_order - b.field.list_order
    );
    return props.mappedSection.section.mappedFields;
  }

  return (
    <Accordion.Item eventKey={props.index}>
      <Accordion.Header>
        <h3 className="h3 mb-3">{section.sectionName}</h3>
      </Accordion.Header>
      <Accordion.Body>
        <div className="row">
          {fields.map((field, index) => (
            <FieldPreview field={field.field} key={index} />
          ))}
          <hr />
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
