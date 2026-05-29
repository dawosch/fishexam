import { useCallback, useContext, useMemo } from 'react';
import { TimerContext } from '~/context/timer.context';

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) throw new Error('No TimerContext found');

  const { time, initTimer, startTimer, stopTimer } = context;

  const formateTime = useCallback((time: number) => {
    const min = Math.floor(time / 60);
    const sec = ('0' + (time - min * 60).toString()).slice(-2);
    return `${min}:${sec}`;
  }, []);

  return useMemo(() => ({ time, initTimer, startTimer, stopTimer, formateTime }), [time, initTimer, startTimer, stopTimer, formateTime]);
}
