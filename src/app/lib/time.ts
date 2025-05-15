import type { TimeParts } from '../types'; 

export const formatTime = (secondsToFormat: number): TimeParts => {
  const h = Math.floor(secondsToFormat / 3600);
  const m = Math.floor((secondsToFormat % 3600) / 60);
  const s = secondsToFormat % 60;

  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
};