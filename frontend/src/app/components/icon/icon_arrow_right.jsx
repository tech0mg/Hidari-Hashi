import React from 'react';

const IconArrowRight = ({ size = 24, fill = '#9A877A', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={fill}  // デフォルトの色指定
    className={className}
  >
    <g>
      <polygon
        points="163.916,0 92.084,71.822 276.258,255.996 92.084,440.178 163.916,512 419.916,255.996"
        style={{ fill }}
      />
    </g>
  </svg>
);

export default IconArrowRight;
