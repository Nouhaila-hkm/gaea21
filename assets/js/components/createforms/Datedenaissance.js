import React, {Component} from "react";
import PasswordForm from "./PasswordForm";
import InputForm from "./InputForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";


class Datedenaissance extends Component {
    state = {
        boxtext: "",
        addBox: [],
        setInputFields: [


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
                        }
                    ],
                    placeholder: "",
                    size: 1,
                    value: "",
                    number: 1,
                    type: {
                        typeName: "date",
                        rule: "\d{1,2}/\d{1,2}/\d{4}",
                        isRequired: true
                    }
                }
            }],
        mappedF: [ {
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Date de naissance *",
                labelforinputid: "birthdayRegister",
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
                    typeName: "date",
                    rule: "\d{1,2}/\d{1,2}/\d{4}",
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
    // handleChange = (index, evnt)=>{
    //
    //     const { name, value } = evnt.target;
    //     const list = [...this.state.mappedF];
    //     list[index][name] = value;
    //     this.state.setInputFields(list);
    //
    //
    //
    // }

    removeInputFields = (index) => {
        const rows = [...this.state.mappedF];
        rows.splice(index, 1);
        this.state.setInputFields(rows);
    };
    myFunction = () => {
        const list = document.getElementById("Listing");
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
    Field= () => {

        // [...this.state.mappedF.field.size]='1';
        // const list =document.getElementById('myList');

        document.getElementById("remo").style.width = "200%";
    };
    Field2= () => {

        document.getElementById("remov").style.width = "100%";


    };

    save = value => {
        alert(value)
    }
    cancel = () => {
        console.log("Cancelled")
    }

    render() {
        return (
            <form className="componentForms" >
                <div className="ulTopba5" >
                    <button  className="btn btn-danger" onClick={this.addTextBox}>+ add date</button></div>
                <div id="Listing"  >
                {this.state.addBox.map(() => {
                    return (

                        <ul className="componentForm">
                            {this.state.mappedF.map((mappedF, index) => (
                                <li id="remo"
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
                                    <button  className="btn btn-outline-danger" onClick={() =>
                                        this.Field()
                                    }> +
                                    </button>
                                    <button  className="btn btn-outline-danger" onClick={() =>
                                        this.Field2()
                                    }> -
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

export default Datedenaissance;