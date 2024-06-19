import { useState, useEffect } from 'react';

const useCountdown = () => {
  const [time, setTime] = useState(0);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    if (hours) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    if (minutes) {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    if (seconds) {
      return `${formattedSeconds}`;
    }
    return false;
  };

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  return { time: formatTime(time), setTime };
};

export default useCountdown;
