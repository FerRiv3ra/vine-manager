import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormEvent from '../components/FormEvent';
import useEvents from '../hooks/useEvents';

const EditEvent = () => {
  const { id } = useParams();
  const { event, getEvent, isLoading } = useEvents();
  useEffect(() => {
    getEvent(id);
  }, []);

  return isLoading ? (
    <button type="button" class="bg-green-600 ..." disabled>
      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Processing...
    </button>
  ) : (
    <>
      <h1 className="text-3xl">
        <span className="font-black">Editing event: </span>
        {event.title}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormEvent />
      </div>
    </>
  );
};

export default EditEvent;
