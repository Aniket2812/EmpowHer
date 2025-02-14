import React from 'react';

const Logo = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#FF4D8D" />
      <path
        d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 24C13.7909 24 12 22.2091 12 20C12 17.7909 13.7909 16 16 16C18.2091 16 20 17.7909 20 20C20 22.2091 18.2091 24 16 24Z"
        fill="white"
      />
      <path
        d="M16 8V12M12 10L16 12L20 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
