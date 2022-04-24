import Event from '../components/Event';
import useEvents from '../hooks/useEvents';

const Events = () => {
  const { events } = useEvents();
  return (
    <>
      <h1 className="text-4xl font-black">Events</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {events.length ? (
          events.map((event) => <Event key={event._id} event={event} />)
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            Nothing to show
          </p>
        )}
      </div>
    </>
  );
};

export default Events;
