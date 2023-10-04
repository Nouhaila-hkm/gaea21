import React from "react";
import ReactDOM from "react-dom/client";
import VignetteLarge from "./components/LargeCard";

const entryPoint = document.querySelectorAll(".largeCard")
let root;

entryPoint.forEach(card=>{
    root = ReactDOM.createRoot(card);
    // console.log("large card : " , root._internalRoot.containerInfo.dataset)
const {title, description, imgsrc, disabled,link} = root._internalRoot.containerInfo.dataset



    root.render( 
        <VignetteLarge title={title} description={description} source={imgsrc} disabled={disabled} link={link} />
    );
})

