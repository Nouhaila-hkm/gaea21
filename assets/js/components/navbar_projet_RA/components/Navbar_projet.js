import React from 'react'




import "react-alice-carousel/lib/alice-carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import AliceCarousel from "react-alice-carousel";

import '/assets/styles/navbar_projet/navbar_pages_projet.scss'



const items =[
    
    
<div className="item">
    <a href="/projets/repertoire-vert">Répertoire Vert</a></div>
,
<div className="item">
    <a href="/projets/SIB">Sustainability in a Box</a></div>
,
<div className="item">
<a href="/projets/Pre-analyse">Pré-analyse</a></div>
,

<div className="item">
    <a href="/projets/GCC">Green Coaching Communes</a></div>
,
 ,
<div className="item">
    <a href="/projets/Eco-minds">Eco-minds</a></div>

,
<div className="item">
    <a href="/projets/TA">Take Action Program</a></div>
, 
<div className="item">
     <a href="/projets/GES">Green Event Series</a></div>,

<div className="item">
    <a href="/projets/PDI">Plateformes des Initiatives</a></div>,

    <div className="item">
    <a href="/projets/Coaching-teletravail">Coaching Télétravail</a></div>,

    <div className="item">
  <a href="/projets/SLP">Sustainable Living Program</a></div>,

<div className="item">
    <a href="/projets/SCE">Sustainable City Event</a></div>

]


function Navbar_projet() {
  return (
    <AliceCarousel 
        items={items}
        autoWidth
    />


  )
}

export default Navbar_projet
