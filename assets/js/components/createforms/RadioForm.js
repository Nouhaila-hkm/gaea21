import React, { useState } from "react";
import LabelForm_2 from "./LabelForm_2";
import EasyEdit, { Types } from 'react-easy-edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function RadiotForm(props) {

    const [value, setValue] = useState("");

    const save = value => { alert(value) }
    const cancel = () => { console.log("Cancelled") }

    return <>
        <LabelForm_2 field={props.field} />
        <div
            className="radioForm allInputs"
            data-fieldid={props.field.id}
            data-mappedformdataid={props.field.mappedFormData[0].id}

            data-value={value}
        >
            {props.field.field_listdatas.map((o, index) => (
                <div key={index}>
                    <input
                        className="inputRadio"
                        type="radio"
                        value={o.value}
                        onChange={e => setValue(e.target.value)}
                        name={props.field.label}
                        id={o.label}
                        required={`${props.field.type.isRequired ? "required" : ""}`}
                    />
                    <EasyEdit className="labelRadio" htmlFor={o.label} type={Types.TEXT}
                        value={o.label}
                        onSave={(val) => window.location.replace('http://127.0.0.1:8000/editLabelRadio?val=' + o.value + '&newVal=' + val + '&id=' + (window.location.pathname).slice(-1) + '&fieldID=' + props.field.mappedFormData[0].id)}
                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}>
                        {o.label}
                    </EasyEdit>
                </div>
            ))}
        </div>
    </>
}

