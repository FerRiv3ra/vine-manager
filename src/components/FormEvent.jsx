import { useState } from 'react';

const FormEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [img, setImg] = useState('');

  return (
    <form className="bg-white py-7 px-5 md:w-1/2 rounded-lg shadow">
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="title"
        >
          Title
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
          Date
        </label>
        <input
          id="date"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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
          accept="image/png, image/jpeg, image/jpg"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Create Event"
        className="bg-green-600 w-full mt-3 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors"
      />
    </form>
  );
};

export default FormEvent;
