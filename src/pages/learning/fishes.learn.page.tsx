import { HandThumbDownIcon, HandThumbUpIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { ActionIcon, Autocomplete, Button, Image, Pagination, Paper, Popover, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

type Fish = {
  id: number;
  name: string;
  sience: string;
  info: string[];
  image: string;
  size: string;
  copyright: string;
};

export function FishLearnPage() {
  const [fishes, setFishes] = useState<Fish[]>();
  const [answere, setAnswere] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('https://raw.githubusercontent.com/dawosch/fishexam/refs/heads/main/data/fishes.json', { method: 'GET' });
      const data: Fish[] = await res.json();
      return data;
    };

    fetchQuestions().then(setFishes);
  }, [setFishes]);

  const resetStates = () => {
    setAnswere(null);
    setShowResult(false);
  };

  const handlePageChange = (p: number) => {
    setSearchParams({ page: p.toString() });
  };

  const nextPage = () => {
    resetStates();
    handlePageChange(page + 1);
  };

  const previousPage = () => {
    resetStates();
    handlePageChange(page - 1);
  };

  const validate = () => {
    setShowResult(true);
  };

  return (
    <Stack>
      {!!fishes && (
        <>
          <Pagination value={page} total={fishes.length} boundaries={3} siblings={3} onChange={handlePageChange} style={{ display: 'flex', justifyContent: 'center' }} />
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
              <Image src={`https://raw.githubusercontent.com/dawosch/fishexam/refs/heads/main/data/images/${fishes[page - 1].id}.png`} fit="contain" height={400} />
              <Text size="xl" fw="500" style={{ display: 'flex', justifyContent: 'center' }}>
                {fishes[page - 1].size} cm
              </Text>
              <Autocomplete
                placeholder="Wähle deine Antwort"
                value={answere ?? ''}
                data={fishes.map((f) => f.name).sort()}
                rightSection={
                  showResult ? fishes[page - 1].name === answere ? <HandThumbUpIcon width={24} color="green" /> : <HandThumbDownIcon width={24} color="red" /> : undefined
                }
                onChange={setAnswere}
              />
            </Stack>
          </Paper>
          {!showResult && (
            <Button onClick={validate} fullWidth>
              Validieren
            </Button>
          )}
          {showResult && (
            <>
              {page !== fishes.length && (
                <Button onClick={nextPage} fullWidth>
                  Weiter
                </Button>
              )}
              {page !== 1 && (
                <Button onClick={previousPage} fullWidth>
                  Zurück
                </Button>
              )}
            </>
          )}
        </>
      )}
    </Stack>
  );
}
