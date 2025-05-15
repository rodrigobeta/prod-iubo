import type { TimeParts } from '../../types'; 
import styles from './TimerDisplay.module.css';
import { useState, useEffect } from 'react';

interface TimerDisplayProps {
  timeParts: TimeParts;
}

export default function TimerDisplay({ timeParts }: TimerDisplayProps) {
  const [displaySeconds, setDisplaySeconds] = useState(timeParts.seconds);
  const [secondChanged, setSecondChanged] = useState(false);

  useEffect(() => {
    setDisplaySeconds(timeParts.seconds);
    setSecondChanged(true);
    const timeoutId = setTimeout(() => setSecondChanged(false), 200);
    return () => clearTimeout(timeoutId);
  }, [timeParts.seconds]);

  return (
    <div className={styles.timerDisplay}>
      <span>{timeParts.hours}</span>
      <span>:</span>
      <span>{timeParts.minutes}</span>
      <span>:</span>
      <span className={`${styles.secondsDigit} ${secondChanged ? styles.secondTick : ''}`}>
        {displaySeconds}
      </span>
    </div>
  );
}