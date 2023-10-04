import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import PlatformCarousel from './components/PlatformCarousel';


const rootElement = document.getElementById('platform_carousel');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
     <PlatformCarousel /> 
  </StrictMode>
);
