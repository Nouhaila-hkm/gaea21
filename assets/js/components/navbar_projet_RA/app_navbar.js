import React from "react";
import ReactDOM from "react-dom/client";
import CarouselWithLibrary from "./components/Navbar_projet";



const root = ReactDOM.createRoot(document.getElementById("secondaryNav"));
root.render(<>
  <React.StrictMode>
   <CarouselWithLibrary />
  </React.StrictMode>

</>
);
