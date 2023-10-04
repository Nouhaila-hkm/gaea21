import React from "react";
import "/assets/styles/home/carousel.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";

const handleDragStart = (e) => e.preventDefault();

const items = [

    <div className={"fill_parent_container"}>
        <div className={"agenda_item"}>
            <div className={"agenda_item_top"}>
                <div className={"agenda_item_date"}>
                    <h3>NOV</h3>
                    <h2>21</h2>
                </div>
                <div className={"agenda_item_state"}>
                    <h3>En Visio</h3>
                </div>

            <div className={"agenda_item_content"}>
                    <h3>Gaea21 Days</h3>
                    <span>Présenté par : gaea21</span>
                    <p> </p>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScQ-vCDw0MWqb_4M7Rf5uX4lajY_tu1TQDFTehUTrAi0hbZng/viewform" target="_balnk">Je m'inscris</a>
                </div>

            </div>
            <div className={"agenda_item_bottom"}>
                <button className={"agenda_item_bottom_button"}>Voir plus d'événements ❯</button>
            </div>
        </div>
    </div>,
    <div className={"fill_parent_container"}>
        <div className={"agenda_item"}>
            <div className={"agenda_item_top"}>
                <div className={"agenda_item_date"}>
                    <h3>NOV</h3>
                    <h2>22</h2>
                </div>
                <div className={"agenda_item_state"}>
                    <h3>En Visio</h3>
                </div>

                <div className={"agenda_item_content"}>
                    <h3>Gaea21 Days</h3>
                    <span>Présenté par : gaea21</span>
                    <p> </p>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScQ-vCDw0MWqb_4M7Rf5uX4lajY_tu1TQDFTehUTrAi0hbZng/viewform" target="_balnk">Je m'inscris</a>

                </div>

            </div>
            <div className={"agenda_item_bottom"}>
                <button className={"agenda_item_bottom_button"}>Voir plus d'événements ❯</button>
            </div>
        </div>
    </div>,
    <div className={"fill_parent_container"}>
        <div className={"agenda_item"}>
            <div className={"agenda_item_top"}>
                <div className={"agenda_item_date"}>
                    <h3>NOV</h3>
                    <h2>23</h2>
                </div>
                <div className={"agenda_item_state"}>
                    <h3>En Visio</h3>
                </div>

                <div className={"agenda_item_content"}>
                    <h3>Gaea21 Days</h3>
                    <span>Présenté par : gaea21</span>
                    <p> </p>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScQ-vCDw0MWqb_4M7Rf5uX4lajY_tu1TQDFTehUTrAi0hbZng/viewform" target="_balnk">Je m'inscris</a>

                </div>

            </div>
            <div className={"agenda_item_bottom"}>
                <button className={"agenda_item_bottom_button"}>Voir plus d'événements ❯</button>
            </div>
        </div>
    </div>,
    <div className={"fill_parent_container"}>
        <div className={"agenda_item"}>
            <div className={"agenda_item_top"}>
                <div className={"agenda_item_date"}>
                    <h3>DEC</h3>
                    <h2>02</h2>
                </div>
                <div className={"agenda_item_state"}>
                    <h3>En Présentiel</h3>
                </div>

                <div className={"agenda_item_content"}>
                    <h3>Répertoire Vert</h3>
                    <span>Présenté par : gaea21</span>
                    <p> </p>
                                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfvwaDRdToMsPbSAjv5wQ5NOgW9-CSTYyJjuFnSXC_Ba24AQg/viewform" target="_balnk">Je m'inscris</a>

                </div>

            </div>
            <div className={"agenda_item_bottom"}>
                <button className={"agenda_item_bottom_button"}>Voir plus d'événements ❯</button>
            </div>
        </div>
    </div>,

];


const CarouselWithLibrary = () => {
    return (
        <AliceCarousel
            items={items}
            mouseTrackingEnabled={true}
            autoWidth={true}
            autoHeight={true}
            disableDotsControls={true}
            renderPrevButton={() => <div className={"agenda_item_prev"}>❮</div>}
            renderNextButton={() => <div className={"agenda_item_next"}>❯</div>}
        />
    );
}
export default CarouselWithLibrary;
