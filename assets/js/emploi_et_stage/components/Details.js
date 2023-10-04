import React, { useState, useEffect } from 'react';

import logo from '../../../images/emploi_et_stage/offres/logo.png';
import Accordion from './Accordion';
import moment from 'moment'
import 'moment/locale/fr'

import axios from "axios";




const Details = () => {

  const pathname = window.location.pathname.split("/");
  const id = pathname[4];

  // console.log(id);
  const [offer, setOffer] = useState([]);
  const [publicationDate, setPublicationDate] = useState('');




  useEffect(() => {


    axios.get(`/apiTest/job_offres/${id}`)
    .then((response) => {
      // console.log(response);
     
      const newOffer = response.data;
     
       setOffer(newOffer); 
        setPublicationDate(newOffer.publishedAt);
      
    });

   
      // }
      //  fetchOffer();
       
      
  }, [id]);

  // console.log(publicationDate)
  moment.locale('fr');
  const publishedAt = moment(publicationDate).fromNow();
  // console.log(publishedAt);






  return (
    <>
    
<div className="card-details">

<div className="row-1">
<p className="job-title">{offer.title}</p>
{/* <p className="department-icon"> <img src={require("../../../../images/emploi_et_stage/offres/" + offer.department.icon)} alt="" /></p> */}
{/* <button className="candidate-button">Postuler</button> */}

</div>

<img src={logo} alt="logo"/>


<div className="row-3">
<p className="published_at"> publié {publishedAt}</p>
<p className="modality">{offer.jobType?.name}</p>
</div>
</div>

<div>
           
          
       

      <div className="accordion">

      <Accordion offer={offer}/>
          
       
    


      </div>
    </div>

        {/* <div className='btn-container'>
             <button className="candidate-button-bottom">Postuler</button> 
        </div>
   */}

    </>
  )
}

export default Details