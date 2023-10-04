import React from "react";

import ReactDOM from "react-dom/client";
import PrevArrow from "./component/PrevArrow";

import '../../../styles/système_design_components/previous/previousComponentStyle.scss'


const root = ReactDOM.createRoot(document.getElementById("prevArrow"));
const {link} = root._internalRoot.containerInfo.dataset
root.render(
    <PrevArrow link={link}/>
);