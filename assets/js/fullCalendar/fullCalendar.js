import React from 'react';
import { createRoot } from 'react-dom/client';
import Calendar from './components/Calendar';

//console.log('fullcalendar js');


const ele = document.getElementById('fullCalendar');
createRoot(ele).render(<Calendar/>);