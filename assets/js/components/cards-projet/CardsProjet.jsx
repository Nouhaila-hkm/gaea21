import React from 'react'
import Cards from './cards'


const CardsProjet = () => {

    const card =
  {
    items: [
      {
        img:'/Image/cards-projet/projet-administration.png',
        text: <p>{'>'} RH <br /> {'>'} Budget <br /> {'>'} Green finance <br /> {'>'} Traduction <br /> {'>'} Juridique</p>,
        id: 'button1',
        title:'Administration'

      },
      {
        img: '/Image/cards-projet/projet-eco.png',
        text: <p>{'>'} Recherche eco-conso <br /> {'>'} Scientifique  <br />{'>'} Green-coaching Individu/ Famille <br /> {'>'} Eco-gestes <br /> {'>'} SLP <br /> …</p>,
        id: 'button2',
        title: 'Eco-conso'

      },
      {
        img: '/Image/cards-projet/projet-marketing.png',
        text: <p>{'>'} GES <br /> {'>'} Branding <br /> {'>'} Partenariat <br /> {'>'} CM <br /> {'>'} Fundraising <br /> {'>'} Rédaction <br /> …</p>,
        id: 'button3',
        title: 'Marketing'

      },
      {
        img: '/Image/cards-projet/projet-obs.png',
        text: <p>{'>'} Sustainability club <br /> {'>'} Référentiel <br /> {'>'} GCBO <br /> {'>'} Architecture verte <br /> {'>'} Agriculture <br /> {'>'} Eco-mobilité <br /> …</p>,
        id: 'button4',
        title: 'Observatoire'

      },
      {
        img: '/Image/cards-projet/projet-formation.png',
        text: <p>{'>'} Formation <br /> {'>'} Référent <br /> {'>'} Programme d’accompagnement coordinateurs <br /> {'>'} Values management <br /> {'>'} Hapiness management</p>,
        id: 'button5',
        title: 'Formation'

      },
    ],
  }
  return (
    <div><Cards content={card} /></div>
  )
}

export default CardsProjet