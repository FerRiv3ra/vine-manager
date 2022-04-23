import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider };

export default EventsContext;
