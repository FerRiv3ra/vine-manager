import moment from 'moment';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { RowReport } from '../components/RowReport';
import { useForm } from '../hooks/useForm';
import useUsers from '../hooks/useUsers';

const Reports = () => {
  const [loading, setLoading] = useState(false);

  const [formValues, handleInputChange] = useForm({
    startDate: '',
    endDate: '',
  });

  const { showAlert, getDataReport, dataReport } = useUsers();
  const { startDate, endDate } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([startDate, endDate].includes('')) {
      showAlert('Please select the dates to create a new report.');
      return;
    }

    setLoading(true);

    const resp = await getDataReport(
      moment(startDate).format('DD/MM/YYYY'),
      moment(endDate).format('DD/MM/YYYY')
    );

    if (!resp.ok) {
      showAlert(resp.msg);
      return;
    }

    setLoading(false);
  };

  return (
    <div>
      <ToastContainer />
      <form className="flex justify-around" onSubmit={handleSubmit}>
        <div>
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="startDate"
          >
            Start date *
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            className="border p-2 ml-2 placeholder-gray-400 rounded-md uppercase"
            value={startDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            className="text-gray-700 uppercase font-bold text-sm text-center"
            htmlFor="endDate"
          >
            End date *
          </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            className="border p-2 ml-2 placeholder-gray-400 rounded-md uppercase"
            value={endDate}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          Generate
        </button>
      </form>
      {loading && (
        <div className="flex justify-center mt-5">
          <button
            disabled
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
          >
            <svg
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        </div>
      )}
      {Object.entries(dataReport).length ? (
        <div className="mt-5">
          <table className="text-center w-full">
            <thead className="bg-green-500 text-white w-full">
              <tr className="w-full mb-4">
                <th className="px-2">Index</th>
                <th className="px-2">First name</th>
                <th className="px-2">Last name</th>
                <th className="px-2">Phone number</th>
                <th className="px-2">Number in household</th>
                <th className="px-2">Children</th>
                <th className="px-2">Address</th>
                <th className="px-2">Town</th>
                <th className="px-2">Postcode</th>
                <th className="px-2">Housing provider</th>
                <th className="px-2">Pensioners</th>
                <th className="px-2">Disabilities</th>
                <th className="px-2">Total donation</th>
                <th className="px-2">Visits</th>
              </tr>
            </thead>
            <tbody>
              {dataReport.map((visit, index) => (
                <RowReport key={visit.uid} visit={visit} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-5">Nothing to show</p>
      )}
    </div>
  );
};

export default Reports;
