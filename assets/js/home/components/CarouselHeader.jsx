import React from "react";
import "/assets/styles/home/carousel.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import slide1 from "../../../../public/Image/slide/slide1.jpg";
import slide2 from "../../../../public/Image/slide/slide2.jpg";
import slide3 from "../../../../public/Image/slide/slide3.jpg";
import slide4 from "../../../../public/Image/slide/slide4.jpg";
import slide5 from "../../../../public/Image/slide/slide5.jpg";

const handleDragStart = (e) => e.preventDefault();

const items = [
    /* A React component. */
    <div className="item">
        <img
            src={slide1}
            onDragStart={handleDragStart}
            role="presentation"
        />
        <div className="item_content _dark">
            <h3>Générateurs de durabilité</h3>
            <hr/>
            <p>
                Nous soutenons vos projets et realisons vos idées vertes. Nous
                formons, mettons en relation et accompagnons des individus, entreprise
                et organisations. "Vert" est pour nous synonyme d'éco-conscience,
                de choix et de comportements durables, efficaces et profitables.
            </p>
        </div>
    </div>,
    /* A React component. */
    <div className="item">
        <img
            src={slide2}
            onDragStart={handleDragStart}
            role="presentation"
        />
        <div className="item_content">
            <h3>Générateurs de durabilité</h3>
            <hr/>
            <p>
            Nous soutenons vos projets et realisons vos idées vertes. Nous
                formons, mettons en relation et accompagnons des individus, entreprise
                et organisations. "Vert" est pour nous synonyme d'éco-conscience,
                de choix et de comportements durables, efficaces et profitables.
            </p>
        </div>
    </div>,
    /* A React component. */
    <div className="item">
        <img
            src={slide3}
            onDragStart={handleDragStart}
            role="presentation"
        />
        <div className="item_content _dark">
            <h3>Générateurs de durabilité</h3>
            <hr/>
            <p>
            Nous soutenons vos projets et realisons vos idées vertes. Nous
                formons, mettons en relation et accompagnons des individus, entreprise
                et organisations. "Vert" est pour nous synonyme d'éco-conscience,
                de choix et de comportements durables, efficaces et profitables.
            </p>
        </div>
    </div>,
    /* A React component. */
    <div className="item">
        <img
            src={slide4}
            onDragStart={handleDragStart}
            role="presentation"
        />
        <div className="item_content _dark">
            <h3>Générateurs de durabilité</h3>
            <hr/>
            <p>
            Nous soutenons vos projets et realisons vos idées vertes. Nous
                formons, mettons en relation et accompagnons des individus, entreprise
                et organisations. "Vert" est pour nous synonyme d'éco-conscience,
                de choix et de comportements durables, efficaces et profitables.
            </p>
        </div>
    </div>,
    /* A React component. */
    <div className="item">
        <img
            src={slide5}
            onDragStart={handleDragStart}
            role="presentation"
        />
        <div className="item_content _dark">
            <h3>Générateurs de durabilité</h3>
            <hr/>
            <p>
            Nous soutenons vos projets et realisons vos idées vertes. Nous
                formons, mettons en relation et accompagnons des individus, entreprise
                et organisations. "Vert" est pour nous synonyme d'éco-conscience,
                de choix et de comportements durables, efficaces et profitables.
            </p>
        </div>
    </div>,


];


const CarouselWithLibrary = () => {
    return (
        <AliceCarousel
            items={items}
            autoPlayInterval={15000}
            autoPlay={true}
            infinite={true}
            disableButtonsControls={true}>
        </AliceCarousel>
    );
};

export default CarouselWithLibrary;
