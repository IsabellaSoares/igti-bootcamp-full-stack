import React from 'react';

const Filter = ({ handleFilterChange }) => {
  return (
    <div className="col s9">
      <input
        id="filter"
        type="text"
        className="validate"
        onChange={(event) => handleFilterChange(event)}
      />
      <label htmlFor="filter">Filtro</label>
    </div>
  );
};

export default Filter;
