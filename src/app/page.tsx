// src/app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';

// Interfaz para las partes del tiempo (para la animación)
interface TimeParts {
  hours: string;
  minutes: string;
  seconds: string;
}

export default function HomePage() {
  const [totalSeconds, setTotalSeconds] = useState<number>(0); // Tiempo total en segundos para la cuenta regresiva
  const [isActive, setIsActive] = useState<boolean>(false); // El temporizador está corriendo?
  const [initialTimeSet, setInitialTimeSet] = useState<number>(0); // Guarda el tiempo inicial configurado para el reset
  const [customMinutesInput, setCustomMinutesInput] = useState<string>(''); // Valor del input de minutos
  const [customHoursInput, setCustomHoursInput] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref para el intervalo del temporizador

  // Efecto para manejar la cuenta regresiva
  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isActive) {
      clearInterval(intervalRef.current!);
      setIsActive(false);
      // Opcional: Alerta o sonido
      alert("¡Tiempo completado!");
      // Podrías resetear a 0 o al último valor configurado
      // setTotalSeconds(0); // O setTotalSeconds(initialTimeSet);
    }

    // Limpiar intervalo cuando el componente se desmonta o las dependencias cambian
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, totalSeconds]);

  // Formatear segundos a HH:MM:SS
  const formatTime = (secondsToFormat: number): TimeParts => {
    const h = Math.floor(secondsToFormat / 3600);
    const m = Math.floor((secondsToFormat % 3600) / 60);
    const s = secondsToFormat % 60;

    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    };
  };

  const timeParts = formatTime(totalSeconds);

  // Iniciar temporizador
  const startTimer = (minutes: number) => {
    if (minutes <= 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current); // Limpia cualquier intervalo previo
    const seconds = minutes * 60;
    setTotalSeconds(seconds);
    setInitialTimeSet(seconds);
    setIsActive(true);
    setCustomMinutesInput(''); // Limpiar input
  };

  // Pausar/Reanudar temporizador
  const togglePause = () => {
    setIsActive(!isActive);
  };

  // Resetear temporizador al último tiempo configurado
  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setTotalSeconds(initialTimeSet); // Vuelve al tiempo inicial con el que se configuró
  };

  // Detener completamente y resetear a 0
  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  setTotalSeconds(0);
  setInitialTimeSet(0);
  setCustomHoursInput(''); // Limpiar input de horas
  setCustomMinutesInput('');
  }

  // Manejar cambio en input de minutos personalizados

  // Iniciar con tiempo personalizado
const handleCustomStart = () => {
  const hours = parseInt(customHoursInput, 10);
  const minutes = parseInt(customMinutesInput, 10);

  let totalMinutesToStart = 0;
  let alertMessage = "";

  // Validar horas
  if (customHoursInput) { // Solo validar si se ingresó algo en horas
      if (isNaN(hours) || hours < 0 || hours > 72) {
          alertMessage += "Las horas deben ser un número entre 0 y 72.\n";
      } else {
          totalMinutesToStart += hours * 60;
      }
  } else if (!customMinutesInput) { // Si no hay horas ni minutos
      alertMessage += "Por favor, ingresa horas o minutos.\n";
  }


  // Validar minutos
  if (customMinutesInput) { // Solo validar si se ingresó algo en minutos
      if (isNaN(minutes) || minutes < 0 || minutes > 59) {
          alertMessage += "Los minutos deben ser un número entre 0 y 59.\n";
      } else {
          totalMinutesToStart += minutes;
      }
  } else if (!customHoursInput) { // Si no hay minutos ni horas (ya cubierto arriba, pero por claridad)
      // La alerta ya se habrá añadido
  }

  if (alertMessage) {
      alert(alertMessage.trim());
      return;
  }

  if (totalMinutesToStart <= 0) {
      alert("El tiempo total debe ser mayor a 0 minutos.");
      return;
  }

  startTimer(totalMinutesToStart);
  // Limpiar inputs después de iniciar
  setIsActive(true);
  setCustomHoursInput(''); // Limpiar input de horas
  setCustomMinutesInput(''); // Limpiar input de minutos
};


  // Animación de segundos (cambio sutil)
  const [displaySeconds, setDisplaySeconds] = useState(timeParts.seconds);
  const [secondChanged, setSecondChanged] = useState(false);

  useEffect(() => {
    setDisplaySeconds(timeParts.seconds);
    setSecondChanged(true);
    const timeoutId = setTimeout(() => setSecondChanged(false), 200); // Duración de la clase de animación
    return () => clearTimeout(timeoutId);
  }, [timeParts.seconds]);


  return (
      <main className={styles.mainContainer}>
  <div className={styles.projectName}>
    <span className={styles.projectNameProd}>Prod</span>
    <span className={styles.projectNameUibo}>-UIBO</span>
  </div>
      <div className={styles.timerDisplay}>
        <span>{timeParts.hours}</span>
        <span>:</span>
        <span>{timeParts.minutes}</span>
        <span>:</span>
        <span className={`${styles.secondsDigit} ${secondChanged ? styles.secondTick : ''}`}>
          {displaySeconds}
        </span>
      </div>

      <div className={styles.presetButtons}>
        {[20, 30, 45, 60].map((min) => (
          <button
            key={min}
            onClick={() => startTimer(min)}
            className={styles.button}
            disabled={isActive && totalSeconds > 0} // Deshabilitar si está activo y no ha terminado
          >
            {min} min
          </button>
        ))}
      </div>

      <div className={styles.customInputContainer}>
      <input
        type="number"
        placeholder="HH"
        min="0"
        max="72" // Máximo de horas
        value={customHoursInput}
        onChange={(e) => setCustomHoursInput(e.target.value)}
        className={`${styles.customInput} ${styles.customInputHours}`}
        disabled={isActive && totalSeconds > 0}
        title="Horas (0-72)"
      />
      <span className={styles.customInputSeparator}>:</span>
      <input
        type="number"
        placeholder="MM"
        min="0"
        max="59" // Máximo de minutos
        value={customMinutesInput}
        onChange={(e) => setCustomMinutesInput(e.target.value)}
        className={`${styles.customInput} ${styles.customInputMinutes}`}
        disabled={isActive && totalSeconds > 0}
        title="Minutos (0-59)"
      />
      <button
        onClick={handleCustomStart}
        className={styles.button}
        disabled={isActive && totalSeconds > 0 || (!customHoursInput && !customMinutesInput)}
      >
        Iniciar
      </button>
</div>

      <div className={styles.controls}>
        {initialTimeSet > 0 && ( // Solo mostrar controles si se ha iniciado alguna vez
          <>
            <button
              onClick={togglePause}
              className={styles.button}
              disabled={totalSeconds === 0 && !isActive} // No pausar si ya terminó
            >
              {isActive ? 'Pausar' : 'Reanudar'}
            </button>
            <button
              onClick={resetTimer}
              className={`${styles.button} ${styles.resetButton}`}
            >
              Reiniciar
            </button>
             <button
              onClick={stopTimer}
              className={`${styles.button} ${styles.stopButton}`}
            >
              Detener
            </button>
          </>
        )}
      </div>
      {totalSeconds === 0 && !isActive && initialTimeSet === 0 && (
        <p className={styles.instructionText}>
            Selecciona un tiempo predefinido o ingresa minutos personalizados para comenzar.
        </p>
      )}
    </main>
  );
}