import React from 'react'

// IMPORT DU CHEVRON POUR LE BOUTON
import chevron from '../../../../.././images/chevron-droit.png'

import '../../../../../styles/système_design_components/Buttons/SmallBtn/_SmallBtn.scss';


function SmallBtn({txt, link}) {
  return (
    <a className='smallBtnLink' href={link}>
      <div className='btnContent'>
        <p>{txt}</p>
        <img className="chevron-btn" src={chevron} />
      </div>
    </a>
        

  )
}

export default SmallBtn