import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import CarouselWithLibrary from "./component/SecondaryNav";

const root = ReactDOM.createRoot(document.getElementById("secondaryNav"));

let {filename} = root._internalRoot.containerInfo.dataset

root.render(<>
  <React.StrictMode>
   <CarouselWithLibrary filename={filename}/>
  </React.StrictMode>
</>
);
