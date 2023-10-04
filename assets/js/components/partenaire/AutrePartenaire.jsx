import React from 'react'
import Text from './Text'
import { useState } from 'react';
import LeftArrow from '/public/images/PagesProjets/flecheAGauche.png'

const Partenaire = () => {

    const [buttonOne, setButtonOne] = useState(false);

    const paire =
    {
        items: [
            {
                text: "La Paire est un café-friperie. Un concept innovant qui permet de boire un café, manger un petit plat, tout en faisant du shopping durable, solidaire et responsable.",

            },
        ],
    }

    const fringante =
    {
        items: [
            {
                text: "Fringantes est une friperie qui prône la durabilité, la solidarité et la féminité. Réduire l’impact écologique, favoriser insertion sociale et professionnelle des femmes, mettre en valeur le potentiel que chaque femme porte en elles - ce sont des missions dont Fringantes s’est donnée.",

            },
        ],
    }

    return (
        <>
            <div className='group_partenaire'>

                <div className='group_text'>
                    <img id='paire' className='logo' src="/Image/partenaire/paire.png" />
                    <a className='logo_link' href='https://www.lapaire-cafefriperie.com/'>La Paire</a>
                    {buttonOne && <Text content={paire} />}
                </div>

                <div className='group_text'>
                    <img className='logo' src="/Image/partenaire/fringante.png" />
                    <a className='logo_link' href='http://fringantes.ch/'>Fringantes</a>
                    {buttonOne && <Text content={fringante} />}
                </div>

            </div>

            <div className='know_box'>
                <p className='know' onClick={() => setButtonOne(!buttonOne)}>En savoir plus</p>
                <img className={"partenairearrow " + (buttonOne ? "partenairerotate" : "")} src={LeftArrow} />
            </div>

        </>
    )
}

export default Partenaire