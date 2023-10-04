import React, {useState, useEffect} from "react";
import "/assets/styles/home/carousel.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import gaea21days from "../../../.././public/Image/diap/gaea21days.png";
import diap2 from "../../../../public/Image/diap/diap2.png";
import diap3 from "../../../../public/Image/diap/diap3.png";

const handleDragStart = (e) => e.preventDefault();

// Create an object that contains an image and a text

function CarouselItems({items}) {
    return items.map((item, index) => {
        return (
            <div className="item_diapo" key={index}>
                <img src={item.image} onDragStart={handleDragStart} role="presentation"/>

                <div className="item_diapo_content">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <a>En savoir plus</a>
                </div>
                <div className="item_diapo_background"/>
            </div>
        );
    });
}

function CarouselThumbs({items, currentSlide, setCurrentSlide}) {
    const thumbsClick = (id) => {
        if (id !== currentSlide) {
            setCurrentSlide(id);
        }
    }

    return items.map((item, index) => {
        return (
            <CarouselThumb item={item} index={index} thumbsClick={thumbsClick} currentSlide={currentSlide}/>
        );
    });
}

function CarouselThumb({item, index, thumbsClick, currentSlide}) {
    const [active, setActive] = useState('inactive');

    // use thumbsClick's parent function to set the current slide
    const handleClick = (e) => {
        e.preventDefault();
        thumbsClick(parseInt(e.target.getAttribute("data-index")));
    }

    useEffect(() => {
        if (currentSlide === index) {
            setActive('active');
        } else {
            setActive('inactive');
        }
    }, [currentSlide]);

    return (
        <div className={'item_diapo_thumb'} onClick={handleClick} style={{cursor: "pointer"}} key={index}>
            <span className={active}>
                <img src={item.image} onDragStart={handleDragStart} role="presentation" data-index={index}/>
                <div className="item_diapo_thumb_content">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                </div>
            </span>
        </div>
    );
}

function CarouselHighlights() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const items = [
        {
            image: gaea21days,
            title: "gaea21 days",
            text: "",
        },
        {
            image: diap2,
            title: "Green Events Series",
            text: "",
        },
        {
            image: diap3,
            title: "Plateforme des Initiatives",
            text: "",
        },
    ];

    return (
        <>
            <div className="item_diapo_thumbs">
                <CarouselThumbs items={items} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
            </div>
            <AliceCarousel
                items={CarouselItems({items})}
                disableButtonsControls={true}
                autoHeight={true}
                activeIndex={currentSlide}
            />
        </>
    );
}

export default CarouselHighlights;
