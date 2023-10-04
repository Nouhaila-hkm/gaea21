import React from "react";
import { Accordion } from "react-bootstrap";
import SectionPreview from "./SectionPreview";

export default function FormPreview(props) {
  const form = props.form;
  const sections = props.form.mappedSections;

  function showSection(section, index) {
    if (section.section.is_active)
      return (
        <SectionPreview mappedSection={section} key={index} index={index} />
      );
  }

  return (
    <div className="formPreview">
      <div className="formPInfo p-2 mb-4">
        <h2 className="text-center mb-4">Preview du Formulaire</h2>
        <h3 className="text-center">{form.formName}</h3>
      </div>
      <Accordion defaultActiveKey={0}>
        {sections.map((section, index) => showSection(section, index))}
      </Accordion>
    </div>
  );
}
