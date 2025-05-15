import styles from './PresetButtons.module.css';
import buttonStyles from '@/app/Page.module.css'; 

interface PresetButtonsProps {
  onSetTime: (minutes: number) => void;
  disabled: boolean;
}

const PRESET_MINUTES = [20, 30, 45, 60];

export default function PresetButtons({ onSetTime, disabled }: PresetButtonsProps) {
  return (
    <div className={styles.presetButtons}>
      {PRESET_MINUTES.map((min) => (
        <button
          key={min}
          onClick={() => onSetTime(min)}
          className={`${buttonStyles.button} ${styles.presetButton}`} 
          disabled={disabled}
        >
          {min} min
        </button>
      ))}
    </div>
  );
}