import React, { useEffect, useState } from 'react'

import "react-alice-carousel/lib/alice-carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import AliceCarousel from "react-alice-carousel";

// IMPORT DU CHEVRON POUR LE BOUTON
import chevron from '../../../../images/chevron-droit.png'
import nextBtn from '../../../../images/flecheADroite.png'
import prevBtn from '../../../../images/flecheAGauche.png'
import actif from '../../../../images/active-arrow.png'



import '../../../../styles/système_design_components/bigCarousel/bigCarousel.scss'

function BigCarousel({ content }) {

  const items = content.items.map((item) =>
    <div className='item-container'><div className='project'><img className='chevron-bas' src={actif} /><p data-id={item.id}>{item.title}</p><a href={item.link} className="_btn-decouvrir">Découvrir<img className='chevron-btn' src={chevron} /></a></div></div>,

  );


  const pathName = window.location.pathname.split('/')
  const lastParam = pathName[pathName.length - 1]




useEffect(() =>{

  // Récupere tous les element p dans le #tertiaryMenu
  const projetPages = document.querySelectorAll('#WhoCarousel .project p')
  const whoPages = document.querySelectorAll('#ProjetCarousel .project p')

  projetPages.forEach(el=> {
    const parent = el.parentNode
    // Sur tous les elements p, je regarde si leur data id est egale au param

    // Si outerWidth, j'ajoute la calass a son parent, ca lui donne de la couleur
    if(el.getAttribute('data-id') === lastParam){ // Si data-id de el === au last param alors:
      // donne la class "currentProject" au parents (met le background en vert etc)
      parent.classList.add('currentProject')  
      const btn = document.querySelector('.currentProject ._btn-decouvrir')
      btn.style.display='none'
      const chevron_actif = document.querySelector('.currentProject .chevron-bas')
      chevron_actif.style.opacity = '1'
    }
  })

  whoPages.forEach(el=> {
    const parent = el.parentNode
    // Sur tous les elements p, je regarde si leur data id est egale au param

    // Si outerWidth, j'ajoute la calass a son parent, ca lui donne de la couleur
    if(el.getAttribute('data-id') === lastParam){ // Si data-id de el === au last param alors:
      // donne la class "currentProject" au parents (met le background en vert etc)
      parent.classList.add('currentProject')  
      const btn = document.querySelector('.currentProject ._btn-decouvrir')
      btn.style.display='none'
      const chevron_actif = document.querySelector('.currentProject .chevron-bas')
      chevron_actif.style.opacity = '1'
    }
  })
},[])
    
    

  return (<>
    <AliceCarousel
    autoWidth
    disableDotsControls
    items={items}
    />
    <img className="precedent" src={prevBtn} /> 
    <img className="suivant"  src={nextBtn}  />
</>)
}

export default BigCarousel