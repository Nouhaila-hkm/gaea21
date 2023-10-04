import React from "react";
import EasyEdit, { Types } from 'react-easy-edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function LabelForm(props) {

    const save = value => {alert(value)}
    const cancel = () => { console.log("Cancelled") }

    return <>
        <div className="labelForm loginput" htmlFor={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
            type={Types.TEXT}
            value={props.field.label}
            onSave={(val) => console.log(val)}
            saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
            cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}>
            {props.field.label}

        </div>
    </>
}