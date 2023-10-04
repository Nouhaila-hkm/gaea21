import React from "react";
import Form from "../builder/Form";
import { FormContext, FormContextProvider } from "./context/FormContext";
import { useFormContext } from "./context/useFormContext";

const root = ReactDOM.createRoot(document.getElementById("Form"));
root.render(
  // <React.StrictMode>
  <FormContextProvider>
    <Test />
    <Form />
  </FormContextProvider>
  // </React.StrictMode>
);

const Test = () => {
  const test = useContext(FormContext);
  console.log(test);
  const test2 = useFormContext();
  console.log(test2);
  return test2;
};
