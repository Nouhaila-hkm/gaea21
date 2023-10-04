

import '../../styles/topbar.scss';
import '../../styles/humansGaea21/home/home.scss'
import ReactDOM from 'react-dom';


import React from 'react';
import  Videos from './video';
import VideosList from "./Videoslist";
import GaeaFooter from "../humansGaea21/GaeaFooter";
// import { BrowserRouter as Router} from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('videoTem2');
// const root = createRoot(container);
// root.render(
//     <Router><Videos/>,</Router>);


ReactDOM.render(<Videos/>, document.getElementById('videoTem2'));

ReactDOM.render(<VideosList/>, document.getElementById('videoTem3'));


