import React, { useState }  from "react";
import LabelForm_2 from "./LabelForm_2";

export default function PhoneForm(props) {

    const [valueInput, setValueInput] = useState( props.field.value ? props.field.value : "" );

    return <>
            <LabelForm_2 field={ props.field }/>
            <input className="inputForm allInputs registrationInputs"
                type={ props.field.type.typeName } 
                name={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
                id={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
                placeholder={ props.field.placeholder }
                value={ valueInput }
                pattern="[0-9]{10}"
                onChange={e => setValueInput(e.target.value)}
                required={`${props.field.type.isRequired ? "required" : ""}`}
                data-fieldid={ props.field.id }
                data-mappedformdataid={ props.field.mappedFormData[0].id }
                data-value= { valueInput }
                data-label={ props.field.label }
            />
    </>
}