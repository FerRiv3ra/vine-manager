import FormEvent from '../components/FormEvent';

const NewEvent = () => {
  return (
    <>
      <h1 className="text-4xl font-black text-center">Create Event</h1>

      <div className="mt-10 flex justify-center">
        <FormEvent />
      </div>
    </>
  );
};

export default NewEvent;
