import React from "react";
import "/assets/styles/home/carousel.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import ynov from "/public/Image/partenaire/ynov.png";
import enaco from "/public/Image/partenaire/enaco.png";
import wcs from "/public/Image/partenaire/wcs.png";
import fage from "/public/Image/partenaire/fage.png";

const handleDragStart = (e) => e.preventDefault();

function CarouselItems({items}) {
    return items.map((item, index) => {
        return (
            <div className="partner_item ">
                <div className={"partner_item_icon"}>
                    <div className={"partner_item_icon_container"}>
                        <img className={"partner_item_icon_image"} src={item['image']} alt={"Ynov"}/>
                    </div>
                </div>
                <div className={"partner_item_description "}>
                    <p>{item['description']}</p>
                </div>
                <div className={"partner_item_founder "}>
                    <p className={"partner_item_founder_title"}>{item['founder']}</p>
                    <p className={"partner_item_founder_subtitle"}>{item['founderSubtitle']}</p>
                </div>
            </div>
        );
    });
}


const CarouselWithLibrary = () => {
    const items = [
        {
            image: ynov,
            description: "Chez YNOV, notre but est d’augmenter l’employabilité de nos étudiants. C’est pourquoi, nous faisons appel à des intervenants professionnels dans toutes nos filières et que les projets pratiques sont intégrés à notre ADN pédagogique.",
            founder: "",
            founderSubtitle: ""
        },
        {
            image: wcs,
            description: "La Wild Code School propose des formations intensives aux métiers tech - Développement web, Data analyse, Cybersécurité, Product management - sur campus, à distance ou en entreprise.",
            founder: "",
            founderSubtitle: ""
        },
        {
            image: enaco,
            description: "Depuis sa création, le projet d'ENACO Business School est de former à distance les professionnels et les leaders de demain dans les domaines du commerce, du marketing, de l’immobilier, du management et de la finance.",
            founder: "",
            founderSubtitle: ""
        },
        {
            image: fage,
            description: "L'ifage est la Fondation pour la formation des adultes. Avec plus de 10 certificats internationaux et 30 diplômes et brevets fédéraux, l'ifage est le leader genevois de la formation professionnelle supérieure et continue.",
            founder: "",
            founderSubtitle: ""
        },
    ];

    return (
        <>
            <div className="partner_title">
                <h4>Partenaires</h4>
            </div>
            <AliceCarousel
                items={CarouselItems({items})}
                autoWidth={true}
                disableButtonsControls={true}>
            </AliceCarousel>
            <a href={"#"} className={"charter_button"}>Accéder à la charte gaea21</a>
            <a href={"#"} className={"partners_button"}>Voir tous les partenaires</a>
        </>
    );
};

export default CarouselWithLibrary;
