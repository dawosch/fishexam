import { AppShell, Box, Button, Container, Menu, Text } from '@mantine/core';
import { NavLink, Outlet } from 'react-router';
import './App.css';

function App() {
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
        <Box style={{ display: 'flex', gap: 5 }}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="default">Lernen</Button>
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
              <Button variant="default">Prüfung</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item component={NavLink} to="/questions/exam">
                Fragen
              </Menu.Item>
              <Menu.Item component={NavLink} to="/fishes/exam">
                Fische
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
