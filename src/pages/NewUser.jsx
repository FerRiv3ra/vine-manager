import FormUser from '../components/FormUser';

const NewUser = () => {
  return (
    <>
      <h1 className="text-4xl font-black text-center">New user</h1>

      <div className="mt-10 flex justify-center">
        <FormUser />
      </div>
    </>
  );
};

export default NewUser;
