import { Button, Pagination, Paper, Radio, Select, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

type Category = {
  id: number;
  name: string;
  questions: Question[];
};

type Question = {
  id: number;
  q: string;
  a: string;
  b: string;
  c: string;
  s: string;
};

export function QuestionsLearnPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const [answere, setAnswere] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('https://raw.githubusercontent.com/IngressoDev/fishexam/refs/heads/master/data/questions.json', { method: 'GET' });
      const data = await res.json();
      return data;
    };

    fetchQuestions().then(setCategories);
  }, [setCategories]);

  const resetStates = () => {
    setAnswere(null);
    setShowResult(false);
  };

  const nextPage = () => {
    resetStates();
    handlePageChange(page + 1);
  };

  const previousPage = () => {
    resetStates();
    handlePageChange(page - 1);
  };

  const handleCategoryChange = (value: number | null) => {
    resetStates();
    setCategory(value);
  };

  const handleAnswereChange = (value: string) => {
    setAnswere(value);
  };

  const handlePageChange = (p: number) => {
    setSearchParams({ page: p.toString() });
  };

  const validate = () => {
    if (category !== null) setShowResult(true);
  };

  const getRadioColor = (value: string) => {
    if (category === null || !showResult) return undefined;

    const correctAnswere = categories[category].questions[page].s;
    if (answere === value && answere === correctAnswere) return 'green';
    if (answere === value && answere !== correctAnswere) return 'red';
    if (value === correctAnswere) return 'green';

    return undefined;
  };

  return (
    <Stack>
      <Select label="Wähle die Kategorie" placeholder="Kategorie" data={categories.map((c, i) => ({ label: c.name, value: i }))} value={category} onChange={handleCategoryChange} />
      {category !== null && (
        <>
          <Paper shadow="xs" p="md">
            <Radio.Group label={categories[category].questions[page].q} value={answere} onChange={handleAnswereChange} readOnly={showResult}>
              <Stack gap={5} pt={5}>
                <Radio value="a" label={categories[category].questions[page].a} color={getRadioColor('a')} styles={{ label: { color: getRadioColor('a') } }} />
                <Radio value="b" label={categories[category].questions[page].b} color={getRadioColor('b')} styles={{ label: { color: getRadioColor('b') } }} />
                <Radio value="c" label={categories[category].questions[page].c} color={getRadioColor('c')} styles={{ label: { color: getRadioColor('c') } }} />
              </Stack>
            </Radio.Group>
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
          <Pagination
            value={page}
            total={categories[category].questions.length}
            boundaries={3}
            siblings={3}
            onChange={handlePageChange}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}
    </Stack>
  );
}
