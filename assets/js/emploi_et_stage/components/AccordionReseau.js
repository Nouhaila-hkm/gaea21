import React, { useState } from 'react';
import chevron from '../../../images/emploi_et_stage/reseau/chevron-down-blue.svg';



const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className='title'>{title}</div>
        <div className='chevron'><img className='chevron-img' src={chevron} alt="" /></div>
      </div>
      {isActive && <div className="accordion-content"><div className='text'>
        {content}
      </div></div>}
    </div>
  );
};

export default Accordion;