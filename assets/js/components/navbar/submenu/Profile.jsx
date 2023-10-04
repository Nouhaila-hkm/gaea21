import React from "react";
import SubmenuComponent from "./SubmenuComponent.jsx";
import pilot from '/public/Image/smallicons/pilotProjects.svg'

export default function Profile() {
    const items =
    {
        title: "Phrase d’accroche ? À vous de jouer !",
        items: [
            {
                title: "Login",
                description: "",
                image: pilot,
                link: "/login"
            },
            
        ],
    }
        ;

    return (
        <SubmenuComponent content={items} />
    );
}