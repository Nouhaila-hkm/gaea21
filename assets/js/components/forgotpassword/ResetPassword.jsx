import React, { useState } from "react";
import PasswordForm from "../createforms/PasswordForm"
import PopUp from "../Modal/PopUp.jsx"
import axios from 'axios';
import FlashMessage from 'react-flash-message';

export default function ResetPassword() {

    const elem = document.querySelector('#ResetPassword');

    const [token, setToken] = useState(elem.dataset.token);
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");

    const [modal, setModal] = useState(false);
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
                placeholder: "Nouveau mot de passe (8 caractères minimum)",
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

        const inputTable = document.querySelectorAll('.registrationInputs');

        inputTable.forEach(input => {
            if (input.dataset.valuefirstpassword) {
                fields['password'] = input.dataset.valuefirstpassword;
                fields['newpassword'] = input.dataset.valuesecondpassword;
            }
            else {
                fields['password'] = input.dataset.valuepassword;
            }
        });

        const inputHidden = document.getElementById('urlEnv');
        const apiUrl = inputHidden.dataset.urlapi;
        
        axios.put(apiUrl + '/apictrl/resetpassword/' + token, {
            "password": fields['password'],
            "newpassword": fields['newpassword'],
        })
            .then(function (response) {

                if (response.status === 200) {
                     setModal(!modal) 
                } else setMessage("Une erreur s'est produite");

            })
            .catch(function (error) {
            });
    }

    return <>
        {message !== '' && (
            <div className="containerFlashMessage">
                <FlashMessage duration={5000}>
                    <p className="flashMessage">{message}</p>
                </FlashMessage>
            </div>
        )}
        <form onSubmit={handleSubmit} method="post" className="componentFormsPassword ResetPassword">
            {mappedField.map((mappedField, index) =>
                <div id={`field${index}`} key={index} className={`${mappedField.field.size === 2 ? "twoSize" : ""}`}>
                    {mappedField.field.size === 2 &&
                        <PasswordForm
                            field={mappedField.field}
                            placeholder={mappedField.field.placeholder}
                            secondplaceholder='Confirmation du nouveau mot de passe'
                        />
                    }
                </div>
            )}

            <button className="button password validate" type="submit">Valider</button>
        </form>
        {modal && <PopUp
            title='Votre modification de mot de passe a été faite avec succès !'
            source="/Image/forgotPassword/resetssuccess.svg"
            text='Vous pouvez vous connecter à votre profil!'
            redirect='/login'
            button='Se connecter'
        />}

    </>
}
