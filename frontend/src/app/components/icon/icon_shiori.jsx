import React from 'react';

const ShioriIcon = ({ size = 24, fill = '#98CBB0', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={fill}  // 色を指定
    className={className}
  >
    <g>
      <path
        d="M502.96,174.29l-19.882-19.873c-12.054-12.064-31.606-12.064-43.66,0l-18.598,18.607l63.542,63.542
          l18.597-18.598C515.014,205.905,515.014,186.353,502.96,174.29z"
        fill={fill} // 塗りつぶし
      />
      <polygon
        points="246.553,347.291 246.553,410.833 310.095,410.833 467.031,253.896 403.489,190.355"
        fill={fill} // 塗りつぶし
      />
      <path
        d="M216.642,440.744V334.906l158.903-158.903V11.725H0v488.549h375.545V387.679l-53.066,53.065H216.642z
             M78.098,131.37h179.467v29.911H78.098V131.37z M78.098,241.044h179.467v29.911H78.098V241.044z M187.772,380.63H78.098v-29.911
          h109.674V380.63z"
        fill={fill} // 塗りつぶし
      />
    </g>
  </svg>
);

export default ShioriIcon;
