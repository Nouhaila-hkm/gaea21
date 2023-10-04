import axios from 'axios';
import React, {useState} from 'react'

const BoutonPublish = (oneOffre, id) => {


    const [checked, setChecked]=useState(false);

    const changeState=(e)=>{
        
        setChecked(e.target.checked);
       
      
       const id = oneOffre.id;

        if(!checked){
           axios.post(`api/job_offres/${id}/publish`)
           .then(function (response) {
            // console.log(response);
            
          })
          .catch(function (error) {
            console.log(error);
          });

        }
        

    }



  return (
    <div className='mb-3'>

           <label className="switch">
               <input type="checkbox" id="published" name="published"  data-offer="isPublished" data-id = {oneOffre.id} onChange={changeState} checked={checked}/>
               <span className="slider round"></span> 
           </label>
    </div>
  )
}

export default BoutonPublish