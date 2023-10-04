import React, { useState } from "react";
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import PasswordFormOneField from "../createforms/PasswordFormOneField";

export default function DesactivateAccount() {

    const id = document.querySelector('#desactivateAccountForm');
    const [gaeaUserId, setGaeaUserId] = useState(id.dataset.id);
    console.log(id.dataset.id);

    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [mappedField, setMappedField] = useState([
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Mot de passe",
                labelforinputid: "firstNameRegister",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "",
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

        inputTable.forEach(input => {
            fields['password'] = input.dataset.valuepassword;
            console.log(input.dataset.valuepassword);
        });
        
        const inputHidden = document.getElementById('urlEnv');
        const apiUrl = inputHidden.dataset.urlapi;
        const siteUrl = inputHidden.dataset.urlsite;

        axios.post(apiUrl+'/apictrl/disable/' + gaeaUserId, {
            "password": fields['password'],
            })
            .then(function (response) {
                if(response.status === 200){
                    setMessage('Votre compte est désactivé + modalités de supression.');
                } else {
                    setMessage(response.message);
                }
            })
            .catch(function (error) {
            console.log(error);
        });
    }
    
    return <>
            <form onSubmit = { handleSubmit } method="post" className="componentForms">
                <ul className="componentForm">
                { mappedField.map((mappedField, index) =>
                    <li key={index} className="twoSize">
                        <div>
                            <PasswordFormOneField
                                field={ mappedField.field }
                            />
                        </div>
                    </li>
                )}
                </ul>
                <div className="sectionformbutton forgotpasswordsectionformbutton">
                    <button type="submit">Réinitialiser</button>
                </div>
                {status && (
                    <div className="containerFlashMessage">
                        <FlashMessage duration={5000}>
                        <p className="flashMessage">{message}</p>
                        </FlashMessage>
                    </div> 
                )}
            </form>
        </>
}