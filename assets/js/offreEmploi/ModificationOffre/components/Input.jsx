import React, {useState, useEffect} from 'react'
import DeleteModal from '../../components/DeleteModal';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


 const Input = (props) => {

    const [itemtText, setItemText]=useState(props.text);
    const [itemOrder, setItemOrder]=useState(props.order);
    //const [oldItemText, setOldItemText] = useState(props.text);
    const [indexSection, setIndexSection] = useState(props.indexSection);
    //GET THE PARAGRAPH INDEX WHEN THERE IS ONLY LIST
    const [indexParagraph, setIndexParagraph] = useState(props.paragraphOrder);
    const [showModal, setShowModal]=useState(false);
    const [message, setMessage]=useState(false);
    const [height, setHeight]=useState();
    
    useEffect(()=>{
      setItemText(props.text);
      //setIndex(props.order);
      //setArrayContent(props.array)
     //   console.log(props.array)
     // // // //   setAllTheItems(props.allLists);
     const heightTextArea= calcHeight(props.text) + "px";
      setHeight(heightTextArea)
      },[props.text, props.order, props.array])

    //  useEffect(()=>{
    //    setItemText(props.text);
    //     //setAllTheItems(props.allLists);
    //   },[])

    const editItem = ()=>{

      // if(props.action==='ListItem'){
      //   props.update(itemOrder,itemtText);
      //   setMessage(true);
			// 	setTimeout(()=>setMessage(false),3000);
          
      //}else{
        props.update(itemtText, itemOrder, indexSection, indexParagraph)
        setMessage(true);
				setTimeout(()=>setMessage(false),3000);
      //}
        
    }

    const deleteItem = ()=>{
      // if(props.action ==="listItem"){
      //   hideModalWindow();
      //   props.delete(itemOrder,itemtText);
       

      // }else{  
        hideModalWindow();
        props.delete(itemOrder, indexSection, indexParagraph);
        

      // }

     
        
    }

    const updateTextItem = (e)=>{
        // setItemText((state)=>{
        //   return e.currentTarget.value
        // })
        setItemText(e.currentTarget.value)
       
    }
    //HIDE MODAL MESSAGE CONFIRMATION DE SUPPRESION

    const hideModalWindow = ()=>{
      setShowModal(false);
    }

    //SHOW MODAL MESSAGE CONFIRMATION DE SUPPRESION

    const showModalWindow = ()=>{
      setShowModal(true);
    }

    const changeOrder=(e)=>{
      props.change(props.order,e.currentTarget.value, props.indexSection);
    }

    const calcHeight= (value) =>{
      let numberOfLineBreaks = (value.match(/\n/g) || []).length;
      // min-height + lines x line-height + padding + border
      let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    
      return newHeight;
    }



  return (
    <div>
         <div className='d-flex m-2'>
              <textarea cols="2" rows="3" className="form-control w-75"  style={{height:height}} value={itemtText} onChange={updateTextItem}></textarea>
              {/* <input type="text" className='form-control' value={props.text} onChange={updateTextItem}/> */}
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
          {message && <p className='text-success ms-3'>Modification effectuée</p>}
    </div>

  )
}

export default Input;