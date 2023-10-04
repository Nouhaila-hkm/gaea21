import React, { useState } from "react";
import InputForm from "../createforms/InputForm";
import PopUp from "../Modal/PopUp.jsx"
import axios from 'axios';
import FlashMessage from 'react-flash-message';

export default function ForgotPassword() {

    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
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
                    typeName: "email",
                    rule: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
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
                fields[input.dataset.label] = input.dataset.value;
        });

        const inputHidden = document.getElementById('urlEnv');
        const apiUrl = inputHidden.dataset.urlapi;
        const siteUrl = inputHidden.dataset.urlsite;

        axios.post(apiUrl + '/apictrl/requestpassword', {
            "email": fields['E-mail'],
            "url": siteUrl
            })
            .then(function (response) {
                if (response.status === 200) {
                    setModal(!modal)
                }
            })
            .catch(function (error) {
            setMessage('adresse e-mail non valide');
        });
    }
    
    return <>
        <form onSubmit = { handleSubmit } method="post" className="componentForms">
            <h2 className="reset">Réinitialiser de votre mot de passe</h2>

            <p className="forgot-text">Vous avez oublié votre mot de passe ?<br/>Saisissez votre adresse mail,
                afin de recevoir un mail pour le réinitialiser.
            </p>

            <ul className="componentForm">
            { mappedField.map((mappedField, index) =>
                <li key={index} className="twoSize">
                    <div>
                        <InputForm
                            field={ mappedField.field }
                        />
                    </div>
                </li>
            )}
            </ul>
            <div className="sectionformbutton forgotpasswordsectionformbutton">
                <button className="button forgot" type="submit">Envoyer</button>
            </div>
            {message !== '' && (
                <div className="containerFlashMessage">
                    <FlashMessage duration={5000}>
                    <p className="flashMessage">{message}</p>
                    </FlashMessage>
                </div> 
            )}
        </form>

        {modal && <PopUp
            title='Votre demande a bien été prise en compte !'
            source="/Image/forgotPassword/forgotpop.png"
            text='Vous allez recevoir un mail dans quelques instants pour renouveler votre mot de passe'
            redirect='/'
            button="D'accord"
        />}
    </>
}