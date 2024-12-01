import React from 'react';

const HomeIcon = ({ size = 24, fill = '#9A877A', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={fill}
    className={className}
  >
    <style type="text/css">
      {`
        .st0 { fill: #4B4B4B; }
      `}
    </style>
    <g>
      <polygon
        className="st0"
        points="433.198,205.503 433.198,86.669 363.908,86.669 363.908,136.267 308.912,81.341 256.09,28.323 0,284.219 37.929,322.123 256.09,104.142 474.072,322.123 512,284.219"
        style={{ fill: 'rgb(75, 75, 75)' }}
      />
      <polygon
        className="st0"
        points="78.802,312.098 78.802,483.677 213.994,483.677 213.994,368.231 298.007,368.231 298.007,483.677 433.198,483.677 433.198,312.083 256.09,134.959"
        style={{ fill: 'rgb(75, 75, 75)' }}
      />
    </g>
  </svg>
);

export default HomeIcon;
