import React from 'react';

import {createRoot} from 'react-dom/client';

import OffrePdf from './components/OffrePdf';
import { PDFViewer } from '@react-pdf/renderer';


const rootElement = document.getElementById('pdf_offre');

const root = createRoot(rootElement);

root.render(
   <PDFViewer style = {{width: '100%', height: '100vh'}}>
          <OffrePdf/>
   </PDFViewer>
 
  
 
);