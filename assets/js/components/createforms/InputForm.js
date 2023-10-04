import React, { useState } from "react";
import LabelForm_2 from "./LabelForm_2";

export default function InputForm(props) {

    const [isValid, setIsValid] = useState(false);
    const [valueInput, setValueInput] = useState( props.field.value ? props.field.value : "" );

    const regex = new RegExp(props.field.type.rule);

    const onChange = (e) => {
        setValueInput(e.target.value);
        if (regex.test(e.target.value)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };



    return <>
        <LabelForm_2 field={ props.field }/>
        <input className="inputForm allInputs registrationInputs"
            type={ props.field.type.typeName }
            name={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
            id={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
            placeholder={ props.field.placeholder }
            value={ valueInput }
            onChange={ onChange }
            required={`${props.field.type.isRequired ? "required" : ""}`}
            data-fieldid={ props.field.id }
            data-mappedformdataid={ props.field.mappedFormData[0].id }
            data-value= { valueInput }
            data-label={ props.field.label }
            pattern={`${props.field.type.rule ? props.field.type.rule : ""}`}
        />
    </>
}