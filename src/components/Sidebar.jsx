import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hello {auth.name}</p>

      <Link
        to={
          pathname.includes('/events') ? 'events/new-event' : 'users/new-user'
        }
        className="bg-green-600 p-3 w-full text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        {pathname.includes('/events') ? 'Create Event' : 'New User'}
      </Link>
    </aside>
  );
};

export default Sidebar;
