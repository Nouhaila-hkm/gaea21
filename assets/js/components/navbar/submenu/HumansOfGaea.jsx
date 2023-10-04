import React from "react";
import SubmenuComponent from "./SubmenuComponent.jsx";
import people from '/public/Image/smallicons/people.svg'
import hands from '/public/Image/smallicons/handsHelping.svg'
import gumtree from '/public/Image/smallicons/gumtree.svg'
import library from '/public/Image/smallicons/library.svg'
import videos from '/public/Image/smallicons/videos.svg'

export default function Observatory() {
    const items =
    {
        title: "Phrase d’accroche ? À vous de jouer !",
        items: [
            // {
            //     title: "De quoi s'agit-il ?",
            //     description: "",
            //     image: search,
            //     link: "/humansGaea21"
            // },
            {
                title: "Staff",
                description: "",
                image: people,
                link: "/humansGaea21/staff"
            },
            {
                title: "Alumni",
                description: "",
                image: hands,
                link: "/humansGaea21/alumni"
            },

            {
                title: "Galerie photo",
                description: "Bientôt disponible",
                image: library,
                // link: ""
            },
            {
                title: "Vidéos",
                description: "Bientôt disponible",
                image: videos,
                // link: ""
            },
            {
                title: "Programme humans of gaea21",
                description: "Bientôt disponible",
                image: gumtree,
                // link: "/humansGaea21/programme"
            },
        ],
    }
        ;

    return (
        <SubmenuComponent content={items} />
    );
}