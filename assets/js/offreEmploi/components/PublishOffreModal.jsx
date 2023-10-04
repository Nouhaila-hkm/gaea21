import React from 'react';
import '../../../styles/OffreEmploi/deleteModal.scss';

const PublishOffreModal = (props) => {
     const hide = ()=>{
         props.hidePublishModal();
     }

  return (
    <div>
        <div className='backdrop-modal'></div>
        <div className="delete-modal p-3 d-flex flex-column align-items-center"  >
              

                    
                    <h5 className='my-3'>{` Après l'enregistrement l'offre d'emploi ${props.text} sera publiée sur le site gaea21!`}</h5>
                
                    <button className='btn btn-outline-primary mx-2' onClick={hide}>Ok</button>
                        
                

             
                    
        </div>

       
        

    </div>
  )
}

export default PublishOffreModal;