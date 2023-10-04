import React, { useState } from "react";
import InputForm from "../createforms/InputForm";
import SelectForm from "../createforms/SelectForm";
import RadioForm from "../createforms/RadioForm";
import PasswordForm from "../createforms/PasswordForm";
import PhoneForm from "../createforms/PhoneForm";
import axios from "axios";
import FlashMessage from "react-flash-message";

export default function Expansion({ user }) {
    const [status, setStatus] = useState(false);
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
                value: user.firstName ? user.firstName : "",
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
                value: user.lastName ? user.lastName : "",
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
                label: "Date de naissance *",
                labelforinputid: "birthdayRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "",
                size: 1,
                value: user.birthDay ? user.birthDay : "",
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
                value: user.nationality ? user.nationality : "",
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
                value: user.adress ? user.adress : "",
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
                value: user.additionalAdress ? user.additionalAdress : "",
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
                value: user.city ? user.city : "",
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
                label: "Code postal *",
                labelforinputid: "zipRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Code postal",
                size: 1,
                value: user.zipCode ? user.zipCode : "",
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
                value: user.country ? user.country : "",
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
                label: "Téléphone",
                labelforinputid: "phoneRegister",
                mappedFormData: [
                    {
                        id: 1,
                    },
                ],
                placeholder: "Téléphone",
                size: 1,
                value: user.phone ? user.phone : "",
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

        let fields = {};
        const inputTable = document.querySelectorAll(".registrationInputs");

        inputTable.forEach((input) => {
            fields[input.name] = input.dataset.value;
        });

        const inputHidden = document.getElementById("urlEnv");
        const siteUrl = inputHidden.dataset.urlsite;

        console.log(siteUrl);

        let objArr = {
            gaeaUserId: user.gaeauserid,
            userName: user.username !== "" ? user.username : fields["username"],
            mail: user.email !== "" ? user.email : fields["mail"],
            firstName:
                user.firstName !== "" ? user.firstName : fields["firstNameRegister"],
            lastName:
                user.lastName !== "" ? user.lastName : fields["lastNameRegister"],
            birthDay:
                user.birthDay !== "" ? user.birthDay : fields["birthdayRegister"],
            nationality:
                user.nationality !== ""
                    ? user.nationality
                    : fields["nationalityRegister"],
            adress: user.adress !== "" ? user.adress : fields["adressRegister"],
            city: user.city !== "" ? user.city : fields["cityRegister"],
            zip: user.zipCode !== "" ? user.zipCode : fields["zipRegister"],
            country: user.country !== "" ? user.country : fields["countryRegister"],
            phone: user.phone !== "" ? user.phone : fields["phoneRegister"],
            additionalAdress:
                user.additionalAdress !== ""
                    ? user.additionalAdress
                    : fields["additionalAdressRegister"],
        };

        // Register a new user to the gaea_user database
        axios
            .post(siteUrl + "/redirectRegister", objArr)
            .then(function (response) {
                $.redirect("/login");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
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
