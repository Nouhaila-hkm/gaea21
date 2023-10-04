import React, { createContext, useEffect, useState } from "react";

//create context
const FieldTypesContext = createContext();

const FieldTypesContextProvider = ({ children }) => {
  //the value that will be given to the context
  const [fieldTypes, setFieldTypes] = useState(null);

  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  console.log("Render FieldTypes");

  useEffect(() => {
    console.log("Field Types Context");
    async function getAPIFieldTypesTypes() {
      try {
        const res = await axios.get("/form/api/formTypes");
        setFieldTypes(res.data);
        // setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getAPIFieldTypesTypes();
  }, []);

  return (
    // the Provider gives access to the context to its children
    <FieldTypesContext.Provider value={fieldTypes}>
      {children}
    </FieldTypesContext.Provider>
  );
};

export { FieldTypesContext, FieldTypesContextProvider };
