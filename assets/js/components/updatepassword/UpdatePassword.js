import React, { useState } from "react";
import PasswordForm from "../createforms/PasswordForm";
import PasswordFormOneField from "../createforms/PasswordFormOneField";
import axios from 'axios';
import FlashMessage from 'react-flash-message';

export default function UpdatePassword() {

    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
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
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Nouveau mot de passe",
                labelforinputid: "mdp",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "TEST",
                size: 2,
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

        const email = document.querySelector('#updatePasswordForm');
        fields['email'] = email.dataset.email;

        const inputTable = document.querySelectorAll('.registrationInputs');

        inputTable.forEach(input => {
            if(input.dataset.valuefirstpassword) {
                fields['newpassword'] = input.dataset.valuefirstpassword;
                fields['newpasswordconfirmed'] = input.dataset.valuesecondpassword;
            }
            else {
                fields['password'] = input.dataset.valuepassword;
            }
        });

        const inputHidden = document.getElementById('urlEnv');
        const apiUrl = inputHidden.dataset.urlapi;
        const siteUrl = inputHidden.dataset.urlsite;

        axios.put(apiUrl+'/apictrl/changepassword', {
            "email": fields['email'],
            "password": fields['password'],
            "newpassword": fields['newpassword'],
            "newpasswordconfirmed": fields['newpasswordconfirmed'],
            })
            .then(function (response) {

                if(response.status === 200){
                    $.redirect('/userShow');
                } else setMessage(response.message);

            })
            .catch(function (error) {
        });
    }

    return <>
        <form onSubmit = { handleSubmit } method="post" className="componentFormsPassword">
            { mappedField.map((mappedField, index) =>
                <div id={`field${index}`} key={index} className={`${mappedField.field.size === 2 ? "twoSize" : ""}`}>
                        { mappedField.field.size === 2 ?
                                    <PasswordForm
                                        field={ mappedField.field }
                                    />
                                    :   <PasswordFormOneField
                                            field={ mappedField.field }
                                        />
                        }
                </div>
            )}

                <button className="button password" type="submit">Mettre à jour</button>
            {status && (
                <div className="containerFlashMessage">
                    <FlashMessage duration={5000}>
                    <p className="flashMessage">{ message }</p>
                    </FlashMessage>
                </div>
            )}
        </form>
    </>
}
