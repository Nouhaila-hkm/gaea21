import React from "react";
import SubmenuComponent from "./SubmenuComponent.jsx";
import pilot from '/public/Image/smallicons/pilotProjects.svg'
import search from '/public/Image/smallicons/searchGreen.svg'
import projectParticipation from '/public/Image/smallicons/projectParticipation.svg'
import coaching from '/public/Image/smallicons/coaching.svg'
import expansion from '/public/Image/smallicons/expansionProgram.svg'
import questionMark from '/public/Image/smallicons/questionMark.svg'

export default function Project() {
    const items =
        {
            title: "Phrase d’accroche ? À vous de jouer !",
            items: [
                {
                    title: "De quoi s'agit-il ?",
                    description: "",
                    image: questionMark,
                    link: "/projets"
                },
                {
                    title: "Projets de recherche appliquée",
                    description: "",
                    image: search,
                    link: "/projets/RA"
                },
                {
                    title: "Participer à un projet de gaea21",
                    description: "Bientôt disponible",
                    image: projectParticipation,
                    // link: "/projets/participer"
                },
                {
                    title: "Projets pilotes",
                    description: "Bientôt disponible",
                    image: pilot,
                    // link: "/projets/projet_pilotes"
                },
                {
                    title: "Coaching de projets durables",
                    description: "Bientôt disponible",
                    image: coaching,
                    // link: "/projets/coaching"
                },
                {
                    title: "Programme expansion / créer un gaea21 local",
                    description: "Bientôt disponible",
                    image: expansion,
                    // link: "/projets/expansion"
                }
            ],
        }
    ;

    return (
        <SubmenuComponent content={items}/>
    );
}