import React from 'react';

const Tooltip = props => <div className="tooltip">
  <img src="https://s3-us-west-1.amazonaws.com/dapp-lending/question.svg"
alt="tooltip" className="tooltip-icon" height={props.height} width={props.width} />
  <span className="tool-tip-text">{props.message}</span>
</div>;

export default Tooltip;
