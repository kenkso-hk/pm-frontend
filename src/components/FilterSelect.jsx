import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';
import { useNavigate } from 'react-router-dom';

function FilterSelect({ options, name, initialValue }) {
  const [value, setValue] = useState(initialValue || "");

  const navigate = useNavigate();


  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setValue(filterValue);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('complex', filterValue);
    console.log(searchParams.toString());

    navigate(`/landlord-applications?${searchParams.toString()}`);
  };

  return (
    <div className="relative">

      <select
        className="font-medium text-sm text-slate-600 dark:text-slate-300"
        onChange={handleFilterChange}
        value={value}
      >
        <option
          tabIndex="0"
          value={""}>
          Select{(name && " " + name) || " an option"}
        </option>
        {
          options && options.map((option, index) => {
            return (
              <option
                key={option._id}
                tabIndex="0"
                value={option._id}>
                {option.address}
              </option>
            )
          })
        }
      </select>
    </div>
  );
}

export default FilterSelect;
