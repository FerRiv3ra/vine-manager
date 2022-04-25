import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useEvents from '../hooks/useEvents';

const FormEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [img, setImg] = useState('');
  const [imgName, setImgName] = useState('');

  const { showAlert, submitEvent, event, editEvent } = useEvents();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (event._id) {
      setTitle(event.title);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || (!params.id && date === '')) {
      showAlert('Required fields are empty');
      return;
    }

    const data = new FormData();
    data.append('file', img);

    let resp;
    if (params.id) {
      resp = await editEvent({ title, date, imgName, data, id: params.id });
    } else {
      resp = await submitEvent({ title, date, imgName, data });
    }

    if (resp.msg) {
      showAlert(resp.msg, true, 5000);
      return;
    }

    if (resp.errors) {
      resp.errors.forEach((e) => {
        showAlert(e.msg);
      });
      return;
    }

    showAlert(
      `Event ${resp.title} ${params.id ? 'edited' : 'created'}`,
      false,
      3000
    );
    setTitle('');
    setImgName('');
    setDate('');
    setImg(null);
    if (params.id) {
      setTimeout(() => {
        navigate('/events');
      }, 3500);
    }
  };

  return (
    <form
      className="bg-white py-7 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="title"
        >
          Title *
        </label>
        <input
          id="title"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="date"
        >
          Date *
        </label>
        <input
          id="date"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {params.id && (
          <p className=" text-xs">
            *There is a date stored, if you want to change it select another
            date
          </p>
        )}
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="image"
        >
          Image
        </label>
        <input
          id="image"
          type="file"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          value={imgName}
          onChange={(e) => {
            setImg(e.target.files[0]);
            setImgName(e.target.value);
          }}
        />
        {params.id && event.img && (
          <p className=" text-xs">
            *There is an image stored, if you want to change it upload another
            one
          </p>
        )}
      </div>
      <input
        type="submit"
        value={params.id ? 'Save Changes ' : 'Create Event'}
        className="bg-green-600 w-full mt-3 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors"
      />
    </form>
  );
};

export default FormEvent;
