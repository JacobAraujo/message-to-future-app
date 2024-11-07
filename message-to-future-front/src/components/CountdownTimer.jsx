import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;
    return {
      days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
    };
  }

  return (
    <div className="flex items-center space-x-4 bg-gray-800 p-6 rounded-lg shadow-2xl border-2 border-gray-600">
      <TimeUnit label="Dias" value={timeLeft.days} />
      <Separator />
      <TimeUnit label="Horas" value={timeLeft.hours} />
      <Separator />
      <TimeUnit label="Min" value={timeLeft.minutes} />
      <Separator />
      <TimeUnit label="Seg" value={timeLeft.seconds} />
    </div>
  );
}

function TimeUnit({ label, value }) {
  return (
    <div className="flex flex-col items-center text-gray-200">
      <div className="text-4xl font-bold bg-gray-700 bg-opacity-80 px-6 py-3 rounded-md shadow-lg">
        {value < 10 ? `0${value}` : value}
      </div>
      <span className="text-sm font-medium mt-1 tracking-wider">{label}</span>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-2xl text-gray-400 font-bold mx-2">
      :
    </div>
  );
}

export default CountdownTimer;
