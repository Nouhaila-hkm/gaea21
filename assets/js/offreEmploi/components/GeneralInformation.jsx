import React, {useEffect, useState} from 'react';
import OffreInformation from '../OffreInformation'
//importing context
import { OfferContext } from '../OffreInformation';
import { useContext } from 'react';
import OfferDisplay from './OfferDisplay';


//importing style

import '../../../styles/OffreEmploi/offreEmploi.scss'
import { AddSection } from './AddSection';

import axios from "axios";
import AddOffreModal from './AddOffreModal';
import PublishOffreModal from './PublishOffreModal';
import ModifySection from './ModifySection';



const GeneralInformation = ()=> {
    //ALL THE SELECTS DEPARTMENTS, JOBTYPE, SCHOOLLEVEL, EXPERIENCE 
    const [department, setDepartment]=useState([]);
    const [schoolLevel, setSchoolLevel]=useState([]);
    const [experience, setExperience]=useState([]);
    const [jobType, setJobType]=useState([]);
    const [checked, setChecked]=useState(false);
    const [messageConfirmation, setMessageConfirmation]=useState(false);
    const [publicationConfirmation, setPublicationConfirmation]=useState(false);
    const [emptyTitle, setEmptyTitle]=useState(false);
    const [emptySchoolLevel, setEmptySchoolLevel]=useState(false);
    const [emptyExperience, setEmptyExperience]=useState(false);
    const [emptyJobType, setEmptyJobType]=useState(false);
    const [emptyDepartment, setEmptyDepartment]=useState(false);
    const [emptyReference, setEmptyReference]=useState(false);
    const [emptyDiploma, setEmptyDiploma]=useState(false);



    //initializing variable context avec le context
    const context = useContext(OfferContext);

  

    //LOADING THE INFORMATION FROM THE BD
    useEffect(()=>{
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
              
           setExperience(response.data['hydra:member']);
          });
           //GETTING ALL JOB TYPE
           axios.get('/api/job_types').then((response) => {
            setJobType(response.data['hydra:member']);
          });
          
          
    },[])

    const getOfferDetail = (e)=>{

        //getting property and value everytime there is a changement
        const value = e.currentTarget.value;
        const property= e.currentTarget.getAttribute('data-offer');
        
        //FUNCTION TO UPDATE THE PROPERTY SUCH AS TITLE, DEPARTMENT, SCHOOL LEVEL ETC AND ITS VALUE
        context.addProperty(property, value);

        
    }

    const showModal =()=>{
        context.changeAddSection();
    }

    //CREATE A JOB OFFRE
    const addOfferEmploi = ()=>{

        //CHECKING IF ALL THE PROPERTIES HAVE A VALUE BEFORE ADDING THE OFFER. ALL THE PROPERTIES MUST HAVE A VALUE
        if(context.offre.title === ""){
            setEmptyTitle(true);
            setTimeout(()=>setEmptyTitle(false),5000);
        }
        if(context.offre.schoolLevel === ""){
            setEmptySchoolLevel(true);
            setTimeout(()=>setEmptySchoolLevel(false),5000);
        }
        if(context.offre.experience === ""){
            setEmptyExperience(true);
            setTimeout(()=>setEmptyExperience(false),5000);
        }
        if(context.offre.jobType === ""){
            setEmptyJobType(true);
            setTimeout(()=>setEmptyJobType(false),5000);
        }
        if(context.offre.department === ""){
            setEmptyDepartment(true);
            setTimeout(()=>setEmptyDepartment(false),5000);
        }
         if(context.offre.reference === ""){
            setEmptyReference(true);
            setTimeout(()=>setEmptyReference(false),5000);
        }
        if(context.offre.diploma === ""){
            setEmptyDiploma(true);
            setTimeout(()=>setEmptyReference(false),5000);
        }
        if(context.offre.title !== "" && context.offre.schoolLevel !=="" && context.offre.experience !=="" && context.offre.jobType !=="" && context.offre.department !== "" && context.offre.reference !== "" && context.offre.diploma !== ""){
            
        
          
          fetch('/api/job_offres',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(context.offre)
            })
            .then((response)=>{
               
                if(response.status===201){
                    setMessageConfirmation(true);
                }

                
            })
        }
        
    }


    //FUNCTION CHANGESTATE TO PUBLISH OR NOT THE OFFER

    const changeState=(e)=>{
        
        setChecked(e.target.checked);
       
        const property= e.currentTarget.getAttribute('data-offer');
        context.addProperty(property, !checked);
       
    
        if(!checked){
            context.addProperty("publishedAt",new Date());
            context.offre.isPublished=true;
            setPublicationConfirmation(true);
            
        }else{
            delete context.offre['publishedAt'];
            context.offre.isPublished=false;
           
        }
        
       
    }

    //HIDE CONFIRMATION MESSAGE FOR ADDING AN OFFER

    const hideOffreModal=()=>{
        setMessageConfirmation(false);
        window.location.href = `/dashboardoffre`;

    }
     //HIDE CONFIRMATION MESSAGE FOR PuBLISSHING AN OFFER
    const hidePublishModal=()=>{
        setPublicationConfirmation(false);
    }

    return (
       <div>
        {/* showing the modal adding section inside the context there is a variable named addSection which is a boolean */}
         {messageConfirmation && <AddOffreModal
          text={context.offre.title}
          hideAddModal={hideOffreModal}
          action='ajoutée'/>}
         {publicationConfirmation && <PublishOffreModal
          text={context.offre.title}
          hidePublishModal={hidePublishModal}/>}
         {context.addSection && <AddSection
       
         action={"Ajouter Section"}/>}
         <div className='my-4 link'><a href="/dashboardoffre"> Retour à la liste des offres</a></div>
           <div className='visual'>
           
            <div className='general-info ms-2'>

                

             
            
            <div className='mb-3'>
                <label htmlFor="title" className='form-label'>Titre*</label>
                <input type="text" id="title" data-offer="title" className='form-control' onChange={getOfferDetail}/>
            </div>
            {emptyTitle && <p className='text-danger'>Ce champs est obligatoire</p>}

            <div className='mb-3'>
                <label htmlFor="reference" className='form-label'>Code de référence*</label>
                <input type="text" id="reference" data-offer="reference" className='form-control' onChange={getOfferDetail}/>
            </div> 
           {emptyReference && <p className='text-danger'>Ce champs est obligatoire</p>} 
            
             <div className='mb-3'>
                <label htmlFor="departments" className='form-label'>Département*</label>
                <select name="department" id="departments" data-offer="department" onChange={getOfferDetail} className='form-select'>
                <option value=""></option>
                {department?.map(oneDepartment=>(
                        <option key ={oneDepartment?.id} value={oneDepartment['@id']}>{oneDepartment?.name}</option>
                ))}
                </select>
            </div>
            {emptyDepartment && <p className='text-danger'>Ce champs est obligatoire</p>}
             <div className='mb-3'>
                <label htmlFor="diploma" className='form-label'>Type de diplôme/Filière*</label>
                <input type="text" id="diploma" data-offer="diploma" className='form-control' onChange={getOfferDetail}/>
            </div>
            {emptyDiploma && <p className='text-danger'>Ce champs est obligatoire</p>}
            <div className='mb-3'>
                <label htmlFor="school-level" className='form-label'>Niveau d'études*</label>
                <select name="schoolLevel" id="school-level" data-offer="schoolLevel" onChange={getOfferDetail} className='form-select'> 
                    <option value=""></option>
                    {schoolLevel?.map(oneLevel=>(
                        <option key ={oneLevel.id} value={oneLevel['@id']}>{oneLevel.level}</option>
                    ))}
                   
                </select>
            </div>
            {emptySchoolLevel && <p className='text-danger'>Ce champs est obligatoire</p>}
            <div className='mb-3'>
                <label htmlFor="experience" className='form-label'>Expérience*</label>
                <select name="experience" id="experience" data-offer="experience" onChange={getOfferDetail} className='form-select'>
                <option value=""></option>
                {experience?.map(oneExperience=>(
                        <option key ={oneExperience.id} value={oneExperience['@id']}>{oneExperience.experience}</option>
                ))}
                </select>
            </div>
            {emptyExperience && <p className='text-danger'>Ce champs est obligatoire</p>}
            <div className='mb-3'>
                <label htmlFor="jobtype" className='form-label'>Modalité de travail*</label>
                <select name="jobtype" id="jobtype" data-offer="jobType" onChange={getOfferDetail} className='form-select'>
                <option value=""></option>
                {jobType?.map(oneJobType=>(
                        <option key ={oneJobType.id} value={oneJobType['@id']}>{oneJobType.name}</option>
                ))}
                </select>
            </div> 
            {emptyJobType && <p className='text-danger'>Ce champs est obligatoire</p>}
            
             <div className='mb-3'>
             <p>Publier l'offre</p>
                    <label className="switch">
                        <input type="checkbox" id="published" name="published"  data-offer="isPublished" onChange={changeState} checked={checked}/>
                        <span className="slider round"></span> 
                    </label>
             </div>
              
             <div className='d-flex justify-content-evenly align-items-center'>
                    {/* <h4 className='mt-0'>Information générale</h4> */}
                    <button onClick={addOfferEmploi} className='btn btn-primary btn-sm mt-2 mb-5'>Créer l'offre d'emploi</button>
                </div>
             
        
            
        </div>

        <div className='add-section  ms-2 text-center'>
                    {/* ajouter une section; inside the context there is a function changeAddSection that allows to change the variable addSection from false to true or viceversa*/}
            <button type='button' onClick={showModal} className='btn btn-primary btn-sm mt-2'>Ajouter une section</button>
            
            {
                context.offre?.offerSection.map((section, i)=>(
                    <ModifySection
                    key={section.sectionOrder}
                    sectionName={section.offerSectionTitle}
                    content={section.contentSections}
                    order={section.sectionOrder}/>
                    
                    
                ))
            } 
              </div>




            <div className='offer-display'>
               
                    <OfferDisplay 
                        
                    />
                 
            </div>
       </div>
       </div>
    );
}

export default GeneralInformation;