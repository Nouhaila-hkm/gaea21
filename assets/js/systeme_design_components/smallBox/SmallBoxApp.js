import React from "react";
import ReactDOM from "react-dom/client";
import SmallBox from "./component/SmallBox";




const entryPoint = document.querySelectorAll(".smallBox")
let root;

console.log(entryPoint)

entryPoint.forEach(box=>{
    root = ReactDOM.createRoot(box);
    
    console.log("svg : " , root._internalRoot.containerInfo.dataset)
const {title,link, image} = root._internalRoot.containerInfo.dataset

    root.render( 
        <SmallBox title={title} link={link} image={image} />
    );
})