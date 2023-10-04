import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Section from './Section'
import {OfferEdit} from '../ContextModification'
import { useContext } from 'react';
import EditSection from './EditSection';
import '../../../../styles/OffreEmploi/offreEmploi.scss';
import AddOffreModal from '../../components/AddOffreModal';
import Display from './Display';
import PublishOffreModal from '../../components/PublishOffreModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

 const Modification = () => {

  const [offreEmploi, setOffreEmploi]=useState({});
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [department, setDepartment]= useState([]);
  const [schoolLevel, setSchoolLevel]= useState([]);
  const [experience, setExperience]= useState([]);
  const [jobType, setJobType]= useState([]);
  const [sectionTitle, setSectionTitle]=useState([]);
  const [idOffre, setIdOffre]= useState();
  const [messageConfirmation, setMessageConfirmation]=useState(false);
  const [publicationConfirmation, setPublicationConfirmation]=useState(false);

  const editContext = useContext(OfferEdit);
  useEffect(()=>{
    const url = window.location.href;
    const offreId= parseInt(url.slice(url.lastIndexOf('/')+1), 10);
    setIdOffre(offreId);
    //console.log(url, offreId);

    axios.get(`/api/job_offres/${offreId}`).then((response) => {
      
      editContext.addObject(response.data);
      
     
      
    });
    
    //GETTING ALL THE DEPARTMENTS
    axios.get('/api/departments').then((response) => {
      
      setDepartment(response.data['hydra:member']);
    });

    //GETTING ALL THE SCHOOL LEVEL
    axios.get('/api/school_levels').then((response) => {
     setSchoolLevel(response.data['hydra:member']);
    });

     //GETTING ALL THE EXPERIENCE
     axios.get('/api/experiences').then((response) => {
         //console.log(response.data)
     setExperience(response.data['hydra:member']);
    });
     //GETTING ALL JOB TYPE
     axios.get('/api/job_types').then((response) => {
      setJobType(response.data['hydra:member']);
    });

        //GETTING ALL THE SECTIONS NAME
    axios.get('/api/offer_section_titles').then((response) => {
    setSectionTitle(response.data['hydra:member']);
  });
    

  },[]);

 

  const show = ()=>{
    if(showSectionModal){
      setShowSectionModal(false);
    }else{
      setShowSectionModal(true);
    }
    //console.log(editContext.offre);
    //console.log(editContext.offre.offerSection);
  }

  const deleteSection=(order)=>{
    const copy = {...editContext.offre};

    const indexS = copy.offerSection.findIndex(e=>{
      return e.sectionOrder === order
     })

    copy.offerSection.splice(indexS, 1)
    editContext.addObject(copy);
    //console.log(editContext.offre);
    
  }

  const getSectionTitle = (title) =>{
    
    const idsectionTitle= parseInt(title.slice(title.lastIndexOf('/')+1), 10);
    //console.log(title, idsectionTitle, index, sectionTitle);
    const index = sectionTitle.filter((e)=>{ return e.id===idsectionTitle});
    return index[0].title;
  }

  const editTitle=(e)=>{
    
    //const property= e.currentTarget.getAttribute('data-offer');

    const copy = {...editContext.offre}
    copy.title=e.currentTarget.value;
    editContext.addObject(copy);
    //console.log(editContext.offre);
  }

  const editInformation=(e)=>{
    
    const property= e.currentTarget.getAttribute('data-offer');
    //console.log(property);
    const copy = {...editContext.offre}
    copy[property]=e.currentTarget.value;
    editContext.addObject(copy);
    //console.log(editContext.offre);
  }

  const editGeneralInformation=(e)=>{
    //console.log(e);
   
    const valueD= e.target.value;
    const property=e.currentTarget.getAttribute('data-offer');
   
    const copy = {...editContext.offre}
    
    copy[property]['@id']=e.target.value;
   
    editContext.addObject(copy);
    //console.log(editContext.offre);

  }

  const editOffre=()=>{
    //EDITING THE OBJECT
    //console.log(editContext.offre);
    const copy={...editContext.offre}
    
    copy.department=editContext.offre.department['@id'];
    copy.experience=editContext.offre.experience['@id'];
    copy.jobType=editContext.offre.jobType['@id'];
    copy.schoolLevel=editContext.offre.schoolLevel['@id'];
    copy.updatedAt=new Date();


    // if((copy.hasOwnProperty('publishedAt') === true) && (copy.hasOwnProperty('isPublished') === false)){
    //   copy.isPublished=true;
    // }else{
    //   copy.isPublished=false;
    //   copy['publishedAt']=null;
    // }
    copy.offerSection.map((element, index)=>{
      //console.log(index);
        
        if(editContext.offre.offerSection[index].offerSectionTitle['@id']){
          
          element.offerSectionTitle=editContext.offre.offerSection[index].offerSectionTitle['@id'];
        }
        
    })
    
  
    


    


    fetch(`/api/job_offres/${idOffre}`,{
      method:'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(copy)
      })
      .then((response)=>{
        if(response.status===200){
          setMessageConfirmation(true);
          
     
          
  
        }
        })
      
   
  }


  const changeState=(e)=>{
    const copy={...editContext.offre}
    if(copy.isPublished){

      copy['isPublished']=false;
    }else{
      copy['isPublished']=true;
      copy['publishedAt'] =new Date();
    }

    editContext.addObject(copy);
    
    /////////////////////
        
  
    
}
const hideModal=()=>{
  setMessageConfirmation(false);
    
    //location.reload();
    window.location.href = `/dashboardoffre`;
}
const hidePublishModal=()=>{
  setPublicationConfirmation(false);
}
  return (
    <>
      {messageConfirmation && <AddOffreModal
          text={editContext.offre.title}
          hideAddModal={hideModal}
          action='modifiée'/>}
        {publicationConfirmation && <PublishOffreModal
          text={editContext.offre.title}
          hidePublishModal={hidePublishModal}/>}
            <div className='my-4 link'><a href="/dashboardoffre"> Retour à la liste des offres</a></div> 
      <div className='visual'>
      <div className='w-25 general-info'>
   
    
      
      <div className='mb-3'>
                <label htmlFor="title" className='form-label'>Titre</label>
                <input type="text" id="title"  className='form-control' data-offer="title" value={editContext.offre.title} onChange={editInformation}/>
            </div>
            
        <div className='mb-3'>
                <label htmlFor="reference" className='form-label'>Code de référence</label>
                <input type="text" id="reference"  className='form-control' data-offer="reference" value={editContext.offre.reference} onChange={editInformation}/>
        </div>
            
           
            
             <div className='mb-3'>
                <label htmlFor="departments" className='form-label'>Département </label>
                <select name="department" id="departments" data-offer="department"  className='form-select' value={editContext.offre.department['@id']} onChange={editGeneralInformation}>
                <option value=""></option>
                {department.map(oneDepartment=>(
                        <option key ={oneDepartment.id} value={oneDepartment['@id']}>{oneDepartment.name}</option>
                ))}
               
               
               
                </select>
            </div>

           <div className='mb-3'>
                <label htmlFor="diploma" className='form-label'>Type de diplôme/Filière</label>
                <input type="text" id="diploma" data-offer="diploma" className='form-control' value={editContext.offre.diploma} onChange={editInformation}/>
            </div>
           
            <div className='mb-3'>
                <label htmlFor="school-level" className='form-label'>Niveau d'études</label>
                <select name="schoolLevel" id="school-level" data-offer="schoolLevel"  className='form-select' value={editContext.offre.schoolLevel['@id']} onChange={editGeneralInformation}> 
                    <option value=""></option>
                    {schoolLevel.map(oneLevel=>(
                        <option key ={oneLevel.id} value={oneLevel['@id']}>{oneLevel.level}</option>
                    ))}
                   
                </select>
            </div>
            
            <div className='mb-3'>
                <label htmlFor="experience" className='form-label'>Expérience</label>
                <select name="experience" id="experience" data-offer="experience"  className='form-select' value={editContext.offre.experience['@id']} onChange={editGeneralInformation}>
                <option value=""></option>
                {experience.map(oneExperience=>(
                        <option key ={oneExperience.id} value={oneExperience['@id']}>{oneExperience.experience}</option>
                ))}
                
                </select>
            </div>
         
            <div className='mb-3'>
                <label htmlFor="jobtype" className='form-label'>Modalité de travail</label>
                <select name="jobtype" id="jobtype" data-offer="jobType"  className='form-select' value={editContext.offre.jobType['@id']} onChange={editGeneralInformation}>
                <option value=""></option>
                {jobType.map(oneJobType=>(
                        <option key ={oneJobType.id} value={oneJobType['@id']}>{oneJobType.name}</option>
                ))}
               
                </select>
                    
                
            </div> 
         
            
           
            <div className='mb-3'>
             <p>Publier l'offre</p>
                    <label className="switch">
                        <input className='form-check-input' type="checkbox" id="published" name="published"  data-offer="isPublished" checked={editContext.offre.isPublished} onChange={changeState}/>

                        <span className="slider round"></span> 
                    </label>
             </div>
             <div className="text-end">

        <button className="btn btn-primary m-2" onClick={editOffre}>Modifier l'offre d'emploi</button>

      </div>
           
            </div>  

            <div className='add-section  ms-2 text-center'>
                    {/* ajouter une section; inside the context there is a function changeAddSection that allows to change the variable addSection from false to true or viceversa*/}
            <button type='button' className='btn btn-primary btn-sm mt-2' onClick={show}>Ajouter une section</button>

            {
              showSectionModal &&  <Section 
              action="Ajouter section"
              hide={show}
              
              //content={[]}
            />
            }

            {/* SHOWING ALL THE SECTIONS */}

             {editContext.offre.offerSection &&
               editContext.offre.offerSection.map((section, i)=>(
                    <EditSection
                    key={section.sectionOrder}
                    sectionName={section.offerSectionTitle.title ? section.offerSectionTitle.title : getSectionTitle(section.offerSectionTitle)}
                    content={section.contentSections}
                    order={section.sectionOrder}
                    delete={deleteSection}
                    action='Editer section'
                    name={section.offerSectionTitle['@id']? section.offerSectionTitle['@id']: section.offerSectionTitle}
                    
                    />
                    
                    
                ))
            }  
            
            </div>
            <div className='offer-display ms-2'>
               
                    <Display 
                        
                    />
                 
            </div>   
            </div>
    </>
  )

}


export default Modification