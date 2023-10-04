// import { copyWithin } from 'core-js/core/array';
import React, {useEffect, useState} from 'react'

// IMPORT DU CHEVRON POUR LE BOUTON
import chevron from '../../../../images/chevron-droit.png'

// IMPORT CSS
import '../../../../styles/système_design_components/VignetteLarge/largeCard.scss';

// console.log(typeof headerNewsletter)
function LargeCard({title, source, description, disabled, link}) {
  const [active, setActive] = useState(true)

  useEffect(() => {
    // console.log(title,source,description,disabled)
    if(disabled === "true"){
      setActive(false)
      // console.log(setActive)
    }
  },[])


  

  

  return (
    <>
    {active ?
    <div className="_large-card-container">
    <div className="_large-card">
          <div className="_overlay"></div>
          <a href={link} className="_large-btn-large-card">Découvrir<img className="chevron-btn" src={chevron} /></a>
      <div className="_card-content">
        <div className="_card-header">
          <h3>{title}</h3>
        </div>
        <p className="_card-description">{description}</p>
        <div className="_container-img">
          <img className="_img" src={source} alt="Lorem" />
        </div>
      </div>
    </div></div>:
    <div className="_large-card-container">
    <div className="_large-card">
          <div className="_disabled-large-card"></div>
      <div className="_card-content opacity-50">
        <div className="_card-header">
          <h3>{title}</h3>
        </div>
        <p className="_card-description">{description}</p>
        <div className="_container-img">
          <img className="_img" src={source} alt="Lorem" />
        </div>
      </div>
    </div>
    </div>
    }
  </>
  )
}

export default LargeCard