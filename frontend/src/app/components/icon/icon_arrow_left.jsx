import React from 'react';

const IconArrowLeft = ({ size = 24, fill = '#9A877A', className = '' }) => (
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
        points="419.916,71.821 348.084,0 92.084,256.005 348.084,512 419.916,440.178 235.742,256.005"
        style={{ fill }}
      />
    </g>
  </svg>
);

export default IconArrowLeft;
