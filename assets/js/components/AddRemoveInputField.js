import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Placeholder } from 'react-bootstrap';
import axios from "axios";
import ShowOneForm from './ShowOneForm';



function AddRemoveInputField() {

    let test = new ShowOneForm;

    const [inputFields, setInputFields] = useState([{
        fullName: '',
    }]);

    const addInputField = () => {
        setInputFields([...inputFields, {
            fullName: '',
        }])
    }


    const removeInputFields = (index) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
    }

    let temp = 0;
    return (
        <div className="container">

            <div className="row">
                <div className="col-sm-8">
                    {
                        inputFields.map((data, index) => {
                            const { temp } = data;
                            return (
                                <div className="row my-3" key={index}>

                                    <form>
                                        <label>
                                            Nom :
                                            <input type="text" name="Nom" />
                                            Prenom :
                                            <input type="text" name="Prenom" />
                                        </label>
                                    </form>

                                    <div className="col">
                                        {(inputFields.length !== 1) ? <button className="btn btn-outline-danger" onClick={removeInputFields}>✖</button> : ''}
                                    </div>





                                </div>


                            )
                        })
                    }
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="btn btn-outline-success " onClick={addInputField}>Add New</button>
                            <button className="btn btn-outline-success ">Save</button>
                        </div>
                    </div>
                </div>
            </div >
            <div className="col-sm-4">
            </div>

        </div >
    )
}


export default AddRemoveInputField

