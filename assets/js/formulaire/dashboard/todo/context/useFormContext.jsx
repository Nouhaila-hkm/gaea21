import { useContext } from "react";
import { FormContext, FormContextProvider } from "./FormContext";

// context consumer hook
export const useFormContext = () => {
  // get the context
  const context = useContext(FormContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("Problème!!");
  }

  return context;
};
