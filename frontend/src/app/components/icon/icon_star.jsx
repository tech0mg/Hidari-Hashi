import React from 'react';

const StarIcon = ({ size = 24, fill = '#E1DA0F', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={fill}  // fillプロパティをここで指定
    className={className}
  >
    <path
      d="M259.3 17.8L194 150.2 14.5 171c-26.4 4.1-36.9 36.2-17.8 54.9L103 314.4l-24.2 141.2c-4.5 26.2 23 46 46.5 33.8l127.8-67.2 127.8 67.2c23.5 12.2 51-7.6 46.5-33.8L409 314.4l106.8-88.5c19.1-18.7 8.6-50.8-17.8-54.9L318 150.2 259.3 17.8c-10.8-21.8-41.7-21.8-52.5 0z"
    />
  </svg>
);

export default StarIcon;
