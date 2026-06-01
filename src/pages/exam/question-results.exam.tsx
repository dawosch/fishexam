import { Button, Flex, Stack, Text, Title } from '@mantine/core';

type Props = {
  categories: string[];
  results: number[];
  onBack: () => void;
  onNewExam: () => void;
};

export function QuestionResults({ categories, results, onBack, onNewExam }: Props) {
  const checkResults = () => {
    return results.length !== 0 && results.every((total) => total >= 6) && results.reduce((total, cur) => total + cur, 0) >= 45;
  };

  return (
    <Stack align="stretch" justify="center">
      <Title order={2}>{checkResults() ? 'Bestanden' : 'Nicht bestanden'}</Title>
      <Stack gap={1} align="stretch" justify="center">
        {categories.map((c, i) => (
          <Flex key={c} justify="space-between">
            <Text>{c}</Text>
            <Text>{results[i] ?? 0}</Text>
          </Flex>
        ))}
      </Stack>
      <Button onClick={onBack} fullWidth>
        Zurück
      </Button>
      <Button onClick={onNewExam} color="green" fullWidth>
        Neue Prüfung
      </Button>
    </Stack>
  );
}
