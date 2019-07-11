import React from 'react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

const ProgressBar = props => <div className="progress-bar-wrapper">
      <div className="horizontal-tight-row progress-bar-text-row">
        <p className={`progress-bar-item ${props.status === 1 || props.status === 2 || props.status === 3 ? 'progress-bar-selected-item medium-text' : 'progress-bar-unselected-item'}`}>Learn</p>
        <p className={`progress-bar-item ${props.status === 4 ? 'progress-bar-selected-item medium-text' : 'progress-bar-unselected-item'}`}>Pick</p>
        <p className={`progress-bar-item ${props.status === 5 ? 'progress-bar-selected-item medium-text' : 'progress-bar-unselected-item'}`}>Details</p>
        <p className={`progress-bar-item ${props.status === 6 ? 'progress-bar-selected-item medium-text' : 'progress-bar-unselected-item'}`}>Deposit</p>
      </div>
        <Progress
          // type="circle"
          percent={props.percent}
          status={props.status}
          strokeWidth="9"
          // width={80}
          theme={{
            1: {
              symbol: '📖',
              color: 'rgba(255,255,0,1)',
              trailColor: 'rgba(190, 198, 196, 0.5)',
            },
            2: {
              symbol: '💡',
              color: 'rgb(191, 191, 63)',
              trailColor: 'rgba(190, 198, 196, 0.5)',
            },
            3: {
              symbol: '💡',
              color: 'rgb(152, 152, 15)',
              trailColor: 'rgba(190, 198, 196, 0.5)',
            },
            4: {
              symbol: '👆',
              color: 'rgb(178, 241, 115)',
              trailColor: 'rgba(190, 198, 196, 0.5)',
            },
            5: {
              symbol: '💱',
              color: 'rgb(85, 166, 3)',
              trailColor: 'rgba(190, 198, 196, 0.5)',
            },
            6: {
              symbol: '💸',
              color: 'rgba(0, 152, 116, 1)',
              trailColor: 'rgba(190, 198, 196, 0.5)',
            },
            
          }}
          />
    </div>;

export default ProgressBar;

/*
7: {
              symbol: '💸',
              color: 'rgba(0, 152, 116, 1)',
              trailColor: 'rgba(190, 198, 196, 0.5)',
            },
*/
