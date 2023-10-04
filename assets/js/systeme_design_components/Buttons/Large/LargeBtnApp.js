import React from "react";
import ReactDOM from "react-dom/client";
import LargeBtn from "./component/LargeBtn";




const entryPoint = document.querySelectorAll(".largeBtn")
let root;

console.log(entryPoint)

entryPoint.forEach(btn=>{
    root = ReactDOM.createRoot(btn);
    
    console.log(root._internalRoot.containerInfo.dataset)
    const {txt, link} = root._internalRoot.containerInfo.dataset

    root.render( 
        <LargeBtn txt={txt} link={link}/>
    );
})