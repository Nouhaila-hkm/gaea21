import axios from "axios";
import React from "react";

import { Button } from "react-bootstrap";
import ReactDOM, { render } from "react-dom";
//import AddRemoveInputField from "./AddRemoveInputField";

const baseURL = "http://localhost:8000/api/show";


export default function ShowForms() {
  const [formulaire, setFormulaire] = React.useState(null);
  const [mappedSections, setMappedSections] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        setFormulaire(response.data);
        setMappedSections(response.data.mappedSections);
      });
  }, []);

  if (!formulaire) return null;
  return (
    <div>

      {formulaire.map((form) => (
        <div key={form.id} style={{ textAlign: "center" }}>
          <h4>
            <a id={form.id} href={`/show/${form.id}`}>
              <br />{form.formName}<br />
            </a>
          </h4>
        </div>
      ))}
       <div className="center">
        <div className="col-sm-12">
          <button  className="btn btn-outline-success">
            <a href="/index/add">Add Form</a>
          </button>
          <button className="btn btn-outline-success ">Delete Form</button>
        </div>
      </div>

    </div>
  );

  function About() {
    // 👇️ redirect to external URL
    window.location.replace('http://google.com');

    return null;
  }
}
ReactDOM.render(<ShowForms />, document.getElementById("ShowForms"));
