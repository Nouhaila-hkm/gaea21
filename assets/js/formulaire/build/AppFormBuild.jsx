import React from "react";
import ReactDOM from "react-dom/client";
import PreviousArrow from "../components/PreviousArrow";
import Form from "./components/Form";

const root = ReactDOM.createRoot(document.getElementById("showForm"));
root.render(
  <>
    <PreviousArrow />
    <Form />
  </>
);
