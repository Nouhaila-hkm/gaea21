import React from 'react';
//importing context
import { OfferContext } from '../OffreInformation';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import logo from '../../../images/emploi_et_stage/offres/logo.png';
import bulletpoint from '../../../images/emploi_et_stage/offres/bullet-point.svg';


const OfferDisplay= ()=> {
      //initializing variable context avec le context
      const context = useContext(OfferContext);
      const [allDepartments, setAllDepartments]=useState([]);
      const [allJobTypes, setAllJobTypes]=useState([]);
      const [department, setDepartment]=useState("");
      const [jobType, setJobType]=useState("");
      const [sectionTitles, setSectionTitle] = useState([]);
      

      useEffect(()=>{
            //GETTING ALL THE DEPARTMENTS
            axios.get('/api/departments').then((response) => {
                setAllDepartments(response.data['hydra:member']);
          });
            //GETTING ALL THE DEPARTMENTS
            axios.get('/api/job_types').then((response) => {
                setAllJobTypes(response.data['hydra:member']);
          });
          //GETTING ALL THE SECTIONS NAME
      axios.get('/api/offer_section_titles').then((response) => {
        setSectionTitle(response.data['hydra:member']);
      });
      }, [])

      useEffect(()=>{
          if(context.offre.department !==""){

            const chosenDepartment= context.offre.department;
            const idDepartment= parseInt(chosenDepartment.slice(chosenDepartment.lastIndexOf('/')+1), 10);
            const index = allDepartments.filter((e)=>{ return e.id===idDepartment});
        
            // setDepartment(index[0].icon);
            setDepartment(index[0].name);

          }
          if(context.offre.jobType !==""){

            const chosenJobType= context.offre.jobType;
            const idJobType= parseInt(chosenJobType.slice(chosenJobType.lastIndexOf('/')+1), 10);
            const index = allJobTypes.filter((e)=>{ return e.id===idJobType});
        
            setJobType(index[0].name);

          }
       
       
        }, [context.offre.department, context.offre.jobType])

     
        const getSectionTitle = (title) =>{
            const idsectionTitle= parseInt(title.slice(title.lastIndexOf('/')+1), 10);
            const index = sectionTitles.filter((e)=>{ return e.id===idsectionTitle});
            return index[0].title;

        }
      

    return (

        <>
        <div>
            <h4 className='text-center'>Aperçu de l'offre</h4>

           
            <div className="card-details">

                <div className="row-1">
                    <p className="job-title">{context.offre.title}</p>
                    <p className='icon'>{department} </p>
                    {/* <img className="icon" src={require("../../../images/emploi_et_stage/offres/" + department)} alt="icon"/> */}
                </div>

                <img src={logo} alt="logo"/>


                <div className="row-3">
                        <p className="published_at">Date de publication</p>
                        <p className="modality">{jobType}</p>
                </div>
            </div>



            

            <div className="accordion">
            {context.offre.offerSection.map((section, i) => (
    <div className="accordion-item" key={i} >
  

    <div className="accordion-title" key={section.id} >
        <h3 className='title' key={section.id}>{getSectionTitle(section.offerSectionTitle)}</h3>
        </div>

     
         <div className='accordion-content'>
        {section.contentSections.sort((a,b) => a.contentOrder > b.contentOrder ? 1 : -1)
        .map((content, index) => (
            <div key={content.contentOrder}><p className='text'>{content.description}</p>
            {content.listItems.map((element) => (
              <p className="bulletpoint" key={element.listItemOrder}><img src={bulletpoint} alt="" />{element.description}</p>
            ))}
            </div>
           
        ))}
            
            </div>
     
  
   
 </div> 
  ))}

 </div>
{/* 

                {
                    context.offre.offerSection.map((section, i)=>(
                        <div className="accordion-title"  key={i}> 
                            <p className='title'>{getSectionTitle(section.offerSectionTitle)}</p>
                            {section.contentSections.map((content, index)=>(
                                <div className='accordion-content ' key ={content.contentOrder}>
                                    <div><p className='text'>{content.description}</p>
                                    <ul key ={index}>
                                    {content.listItems.map(element=>(
                                        <li className="bulletpoint" key={element.listItemOrder}>{element.description}</li>
                                    ))}
                                </ul></div></div>
                            ))}
                        </div>
                    ))
                } */}
            </div>
             
     
        </>
        
    );
}

export default OfferDisplay;