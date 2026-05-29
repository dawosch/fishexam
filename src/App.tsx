import { AppShell, Box, Button, Container, Menu, Text } from '@mantine/core';
import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import './App.css';
import { useTimer } from './hooks/timer.hook';

function App() {
  const { pathname } = useLocation();
  const { initTimer, time, formateTime } = useTimer();

  useEffect(() => {
    initTimer(5400);
  }, [initTimer]);

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} px={10}>
        <Box>
          <Text size="xl" span>
            FISH
          </Text>
          <Text size="xl" c="dimmed" span>
            EXAM
          </Text>
        </Box>

        <Box>
          {pathname === '/questions/exam' && (
            <Box display="flex" style={{ gap: 5 }}>
              <Text size="l" c="dimmed" span>
                Abgabe in:
              </Text>
              <Text size="l" span>
                {formateTime(time)}
              </Text>
            </Box>
          )}
        </Box>
        <Box style={{ display: 'flex', gap: 5 }}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button color="grey">Lernen</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item component={NavLink} to="/questions/learn">
                Fragen
              </Menu.Item>
              <Menu.Item component={NavLink} to="/fishes/learn">
                Fische
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button color="grey">Prüfung</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item component={NavLink} to="/questions/exam">
                Fragen
              </Menu.Item>
              <Menu.Item component={NavLink} to="/questions/exam">
                Fische
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="md" style={{ overflow: 'auto', height: '100dvh' }}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
