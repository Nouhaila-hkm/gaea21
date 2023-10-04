import React from 'react';

import {createRoot} from 'react-dom/client';

import Modification from './components/Modification';
import ContextModification from './ContextModification'

const rootElement = document.getElementById('modification_offre');

const root = createRoot(rootElement);

root.render(
 
   <ContextModification>
   <Modification/>
   </ContextModification>
 
);