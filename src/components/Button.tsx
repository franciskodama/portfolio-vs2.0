'use client';
import React from "react";
const Button = ({ text = "Click", align = "flex-start", onClick, className = "btn btn--third-color" }: {
  text?: string;
  align?: string;
  onClick: (e: any) => void;
  className?: string;
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{ alignSelf: align }}
      type="button"
    >
      {text}
    </button>
  );
};

// Button.propTypes = {
//   text: PropTypes.string,
//   color: PropTypes.string,
//   align: PropTypes.string,
// onClick: PropTypes.func.isRequired
// }

export default Button;
