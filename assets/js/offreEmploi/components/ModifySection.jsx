import React from 'react'
import { useState, useEffect } from 'react'
import { AddSection } from './AddSection'
import { OfferContext } from '../OffreInformation';
import { useContext } from 'react'; 
import axios from "axios";
import DeleteModal from './DeleteModal';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ModifySection = (props) => {
     //initializing variable context avec le context
    const context = useContext(OfferContext)

    const [sectionTitle, setSectionTitle]= useState([]);
    const [name, setName]= useState("");
    const [show, setShow]=useState(false);
    const [showDeleteModal, setShowDeleteModal]=useState(false);

    useEffect(()=>{
       
      //GETTING ALL THE SECTIONS NAME
  axios.get('/api/offer_section_titles').then((response) => {
    setSectionTitle(response.data['hydra:member']);
  });
  }, [])
  
  useEffect(()=>{
      if(sectionTitle.length>0){
        getSectionTitle(props.sectionName);
      }
       
    

}, [sectionTitle, context.offre])

    //GETTING SECTION TITLE
    
    const getSectionTitle = (title) =>{
    
    const idsectionTitle= parseInt(title.slice(title.lastIndexOf('/')+1), 10);
    //console.log(title, idsectionTitle, index, sectionTitle);
    const index = sectionTitle.filter((e)=>{ return e.id===idsectionTitle});
    setName(index[0].title);

}

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
    context.deleteSection(props.order);
}
   
  return (
    <div>
        <div className='d-flex align-items-center'>
            <input type="text" defaultValue = {name} className="form-control" disabled/>
            {/* <p>{name}</p> */}
            <button className='btn btn-outline-success m-2' onClick={showWindow}><FontAwesomeIcon icon={faEdit}/></button>
            <button className='btn btn-outline-danger m-2' onClick={showDelete}><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>

        {
            showDeleteModal && <DeleteModal
            hideModal={showDelete}
            delete={deleteChosenSection}/>
        }

        
       { show && <AddSection
        action={"Modifier Section"}
        content={props.content}
        close={hideWindow}
        order={props.order}
        sectionName={props.sectionName}
        />}
        


    </div>
  )
}

export default ModifySection