import React from 'react';
import CubeLoadingAnimation from './CubeLoadingAnimation';

const Banner = props => (
<div className={props.userStatus === 'banner closing' ? 'hide' : 'banner'}>
  <div className="banner-flex-wrapper">
    <CubeLoadingAnimation
      boxClass={props.boxClass}
    />
    <div className="vertical-flex">
      <h2 className="medium-text--bold banner-title-text">{props.messageTitle}</h2>
      <p className="small-text banner-body-text">{props.messageBody}</p>
    </div>
  </div>
</div>
);

export default Banner;
