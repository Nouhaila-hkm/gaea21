import React, {useState} from "react";
import InputForm from "../createforms/InputForm";
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import PasswordFormOneField from "../createforms/PasswordFormOneField";
import '../../../styles/login/pagelogin.scss'

export default function Login({success}) {

    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState(success ? success : '');
    const [mappedField, setMappedField] = useState([
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "E-mail",
                labelforinputid: "mail",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "Adresse mail",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[0-9A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ@.]{1,}",
                    isRequired: true
                }
            }
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Mot de passe",
                labelforinputid: "mdplogin",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "Mot de passe",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "password",
                    rule: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
                    isRequired: true
                }
            }
        },
    ]);

    const handleSubmit = event => {
        event.preventDefault();

        setStatus(true);

        let fields = {};

        const inputTable = document.querySelectorAll('.registrationInputs');

        const inputHidden = document.getElementById('urlEnv');
        const apiUrl = inputHidden.dataset.urlapi;

        inputTable.forEach(input => {
            if (input.dataset.valuepassword) {
                fields['Password'] = input.dataset.valuepassword;
            } else {
                fields['E-mail'] = input.dataset.value;
            }
        });
        console.log('TEST',fields);

        axios.post(apiUrl + '/apictrl/login', {
            "email": fields['E-mail'],
            "password": fields['Password'],
        })
            .then(function (response) {
                let {id, username, email, message} = response.data;
                if (id) {
                    $.redirect('/redirectLogin', {id, email, username});
                } else {
                    setMessage(message);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    success = null;
                    setMessage(error.response.data.message);
                }

            });
    }

    return <>
        {message !== '' && (
            {success} ?
                <div className="successMessageContainer">
                    <p className="Message">{message}</p>
                </div> :
                <div className="errorMessageContainer">
                    <p className="Message">{message}</p>
                </div>
        )}

        <form onSubmit={handleSubmit} method="post" className="componentFormsLogin" id="test">
            <ul className="componentForm">
                {mappedField.map((mappedField, index) =>
                    <li key={index} className={`${mappedField.field.size === 2 ? "twoSize" : ""}`}>
                        <div>
                            {mappedField.field.type.typeName == "password" ?
                                <PasswordFormOneField
                                    field={mappedField.field}
                                />
                                : <InputForm
                                    field={mappedField.field}
                                />
                            }
                        </div>
                    </li>
                )}
            </ul>
            <div className="sectionformbutton loginsectionformbutton">
                <button id="realsub" className="button login" type="submit">Se connecter</button>
            </div>
            {status && (
                <div className="containerFlashMessage">
                    <FlashMessage duration={5000}>
                        <span className="flashMessage">{message}</span>
                    </FlashMessage>
                </div>
            )}
        </form>
    </>
}
