import React, { useState } from 'react';

function InputSubmit({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(searchTerm);
      // Clear the input field after submission
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter keyword to Search.."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputSubmit;

