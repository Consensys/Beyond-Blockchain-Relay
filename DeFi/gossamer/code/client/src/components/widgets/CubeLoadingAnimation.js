import React from 'react';

const CubeLoadingAnimation = props => (
<div className="cube-loading-animation-wrapper">
  <span className='loader'>
    <span className={`loader-inner ${props.boxClass}`}></span>
  </span>
</div>
);

export default CubeLoadingAnimation;
// this https://codepen.io/aaroniker/pen/ZmOMJp
// https://codepen.io/sashatran/pen/zRgPWM ok
// pretty cool, corner bouncing https://codepen.io/_fbrz/pen/mpiFE
// ok, square filling up https://codepen.io/tashfene/pen/raEqrJ/
// could use css shapes to make these squares https://codepen.io/AsLittleDesign/pen/ZbVVwa
