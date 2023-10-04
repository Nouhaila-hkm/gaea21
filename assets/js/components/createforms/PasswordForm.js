import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PasswordForm(props) {

    var md5 = require('md5');
    const regex = new RegExp(props.field.type.rule);
    const [password, setPassword] = useState({
        firstPassword: "",
        secondPassword: "",
    });

    const setFirst = (event) => {
    setPassword({ ...password, firstPassword: event.target.value });
    };
    const setSecond = (event) => {
    setPassword({ ...password, secondPassword: event.target.value });
    };

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const [passwordIsVisible2, setPasswordIsVisible2] = useState(false);


    const togglePasswordVisiblity = () => {
        setPasswordIsVisible(passwordIsVisible ? false : true);
      };

      const togglePasswordVisiblity2 = () => {
        setPasswordIsVisible2(passwordIsVisible2 ? false : true);
      };

    const eye = (passwordIsVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye}/>);

    const eye2 = (passwordIsVisible2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye}/>);

    const confirmPassword = (e) => {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
            if (e.target.value.length == 0) {
                e.target.setCustomValidity("Confirme ton mot de passe");
            } else {
                e.target.setCustomValidity("La confirmation n'est pas identique");
            }
        }
    };

    const rulePassword = (e) => {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
            if (e.target.value.length !== 0) {
                e.target.setCustomValidity("Majuscule, minuscule, chiffre et 8 caractères minimum");
            }
        }
    };

    return (
    <div className="passwordForm resetForm">
        <div className="pass-wrapper">
            <label className="labelForm" htmlFor={ props.field.label }>
                { props.field.label }
            </label>
            <input
                className="inputForm allInputs registrationInputs"
                onChange={setFirst}
                placeholder={props.placeholder}
                type={passwordIsVisible ? 'text' : 'password'}
                name={props.field.label}
                id={`${props.field.labelforinputid ? props.field.labelforinputid : props.field.label}`}
                required={`${props.field.type.isRequired ? "required" : ""}`}
                pattern={props.field.type.rule}
                data-valuefirstpassword= { md5(password.firstPassword) }
                data-valuesecondpassword= { md5(password.secondPassword) }
                onInvalid={rulePassword}
            />
            <i className="eye usershow resetEye" onClick={togglePasswordVisiblity} >{eye}</i>
       </div>
        <div className="pass-wrapper">
            <label className="labelForm" htmlFor="mdpConfirmation">Confirmation mot de passe</label>
            <input id="test"
                className="inputForm resetInput"
                placeholder={props.secondplaceholder}
                onChange={setSecond}
                type={passwordIsVisible2 ? 'text' : 'password'}
                name="mdpConfirmation"
                required
                pattern={`^${password.firstPassword}$` }
                onInvalid={confirmPassword}
                data-fieldid={ props.field.id }
                data-mappedformdataid={ props.field.mappedFormData[0].id }
                data-value= { md5(password.secondPassword) }
                data-typename={ props.field.type.typeName }
            />
            <i className="eye usershow resetEye" onClick={togglePasswordVisiblity2}>{eye2}</i>
        </div>
    </div>
    );
}
