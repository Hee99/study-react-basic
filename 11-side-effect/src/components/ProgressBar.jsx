import { useEffect, useState } from 'react';

export default function progressBar({ maxTime }) {
  const [remainingTime, setRemainingTime] = useState(maxTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return <progress value={remainingTime} max={maxTime} />;
}
