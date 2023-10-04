import React from 'react';

import {createRoot} from 'react-dom/client';

import RootOffre from './components/RootOffre';


const rootElement = document.getElementById('offre_emploi');

const root = createRoot(rootElement);

root.render(
 
     <RootOffre /> 
 
);