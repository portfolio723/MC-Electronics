
'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export function FlashSaleCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft(targetDate));
  }, [targetDate]);

  useEffect(() => {
    if (!isClient) return;

    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, targetDate, isClient]);

  if (!isClient) {
     return null;
  }

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    return (
      <div key={interval} className="flex flex-col items-center">
        <div className="text-2xl font-bold md:text-4xl text-accent-foreground tabular-nums">
          {String(value).padStart(2, '0')}
        </div>
        <div className="text-xs uppercase text-accent-foreground/80 tracking-widest">{interval}</div>
      </div>
    );
  });

  return (
    <div className="mt-6 flex justify-center gap-4 md:gap-8">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}
