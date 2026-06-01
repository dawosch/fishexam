import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import { Flex, Stack, Title, Text, Button } from '@mantine/core';

type Props = {
  fishes: string[];
  results: boolean[];
  onBack: () => void;
  onNewExam: () => void;
};

export function FishResults({ fishes, results, onBack, onNewExam }: Props) {
  return (
    <Stack align="stretch" justify="center">
      <Title order={2}>Bestanden</Title>
      <Stack gap={1} align="stretch" justify="center">
        {fishes.map((f, i) => (
          <Flex key={f} justify="space-between">
            <Text>{f}</Text>
            <Text>{results[i] ? <HandThumbUpIcon width={24} color="green" /> : <HandThumbDownIcon width={24} color="red" />}</Text>
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
