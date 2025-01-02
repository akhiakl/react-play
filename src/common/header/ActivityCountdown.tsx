import React from 'react';
import Countdown from 'react-countdown';

type ActivityTimerProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed?: boolean;
};

type ActivityCountdownProps = {
  date: Date;
};

const ActivityTimer = ({ days, hours, minutes, seconds, completed }: ActivityTimerProps) => {
  const pad = (num: number) => `${num < 10 ? '0' : ''}${num}`;
  if (completed) {
    return (
      <div className="activity-timer-banner">
        Hack-R-Play 2.0 registration has been started 🚀.{' '}
        <a
          className="event-link"
          href="https://www.youtube.com/watch?v=ZBNCsvOrRPY"
          target="_blank"
        >
          See the Launch Video
        </a>
      </div>
    );
  } else {
    return (
      <div className="activity-timer-banner">
        #2PlaysAMonth event starts in{' '}
        <span style={{ minWidth: '72px', marginLeft: '4px' }}>
          {pad(days)}:{pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </span>{' '}
        🚀.
        <a
          className="event-link"
          href="https://www.stack-stream.com/case/reactplay-2playsamonth-event-launch"
          target="_blank"
        >
          Join the Launch
        </a>
      </div>
    );
  }
};

const ActivityCountdown = ({ date }: ActivityCountdownProps) => (
  <Countdown date={date} renderer={ActivityTimer} />
);

export default ActivityCountdown;
