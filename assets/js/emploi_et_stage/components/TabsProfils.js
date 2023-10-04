import React, {useState} from 'react'
import iconProfil from '../../../images/emploi_et_stage/icon-competences.svg';
import Salarie from './Salarie';
import Freelance from './Freelance';

const TabsProfils = () => {
  const [index, setIndex] = useState(0);
  return (

<>
    <section className="competence-1"  >

<div className="img-1">
    <img className='comp-img' src={iconProfil}/>
    
</div>

<div className="p-t"><b>Profil de compétences post gaea21</b></div>


</section>




      <div className='links'>
          <div className='left'>
            <div className='tabgaea21' onClick={() =>{setIndex(0)}}>Salarié</div>
            <div className='tabReseau' onClick={() =>{setIndex(1)}}>Freelance</div>
          </div>
          <div className='right' hidden={index != 0}>
       Recruteur: <a href="/emploi-et-stage/demande"> déposer une annonce </a>
   </div>
          <div className='right link-reseau' hidden={index != 1}>
       Recruteur: <a href="/emploi-et-stage/demande"> déposer une annonce </a>
   </div>
      </div>

      <div hidden={index != 0}><Salarie/></div>
      <div hidden={index != 1}><Freelance/></div>


</>
  
  )
}

export default TabsProfils