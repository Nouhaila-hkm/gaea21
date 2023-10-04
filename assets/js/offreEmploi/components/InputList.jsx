import React, {useState, useEffect} from 'react'
import DeleteModal from './DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

 const InputList = (props) => {

    const [itemtText, setItemText]=useState(props.text);
  
    const [itemOrder, setItemOrder]=useState(props.order);
 
    const [indexSection, setIndexSection] = useState(props.indexSection);
    const [showModal, setShowModal]=useState(false);
    const [message, setMessage]=useState(false);
    //const [index, setIndex]=useState(props.order);
    //const [arrayContent, setArrayContent]=useState(props.array);
    const [height, setHeight]=useState();
    
    
    useEffect(()=>{
     setItemText(props.text);
    
     //setArrayContent(props.array)
    
    const heightTextArea= calcHeight(props.text) + "px";
    setHeight(heightTextArea)
     },[props.text])

  

    const editItem = ()=>{
     
        props.update(itemtText,itemOrder, indexSection);
        setMessage(true);
				setTimeout(()=>setMessage(false),3000);
    }

    const deleteItem = ()=>{
      hideModalWindow();
        props.delete(itemtText,itemOrder, indexSection);
        
    }

    const updateTextItem = (e)=>{
    
      
      
      setItemText(e.currentTarget.value);
    }
    //HIDE MODAL MESSAGE CONFIRMATION DE SUPPRESION

    const hideModalWindow = ()=>{
      setShowModal(false);
    }

    //SHOW MODAL MESSAGE CONFIRMATION DE SUPPRESION

    const showModalWindow = ()=>{
      setShowModal(true);
    }

    const changeOrder = (e)=>{

    
    props.change(props.order,e.currentTarget.value,itemtText);


     
    }

    
   // Dealing with Textarea Height
const calcHeight= (value) =>{
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
  
  return newHeight;
}




   
  return (
    <div>
         <div className='d-flex m-2'>
              
             
              
              <textarea cols="2" rows="3" className="form-control w-75" style={{height:height}} value={itemtText} onChange={updateTextItem}></textarea>
              <div className='d-flex m-2 justify-content-between'>
                
              <select className='form-select align-self-start w-50' value={props.order} onChange={changeOrder}>
                <option value=""></option>
                {props.array.map((item, index)=>(
                        <option key ={item.contentOrder} value={index+1}>{index+1}</option>
                ))}
                </select>
                <button className='btn btn-outline-success align-self-start' onClick={editItem}>Editer</button>
                <button className='btn btn-outline-danger align-self-start' onClick={showModalWindow} >Supprimer</button>
              </div>
              {showModal && <DeleteModal
                 hideModal={hideModalWindow}
                 showModal={showModalWindow}
                delete={deleteItem}
              /> }
          </div>
          {message && <p className='text-success ms-3'>Modification Effectuée</p>}
    </div>

  )
}

export default InputList;