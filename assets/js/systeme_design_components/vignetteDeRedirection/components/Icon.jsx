import React from 'react'
import { useRef } from 'react';
import { useEffect, useState } from 'react'



import "../../../../styles/système_design_components/vignetteDeRedirection/vignetteDeRedirection.scss"

  const Icon = ({iconSvg, link, title, disabled, description}) =>{
console.log(description)
  // 
  const [dataSvg, setDataSvg] = useState('')
  // Va définir l'etat active ou pas de la vignette
  const [active, setActive] = useState(false)

  // Stock la valeur de la ref contenue dans l'objet
  const images = useRef() 

  // Récupere le path vers le fichier SVG 
  let svg = {iconSvg};
  svg = svg.iconSvg;

  // console.log(svg) // "/image.svg"

  useEffect(() =>{
    fetch(svg) // FETCH("/IMAGE.SVG")
    .then(r => r.text()) // RETOURNNE LE CODE SOURCE DE L'IMAGE SVG EN FORMAT TEXT
    .then(text => {
     setDataSvg(text)
    })
    if(disabled === "false"){
      setActive(true)
    }else{
      setActive(false)
    }
  },[])



  // FONCTION QUI VA MODIFIER LES LIGNES DU SVG AU HOVER DE LA VIGNETTE
  const changeColor = (e) => {

      // Récupére la valeur de la ref (donc le "document")
      let svgTarget =  images.current
      // console.log(svgTarget)

      // Récupére la valeur de la ref (donc le "document")
      const currentImg = svgTarget.getSVGDocument()

      currentImg.querySelector('svg').setAttribute('cursor', 'pointer')

      // Selectionne tous les elements <path> du "document" et applique l'attribut
      const path = currentImg.querySelectorAll("path")
      // console.log(path)
      path.forEach(el=>{
        el.setAttribute('fill', 'white')
    })

      // Selectionne tous les elements <rect> du "document" et applique l'attribut
      const rect = currentImg.querySelectorAll("rect")
      // console.log(rect)
      rect.forEach(el=>{
      el.setAttribute('stroke', 'white')
    })
}

  // FONCTION QUI VA REMETTRE LES COULEURS PAR DÉFAUT DU SVG AU MOUSEOUT DE LA VIGNETTE
  const changeColorback = (e) => {

      // Récupére la valeur de la ref (donc le "document")
      let svgTarget =  images.current
      // console.log(svgTarget)

      // Variable qui va contenir le "document" 
      const currentImg = svgTarget.getSVGDocument()


      

      // Selectionne tous les elements <path> du "document" et applique l'attribut
      const path = currentImg.querySelectorAll("path")
      // console.log(path)
      path.forEach(el=>{
        el.setAttribute('fill', '#989751')
    })
      // Selectionne tous les elements <rect> du "document" et applique l'attribut
      const rect = currentImg.querySelectorAll("rect")
      console.log(rect)
      rect.forEach(el=>{
        el.setAttribute('stroke', '#989751')
    })
}

/**
 * Fonction qui va regarder pour chaque rendu si l'état de la vignette doit être actif ou pas 
 */
const setState = () => {

  // document.querySelectorAll("*").setAttribute
  // alert('coucou')
  if(active === false){
    let svgTarget =  images.current
    console.log(svgTarget)
    const currentImg = svgTarget.getSVGDocument()
    const path = currentImg.querySelectorAll("path")
  // console.log(path)
    path.forEach(el=>{
    el.setAttribute('fill', '#8a8a8a')
  })

    const rect = currentImg.querySelectorAll("rect")
    // console.log(rect)
    rect.forEach(el=>{
    el.setAttribute('stroke', '#8a8a8a')
  })
  }
}




  return (
    <>{active ?
      <div className="vignette " onMouseOver={changeColor} onMouseOut={changeColorback} onLoad={setState}>
        <a className="link" href={link}>
        <div className='overlay'>
          <p className="card-header">{title}</p>
            <div className="img" >
              <object ref={images} className="svg" data={svg} type="image/svg+xml"></object>
          </div>
          <div className="description">{description}</div>
          </div>
        </a>
        
      </div>:<div className="disabled_vignette " onLoad={setState}>
      <div className='disabled'><p className='msg'>{title} en cours de création</p></div>
        {/* <a className="link" href={link}> */}
          <p className="card-header">{title}</p>
            <div className="img" >
              <object ref={images} className="svg" data={svg} type="image/svg+xml"></object>
          </div>
        {/* </a> */}
      </div>
    }
    </>
  )
  }


export default Icon

