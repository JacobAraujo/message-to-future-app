// src/components/CountdownTimer.jsx
import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, [targetDate]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((intervalo) => {
    if (!timeLeft[intervalo]) {
      return;
    }

    timerComponents.push(
      <span key={intervalo}>
        {timeLeft[intervalo]} {intervalo}{' '}
      </span>
    );
  });

  return (
    <div className="countdown-timer">
      {timerComponents.length ? (
        <p>Contagem regressiva: {timerComponents}</p>
      ) : (
        <p>A mensagem está disponível!</p>
      )}
    </div>
  );
}

export default CountdownTimer;
