import React, {Component} from "react";
import PasswordForm from "./PasswordForm";
import SelectForm from "./SelectForm";
import RadioForm from "./RadioForm";
import PhoneForm from "./PhoneForm";
import InputForm from "./InputForm";
import PasswordFormOneField from "./PasswordFormOneField";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";



class Password extends Component {
    state = {
        boxtext: "",
        addBox: [],
        setInputFields: [


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
                        }
                    ],
                    placeholder: "mot de passe",
                    size: 2,
                    value: "",
                    number: 1,
                    type: {
                        typeName: "password",
                        rule: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
                        isRequired: true
                    }
                }
            }],
        mappedF: [ {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Mot de passe *",
                labelforinputid: "mdp",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "mot de passe",
                size: 2,
                value: "",
                number: 1,
                type: {
                    typeName: "password",
                    rule: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
                    isRequired: true
                }
            }
        }]
    };

    handleChange = () => {
        let fields = {...this.state.boxtext};
        fields = fields + "+";
        this.setState({fields});
    };


    removeInputFields = (index) => {
        const rows = [...this.state.mappedF];
        rows.splice(index, 1);
        this.state.setInputFields(rows);
    };
    myFunction = () => {
        const list = document.getElementById("List");
        list.removeChild(list.firstElementChild);
    }

//Handle box addition click
    addTextBox = () => {
        const boxAdded = [...this.state.addBox]
        boxAdded.push(1)
        this.setState({
            addBox: boxAdded
        })
    }


    save = value => {
        alert(value)
    }
    cancel = () => {
        console.log("Cancelled")
    }

    render() {
        return (
            <form className="componentForms" >
                <div className="ulTopba4" >
                    <button className="btn btn-danger" onClick={this.addTextBox}>+ add password</button></div>
                <div id="List"  >
                {this.state.addBox.map(() => {
                    return (

                        <ul className="componentForm">
                            {this.state.mappedF.map((mappedF, index) => (
                                <li
                                    key={index}
                                    className={`${mappedF.field.size === 2 ? "twoSize" : ""}`}
                                >
                                    <div>
                                        { mappedF.field.type.typeName == "password" ? (
                                            <PasswordForm field={mappedF.field}/>
                                        ) :  <InputForm field={mappedF.field}/>
                                         }

                                    </div>
                                    <button className="btn btn-outline-danger"  onClick={() =>
                                        this.myFunction()
                                    }>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>


                                </li>
                            ))}
                        </ul>


                    )
                })


                }
                </div>
            </form>
        );
    }
}

export default Password;