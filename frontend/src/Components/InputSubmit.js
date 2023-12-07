import React from 'react';

function InputSubmit({ onSubmit }) {
  let searchTerm = '';

  const handleInputChange = (event) => {
    searchTerm = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Full Name to Search..."
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputSubmit;
