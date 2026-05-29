import { HandThumbDownIcon, HandThumbUpIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { ActionIcon, Autocomplete, Button, Flex, Image, Modal, Pagination, Paper, Popover, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

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

  return (
    <Stack>
      {fishes.length && (
        <>
          <Pagination value={fishNumber + 1} total={fishes.length} onChange={handlePageChange} style={{ display: 'flex', justifyContent: 'center' }} />

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
          <Modal.Root opened={showResults} onClose={() => setShowResults(false)} centered>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title component={Title}>{results && results.filter((r) => !!r).length >= 4 ? 'Bestanden' : 'Nicht Bestanden'}</Modal.Title>
                <Modal.CloseButton />
              </Modal.Header>
              <Modal.Body>
                <Stack gap={1}>
                  {fishes.map((f, i) => (
                    <Flex key={`result-${f.id}`} justify="space-between">
                      <Text>{f.name}</Text>
                      <Text>{results[i] ? <HandThumbUpIcon width={24} color="green" /> : <HandThumbDownIcon width={24} color="red" />}</Text>
                    </Flex>
                  ))}
                </Stack>
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
        </>
      )}
    </Stack>
  );
}
