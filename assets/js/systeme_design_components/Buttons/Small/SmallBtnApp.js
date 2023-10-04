import React from "react";
import ReactDOM from "react-dom/client";
import SmallBtn from "./component/SmallBtn";




const entryPoint = document.querySelectorAll(".smallBtn")
let root;

console.log(entryPoint)

entryPoint.forEach(btn=>{
    root = ReactDOM.createRoot(btn);
    
    console.log(root._internalRoot.containerInfo.dataset)
    const {txt,link} = root._internalRoot.containerInfo.dataset

    root.render( 
        <SmallBtn txt={txt} link={link} />
    );
})