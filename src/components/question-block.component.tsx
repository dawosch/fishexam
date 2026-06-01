import { Paper, Radio, Stack } from '@mantine/core';

type Props = {
  question: string;
  answereA: string;
  answereB: string;
  answereC: string;
  solution: string;
  value?: string;
  reveal: boolean;
  onChange: (result: string) => void;
};

export function QuestionBlock({ question, answereA, answereB, answereC, solution, value, reveal, onChange }: Props) {
  const handleChange = (val: string) => {
    onChange(val);
  };

  const getColor = (option: string) => {
    if (!reveal) return undefined;
    if (option === solution) return 'green';
    if (option !== solution) return 'red';
    return undefined;
  };

  return (
    <Paper shadow="xs" p="md">
      <Radio.Group label={question} value={value} onChange={handleChange}>
        <Stack gap={5} pt={5}>
          <Radio label={answereA} value="a" color={getColor('a')} styles={{ label: { color: getColor('a') } }} />
          <Radio label={answereB} value="b" color={getColor('b')} styles={{ label: { color: getColor('b') } }} />
          <Radio label={answereC} value="c" color={getColor('c')} styles={{ label: { color: getColor('c') } }} />
        </Stack>
      </Radio.Group>
    </Paper>
  );
}
