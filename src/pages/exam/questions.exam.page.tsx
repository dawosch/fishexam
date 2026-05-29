import { Button, Flex, Loader, Modal, Stack, Text, Title } from '@mantine/core';
import { Fragment, useEffect, useRef, useState } from 'react';
import { QuestionBlock } from '~/components/question-block.component';
import { useTimer } from '~/hooks/timer.hook';

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

export function QuestionsExamPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { startTimer, stopTimer } = useTimer();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [results, setResults] = useState<Map<number, number>>(new Map());
  const answeres = useRef<Map<number, Map<number, boolean>>>(new Map<number, Map<number, boolean>>());

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('https://raw.githubusercontent.com/IngressoDev/fishexam/refs/heads/master/data/questions.json', { method: 'GET' });
      const data: Category[] = await res.json();
      const categories = data.map((c) => ({
        ...c,
        questions: Array.from({ length: 10 }).flatMap(() => c.questions.splice(Math.floor(Math.random() * c.questions.length), 1)),
      }));
      return categories;
    };

    fetchQuestions().then(setCategories);
  }, [setCategories]);

  const handleChange = (categoryId: number, questionId: number, result: boolean) => {
    startTimer();
    const category = answeres.current.get(categoryId) ?? new Map<number, boolean>();
    category.set(questionId, result);
    answeres.current.set(categoryId, category);
  };

  const handleFinish = () => {
    stopTimer();
    const results = new Map<number, number>();
    answeres.current.forEach((category, key) => {
      const total = Array.from(category.values()).reduce((total, result) => (result ? total + 1 : total), 0);
      results.set(key, total);
    });
    setResults(results);
    setShowResults(true);
    setShowDialog(true);
  };

  const checkResults = () => {
    const resultArr = Array.from(results.values());
    return results.size !== 0 && resultArr.every((total) => total >= 6) && resultArr.reduce((total, cur) => total + cur, 0) >= 45;
  };

  if (categories.length === 0) return <Loader color="blue" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />;
  return (
    <>
      <Stack>
        {categories.map((c) => (
          <Fragment key={`c-${c.id}`}>
            <Text size="xl" fw={500}>
              {c.name}
            </Text>
            {c.questions.map((q) => (
              <QuestionBlock
                key={`c-${c.id}:q-${q.id}`}
                question={q.q}
                answereA={q.a}
                answereB={q.b}
                answereC={q.c}
                solution={q.s}
                reveal={showResults}
                onChange={(result) => handleChange(c.id, q.id, result)}
              />
            ))}
          </Fragment>
        ))}
        <Button onClick={handleFinish}>Prüfung abgeben</Button>
      </Stack>
      <Modal.Root opened={showDialog} onClose={() => setShowDialog(false)} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title component={Title}>{checkResults() ? 'Bestanden' : 'Nicht Bestanden'}</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Stack gap={1}>
              <Flex justify="space-between">
                <Text fw={500}>Kategorie</Text>
                <Text fw={500}>Korrekte Antworten</Text>
              </Flex>
              {categories.map((c) => (
                <Flex key={`result-${c.id}`} justify="space-between">
                  <Text>{c.name}</Text>
                  <Text>{results.get(c.id) ?? 0}</Text>
                </Flex>
              ))}
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
