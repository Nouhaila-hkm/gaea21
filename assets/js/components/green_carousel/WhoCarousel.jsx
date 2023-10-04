import React from 'react'
import BigCarousel from '../../systeme_design_components/bigCarouselMenu/component/BigCarousel'

const WhoCarousel = () => {

  const carousel =
  {
    items: [
      {
        title: "Gestion de projet",
        id: "gestionprojet",
        link: "/QuiSommesNous/gestionprojet",

      },
      {
        title: "Analyse de cycle de vie",
        id: "analyse",
        link: "/QuiSommesNous/analyse",

      },
      {
        title: "Lean management",
        id: "lean",
        link: "/QuiSommesNous/lean",

      },
      {
        title: "Coévolution",
        id: "coevolution",
        link: "/QuiSommesNous/coevolution",

      },
      {
        title: "Behaviorism",
        id: "behavior",
        link: "/QuiSommesNous/behavior",

      },
      {
        title: "Accélérateur économique",
        id: "multiplicateureco",
        link: "/QuiSommesNous/multiplicateureco",

      },
    ],
  }
  return (
      <div>
      <BigCarousel content={carousel} />
    </div>
  )
}

export default WhoCarousel