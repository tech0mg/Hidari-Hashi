import React from 'react';

const IconNo = ({ size = 24, fill = '#FFFFFF', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={fill}  // fill属性をここで指定
    className={className}
  >
    <g>
      <polygon
        points="511.998,70.682 441.315,0 256.002,185.313 70.685,0 0.002,70.692 185.316,256.006 0.002,441.318 
          70.69,512 256.002,326.688 441.315,512 511.998,441.318 326.684,256.006"
        fill={fill}  // 塗りつぶしの色
      />
    </g>
  </svg>
);

export default IconNo;
