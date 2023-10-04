import React from "react";
import EasyEdit, { Types } from 'react-easy-edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function LabelForm(props) {

    const save = value => { alert(value) }
    const cancel = () => { console.log("Cancelled") }

    return <>
        <EasyEdit className="labelForm loginput" htmlFor={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
            type={Types.TEXT}
            value={props.field.label}
            // onSave={(val) => console.log(props.field.label)}
            onSave={(val) => window.location.replace('http://127.0.0.1:8000/editLabelForm?val=' + props.field.label + '&newVal=' + val + '&id=' + (window.location.pathname).slice(-2))}
            saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
            cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}>
            {props.field.label}

        </EasyEdit>
    </>
}