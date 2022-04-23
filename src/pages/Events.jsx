import useEvents from '../hooks/useEvents';

const Events = () => {
  const { events } = useEvents();
  return (
    <>
      <h1 className="text-4xl font-black">Events</h1>

      <div></div>
    </>
  );
};

export default Events;
