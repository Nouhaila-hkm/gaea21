import React , { useState, useRef, useEffect }from 'react'
import '../../../styles/OffreEmploi/offreModal.scss'

import { OfferContext } from '../OffreInformation';
import { useContext } from 'react'; 
import InputList from './InputList';

import axios from "axios";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const AddSection = (props) => {
    const context = useContext(OfferContext);
    const [addContentSection, setAddContentSection]=useState(false);
    const [showingListSection, setShowingListSection] = useState(false);
    //creating the list of elements inside description
    
    const [content, setContent]=useState([]);
    const [sectionName, setSectionName]=useState([]);
    const [emptyMessage, setEmptyMessage] = useState(false);
    const [existedTitle, setExistedTitle]= useState(false);
    
   
    const [sectTitle, setSectTitle]= useState();
   
 
    useEffect(()=>{
      //GETTING ALL THE SECTIONS NAME
      axios.get('/api/offer_section_titles').then((response) => {
          setSectionName(response.data['hydra:member']);
        });
         if(props.action ==='Modifier Section'){
          setContent(props.content);
          setSectTitle(props.sectionName);
          }
        
      },[])



   
    //creating the ref for the input
    const inputList = useRef(null); 
    const textContent = useRef(null);
    const sectionTitle = useRef(null);
   
  

    
    //adding the list into the array addList
    const addOneList=()=>{

     
      if(inputList.current.value){

   
        const allTheItems=inputList.current.value;
        const itemsSorted= allTheItems.split('\n').filter(el=>(
          el !==""
        ))
        
        
        const array=[];
        itemsSorted.forEach((item, index)=>{

         
          
          //CREATING THE OBEJECT FOR EVERY LIST
          const list = {
            description:item,
            listItemOrder:index+1
          }

          array.push(list);
          
        })
        addContent(array);
       
        inputList.current.value="";
      
        
      }
      
    }
   

   
    //SHOWING AND HIDING ADD PARAGRAPH AND ADDING LIST
    const addOneParagraph=()=>{
      setAddContentSection(true);
      setShowingListSection(false);
    }

    const showListSection=()=>{
      
      setShowingListSection(true);
      setAddContentSection(false);
     
    }
   
   //ADDING A NEW CONTEXT FOR A SECTION
    const addContent=(array)=>{
      
      
        setContent((state)=>{
          let contextDetail="";
          
          if(textContent.current=== null){
            contextDetail="";
          }else{
            contextDetail=textContent.current.value;
          }
          const copyObject= [...state];
          let contentId=0;
        //CREATING ORDER SECTION
        if(copyObject.length===0){
          contentId=0;
        }else{

          copyObject.forEach(item=>{
            if(item.contentOrder>contentId){
                contentId=item.contentOrder
            }
          })

       
       }
         
          copyObject.push({contentOrder: contentId+1, description: contextDetail, listItems:array});
          
          return [...copyObject];
        })
  
      
  
        //CLEANING VARIABLES
   
      
        
        
  
        //closing ajouter contenu
        setAddContentSection(false);
        setShowingListSection(false);
      }

  

    //adding one section into the offer
    const addOffreSection = ()=>{

      if(props.action ==='Modifier Section'){

      
          //UPDATING INFORMATION
          context.updateSection(props.order, content, sectionTitle.current.value);
          props.close();
          
      }else{
        //console.log('Ajouter');

      const checkTitle = context.offre.offerSection.filter(e=>{
          return e.offerSectionTitle === sectionTitle.current.value
      })
     
      
     
        if(sectionTitle.current.value === null ||  sectionTitle.current.value === ""){
          setEmptyMessage(true);
          setTimeout(()=>setEmptyMessage(false),3000);
        }else if(checkTitle.length>0){
          setExistedTitle(true);
          setTimeout(()=>setExistedTitle(false),3000);
        }else{
          let sectionId;
          //CREATING ORDER SECTION
          if(context.offre.offerSection.length===0){
            sectionId=1;
          }else{
            sectionId=(context.offre.offerSection[context.offre.offerSection.length - 1].sectionOrder )+1;
        }
          //CREATING OBJECT FOR A NEW SECTION
        
           
          const newSection={
            offerSectionTitle:sectionTitle.current.value,
            sectionOrder:sectionId,
            contentSections:content

          }

          context.addOneSection(newSection);
          context.changeAddSection();
         
          
          setContent([]);

        }
       }

      

    }

    

    const hideModal = ()=>{
        if(props.action ==='Modifier Section'){
          props.close();
        }else{
          context.changeAddSection();
        }
        
    }

     
      
      

      const updateItem = (itemText, order, indexS)=>{
      
        
        setContent((state)=>{
          let copy=[...state];

          //GETTING THE CONTENT SECTION INDEX
          const indexSection = copy.findIndex((element)=>{
            return element.contentOrder===indexS
          })
          console.log(itemText)

        
        const itemsSorted= itemText.split('\n').filter(el=>(
          el !==""
        ))
        
        console.log(itemsSorted);
        const array=[];
        itemsSorted.forEach((item, index)=>{

        
          
          //CREATING THE OBEJECT FOR EVERY LIST
          const list = {
            description:item,
            listItemOrder:index+1
          }

          array.push(list);
        })
          console.log(array);

          

          //  //UPDATING THE ITEM
          copy[indexSection].listItems=array;
         console.log(...copy)
          return [...copy]
         })
       
      }

      const deleteParagraph = (itemText, order, indexS)=>{
        setContent((state)=>{
          const copy=[...state];

          //GETTING THE CONTENT SECTION INDEX
          const indexSection = copy.findIndex((element)=>{
            return element.contentOrder===indexS
          })
       
          

           //DELETING THE ITEM
         
           
             copy.splice(indexSection, 1);
           
             copy.forEach((element, index)=>{
              return element.contentOrder=index+1
              }) 
         
          return [...copy]
         })

        //  console.log(content)
      }
      
      const updateParagraph = (itemText, order, indexS)=>{
       
      
        setContent((state)=>{
          const copy=[...state];
          console.log(copy);
          //GETTING THE CONTENT SECTION INDEX
          const indexSection = copy.findIndex((element)=>{
            return element.contentOrder===indexS
          })
       
         

           //UPDATING THE SECTION PARAGRAPH
           copy[indexSection].description=itemText;
         
          return [...copy]
         })
        
      }

      //CHANGE ITEM ORDER

      const changeOrderItem=(order, position)=>{
        console.log(order, position);
        if(position !==undefined){
          setContent((state)=>{
            let copy=[...state];
            const p = parseInt(position)
            const indexItemToChange=copy.findIndex((el)=>{
            return el.contentOrder===order
              })
      
            const itemToChange = copy.find((el)=>{
                 return el.contentOrder===order;
             })

            const indexCurrentItem=copy.findIndex((el)=>{
              return el.contentOrder===p
                })
                
            

      
        copy.splice(indexItemToChange,1);
        copy.splice((p-1),0,itemToChange)

        copy.forEach((element, index)=>{
         return element.contentOrder=index+1
         })
  
       
            
        const array = copy.sort((a, b) => a.contentOrder > b.contentOrder)
            
               
             
           
            return [...array]
           })


           
        }
     
       
      }

      const editSectionName=(e)=>{
        console.log(e.currentTarget.value)
        setSectTitle(e.currentTarget.value)
        console.log(sectTitle);
      }


    return (
    <div>
         <div className='backdrop'/>
           <div className='modale container'>
               <div className='d-flex justify-content-end mb-2'>
                    
                    <button type='button' onClick={hideModal} className='btn btn-outline-danger m-2'>X</button>
               </div>
               
           <div>
                <label htmlFor="title-section" className='form-label'>Titre</label>
                
                {(props.action === 'Ajouter Section') &&
                <select name = "title-section" id="title-section" data-offer="titleSection" className='form-select w-50' ref={sectionTitle}>
                <option value=""></option>
                  {sectionName?.map(oneSectionName=>(
                    <option key ={oneSectionName.id} value={oneSectionName['@id']}>{oneSectionName.title}</option>
                  ))}
                  </select>
                }
                
               

               {(props.action === 'Modifier Section') &&
                <select name = "title-section" id="title-section" data-offer="titleSection" className='form-select' ref={sectionTitle} value={sectTitle} onChange={editSectionName}>
                <option value=""></option>
                  {sectionName?.map(oneSectionName=>{
                    return <option key ={oneSectionName.id} value={oneSectionName['@id']}>{oneSectionName.title}</option>
                    
                    
                  })}
                  </select>
                }
                
                
            </div>
            {emptyMessage && <p className='text-danger'>Ce champs est obligatoire</p>}
            {existedTitle && <p className='text-danger'>Le titre existe déjà</p>}

                 {/* BUTTONS PARAGRAPH AND LIST*/}

                <button className='btn btn-primary btn-sm m-2' onClick={addOneParagraph}>Paragraphe</button>
                <button className='btn btn-primary btn-sm m-2' onClick={showListSection}>Liste</button>
               

                
                   
             
          
               
           
           {/* SECTION TO ADD A PARAGRAPH */}

            {addContentSection && (
                <div className='d-flex'>
                  <textarea cols="2" rows="3" className="form-control" placeholder='Rédiger un paragraphe' ref={textContent}></textarea>
                  <div>
                      <button className='btn btn-primary btn-sm m-2' onClick={()=>{addContent([])}}>Ajouter</button>
                  </div>
                </div>)}

            {showingListSection && (<div>
                
                <div>
                    <div className='d-flex'>
                      
                        <textarea cols="2" rows="2" placeholder='Rédiger une liste' className='form-control m-2' ref={inputList}></textarea> 
                       
                        <button id="list" className='btn btn-primary btn-sm m-2 align-self-start' onClick={addOneList}>Ajouter liste</button>
                    </div>

                    
                    
                </div>
                
          
            </div>)}


          {/* SHOWING ALL THE PARAGRAPHS AND LISTS*/}
                
         

      
          {
          content.sort((a, b) => a.contentOrder > b.contentOrder? 1 : -1)
          .map((oneContent,i)=>{
                      if(oneContent.description !==""){
                        return (<div key={oneContent.contentOrder}> Paragraphe
                        <InputList
                         key={oneContent.contentOrder}
                         
                          text={oneContent.description}
                          order={oneContent.contentOrder}
                          indexSection={oneContent.contentOrder}
                          delete={deleteParagraph}
                          update={updateParagraph}
                          change={changeOrderItem}
                          array={content}
                          />
                          </div>
                       )
                      }else{
                        let allLists="";
                        oneContent.listItems.map((item,index)=>{
                       
                         
                            allLists=  allLists + `${item.description}\n\n`
                           
                         
                         
                        })
                        
                        
                        return (
                        <div key={oneContent.contentOrder}>Liste
                          
                            
                            <InputList
                            key={oneContent.contentOrder}
                            
                            text={allLists}
                            order={oneContent.contentOrder}
                            delete={deleteParagraph}
                            update={updateItem}
                            indexSection={oneContent.contentOrder}
                            array={content}
                            change={changeOrderItem}
                            />
                           
                            
                         </div>
                         )
              

                      }
                    })}
                  
            
             <div className='d-flex justify-content-end mb-2'>
                    <button type='button' className='btn btn-primary btn-md m-2' onClick={addOffreSection}>{props.action}</button>
                 
               </div>
               
           </div>
        


    </div>
  )
}

