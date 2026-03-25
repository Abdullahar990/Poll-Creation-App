import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closePoll } from '../pollSlice836';

function usePollTimer(pollId, initialSeconds = 300) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch(closePoll(pollId));
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, pollId, dispatch]);

  return {
    timeLeft,
    isExpired: timeLeft <= 0
  };
}

export default usePollTimer;
