import React from 'react';
import '../StyleSheets/ScrollableParagraph.css'; // Import the CSS for styling

const ScrollableParagraph = ({ text }) => {
  return (
    <div className="scrollable-paragraph">
      <p>{text}</p>
    </div>
  );
};

export default ScrollableParagraph;
