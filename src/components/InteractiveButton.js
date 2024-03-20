// InteractiveButton.js
import React from 'react';

const InteractiveButton = ({ onClick, icon }) => {
  return (
    <button onClick={onClick}>
      {icon && <img src={icon} alt="Button Icon" />} {/* Render the icon if it's provided */}
    </button>
  );
};

export default InteractiveButton;
