import React, { useState } from "react";
import InputForm from "../createforms/InputForm";
import SelectForm from "../createforms/SelectForm";
import RadioForm from "../createforms/RadioForm";
import PasswordForm from "../createforms/PasswordForm";
import PhoneForm from "../createforms/PhoneForm";
import axios from "axios";
import FlashMessage from "react-flash-message";

export default function Registration() {
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [mappedField, setMappedField] = useState([
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Prénom *",
                labelforinputid: "firstNameRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Prénom",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Nom *",
                labelforinputid: "lastNameRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Nom",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Nom d'utilisateur *",
                labelforinputid: "username",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Nom d'utilisateur",
                size: 2,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[0-9A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Mot de passe *",
                labelforinputid: "mdp",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "mot de passe",
                size: 2,
                value: "",
                number: 1,
                type: {
                    typeName: "password",
                    rule: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Date de naissance *",
                labelforinputid: "birthdayRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "date",
                    rule: "d{1,2}/d{1,2}/d{4}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Nationalité *",
                labelforinputid: "nationalityRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Votre nationalité",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Adresse *",
                labelforinputid: "adressRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Adresse",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-z0-9|\\s'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Complément d'adresse",
                labelforinputid: "additionnalAdressRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Complément d'adresse",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-z0-9|\\s'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: false,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Ville *",
                labelforinputid: "cityRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Ville",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Code postal *",
                labelforinputid: "zipRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Code postal",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[0-9]{5}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Pays *",
                labelforinputid: "countryRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Pays",
                size: 2,
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,}",
                    isRequired: true,
                },
            },
        },
        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "E-mail *",
                labelforinputid: "mail",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "E-mail",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "email",
                    rule: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
                    isRequired: true,
                },
            },
        },

        {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Téléphone",
                labelforinputid: "phoneRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Téléphone",
                size: 1,
                value: "",
                number: 1,
                type: {
                    typeName: "phone",
                    rule: "^(?:0|\\(?\\+33\\)?\\s?|0033\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$",
                    isRequired: true,
                },
            },
        },
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();

        setStatus(true);

        let fields = {};

        const inputTable = document.querySelectorAll(".registrationInputs");

        inputTable.forEach((input) => {
            if (input.dataset.valuefirstpassword) {
                fields["firstPassword"] = input.dataset.valuefirstpassword;
                fields["secondPassword"] = input.dataset.valuesecondpassword;
            } else {
                fields[input.name] = input.dataset.value;
            }
        });

        const inputHidden = document.getElementById("urlEnv");
        const apiUrl = inputHidden.dataset.urlapi;
        const siteUrl = inputHidden.dataset.urlsite;

        // Register a new user to the gaea_user database
        axios
            .post(apiUrl + "/apictrl/add/gaeauser", {
                url: siteUrl,
                username: fields["username"],
                email: fields["mail"],
                password: fields["firstPassword"],
                newpassword: fields["secondPassword"],
            })
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                if (response.data.id) {
                    let objArr = {
                        gaeaUserId: response.data.id,
                        userName: fields["username"],
                        mail: fields["mail"],
                        firstName: fields["firstNameRegister"],
                        lastName: fields["lastNameRegister"],
                        birthDay: fields["birthdayRegister"],
                        nationality: fields["nationalityRegister"],
                        adress: fields["adressRegister"],
                        city: fields["cityRegister"],
                        zip: fields["zipRegister"],
                        country: fields["countryRegister"],
                        phone: fields["phoneRegister"],
                        additionalAdress: fields["additionalAdressRegister"],
                    };

                    //--- A retirer ou modifier lors de la mise en production  -----------------
                    let siteURLRedirect = "http://localhost:8000/redirectRegister";

                    // Register a new user to the gaea21 database
                    axios
                        // .post(siteUrl + "/redirectRegister", objArr)
                        .post(siteURLRedirect, objArr)
                        .then(function (response) {
                            $.redirect("/login", { success: response.data.success });
                        })
                        .catch(function (error) {
                            console.log("error:");
                            console.log(error);
                        });
                }
            })
            .catch(function (error) {
                if (error.response) {
                    setMessage(error.response.data.message);
                }
            });
    };

    return (
        <>
            {message !== "" && (
                <div className="errorMessageContainer">
                    <p className="errorMessage">{message}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} method="post" className="componentForms">
                <ul className="componentForm">
                    {mappedField.map((mappedField, index) => (
                        <li
                            key={index}
                            className={`${mappedField.field.size === 2 ? "twoSize" : ""}`}
                        >
                            <div className="loginput">
                                {mappedField.field.type.typeName == "select" ? (
                                    <SelectForm field={mappedField.field} />
                                ) : mappedField.field.type.typeName == "radio" ? (
                                    <RadioForm field={mappedField.field} />
                                ) : mappedField.field.type.typeName == "password" ? (
                                    <PasswordForm field={mappedField.field} />
                                ) : mappedField.field.type.typeName == "phone" ? (
                                    <PhoneForm field={mappedField.field} />
                                ) : (
                                    <InputForm field={mappedField.field} />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="sectionformbutton2">
                    <button type="submit">Souscrire</button>
                </div>
                {status && (
                    <div className="containerFlashMessage">
                        <FlashMessage duration={5000}>
                            <p className="flashMessage">
                                Vous allez recevoir un mail contenant un lien, vous pourrez vous
                                connecter au site de Gaea21 aprés avoir cliqué sur celui-ci.
                            </p>
                        </FlashMessage>
                    </div>
                )}
            </form>
        </>
    );
}
