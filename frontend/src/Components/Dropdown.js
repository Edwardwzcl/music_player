import React, { useState } from 'react';
import '../StyleSheets/Dropdown.css';

const Dropdown = ({ options, onOptionSelected }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
    if (onOptionSelected) {
        onOptionSelected(option);
    }
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>
        {selectedOption || 'Select an option'}
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <button key={index} onClick={() => handleSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
