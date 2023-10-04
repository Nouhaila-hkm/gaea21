import React, { useState } from "react";
import ReactDOM from "react-dom/client";


import AvancerProjet from "./component/AvancerProjet";

const root = ReactDOM.createRoot(document.getElementById("encartProjet"));

let {step} = root._internalRoot.containerInfo.dataset

root.render(<>
  <React.StrictMode>
   <AvancerProjet />
  </React.StrictMode>
</>
);
