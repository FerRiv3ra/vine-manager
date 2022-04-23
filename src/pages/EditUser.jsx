import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormUser from '../components/FormUser';
import useUsers from '../hooks/useUsers';

const EditUser = () => {
  const { id } = useParams();
  const { getUser, user, isLoading } = useUsers();
  useEffect(() => {
    getUser(id);
  }, []);

  return isLoading ? (
    <button type="button" class="bg-green-600 ..." disabled>
      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Processing...
    </button>
  ) : (
    <>
      <h1 className="text-3xl">
        <span className="font-black">Editing user</span> with customer ID{' '}
        {user.customer_id}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormUser />
      </div>
    </>
  );
};

export default EditUser;
