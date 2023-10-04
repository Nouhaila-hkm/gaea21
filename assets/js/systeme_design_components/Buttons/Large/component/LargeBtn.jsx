import React from 'react'

// IMPORT DU CHEVRON POUR LE BOUTON
import chevron from '../../../../.././images/chevron-droit.png'

import '../../../../../styles/système_design_components/Buttons/LargeBtn/_LargeBtn.scss';

function LargeBtn({txt, link}) {
  return (

    <a className='largeBtnLink' href={link}>
      <div className='btnContent'>
        <p>{txt}</p>
        <img className="chevron-btn" src={chevron} />
      </div>
    </a>
        

    
  )
}

export default LargeBtn