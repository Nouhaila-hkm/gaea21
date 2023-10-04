import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./component/btnRectangle";




const entryPoint = document.querySelector(".btn-popup")
let root = ReactDOM.createRoot(document.getElementById("btn-popup"));
root.render(<>
    <Popup />
    <div id="popup-root"></div>
</>
);
