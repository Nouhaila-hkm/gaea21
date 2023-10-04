import React, { useState } from "react";
import InputForm from "../createforms/InputForm";
import SelectForm from "../createforms/SelectForm";
import RadioForm from "../createforms/RadioForm";
import PasswordForm from "../createforms/PasswordForm";
import PhoneForm from "../createforms/PhoneForm";
import axios from 'axios';
import FlashMessage from 'react-flash-message';

export default function UpdateAccount() {

    const id = document.querySelector('#updateAccountForm');
    const [gaeaUserId, setGaeaUserId] = useState(id.dataset.id);

    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const [mappedField, setMappedField] = useState([
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Prenom",
                labelforinputid: "firstName",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "Prénom",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[0-9A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true
                }
            }
        },

        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Nom",
                labelforinputid: "lastName",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "Nom",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[0-9A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true
                }
            }
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "phone",
                labelforinputid: "phone",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "N° de téléphone",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "^(?:0|\\(?\\+33\\)?\\s?|0033\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$",
                    isRequired: true
                }
            }
        },

        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "adress",
                labelforinputid: "adress",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "Adresse (N°, nom de rue)",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-z0-9|\\s'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true
                }
            }
        },

        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "city",
                labelforinputid: "city",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "Ville",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-z0-9|\\s'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true
                }
            }
        },

        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "country",
                labelforinputid: "country",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "Pays",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[0-9A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
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

        const email = document.querySelector('#updateAccountForm');
        fields['E-mail'] = email.dataset.email;

        inputTable.forEach(input => {
                fields[input.dataset.label] = input.dataset.value;
        });

        const inputHidden = document.getElementById('urlEnv');
        const apiUrl = inputHidden.dataset.urlapi;
        const siteUrl = inputHidden.dataset.urlsite;


        axios.put(apiUrl+'/apictrl/company/change/' + gaeaUserId, {
            "username": fields['Prenom'],
            "email": fields['E-mail'],
            })
            .then(function (response) {
                if(response.status === 200){

                    let formData = new FormData();

                     let objArr = {
                         "gaeaUserId": gaeaUserId,
                         "mail": fields['E-mail'],
                         "firstName": fields['Prenom'],
                         "lastName": fields['Nom'],
                         "phone": fields['phone'],
                         "adress": fields['adress'],
                         "city": fields['city'],
                         "country": fields['country']
                     };


                     formData.append('objArr',JSON.stringify(objArr))
                     console.log(formData)

                     axios.post('/profile/update', formData)
                    .then(function (response) {
                        setMessage(response.message);
                        $.redirect('/userShow');
                    })
                    .catch(function (error) {
                    });
                }
                else{
                    setMessage(response.message);
                }
            })
            .catch(function (error) {
        });
    }

    return <>
        <form onSubmit = { handleSubmit } method="post" className="componentFormsUpdate">
            <p class="info-perso">Mes informations personnelles</p>
            { mappedField.map((mappedField, index) =>
                    <>
                        { mappedField.field.type.typeName == "select" ?
                            <SelectForm
                                field={ mappedField.field }
                            />
                            : mappedField.field.type.typeName == "radio" ?
                                <RadioForm
                                    field={ mappedField.field }
                                />
                                : mappedField.field.type.typeName == "password" ?
                                    <PasswordForm
                                        field={ mappedField.field }
                                    />
                                    : mappedField.field.type.typeName == "phone" ?
                                        <PhoneForm
                                            field={ mappedField.field }
                                        />
                                        : <InputForm
                                            field={ mappedField.field }
                                        />
                        }
                    </>
            )}

                <button className="button update" type="submit">Mettre à jour</button>
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
