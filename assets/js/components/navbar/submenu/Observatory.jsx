import React from "react";
import SubmenuComponent from "./SubmenuComponent.jsx";
import microscope from '/public/Image/smallicons/microscope.svg'
import publication from '/public/Image/smallicons/publications.svg'
import research from '/public/Image/smallicons/researchAndDevelopment.svg'

export default function Observatory() {
    const items =
        {
            title: "Phrase d’accroche ? À vous de jouer !",
            items: [
                {
                    title: "Notre modèle de recherche",
                    description: "Bientôt disponible",
                    image: microscope
                },
                {
                    title: "Recherche & Développement",
                    description: "Bientôt disponible",
                    image: research
                },
                {
                    title: "Publications",
                    description: "Bientôt disponible",
                    image: publication
                }

            ],
        }
    ;

    return (
        <SubmenuComponent content={items}/>
    );
}