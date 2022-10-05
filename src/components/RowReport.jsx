import React from 'react';

export const RowReport = ({ visit, index }) => {
  return (
    <tr
      className={`w-full mb-4 ${index % 2 === 1 ? 'bg-gray-300' : 'bg-white'}`}
    >
      <th className="px-2">{index + 1}</th>
      <th className="px-2">{visit.firstName}</th>
      <th className="px-2">{visit.lastName}</th>
      <th className="px-2">{visit.phone}</th>
      <th className="px-2">{visit.noHousehold}</th>
      <th className="px-2">{visit.childCant}</th>
      <th className="px-2">{visit.address}</th>
      <th className="px-2">{visit.town}</th>
      <th className="px-2">{visit.postcode}</th>
      <th className="px-2">{visit.housingProvider}</th>
      <th className="px-2">{visit.pensioner ? visit.pensionerCant : 'No'}</th>
      <th className="px-2">{visit.disabilities ? 'Yes' : 'No'}</th>
      <th className="px-2">£ {visit.amount}</th>
      <th className="px-2">{visit.visits}</th>
    </tr>
  );
};
