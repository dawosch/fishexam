import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ActionIcon, Autocomplete, Button, Image, Pagination, Paper, Popover, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LoadingPage } from '../loading.page';
import { FishResults } from './fish-results.exam';

type Fish = {
  id: number;
  name: string;
  sience: string;
  info: string[];
  image: string;
  size: string;
  copyright: string;
};

export function FishExamPage() {
  const [fishNames, setFishNames] = useState<string[]>([]);
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [fishNumber, setFishNumber] = useState<number>(0);
  const [answeres, setAnsweres] = useState<string[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFishes = async () => {
      const res = await fetch('https://raw.githubusercontent.com/dawosch/fishexam/refs/heads/main/data/fishes.json', { method: 'GET' });
      const data: Fish[] = await res.json();
      const fishNames = data.map((f) => f.name).sort();
      const fishes = Array.from({ length: 6 }).flatMap(() => data.splice(Math.floor(Math.random() * data.length), 1));
      return { fishNames, fishes };
    };

    fetchFishes().then(({ fishNames, fishes }) => {
      setFishNames(fishNames);
      setFishes(fishes);
    });
  }, [setFishes, setFishNames]);

  const handeChange = (val: string) => {
    setAnsweres((answeres) => (answeres.length - 1 < fishNumber ? [...answeres, val] : answeres.map((a, i) => (i === fishNumber ? val : a))));
  };

  const handlePageChange = (page: number) => {
    setFishNumber(page - 1);
  };

  const validate = () => {
    const results = answeres.map((a, i) => a === fishes[i].name);
    setResults(results);
    setShowResults(true);
  };

  const handleNewExam = () => {
    navigate(0);
  };

  if (!fishes.length) return <LoadingPage />;
  if (showResults) return <FishResults fishes={fishes.map((f) => f.name)} results={results} onBack={() => setShowResults(false)} onNewExam={handleNewExam} />;

  return (
    <Stack>
      <Pagination value={fishNumber + 1} total={fishes.length} gap={4} onChange={handlePageChange} style={{ display: 'flex', justifyContent: 'center' }} />

      <Paper shadow="xs" p="md">
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <ActionIcon variant="default" style={{ display: 'flex', justifySelf: 'end' }}>
              <InformationCircleIcon width={24} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="xs">Die angezeigten Bilder sind nicht die offiziellen Prüfungsbilder</Text>
          </Popover.Dropdown>
        </Popover>
        <Stack>
          <Image src={`https://raw.githubusercontent.com/dawosch/fishexam/refs/heads/main/data/images/${fishes[fishNumber].id}.png`} fit="contain" />
          <Text size="xl" fw="500" style={{ display: 'flex', justifyContent: 'center' }}>
            {fishes[fishNumber].size} cm
          </Text>
          <Autocomplete placeholder="Wähle deine Antwort" value={answeres[fishNumber] ?? ''} data={fishNames} onChange={handeChange} />
        </Stack>
      </Paper>

      <Button onClick={validate} fullWidth>
        Ergebnis anzeigen
      </Button>
    </Stack>
  );
}
