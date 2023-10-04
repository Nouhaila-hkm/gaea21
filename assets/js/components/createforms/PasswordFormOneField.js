import React, { useState } from "react";
import LabelForm from "./LabelForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputForm(props) {

    var md5 = require('md5');

    const [isValid, setIsValid] = useState(false);
    const [valueInput, setValueInput] = useState("");
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const regex = new RegExp(props.field.type.rule);

    const togglePasswordVisiblity = () => {
        setPasswordIsVisible(passwordIsVisible ? false : true);
      };

    const eye = (passwordIsVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye}/>);

    const onChange = (e) => {
        setValueInput(e.target.value);
        if (regex.test(e.target.value)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return <>
            <div className="pass-wrapper loginput">
                <LabelForm field={ props.field }/>
                <input className="inputForm allInputs registrationInputs "
                    type={passwordIsVisible ? 'text' : 'password'}
                    name={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
                    id={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
                    placeholder={ props.field.placeholder }
                    value={ valueInput }
                    onChange={ onChange }
                    required={`${props.field.type.isRequired ? "required" : ""}`}
                    data-fieldid={ props.field.id }
                    data-mappedformdataid={ props.field.mappedFormData[0].id }
                    data-valuepassword= { md5(valueInput) }
                    data-label={ props.field.label }
                    attern={`${props.field.type.rule ? props.field.type.rule : ""}`}
                    />
                    <i id="login" className="eye usershow" onClick={togglePasswordVisiblity}>{eye}</i>
            </div>
        </>
}
