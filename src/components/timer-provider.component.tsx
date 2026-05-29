import { useCallback, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { TimerContext } from '~/context/timer.context';

export function TimerProvider({ children }: PropsWithChildren) {
  const timer = useRef<number>(null);
  const [time, setTime] = useState<number>(0);

  const initTimer = useCallback(
    (initialTime: number) => {
      setTime(initialTime);
    },
    [setTime],
  );

  const startTimer = useCallback(() => {
    if (!timer.current) timer.current = setInterval(() => setTime((time) => time - 1), 1000);
  }, [timer, setTime]);

  const stopTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
  }, [timer]);

  const context = useMemo(() => ({ time, initTimer, startTimer, stopTimer }), [time, initTimer, startTimer, stopTimer]);

  return <TimerContext value={context}>{children}</TimerContext>;
}
