import React from 'react'

import '../../../../styles/système_design_components/smallBoxDesign/smallBox.scss'

// IMPORT DU CHEVRON POUR LE BOUTON
import chevron from '../../../../images/chevron-droit.png'

function SmallBox({title,link, image}) {


  return (

    <div className='box'>
        <div className='project-img'>
            <img className='image' src={image} alt={title} />
        </div>
        <div className='box-text-content'>
            <p>{title}</p>
            <a href={link} className="_large-btn-smallBox">Découvrir<img className="chevron-btn" src={chevron} /></a>
        </div>
        
    </div>

  )
}

export default SmallBox