import React from 'react';
import iconAlert from '../../../images/emploi_et_stage/offres/alert.svg';
import loupe from '../../../images/emploi_et_stage/icon-loupe.svg';
import img from '../../../images/emploi_et_stage/profils/photo-profil.png';
import rating from '../../../images/emploi_et_stage/profils/rating.png';








const Freelance = () => {
  return (
    <>
    <section>
    <div>
    <form action="">

    <div className='inputs'>
            <input type="text" name="key-words" placeholder="Mot clé"/>
            <input type="text" name="activity" placeholder="Domaine d'activité"/>
            
            <select name="experience" id="experience">
                    <option value="">Expérience</option>
                    <option value="0-1">0-1</option>
                    <option value="2-4">2-4</option>
                    <option value="4-6">4-6</option>
                    <option value="6+">6+</option>
            </select>
            <select name="level" id="level">
                    <option value="">Niveau d'études</option>
                    <option value="bac">Bac</option>
                    <option value="Bac+2">Bac+2</option>
                    <option value="Bac+3">Bac+3</option>
                    <option value="Master">Master</option>
            </select>
    </div>


    {/* <button className="alert-button"> <img src={iconAlert} alt="alert"/> M'alerter sur les offres</button> */}
    <button className="search-button">Rechercher <img src={loupe} alt="loupe"/></button>
    
    
    </form>

    <select className="filter" name="filter" id="filter">
    <option value="">Trier par:</option>
    <option value="design">Web Design</option>
    <option value="IT">IT</option>
    <option value="Marketing">Marketing</option>
    <option value="writer">Rédacteur Web</option>
    <option value="chef">Chef de projet</option>
    <option value="law">Juriste</option>
    </select>

    </div>
    
    </section>


    <section className="profils-container">

    <h3>Les derniers profils freelance</h3>

            <div className="cards">
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
                <a href="/emploi-et-stage/profils/details">
                <div className="card">
                    <div className="top">
                    <img className="image" src={img} alt="profil" />
                        <p className="name">Simon Kleman</p>
                            <p className="localisation">Localisé(e) à Nantes</p>
                    </div>
                
                    <div className="middle">
                        <p className="title">Web designer</p>
                        <p className="rating"><img src={rating} alt="" /></p>
                    </div>

                    <div className="skills">
                        <p>Webdesign</p>
                        <p>Adobe Xd</p>
                        <p>UI/UX</p>
                        <p>Réseau sociaux</p>

                    </div>

                </div>
                </a>
              
        
               </div>
              
               

    
    </section>
    </>
  )
}

export default Freelance