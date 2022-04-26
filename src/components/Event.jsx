import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Logo from '../assets/culture_cafe.png';
import useEvents from '../hooks/useEvents';

const Event = ({ event }) => {
  const { date } = event;
  const showDate = new Date(`${date}`);

  const { deleteEvent, showAlert } = useEvents();

  const handleDelete = async (e) => {
    const resp = confirm('Are you sure you want to delete this event?');
    if (!resp) return;

    const data = await deleteEvent(event._id);

    if (data.msg) {
      showAlert(data.msg, true, 5000);
      return;
    }

    if (data.errors) {
      data.errors.forEach((e) => {
        showAlert(e.msg);
      });
      return;
    }

    showAlert(`Event ${data.title} deleted`, false, 3000);
  };

  return (
    <div className="border-b p-4 w-full flex justify-between">
      <ToastContainer />
      <div className="flex-1 items-center">
        <img
          className="w-14 mr-3 float-left"
          src={event.img ? event.img : Logo}
        />
        <div>
          <p className="text-gray-600 uppercase font-bold mx-3">
            {event.title}
          </p>
          <p className="text-gray-600 uppercase font-bold mx-3">{`${showDate
            .toUTCString()
            .slice(0, 16)}`}</p>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <div className="gap-2 mx-3 text-gray-500 hover:text-yellow-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <Link
            to={`/events/edit/${event._id}`}
            className="uppercase text-sm font-bold mx-3"
          >
            Edit
          </Link>
        </div>

        <div className="gap-2 mx-3 text-gray-500 hover:text-red-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button
            type="button"
            className="uppercase font-bold text-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
