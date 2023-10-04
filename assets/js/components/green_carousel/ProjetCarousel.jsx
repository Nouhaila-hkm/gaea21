import React from 'react'
import BigCarousel from '../../systeme_design_components/bigCarouselMenu/component/BigCarousel'

const ProjetCarousel = () => {

  const carousel =
  {
    items: [
      {
        title: "Répertoire Vert",
        id: "RV",
        link: "/projets/RA/RV"

      },
      {
        title: "Sustainability in a box",
        id: "SIB",
        link: "/projets/RA/SIB"

      },
      {
        title: "Pré-analyse",
        id: "PA",
        link: "/projets/RA/PA"
      },
      {
        title: "Green Coaching Communes",
        id: "GCC",
        link: "/projets/RA/GCC"

      },
      {
        title: "eco-minds",
        id: "Eco-minds",
        link: "/projets/RA/Eco-minds"

      },
      {
        title: "Take action program",
        id: "TA",
        link: "/projets/RA/TA"

      },
      {
        title: "Green events series",
        id: "GES",
        link: "/projets/RA/GES"

      },
      {
        title: "Plateforme des initiatives",
        id: "PDI",
        link: "/projets/RA/PDI"

      },
      {
        title: "Coaching-teletravail",
        id: "Coaching-teletravail",
        link: "/projets/RA/Coaching-teletravail"

      },
      {
        title: "Sustainable living program",
        id: "SLP",
        link: "/projets/RA/SLP"

      },
      {
        title: "Sustainable city events",
        id: "SCE",
        link: "/projets/RA/SCE"

      },
    ],
  }
  return (
      <div>
      <BigCarousel content={carousel} />
    </div>
  )
}

export default ProjetCarousel