import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./component/SmallBox_popup_emV2";

const entryPoint = document.querySelector(".smallBox_popup_em");
let root;

console.log(entryPoint)


    root = ReactDOM.createRoot(entryPoint);

    root.render( <>
        <Popup />
        <div id="popup-root"></div>
        </>
    );
