import React from "react";
import ReactDOM from "react-dom/client";
import Icon from "./components/Icon";




const entryPoint = document.querySelectorAll(".more-links")
let root;

console.log(entryPoint)

entryPoint.forEach(icon=>{
    root = ReactDOM.createRoot(icon);
    
    console.log("svg : " , root._internalRoot.containerInfo.dataset)
const {iconsvg,link, title, disabled,description} = root._internalRoot.containerInfo.dataset

    root.render( 
        <Icon iconSvg={iconsvg} link={link} title={title} disabled={disabled} description={description}/>
    );
})

