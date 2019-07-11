import React from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import Tooltip from './Tooltip';

export default class SupplyTimer extends React.Component {
  state = {
    time: '',
    duration: '',
  }

  onTimerUpdate = ({ time, duration }) => {
    this.setState({
      time,
      duration,
    });
  }

  render() {
    const {
      time,
      duration,
    } = this.state;

    return (
        <div className="timer-wrapper">
          <Timer active duration={20 * 60 * 1000} onTimeUpdate={this.onTimerUpdate} onFinish={() => alert('The timer has run out - no worries! Please just refresh the page and go through the flow again. Apologies for the inconvenience.')} />
          <Timecode className="timer-text" time={duration - time} />
          <Tooltip
            height={10}
            width={10}
            message="We have a timer because server costs aren't free! If the timer runs out, don&apos;t worry! Nothing bad will happen. You can refresh and re-navigate to this step in the deposit process."
          />
     </div>
    );
  }
}
