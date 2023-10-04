import React from "react";

export default function HiddenSection({ section, register }) {
  function createHiddenInput(field, index) {
    if (field.label == "Projet") {
      return (
        <input
          {...register(field.id.toString())}
          className="form-control"
          type="hidden"
          defaultValue={document.querySelector("#showForm").dataset.projet}
          key={index}
        />
      );
    }
  }

  if (section.section.sectionName == "hidden") {
    {
      return section.section.mappedFields.map((field, index) =>
        createHiddenInput(field.field, index)
      );
    }
  }
}
