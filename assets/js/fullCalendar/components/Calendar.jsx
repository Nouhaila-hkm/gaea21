import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import AddEvent from "./AddEvent";

function Calendar(){

    const [events, setEvents] = useState([]);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventStart, setNewEventStart] = useState('');
    const [newEventEnd, setNewEventEnd] = useState('');

    const handleAddEvent = (newEvent) => {
        // Ajoutez ici la logique pour ajouter l'événement dans le state du composant parent
        console.log('Nouvel événement :', newEvent);
        setEvents([...events, newEvent]);
      };
    
    useEffect(() => {
        // Appel à l'API Symfony pour récupérer les événements
        axios.get('/api/events')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des événements :', error);
        });
    }, []);

    const addEvent = () => {
        const newEvent = {
            title: newEventTitle,
            start: newEventStart,
            end: newEventEnd,
        };
    
        setEvents(prevEvents => [...prevEvents, newEvent]);

        // Réinitialiser le formulaire après l'ajout de l'événement
        setNewEventTitle('');
        setNewEventStart('');
        setNewEventEnd('');
      };
    
    return (
        <div>
        <h2>RH FullCalendar :</h2>
        <AddEvent onAddEvent={handleAddEvent}/>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        />
        </div>
    );

    /*const responseGoogle = (response) => {
        console.log(response);
        // Vous pouvez accéder à l'Access Token ici : response.accessToken
      };

    const GoogleSignIn = () => {

        return (<div>
            <meta name="google-signin-client_id" content="177421898290-3t6crhbdsofrb7tnq2lu2no5f1gopkrd.apps.googleusercontent.com"></meta>
            <GoogleLogin
            clientId="177421898290-3t6crhbdsofrb7tnq2lu2no5f1gopkrd.apps.googleusercontent.com"
            buttonText="Se connecter avec Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        );
    };

    return (
        <div>
          <h2>Page de connexion</h2>
          <GoogleSignIn />
        </div>
      );*/


    /*useEffect(() => {
        // Fetch events from Google Calendar
        const fetchEvents = async () => {
          try {
            // Get the access token from Google Sign-In (make sure to implement Google Sign-In first)
            const accessToken = '177421898290-3t6crhbdsofrb7tnq2lu2no5f1gopkrd.apps.googleusercontent.com';
    
            // Fetch events from Google Calendar using the access token
            const response = await axios.get(
              'https://www.googleapis.com/calendar/v3/calendars/primary/events',
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
    
            // Transform the received data into FullCalendar format
            const transformedEvents = response.data.items.map((event) => ({
              title: event.summary,
              start: event.start.dateTime || event.start.date,
              end: event.end.dateTime || event.end.date,
            }));
    
            setEvents(transformedEvents);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
    
        fetchEvents();
      }, []);

    
    return (
        <div>
            <h2>RH FullCalendar :</h2>
        <FullCalendar
           // ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
        />
        </div>
    );*/
}


export default Calendar;