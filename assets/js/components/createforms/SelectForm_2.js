import React, { useState }  from "react";
import LabelForm_2 from "./LabelForm_2";

export default function SelectForm(props) {

    const [value, setValue] = useState('');

    return <>
        <LabelForm_2 field={ props.field }/>

        <select
            className="selectForm allInputs"
            name={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
            id={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
            value={ value } 
            onChange={e => setValue(e.target.value)}
            required={`${props.field.type.isRequired ? "required" : ""}`}
            data-fieldid={ props.field.id }
            data-mappedformdataid={ props.field.mappedFormData[0].id }
            data-value= { value }
        >
            {props.field.field_listdatas.map((o, id) => (
                <option key={ id } value={ o.value }>{ o.label }</option>
            ))}
        </select>
    </>
}