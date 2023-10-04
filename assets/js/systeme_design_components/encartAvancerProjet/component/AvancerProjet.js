import React from 'react';
import { useEffect, useState } from 'react';
import {BiInfoCircle} from 'react-icons/bi'

import legend from '../../../../../public/images/PagesProjets/stepProjet.png'
import close from '../../../../images/cross-popup.png'
import "../../../../styles/système_design_components/encartAvancéProjet/encartAvancerProjet.scss"

function AvancerProjet() {

  const [displayLegend, setDisplayLegend] = useState(false)

  const displayLegHandler = () => {
    setDisplayLegend(true)
  }
  const hiddeLegHandler= ()=>{
    setDisplayLegend(false)
  }

  useEffect(()=>{
    const stepItems = document.querySelectorAll(".steps li")
    // const stepItemsBefore = document.querySelectorAll(".steps li")
    console.log(stepItems)
    // console.log(stepItemsBefore)
    stepItems.forEach((stepItem,key) => {
      console.log(key)
    stepItem.classList.add(`step` + `${key+1}`) 
    console.log(stepItem)
  })
},[])

  return (<>
    {displayLegend &&
    <div id='legend'>
      <small>Les étapes d'un projet:</small>
      <div className="img">
        <img src={legend} alt="légende de l'avancé d'un projet" />
      </div>
      <img className='close' src={close} alt="légende de l'avancé d'un projet" onClick={hiddeLegHandler} />
    </div>
  }
    <div id="encart">
        <BiInfoCircle id="info" onClick={displayLegHandler}/>
      

      <div className="tete">
        <p>Avancement du projet:</p>
        
        
      </div>
      <div className="stepper">
        <p>ETAPE 2: Datamining</p>
        <ul className="steps">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default AvancerProjet;
