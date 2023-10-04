import React from "react";
import SubmenuComponent from "./SubmenuComponent.jsx";
import editIcon from '/public/Image/smallicons/editIcon.svg'
import flowchart from '/public/Image/smallicons/flowchart.svg'
import partners from '/public/Image/smallicons/partners.svg'
import flag from '/public/Image/smallicons/flag.svg'
import info from '/public/Image/smallicons/info.svg'
import clock from '/public/Image/smallicons/clock.svg'
import impacts from '/public/Image/smallicons/impacts.svg'
import mail from '/public/Image/smallicons/mail.svg'
import identity from '/public/Image/smallicons/identity.svg'

export default function WhoAreWe() {
    const items =
        {
            title: "Phrase d'accroche ? À vous de jouer !",
            items: [
                // {
                //     title: "De quoi s'agit-il ?",
                //     description: "",
                //     image: search,
                //     link: ""
                // },
                {
                    title: "Le modèle gaea21",
                    description: "",
                    image: editIcon,
                    link: "/QuiSommesNous/modele"
                },
                {
                    title: "Organigramme",
                    description: "",
                    image: flowchart,
                    link:"/QuiSommesNous/Organigramme"
                },
                {
                    title: "Partenaires",
                    description: "",
                    image: partners,
                    link: "/QuiSommesNous/partenaire"
                },
                {
                    title: "Statuts",
                    description: "Bientôt disponible",
                    image: flag
                },
                {
                    title: "Univers de gaea21",
                    description: "Bientôt disponible",
                    image: info
                },
                {
                    title: "Historique",
                    description: "",
                    image: clock,
                    link:"/QuiSommesNous/Historique"
                },
                {
                    title: "Impacts",
                    description: "Bientôt disponible",
                    image: impacts
                },
                {
                    title: "Newsletter",
                    description: "",
                    image: mail,
                    link: "/QuiSommesNous/Newsletter"
                },
                {
                    title: "Identité",
                    description: "Bientôt disponible",
                    image: identity
                }
            ],
        }
    ;

    return (
        <SubmenuComponent content={items}/>
    );
}