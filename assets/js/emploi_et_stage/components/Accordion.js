import React, { useState } from 'react';
import chevron from '../../../images/emploi_et_stage/offres/chevron-down-green.svg';
import bulletpoint from '../../../images/emploi_et_stage/offres/bullet-point.svg';






const Accordion = ({ offer}) => {
  const [isOpen, setIsOpen] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [rotateChevron, setRotateChevron] = useState(false);






  const handleOpen = (index) => {
    setIsOpen((prev) => {
        return prev === index ? null : index;
    });
    setIsActive((prev) => {
        return prev === index ? null : index;
    });

        setRotateChevron((prev) => {
          return prev === index ? null : index;
      });
    // console.log('clicked', index);
};




  return (
    <>
    {offer?.offerSection?.map((section, index) => (
    <div className="accordion-item" key={section.id} onClick={() => handleOpen(index)} >
  

    <div className={`accordion-title ${isActive === index ? 'active' : ''}`} key={section.id} >
        <h3 className='title' key={section.id}>{section?.offerSectionTitle?.title}</h3>
        <div className='chevron'><img className={` chevron-img chevron ${rotateChevron === index ? "rotate" :''}`} src={chevron} alt="" /></div>
        </div>

     
         <div className={`accordion-content ${isOpen === index ? '' : 'hidden'} `} style={{ display: isOpen === index ? 'block' : 'none' }}>
        {section.contentSections.sort((a,b) => a.contentOrder > b.contentOrder ? 1 : -1)
        .map((contentSection) => (
            <div className='text-container' key={contentSection.id}><p className='text'>{contentSection.description}</p>
            {contentSection.listItems.map((listItem) => (
              <p className="bulletpoint" key={listItem.id}><img src={bulletpoint} alt="" />{listItem.description}</p>
            ))}
            </div>
           
        ))}
            
            </div>
     
  
   
 </div> 
  ))}

 


   

   </>
  );
};

export default Accordion;