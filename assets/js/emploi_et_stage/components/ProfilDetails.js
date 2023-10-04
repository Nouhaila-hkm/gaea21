import React, { useState } from 'react';
import profilePic from '../../../images/emploi_et_stage/profils/photo-profil.png';
import rating from '../../../images/emploi_et_stage/profils/rating.png';
import locationImg from '../../../images/emploi_et_stage/profils/location.svg';
import mobilityImg from '../../../images/emploi_et_stage/profils/mobility.svg';
import contractImg from '../../../images/emploi_et_stage/profils/clock.svg';
import activityImg from '../../../images/emploi_et_stage/profils/work.svg';
import companyImg from '../../../images/emploi_et_stage/profils/company.svg';
import datesImg from '../../../images/emploi_et_stage/profils/pen.svg';



const ProfilDetails = () => {

  const [isShow, setIsShow] = useState(true);

  const handleShow = () => {
    setIsShow(!isShow);

  };



  return (
    <>

        <section className='profil'>
        <div className='pic-container'>
        <img src={profilePic} alt="" />
        </div>
          
          <div className='info'>
            <div className='name'>Simon Kleman</div>
            <p className='title'>Web designer</p>
            <p className='localisation'> Localisé(e) à Nantes</p>
            <p className='rating'><img src={rating} alt="" /> (29)</p>

             <div className='contact-info'> 
            <button className='btn-contact-info' onClick={handleShow}>Afficher le contact</button>
           
           {!isShow && <div className='contact'>
             <p>Tel: 00 00 00 00 00</p>
            <p>Mail: simon@gmail.com</p>
           </div>
           }
           
            </div>
          </div>
        </section>
      <div className='sections-container'>
      <div className='left'>
        <div className='city-mobility sections'>
        <h3> 
        Localisation et déplacement</h3>

          <div className='city'>
            <div className='sub-title'> <img src={locationImg} alt="" /> Localisation</div>
            <p>Nantes, France</p>
          </div>
          <div className='mobility'>
          <div className='sub-title'> <img src={mobilityImg} alt="" /> Mobilité</div>
            <p>* Nantes et 50 km autour</p>
            <p>* Paris et 50 km autour</p>
            <p>* Grenoble et 50 km autour</p>
            <p>* Genève et 50 km autour</p>
          </div>
        </div>

        <section className='preferences sections'>
          <h3>Préférences</h3>
          <div className='contract'>
            <div className='sub-title'> <img src={contractImg} alt="" /> Type de contrat</div>
            <p>CDI</p>
          </div>

          <div className='activity'>
            <div className='sub-title'> <img src={activityImg} alt="" />Secteur d'activité</div>
            <p> * Web design</p>
            <p> * Environnement</p>
            <p> * Hight tech</p>
            <p> * Biologie</p>
      
          </div>

          <div className='enterprise'>
            <div className='sub-title'> <img src={companyImg} alt="" />Taille d'entreprise</div>
            <p>2 - 10 personnes</p>
          </div>
        </section>


        
        <section className='similar-profiles sections'>
          <h3>Ces profils correspondent aussi à votre recherche</h3>
        
            <div className='profile-1'>
                <img src={profilePic} alt="" />
                <div className='profile-info'>
                      <p className='name'>Simon Kleman</p>
                      <p className='activity'>Web designer</p>
                      <img src={rating} alt="" />
                 </div>
            </div>
            <div className='profile-1'>
                <img src={profilePic} alt="" />
                <div className='profile-info'>
                      <p className='name'>Simon Kleman</p>
                      <p className='activity'>Web designer</p>
                      <img src={rating} alt="" />
                 </div>
            </div>
            <div className='profile-1'>
                <img src={profilePic} alt="" />
                <div className='profile-info'>
                      <p className='name'>Simon Kleman</p>
                      <p className='activity'>Web designer</p>
                      <img src={rating} alt="" />
                 </div>
            </div>
           
            

        </section>

        </div>



           <div className='right'>
             <section className='skills sections'>
        <h3>Compétences(25)</h3>

          <p>Webdesign</p>
          <p>Identité visuelle</p>
          <p>Publicité Marketing</p>
          <p>Design logo</p>
          <p>Design logo</p>
          <p>Design logo</p>
          <a href="">Voir toutes les compétences (25)</a>



        </section>

       

        <section className='about sections'>
          <h3>A propos</h3>
          <p className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam consequuntur optio 
          expedita ad voluptatem, cum dolores animi nostrum? Deleniti, dolores doloribus atque magni 
          doloremque praesentium eius id natus cumque mollitia.</p>
          <a href="">Consulter la description complète de Simon</a>
        </section>


        <section className='portfolio sections'>
          <h3>Portfolio / vidéo de présentation</h3>
        </section>


        <section className='experience sections'>
          <h3>Expériences</h3>
          <div className='sub-title'> <img src={companyImg} alt="" /> Agence XPLR</div>
          <p className='task'>Refonte du site de l'agence XPLR</p>
          <div className='bottom'>
               <p className='location'> <img src={locationImg} alt="" /> Nantes, France</p>
          <p className='dates'> <img src={datesImg} alt="" /> Mars 2022 - juin 2022 (2 mois)</p>
          </div>
       
          <a href="">Consulter toutes les expériences de Simon</a>
        </section>
           </div>

           </div>
       

    </>
  )
}

export default ProfilDetails



