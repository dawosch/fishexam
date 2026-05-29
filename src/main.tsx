import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import { routes } from './routes.ts';
import { TimerProvider } from './components/timer-provider.component.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <TimerProvider>
        <RouterProvider router={routes} />
      </TimerProvider>
    </MantineProvider>
  </StrictMode>,
);
