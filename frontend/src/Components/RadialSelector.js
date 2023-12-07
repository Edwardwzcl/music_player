import React, { useState } from 'react';

function RadialSelector({ options, onOptionSelected }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionSelected = (option) => {
    setSelectedOption(option);
    if (onOptionSelected) {
      onOptionSelected(option);
    }
  };

  return (
    <div className="radial-selector">
      {options.map((option) => (
        <button
          key={option}
          className={`radial-selector__option ${
            option === selectedOption ? 'radial-selector__option--selected' : ''
          }`}
          onClick={() => handleOptionSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default RadialSelector;