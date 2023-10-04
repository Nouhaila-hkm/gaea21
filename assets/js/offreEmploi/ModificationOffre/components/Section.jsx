import React , { useState, useRef, useEffect }from 'react';
import Input from './Input';
import {OfferEdit} from '../ContextModification'
import { useContext } from 'react';
import '../../../../styles/OffreEmploi/offreModal.scss';

import axios from "axios";



const Section = (props) => {
   
    const [addContentSection, setAddContentSection]=useState(false);
    const [showingListSection, setShowingListSection] = useState(false);
    //creating the list of elements inside description
    const [addList, setAddList]=useState([]);
    const [content, setContent]=useState([]);
    const [sectionName, setSectionName]=useState([]);
    const [emptyMessage, setEmptyMessage] = useState(false);
    const [existedTitle, setExistedTitle]= useState(false);
    const [title, setTitle]=useState();
    const [sectTitle, setSectTitle]= useState(props.name);
    
    useEffect(()=>{
      //GETTING ALL THE DEPARTMENTS
      axios.get('/api/offer_section_titles').then((response) => {
        setSectionName(response.data['hydra:member']);
      });
      if(props.action ==='Modifier Section'){
        setContent(props.content)
        }
    }, [])

    const [indexSection, setIndexSection]= useState(props.sectionId);
    
    const editContext = useContext(OfferEdit);
    

    //creating the ref for the input
    const inputList = useRef(null); 
    const textContent = useRef(null);
    const sectionTitle = useRef(null);

    //adding the list into the array addList
    const addOneList=()=>{
      console.log(inputList.current.value)
      if(inputList.current.value){

   
        const allTheItems=inputList.current.value;
        const itemsSorted= allTheItems.split('\n').filter(el=>(
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
        addContent(array);
        // setAddList((state)=>{
        //   return [...array]
        //  })
        //  addContent();
        inputList.current.value="";
      
        //addContent();
      }


      /////////////////PREVIEWS FUNCTION

      // if(inputList.current.value){

      //   //CALCULATING THE ORDER OF THE ITEM
      //  let orderId;
      //   if(addList.length===0){
      //     orderId=1;
      //   }else{
      //     orderId=(addList[addList.length - 1].listItemOrder)+1;
      //  }
      //   const list = {
      //     description:inputList.current.value,
      //     listItemOrder:orderId
      //   }

      //   setAddList((state)=>{
      //     return [...state, list]
      //   })
      //   console.log(addList);
      //   inputList.current.value="";
        
      // }

      ////////////////////////////////
      
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
      
      //ADDING A PARAGRAPH
      const copy = {...editContext.offre};
      let contextDetail="";
          
          if(textContent.current=== null){
            contextDetail="";
          }else{
            contextDetail=textContent.current.value;
          }
         
          if(props.action ==='Editer section'){
            const indexS = copy.offerSection.findIndex(e=>{
              return e.sectionOrder === props.sectionOrder
             })
            //  console.log(indexS);
             let lastOrder=0;
             if(copy.offerSection[indexS].contentSections.length ===0){
              lastOrder=0;
             }else{
              copy.offerSection[indexS].contentSections.forEach(item=>{
                if(item.contentOrder>lastOrder){

                  lastOrder=item.contentOrder
                    
                }
              })
              //lastOrder= copy.offerSection[indexS].contentSections[copy.offerSection[indexS].contentSections.length -1].contentOrder;
             }

           
             
             copy.offerSection[indexS].contentSections.push({contentOrder:lastOrder+1, description:contextDetail, listItems:array});
             editContext.addObject(copy);
             
            
          }else{
            setContent((state)=>{
              const copy = [...state];
          
              let contentId=0;
              //CREATING ORDER SECTION
                if(copy.length===0){
                  contentId=0;
                }else{
                  copy.forEach(item=>{
                    if(item.contentOrder>contentId){

                        contentId=item.contentOrder
                       
                    }
                  })
                  //contentId=(copy[copy.length - 1].contentOrder )+1;
              }
          
                  copy.push({contentOrder: contentId+1, description: contextDetail, listItems:array});
                  
                  return [...copy];
            })
           
          }
      //GETTING SECTION INDEX
      
        
  
        //closing ajouter contenu
        setAddContentSection(false);
        setShowingListSection(false);
        setAddList([]);
      }

  

    //adding one section into the offer
    const addOffreSection = ()=>{

      if(props.action ==='Editer section'){
        props.hide();
      }else{

        const checkTitle = editContext.offre.offerSection.filter(e=>{
          return e.offerSectionTitle['@id'] === sectionTitle.current.value
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
          if(editContext.offre.offerSection.length===0){
            sectionId=1;
          }else{
            sectionId=(editContext.offre.offerSection[editContext.offre.offerSection.length - 1].sectionOrder )+1;
        }
          //CREATING OBJECT FOR A NEW SECTION
          const newSection={
            offerSectionTitle:sectionTitle.current.value,
            sectionOrder:sectionId,
            contentSections:content

          }

          editContext.addNewSection(newSection);
          
          
          
          setContent([]);
          props.hide();

        }

        //FIN

      }

      

    }

    const hideModal = ()=>{
        props.hide();
        
    }

    //FUNCTIONS TO UPDATE AND DELETE ITEMS FROM ADDLIST WHICH IT IS THE LIST THAT CONTAINS ALL THE ITEMS BEFORE BEING ADDED TO THE CONTEXT (CONTENU)
    
    const updateItemList=(itemText, order)=>{
    //MAKING A COPY OF ADDLIST ARRAY
    setAddList((state)=>{
       const copy = [...addList];
       const index= copy.findIndex(e=>{
        return e.listItemOrder === order
       })

       copy[index].description=itemText;
       return [...copy]
    })
    
      
    }
    //DELETING ITEM FROM THE LIST
    const deleteteItemList=(itemText, order)=>{
        //MAKING A COPY OF ADDLIST ARRAY
    setAddList((state)=>{
      const copy = [...addList];
      const index= copy.findIndex(e=>{
       return e.listItemOrder === order
      })

      copy.splice(index,1)
      return [...copy]
   })
  //  console.log(addList);
      
    }
    const deleteItem =(order, indexSection, indexParagraph)=>{

      if(props.action ==='Editer section'){
        const copy = {...editContext.offre};
        //GETTING THE SECTION INDEX AND THE PARAGRAPH INDEX TO EDIT THE PARAGRAPH
        const indexS = copy.offerSection.findIndex(e=>{
          return e.sectionOrder === indexSection
         })
  
         const indexP= copy.offerSection[indexS].contentSections.findIndex(e=>{
         return e.contentOrder === indexParagraph
         })
          
        const indexListItem = copy.offerSection[indexS].contentSections[indexP].listItems.findIndex(e=>{
          return e.listItemOrder === order
          })
          copy.offerSection[indexS].contentSections[indexP].listItems.splice(indexListItem, 1);
          editContext.addObject(copy);
          
      }else{
        setContent((state)=>{
          const copy = [...state];
          const index =  copy.findIndex(e=>{
            return e.contentOrder===indexParagraph
          })

          const indexItem= copy[index].listItems.findIndex(e=>{
            return e.listItemOrder===order
          })
          copy[index].listItems.splice(indexItem,1);
          if(copy[index].listItems.length === 0){
           
            copy.splice(index, 1);
            
          }
          return [...copy]
        })
       
      }

      

      
    }

      const updateItem = (itemText, order, indexSection, indexParagraph)=>{
         //CREATTNG ARRAY TO UPDATE LIST

         const allTheItems=itemText;
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

        if(props.action ==='Editer section'){
          const copy = {...editContext.offre};
          
  
          //GETTING THE SECTION INDEX AND THE PARAGRAPH INDEX TO EDIT THE PARAGRAPH
          const indexS = copy.offerSection.findIndex(e=>{
          return e.sectionOrder === indexSection
         })
  
         const indexP= copy.offerSection[indexS].contentSections.findIndex(e=>{
         return e.contentOrder === indexParagraph
         })
          
        const indexListItem = copy.offerSection[indexS].contentSections[indexP].listItems.findIndex(e=>{
          return e.listItemOrder === order
          })

         
        //copy.offerSection[indexS].contentSections[indexP].listItems[indexListItem].description = array;
        copy.offerSection[indexS].contentSections[indexP].listItems = array;
          editContext.addObject(copy);
          
        }else{
          setContent((state)=>{
            const copy = [...state];
            const index =  copy.findIndex(e=>{
              return e.contentOrder===indexParagraph
            })

            const indexItem= copy[index].listItems.findIndex(e=>{
              return e.listItemOrder===order
            })
            copy[index].listItems=array;
            return [...copy]
          })
         
         
        }

       
      }

      const deleteParagraph = (order, indexSection, indexParagraph)=>{

        if(props.action ==='Editer section'){
          const copy = {...editContext.offre};
          //GETTING THE SECTION INDEX AND THE PARAGRAPH INDEX TO EDIT THE PARAGRAPH
       const indexS = copy.offerSection.findIndex(e=>{
         return e.sectionOrder === indexSection
     })
 
     const indexP= copy.offerSection[indexS].contentSections.findIndex(e=>{
       return e.contentOrder === order
     })
       
 
     copy.offerSection[indexS].contentSections.splice(indexP, 1);
     copy.offerSection[indexS].contentSections.forEach((element, index)=>{
      return element.contentOrder=index+1
      }) 
 
     editContext.addObject(copy);
     

        }else{
          setContent((state)=>{
            const copy = [...state];
            // console.log(order);

            const index = copy.findIndex(e=>{
              return e.contentOrder===order
            })
            copy.splice(index,1);
            copy.forEach((element, index)=>{
              return element.contentOrder=index+1
              }) 
            return [...copy]

          })
          
        }
      
  
  }
      
      const updateParagraph = (itemText, order, indexSection,indexParagraph)=>{
       
        if(props.action ==='Editer section'){
          const copy = {...editContext.offre}

          //GETTING THE SECTION INDEX AND THE PARAGRAPH INDEX TO EDIT THE PARAGRAPH
           const indexS = copy.offerSection.findIndex(e=>{
             return e.sectionOrder === indexSection
         })
     
         const indexP= copy.offerSection[indexS].contentSections.findIndex(e=>{
           return e.contentOrder === order
         })
        
         //EDITING THE PARAGRAPH CHOSEN BY THE USER
          copy.offerSection[indexS].contentSections[indexP].description = itemText;
          editContext.addObject(copy);
          
        }else{
          setContent((state)=>{
            const copy = [...state];
            // console.log(order);

            const index = copy.findIndex(e=>{
              return e.contentOrder===order
            })
            copy[index].description=itemText;
            return [...copy]

          })
          
        }
      
        
      }

      const editSectionName=()=>{
        setSectTitle(sectionTitle.current.value)
        
      }

      const changeOrder=(order, position, section)=>{
        
        if(position !==undefined){
          const p = parseInt(position)
          if(props.action ==='Editer section'){
            const copy = {...editContext.offre}
            
            const indexSection = copy.offerSection.findIndex((el)=>{
              return el.sectionOrder===section
                })
        
                

            const indexItemToChange=copy.offerSection[indexSection].contentSections.findIndex((el)=>{
              return el.contentOrder===order
                })

                
        
              const itemToChange = copy.offerSection[indexSection].contentSections.find((el)=>{
                   return el.contentOrder===order;
               })
  
           

              // const indexCurrentItem=copy.offerSection[indexSection].contentSections.findIndex((el)=>{
              //   return el.contentOrder===p
              //     })
                  
            
  
        
          copy.offerSection[indexSection].contentSections.splice(indexItemToChange,1);
          copy.offerSection[indexSection].contentSections.splice((p-1),0,itemToChange)
  
          copy.offerSection[indexSection].contentSections.forEach((element, index)=>{
           return element.contentOrder=index+1
           })
    
              
          const array = copy.offerSection[indexSection].contentSections.sort((a, b) => a.contentOrder > b.contentOrder)
          

          editContext.addObject(copy);
          

          }else{
          setContent((state)=>{
            let copy=[...state];
            //const p = parseInt(position)
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
      }
    return (
    <div>
         <div className='backdrop'/>
           <div className='modale container'>
               <div className='d-flex justify-content-end mb-2'>
                    
                    <button type='button' onClick={hideModal} className='btn btn-outline-danger m-2'>X</button>
               </div>
               
           <div className='d-flex justify-content-center mb-4'>
                <label htmlFor="title-section" className='form-label me-2'>Titre de la section</label>
                <select name = "title-section" id="title-section" data-offer="titleSection" className='form-select w-50' ref={sectionTitle} value={props.name} onChange={editSectionName}>
                <option value=""></option>
                {sectionName?.map(oneSectionName=>(
                    <option key ={oneSectionName.id} value={oneSectionName['@id']}>{oneSectionName.title}</option>
                  ))}
                  </select>
            
            
            </div>
            {emptyMessage && <p className='text-danger'>Ce champs est obligatoire</p>}
            {existedTitle && <p className='text-danger'>Le titre existe déjà</p>}

                 {/* BUTTONS PARAGRAPH AND LIST*/}

                <button className='btn btn-primary btn-sm m-2' onClick={addOneParagraph}>Paragraphe</button>
                <button className='btn btn-primary btn-sm m-2' onClick={showListSection}>Liste</button>

                        
           
           {/* SECTION TO ADD A PARAGRAPH */}

            {addContentSection && (
                <div className='d-flex'>
                  <textarea cols="2" rows="3" className="form-control" placeholder='Rédiger a paragraphe' ref={textContent}></textarea>
                  <div>
                      <button className='btn btn-primary btn-sm m-2' onClick={()=>{addContent([])}}>Ajouter</button>
                  </div>
                </div>)}

            {showingListSection && (<div>
                
                <div>
                    <div className='d-flex'>
                        <textarea cols="2" rows="2" placeholder='add liste' className='form-control m-2' ref={inputList}></textarea>
                       
                        <button id="list" className='btn btn-primary btn-sm m-2 align-self-start' onClick={addOneList}>Ajouter Liste</button>
                    </div>

                    
                    {/* SHOWING ALL THE LIST ITEMS */}
                    {/* <ul>
                        {

                          
                          addList.map(oneListItem=>(

                            // USING THE COMPONENT TO EDIT AND DELETE
                             <Input
                                    key={oneListItem.listItemOrder}
                                    text={oneListItem.description}
                                    order={oneListItem.listItemOrder}
                                    action="listItem"
                                    delete={deleteteItemList}
                                    update={updateItemList}
                                    
                                    />
                            //<li key={oneListItem.order}>{oneListItem.text}</li>
                          ))
                        }
                    </ul> */}
                    
                    {/* BUTTON TO ADD ALL THE ITEMS FROM A LIST */}
                    {/* <div className='text-center'>
                       <button className='btn btn-primary btn-sm m-2 ' onClick={addContent} disabled={addList.length === 0}>Ajouter toutes les Listes</button>
                    </div> */}
                    
                    
                </div>
                
          
            </div>)}
               

                {/* SHOWING ALL THE PARAGRAPHS AND LISTS*/}
                
                {
                    props.action==="Editer section" &&
                      
                    props.content.sort((a, b)=>a.contentOrder > b.contentOrder? 1 : -1)
                    .map((oneContent,i)=>{
                      if(oneContent.description !==""){
                        return (<div key={oneContent.contentOrder}> Paragraphe
                        <Input
                          key={oneContent.contentOrder}
                          text={oneContent.description}
                          order={oneContent.contentOrder}
                          indexSection={props.sectionOrder}
                          update={updateParagraph}
                          delete={deleteParagraph}
                          array={props.content}
                          change={changeOrder}
                          /></div>
                       )
                      }else{
                        let allLists="";
                        oneContent.listItems.map((item,index)=>{
                       
                          if(oneContent.listItems.length !== index+1){
                            allLists=  allLists + `${item.description}\n\n`
                           
                          }else{
                            allLists= allLists + `${item.description}`
                            
                          }
                         
                        })
                        return (<div key={oneContent.contentOrder}>Liste
                          
                            
                            <Input
                            // key={element.listItemOrder}
                            text={allLists}
                            order={oneContent.contentOrder}
                            update={updateItem}
                            delete={deleteParagraph}
                            indexSection={props.sectionOrder}
                            paragraphOrder={oneContent.contentOrder}
                            array={props.content}
                            change={changeOrder}
                            />
                           
                            
                        </div>)
              

                      }
                    })}
                  
                  {
                    props.action==="Ajouter section" &&
                      
                    content.sort((a, b)=>a.contentOrder > b.contentOrder? 1 : -1)
                    .map((oneContent,i)=>{
                      if(oneContent.description !==""){
                        return (<div key={oneContent.contentOrder}> Paragraphe
                        <Input
                          key={oneContent.contentOrder}
                          text={oneContent.description}
                          order={oneContent.contentOrder}
                          indexSection={props.sectionOrder}
                          update={updateParagraph}
                          delete={deleteParagraph}
                          array={content}
                          change={changeOrder}
                          /></div>
                       )
                      }else{
                        let allLists="";
                        oneContent.listItems.map((item,index)=>{
                       
                          if(oneContent.listItems.length !== index+1){
                            allLists=  allLists + `${item.description}\n\n`
                           
                          }else{
                            allLists= allLists + `${item.description}`
                            
                          }
                         
                        })
                        return (<div key={oneContent.contentOrder}>Liste
                         
                            
                            <Input
                            //key={element.listItemOrder}
                            text={allLists}
                            order={oneContent.contentOrder}
                            update={updateItem}
                            delete={deleteParagraph}
                            indexSection={props.sectionOrder}
                            paragraphOrder={oneContent.contentOrder}
                            array={content}
                            change={changeOrder}
                            />
                           
                            
                          </div>)
              

                      }
                    })}
                  
                  
                   
             
          
       



            
            <div className='d-flex justify-content-end mb-2'>
                    <button type='button' className='btn btn-primary btn-md m-2' onClick={addOffreSection}>{props.action}</button>
               
               </div>
               
               
           </div>
        


    </div>
  )
}

export default Section;