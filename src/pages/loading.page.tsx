import { Loader } from '@mantine/core';

export function LoadingPage() {
  return <Loader color="blue" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />;
}
