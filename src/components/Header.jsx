import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/lvc.png';
import useUsers from '../hooks/useUsers';

const Header = () => {
  const navigate = useNavigate();

  const { search, setSearch } = useUsers();

  const { pathname } = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('x-token');

    navigate('/');
  };
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to="/dashboard" className="flex items-center">
          <img src={Logo} className=" w-14 pr-3" />
          <h2 className="text-3xl text-green-600 font-black text-center">
            Manager
          </h2>
        </Link>
        {pathname.includes('/users') && (
          <input
            type="search"
            placeholder="Search"
            className="rounded-lg lg:w-96 block p-2 border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <div className="flex items-center gap-4">
          {/* <Link to="events" className="font-bold uppercase">
            Events
          </Link> */}
          <Link to="users" className="font-bold uppercase">
            Users
          </Link>
          <Link to="reports" className="font-bold uppercase">
            Reports
          </Link>
          <Link to="visits" className="font-bold uppercase">
            Visits
          </Link>

          <button
            type="button"
            className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
