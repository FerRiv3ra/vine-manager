import { Link } from 'react-router-dom';

const Header = () => {
  const handleLogout = (e) => {
    e.preventDefault();
  };
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-3xl text-green-600 font-black text-center">
          The Vine Manager
        </h2>
        <div className="flex items-center gap-4">
          <Link to="/events" className="font-bold uppercase">
            Events
          </Link>
          <Link to="/users" className="font-bold uppercase">
            Users
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
