import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReactDOM from "react-dom/client";
import "/assets/styles/form/formList.scss";

export default function Forms() {
  const [formList, setFormList] = useState(null);

  useEffect(() => {
    async function getAPIFormList() {
      try {
        const response = await axios.get("/form/api/list");
        setFormList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIFormList();
  }, []);

  function ifArchived(form) {
    if (form.deletedAt == null) {
      return <Form.Check type="switch" checked disabled />;
    } else {
      return <Form.Check type="switch" disabled />;
    }
  }

  if (!formList) {
    return (
      <div className="container mt-4 mx-5">
        <a href="/form/api/form/add">
          <Button className="mt-3 mx-auto" variant="primary">
            Add Form
          </Button>
        </a>
      </div>
    );
  }
  return (
    <div className="container mt-2">
      <div className="row my-4">
        <h1>List des Formulaires</h1>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nom Formulaire</th>
            <th scope="col">Page de Formulaire</th>
            <th scope="col">Email Rattaché(s)</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          {formList.map((form, index) => (
            <tr key={index}>
              <th scope="row">
                <a href={`/form/edit/${form.id}`}>{form.id}</a>
              </th>
              <td>
                <a href={`/form/edit/${form.id}`}>{form.formName}</a>
              </td>
              <td>PAGE OF FORM</td>
              <td>{form.email == null ? <></> : <>{form.email}</>}</td>
              <td>{ifArchived(form)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <a href="/form/api/form/add">
        <Button className="mt-3 ms-auto" variant="primary">
          Add Form
        </Button>
      </a>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("Forms"));
root.render(
  // <React.StrictMode>
  <Forms />
  // </React.StrictMode>
);
