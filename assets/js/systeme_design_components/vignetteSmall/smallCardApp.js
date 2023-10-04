import React from "react";
import ReactDOM from "react-dom/client";
import SmallCard from "./components/SmallCard";


const entryPoint = document.querySelectorAll(".smallCard")
let root;

// console.log(entryPoint)
entryPoint.forEach(card=>{
    root = ReactDOM.createRoot(card);
    // console.log("small card : " , root._internalRoot.containerInfo.dataset)

const {title, imgsrc, activecard, link} = root._internalRoot.containerInfo.dataset
// console.log(title)

    console.log(root._internalRoot.containerInfo.dataset)
    root.render( 
        <SmallCard title={title} source={imgsrc} activecard={activecard} link={link} />
    );
})



