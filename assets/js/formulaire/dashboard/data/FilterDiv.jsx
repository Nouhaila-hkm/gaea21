import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function FilterDiv({
  filterData,
  formTypes,
  formDataList,
  projectList,
  filter,
}) {
  const [searchVal, setSearchVal] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (searchVal != "" || searchOn) {
        filterData();
      }
    }, 1000);

    return () => clearTimeout(searchTimer);
  }, [searchVal]);

  function search(e) {
    setSearchOn(true);
    setSearchVal(e.target.value);
  }

  return (
    <div className="filter-border pt-4 sticky-top" id="filter">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Form.Select
              aria-label="Liste Formulaires"
              defaultValue={filter.formType}
              onChange={filterData}
            >
              <option value={-1}>Tous les formulaires</option>
              {formTypes.map((types, index) => (
                <option key={index} value={types.id}>
                  {types.formName}
                </option>
              ))}
            </Form.Select>
            <p className="mt-3">
              {formDataList == null || formDataList.length == 0 ? (
                <>Pas de réponse à la requète</>
              ) : (
                <>
                  {formDataList.length} réponse
                  {formDataList.length > 1 ? "s" : ""} formulaire
                </>
              )}
            </p>
          </div>
          <div className="col-3">
            <Form.Select
              aria-label="Liste Formulaires"
              defaultValue={filter.project}
              onChange={filterData}
            >
              <option value={-1}>Tout les projets</option>
              {projectList.map((projet, index) => (
                <option key={index} value={projet.id}>
                  {projet.projectName}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-3">
            <Form.Select
              aria-label="Date Values"
              defaultValue={filter.sort}
              onChange={filterData}
            >
              <option value={1}>Ancien - Nouveau</option>
              <option value={2}>Nouveau - Ancien</option>
            </Form.Select>
          </div>
          <div className="col-3">
            <Form.Control
              type="text"
              defaultValue={filter.search}
              onChange={(e) => search(e)}
              id="filter-search"
            />
            <Form.Text>Search</Form.Text>
          </div>
        </div>
      </div>
    </div>
  );
}
