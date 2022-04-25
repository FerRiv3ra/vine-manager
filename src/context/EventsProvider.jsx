import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const showAlert = (msg = '', error = true, autoClose = 5000) => {
    if (error) {
      toast.error(msg);
    } else {
      toast.success(msg, {
        autoClose,
      });
    }
  };

  const getEvent = (id) => {
    setIsLoading(true);
    const data = events.filter((event) => event._id === id);
    setEvent(data[0]);
    setIsLoading(false);
  };

  const submitEvent = async (event) => {
    const { data: img, imgName, date, ...body } = event;
    const y = new Date(date).getFullYear();
    const m = new Date(date).getMonth() + 1;
    const d = new Date(date).getDate() + 1;

    body.date = `${y}-${m < 10 ? `0${m}` : m}-${
      d < 10 ? `0${d}` : d
    }T16:00:00.000+00:00`;
    const token = localStorage.getItem('x-token');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };

      const { data: postEvent } = await axiosClient.post(
        '/events',
        body,
        config
      );

      if (imgName !== '') {
        const { data } = await axiosClient.put(
          `/upload/events/${postEvent._id}`,
          img
        );

        setEvents([...events, data]);
        return data;
      }

      setEvents([...events, postEvent]);
      return postEvent;
    } catch (error) {
      return error.response.data;
    }
  };

  const editEvent = async (eventE) => {
    const { data: img, imgName, date, id, ...body } = eventE;
    if (date !== '') {
      const y = new Date(date).getFullYear();
      const m = new Date(date).getMonth() + 1;
      const d = new Date(date).getDate() + 1;

      body.date = `${y}-${m < 10 ? `0${m}` : m}-${
        d < 10 ? `0${d}` : d
      }T16:00:00.000+00:00`;
    }
    const token = localStorage.getItem('x-token');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };

      const { data: putEvent } = await axiosClient.put(
        `/events/${id}`,
        body,
        config
      );

      if (imgName !== '') {
        const { data } = await axiosClient.put(`/upload/events/${id}`, img);

        setEvents(
          events.filter((event) => {
            if (event._id === id) {
              return data;
            }
            return event;
          })
        );
        return data;
      }

      setEvents(
        events.filter((event) => {
          if (event._id === id) {
            return putEvent;
          }
          return event;
        })
      );
      return putEvent;
    } catch (error) {
      return error.response.data;
    }
  };

  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem('x-token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };
      const { data } = await axiosClient.delete(`/events/${id}`, config);
      setEvents(events.filter((event) => event._id !== id));
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        showAlert,
        submitEvent,
        deleteEvent,
        isLoading,
        event,
        getEvent,
        editEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider };

export default EventsContext;
