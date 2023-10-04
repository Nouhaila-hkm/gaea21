import React from 'react'
import Text from './Text'
import { useState } from 'react';
import LeftArrow from '/public/images/PagesProjets/flecheAGauche.png'

const Partenaire = () => {

    const [buttonOne, setButtonOne] = useState(false);
    const [buttonTwo, setButtonTwo] = useState(false);

    const school =
    {
        items: [
            {
                text: "Cadschool est le centre de formation continue, certifié EDUQUA, spécialisé dans l’enseignement des outils informatiques utilisés par les professionnels des domaines de la conception assistée par ordinateur (CAO), de la publication assistée par ordinateur (PAO), de la postproduction (Postproduction) et du web (Web). Cadschool bénéficie d’une reconnaissance officielle de la part des concepteurs des logiciels enseignés : Adobe, Autodesk et Maxon.",

            },
        ],
    }

    const fage =
    {
        items: [
            {
                text: "IFAGE, fondation de droit privé, à but non lucratif et reconnue d’utilité publique, est le leader de la formation professionnelle supérieure et continue des adultes à Genève. Elle forme en langues, aux métiers du tertiaire, de l'industrie et du bâtiment, ainsi qu'en technologies de l'information et de la communication.",

            },
        ],
    }

    const wild =
    {
        items: [
            {
                text: "La Wild Code School est une école innovante et un réseau européen de campus qui propose des formations intensives aux métiers tech - Développement web, Data analyse, Cybersécurité, Product management - sur campus, à distance ou en entreprise.",

            },
        ],
    }

    const enaco =
    {
        items: [
            {
                text: "Enaco est une école de commerce en ligne. Soumise au contrôle pédagogique du Ministère de l’Éducation Nationale (France) et membre de la Fédération Européenne des Écoles (FEDE), ENACO a construit un projet pédagogique focalisé sur l’innovation, l’accompagnement personnalisé, la recherche de l’excellence et l’employabilité de ses étudiants.",

            },
        ],
    }

    const ecopia =
    {
        items: [
            {
                text: "Ecopia est une école pionnière des métiers de la RSE, engagée pour une économie durable. Mettant en œuvre un apprentissage de terrain, à travers ses cursus sur-mesure dédiés aux métiers de la RSE, Ecopia s'investit dans la formation d’une nouvelle génération de leaders RSE.",

            },
        ],
    }

  return (
    <>
    <div className='group_partenaire'>

        <div className='group_text'>
            <img className='logo' src="/Image/partenaire/logo-bulle-positif.png" />
            <a className='logo_link' href='https://www.cadschool.ch/'>CADSCHOOL</a>
            {buttonOne && <Text content={school} />}
        </div>

        <div className='group_text'>
            <img className='logo' src="/Image/partenaire/fage.png" />
                  <a className='logo_link' href='https://www.ifage.ch/'>IFAGE</a>
            {buttonOne && <Text content={fage} />}
        </div>

        <div className='group_text'>
            <img className='logo' src="/Image/partenaire/wcs.png" />
            <a className='logo_link' href='https://www.wildcodeschool.com/fr-FR'>Wildcode school</a>
            {buttonOne && <Text content={wild} />}
        </div>

    </div>
        <div className='know_box'>
            <p className='know' onClick={() => setButtonOne(!buttonOne)}>En savoir plus</p>
            <img className={"partenairearrow " + (buttonOne ? "partenairerotate" : "")} src={LeftArrow} />  
        </div>

    <div className='group_partenaire'>

        <div className='group_text'>
            <img className='logo' src="/Image/partenaire/enaco.png" />
            <a className='logo_link' href='https://www.enaco.fr/'>ENACO</a>
            {buttonTwo && <Text content={enaco} />}
        </div>

        <div className='group_text'>
            <img className='logo' src="/Image/partenaire/ecopia.png" />
            <a className='logo_link' href='https://www.ecopia-school.com/'>Ecopia</a>
            {buttonTwo && <Text content={ecopia} />}
        </div>

              <div className='group_text invisible'>
                  <img className='logo' src="/Image/partenaire/ecopia.png" />
                  <a className='logo_link' href='#'>Ecopia</a>
                  {buttonTwo && <Text content={ecopia} />}
              </div>

    </div>

          <div className='know_box'>
              <p className='know' onClick={() => setButtonTwo(!buttonTwo)}>En savoir plus</p>
              <img className={"partenairearrow " + (buttonTwo ? "partenairerotate" : "")} src={LeftArrow} />
          </div>      

    </>
  )
}

export default Partenaire