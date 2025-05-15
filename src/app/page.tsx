'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Page.module.css'; 
import { formatTime } from './lib/time'; 

// Componentes
import ProjectBranding from './components/ProjectBranding/ProjectBranding';
import TimerDisplay from './components/TimerDisplay/TimerDisplay';
import PresetButtons from './components/PresetButtons/PresetButtons';
import CustomTimeInput from './components/CustomTimeInput/CustomTimeInput';
import TimerControls from './components/TimerControls/TimerControls';

export default function HomePage() {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [initialTimeSet, setInitialTimeSet] = useState<number>(0);
  const [customHoursInput, setCustomHoursInput] = useState<string>('');
  const [customMinutesInput, setCustomMinutesInput] = useState<string>('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isActive) {
      clearInterval(intervalRef.current!);
      setIsActive(false);
      alert("¡Tiempo completado!");
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, totalSeconds]);

  const timeParts = formatTime(totalSeconds);

  const startTimer = (minutesTotal: number) => {
    if (minutesTotal <= 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    const seconds = minutesTotal * 60;
    setTotalSeconds(seconds);
    setInitialTimeSet(seconds);
    setIsActive(true);
    setCustomHoursInput('');
    setCustomMinutesInput('');
  };

  const togglePause = () => setIsActive(!isActive);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setTotalSeconds(initialTimeSet);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false); 
    setTotalSeconds(0);
    setInitialTimeSet(0);
    setCustomHoursInput('');
    setCustomMinutesInput('');
  };

  const handleCustomStart = () => {
    const hours = parseInt(customHoursInput, 10);
    const minutes = parseInt(customMinutesInput, 10);
    let totalMinutesToStart = 0;
    let alertMessage = "";

    if (customHoursInput) {
        if (isNaN(hours) || hours < 0 || hours > 72) {
            alertMessage += "Las horas deben ser un número entre 0 y 72.\n";
        } else {
            totalMinutesToStart += hours * 60;
        }
    } else if (!customMinutesInput) {
        alertMessage += "Por favor, ingresa horas o minutos.\n";
    }

    if (customMinutesInput) {
        if (isNaN(minutes) || minutes < 0 || minutes > 59) {
            alertMessage += "Los minutos deben ser un número entre 0 y 59.\n";
        } else {
            totalMinutesToStart += minutes;
        }
    } else if (!customHoursInput) {
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
  };

  return (
    <main className={styles.mainContainer}>
      <ProjectBranding />
      <TimerDisplay timeParts={timeParts} />
      <PresetButtons
        onSetTime={startTimer}
        disabled={isActive && totalSeconds > 0}
      />
      <CustomTimeInput
        hours={customHoursInput}
        onHoursChange={setCustomHoursInput}
        minutes={customMinutesInput}
        onMinutesChange={setCustomMinutesInput}
        onStart={handleCustomStart}
        inputsDisabled={isActive && totalSeconds > 0}
        disabled={ (isActive && totalSeconds > 0) || (!customHoursInput && !customMinutesInput)}
      />
      <TimerControls
        isActive={isActive}
        initialTimeSet={initialTimeSet}
        totalSeconds={totalSeconds}
        onTogglePause={togglePause}
        onReset={resetTimer}
        onStop={stopTimer}
      />
      {totalSeconds === 0 && !isActive && initialTimeSet === 0 && (
        <p className={styles.instructionText}>
          Selecciona un tiempo predefinido o ingresa minutos personalizados para comenzar.
        </p>
      )}
    </main>
  );
}