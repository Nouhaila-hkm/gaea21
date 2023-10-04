import React from 'react'
import { useState, useEffect } from 'react'
import Section from './Section'
import {OfferEdit} from '../ContextModification'
import { useContext } from 'react'; 
import axios from "axios";
import DeleteModal from '../../components/DeleteModal';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditSection = (props) => {
     //initializing variable context avec le context
    const editContext = useContext(OfferEdit)

    const [sectionTitle, setSectionTitle]= useState([]);
    
    const [show, setShow]=useState(false);
    const [showDeleteModal, setShowDeleteModal]=useState(false);

    useEffect(()=>{
       
      //GETTING ALL THE SECTIONS NAME
  axios.get('/api/offer_section_titles').then((response) => {
    setSectionTitle(response.data['hydra:member']);
  });
  }, [])
  
 

 

const showWindow=()=>{
    setShow(true);
}

const hideWindow=()=>{
    setShow(false);
    
}


const showDelete=()=>{
    if(showDeleteModal === true){
        setShowDeleteModal(false)
    }else{
        setShowDeleteModal(true)
    }
}

const deleteChosenSection=()=>{
    props.delete(props.order);
}
   
  return (
    <div>
        <div className='d-flex align-items-center'>
            <input type="text" defaultValue = {props.sectionName} className="form-control" disabled/>
            {/* <p>{name}</p> */}
            <button className='btn btn-outline-success m-2' onClick={showWindow}><FontAwesomeIcon icon={faEdit}/></button>
            <button className='btn btn-outline-danger m-2' onClick={showDelete}><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>

        {
            showDeleteModal && <DeleteModal
            hideModal={showDelete}
            delete={deleteChosenSection}/>
        }

        
       { show && <Section
        hide={hideWindow}
        content={props.content}
        sectionOrder={props.order}
        action={props.action}
        name={props.name}
        />}
        


    </div>
  )
}

export default EditSection