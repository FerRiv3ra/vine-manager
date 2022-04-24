import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axiosClient('/events', config);
        setEvents(data.events);
      } catch (error) {
        console.log(error);
      }
    };

    getEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider };

export default EventsContext;
