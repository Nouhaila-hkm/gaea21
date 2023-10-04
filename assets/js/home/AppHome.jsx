import React from "react";
import { render } from "react-dom";
import CarouselHeader from "./components/CarouselHeader";
import CarouselHighlights from "./components/CarouselHighlights";
import CarouselAgenda from "./components/CarouselAgenda";
import CarouselPartner from "./components/CarouselPartner";

function AppHomeHeader() {
    return (
        <>
            <CarouselHeader />
        </>
    );
}

function AppHomeHighlights() {
    return (
        <>
            <CarouselHighlights />
        </>
    );
}

function AppHomeAgenda() {
    return (
        <>
            <CarouselAgenda />
        </>
    );
}

function AppHomePartner() {
    return (
        <>
            <CarouselPartner />
        </>
    );
}
render(<AppHomePartner/>, document.querySelector("#partner"));
render(<AppHomeAgenda/>, document.querySelector("#agenda"));
render(<AppHomeHighlights/>, document.querySelector("#highlights"));
render(<AppHomeHeader/>, document.querySelector("#carousel"));
