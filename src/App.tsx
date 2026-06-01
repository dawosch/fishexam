import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AppShell, Box, Button, Container, Menu, Text, UnstyledButton } from '@mantine/core';
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
              <Button variant="default" size='xs' rightSection={<ChevronDownIcon width={16} />}>
                Lernen
              </Button>
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
              <Button variant="default" size='xs' rightSection={<ChevronDownIcon width={16} />}>
                Prüfung
              </Button>
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
        <UnstyledButton component={NavLink} to="https://github.com/dawosch/fishexam" target="_blank" style={{ display: 'flex', alignSelf: 'center' }}>
          <img src="/fishexam/github.svg" width={24} />
        </UnstyledButton>
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
