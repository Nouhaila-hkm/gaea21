import React from "react";
import SubmenuComponent from "./SubmenuComponent.jsx";
import follow from '/public/Image/smallicons/follow.svg'
import caseIcon from '/public/Image/smallicons/case.svg'
import prize from '/public/Image/smallicons/prize.svg'
import career from '/public/Image/smallicons/career.svg'
import partnersFormation from '/public/Image/smallicons/partnersFormation.svg'
import questionMark from '/public/Image/smallicons/questionMark.svg'

export default function Coaching() {
    const items =
    {
        title: "Je découvre le coaching carrière en 3 minutes (voir vidéo)",
        items: [
            {
                title: "De quoi s'agit-il ?",
                description: "",
                image: questionMark,
                link: "/coaching"
            },
            {
                title: "Le modèle d’accompagnement de gaea21",
                description: "",
                image: follow,
                link: "/coaching/modele_accompagnement"
            },

            {
                title: "Formations certifiantes gaea21",
                description: "Bientôt disponible",
                image: prize,
                link: "/formations/certifiantes",
            },
            {
                title: "Partenaires Formation / Emploi",
                description: "Bientôt disponible",
                image: partnersFormation,
                // link: ""
            },
            {
                title: "Gestion de carrières",
                description: "Bientôt disponible",
                image: career,
                // link: ""
            },
            {
                title: "Emploi / Stages",
                description: "",
                image: caseIcon,
                link: "/emploi-et-stage"
            },

        ],
    }
        ;

    return (
        <SubmenuComponent content={items} />
    );
}