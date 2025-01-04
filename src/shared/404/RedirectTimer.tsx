'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectTimer = () => {
  const [timer, setTimer] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      router.push('/');
    }

    return () => clearInterval(interval);
  }, [timer, router]);

  return <span>Redirecting in {timer} sec.</span>;
};

export default RedirectTimer;
