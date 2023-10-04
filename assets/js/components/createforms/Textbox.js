import React, {Component} from "react";
import InputForm from "./InputForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";


class Textbox extends Component {
    state = {
        boxtext: "",
        addBox: [],
        setAddBox: [],
        setInputFields: [{
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Input *",
                labelforinputid: "mdp",
                mappedFormData: [
                    {
                        id: 1,
                    }
                ],
                placeholder: "",
                size: "",
                value: "",
                number: 1,
                type: {
                    typeName: "text",
                    rule: "[0-9A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ@.]{1,}",
                    isRequired: true
                }
            }
        }],

        mappedF: [{
            field: {
                class: "registartionInputs",
                field_listdatas: [],
                id: 1,
                label: "Input *",
                labelforinputid: "mdp",
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
                    typeName: "text",
                    rule: "[0-9A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ@.]{1,}",
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
    //
  Field= () => {

        document.getElementById("remov").style.width = "200%";
      // document.getElementById("remov").style.marginRight = "40px";

    };
    Field2= () => {

        document.getElementById("remov").style.width = "100%";


    };

//Handle box addition click
    addTextBox = () => {
        const boxAdded = [...this.state.addBox]
        boxAdded.push(1)
        this.setState({
            addBox: boxAdded
        })
    }
    myFunction = () => {
        const list = document.getElementById("myList");
        list.removeChild(list.firstElementChild);
    }


    save = value => {
        alert(value)
    }
    cancel = () => {
        console.log("Cancelled")
    }

    render() {
        return (


            <form className="componentForms">
                <div className="ulTopba2" >
                    <button className="btn btn-danger" onClick={this.addTextBox}>+ add input</button>
                </div>

                <div id="myList"  >

                    {this.state.addBox.map(() => {
                        return (

                            <ul className="componentForm"  >
                                {this.state.mappedF.map((mappedF, index) => (

                                    <li id="remov"
                                        key={index}
                                        className={`${mappedF.field.size === 2 ? "twoSize" : ""}`}
                                    >
                                        <div  >

                                            <InputForm
                                                field={mappedF.field}/>

                                        </div>
                                        <button className="btn btn-outline-danger" onClick={() =>
                                            this.myFunction()
                                        }>
                                            <FontAwesomeIcon icon={faTimes}/>
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

export default Textbox;