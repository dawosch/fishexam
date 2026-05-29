import { createContext } from 'react';

type Context = {
  time: number;
  initTimer: (initialTime: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

export const TimerContext = createContext<Context | null>(null);
