import styles from './TimerControls.module.css';
import pageButtonStyles from '@/app/Page.module.css'; 

interface TimerControlsProps {
  isActive: boolean;
  initialTimeSet: number;
  totalSeconds: number;
  onTogglePause: () => void;
  onReset: () => void;
  onStop: () => void;
}

export default function TimerControls({
  isActive, initialTimeSet, totalSeconds, onTogglePause, onReset, onStop
}: TimerControlsProps) {
  if (initialTimeSet === 0) return null; 

  return (
    <div className={styles.controls}>
      <button
        onClick={onTogglePause}
        className={pageButtonStyles.button}
        disabled={totalSeconds === 0 && !isActive}
      >
        {isActive ? 'Pausar' : 'Reanudar'}
      </button>
      <button
        onClick={onReset}
        className={`${pageButtonStyles.button} ${pageButtonStyles.resetButton}`}
      >
        Reiniciar
      </button>
      <button
        onClick={onStop}
        className={`${pageButtonStyles.button} ${pageButtonStyles.stopButton}`}
      >
        Detener
      </button>
    </div>
  );
}