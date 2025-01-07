"use client"

import React, { useEffect, useRef, useState } from 'react';


const Counter: React.FC = () => {
  const [timerDays, setTimerDays] = useState<string>('00');
  const [timerHours, setTimerHours] = useState<string>('00');
  const [timerMinutes, setTimerMinutes] = useState<string>('00');
  const [timerSeconds, setTimerSeconds] = useState<string>('00');

  // UseRef to hold the interval ID, which is a number or null
  const interval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const countdownDate = new Date('September 14, 2024 00:00:00').getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current!);
      } else {
        setTimerDays(days.toString().padStart(2, '0'));
        setTimerHours(hours.toString().padStart(2, '0'));
        setTimerMinutes(minutes.toString().padStart(2, '0'));
        setTimerSeconds(seconds.toString().padStart(2, '0'));
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <section className='timer-container'>
      <section className='timer'>
        <div>
          <section>
            <p>{timerDays}</p>
            <p className='info'>Days</p>
          </section>
          <span>:</span>
          <section>
            <p>{timerHours}</p>
            <p className='info'>Hours</p>
          </section>
          <span>:</span>
          <section>
            <p>{timerMinutes}</p>
            <p className='info'>Minutes</p>
          </section>
          <span>:</span>
          <section>
            <p>{timerSeconds}</p>
            <p className='info'>Seconds</p>
          </section>
        </div>
      </section>
    </section>
  );
}

export default Counter;
