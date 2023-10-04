import React, { createContext, useEffect, useState } from "react";

//create context
const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  //the value that will be given to the context
  const [form, setForm] = useState(null);
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  console.log("Form Context Render");

  useEffect(() => {
    console.log("Form Context Use Effect");
    async function getAPIForm() {
      try {
        const res = await axios.post(`/form/api/info/`, { id: formID });
        setForm(res.data);
        // setLoading(false);
      } catch (error) {
        console.error(error.response);
      }
    }
    getAPIForm();
  }, []);

  return (
    // the Provider gives access to the context to its children
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
  );
};

export { FormContext, FormContextProvider };
