import { Stack, Select, Paper, Radio, Button, Pagination, Image, Autocomplete } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';

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
      const res = await fetch('https://raw.githubusercontent.com/IngressoDev/fishexam/refs/heads/master/data/fishes.json', { method: 'GET' });
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
            <Image src={`https://raw.githubusercontent.com/IngressoDev/fishexam/refs/heads/v2/data/images/${fishes[page - 1].image}`} />
            <Autocomplete
              label="Deine Antwort"
              value={answere ?? ''}
              data={fishes.map((f) => f.name)}
              rightSection={
                showResult ? fishes[page - 1].name === answere ? <HandThumbUpIcon width={24} color="green" /> : <HandThumbDownIcon width={24} color="green" /> : undefined
              }
              onChange={setAnswere}
            />
          </Paper>
          {!showResult && (
            <Button onClick={validate} fullWidth>
              Validieren
            </Button>
          )}
          {showResult && (
            <>
              <Button onClick={nextPage} fullWidth>
                Weiter
              </Button>
              <Button onClick={previousPage} fullWidth>
                Zurück
              </Button>
            </>
          )}
        </>
      )}
    </Stack>
  );
}
