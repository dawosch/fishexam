import { Box, Button, Stack, Text } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { QuestionBlock } from '~/components/question-block.component';
import { useTimer } from '~/hooks/timer.hook';
import { LoadingPage } from '../loading.page';
import { QuestionResults } from './question-results.exam';

type Category = {
  id: number;
  name: string;
  questions: Question[];
};

type Question = {
  id: number;
  question: string;
  a: string;
  b: string;
  c: string;
  solution: string;
};

export function QuestionsExamPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { time, initTimer, startTimer, stopTimer, formateTime } = useTimer();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [answeres, setAnsweres] = useState<Map<number, Map<number, string>>>(new Map());
  const [results, setResults] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    initTimer(3600);
  }, [initTimer]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('https://raw.githubusercontent.com/dawosch/fishexam/refs/heads/main/data/questions.json', { method: 'GET' });
      const data: Category[] = await res.json();
      const categories = data.map((c) => ({
        ...c,
        questions: Array.from({ length: 10 }).flatMap(() => c.questions.splice(Math.floor(Math.random() * c.questions.length), 1)),
      }));
      return categories;
    };

    fetchQuestions().then(setCategories);
  }, [setCategories]);

  const handleChange = (categoryId: number, questionId: number, result: string) => {
    startTimer();
    setAnsweres((answeres) => {
      const newAnsweres = new Map(answeres);
      const category = new Map(answeres.get(categoryId) ?? new Map<number, string>());
      category.set(questionId, result);
      newAnsweres.set(categoryId, category);
      return newAnsweres;
    });
  };

  const handleFinish = () => {
    stopTimer();
    const results = categories.map((c) => c.questions.reduce((total, q) => (answeres.get(c.id)?.get(q.id) === q.solution ? total + 1 : total), 0));

    setResults(results);
    setShowResults(true);
  };

  const handleNewExam = () => {
    navigate(0);
  };

  if (categories.length === 0) return <LoadingPage />;
  if (showResults) return <QuestionResults categories={categories.map((c) => c.name)} results={results} onBack={() => setShowResults(false)} onNewExam={handleNewExam} />;

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
                question={q.question}
                answereA={q.a}
                answereB={q.b}
                answereC={q.c}
                solution={q.solution}
                value={answeres.get(c.id)?.get(q.id)}
                reveal={showResults}
                onChange={(result) => handleChange(c.id, q.id, result)}
              />
            ))}
          </Fragment>
        ))}
        <Button onClick={handleFinish}>Prüfung abgeben</Button>
        <Box bg="dark" style={{ position: 'sticky', bottom: 0, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} display="flex">
          <Text c="white" size="lg">
            Abgabe in: {formateTime(time)}
          </Text>
        </Box>
      </Stack>
    </>
  );
}
