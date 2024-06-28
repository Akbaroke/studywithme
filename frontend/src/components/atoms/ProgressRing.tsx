import React, { useState, useEffect } from 'react';
import { ActionIcon, Center, rem, RingProgress, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const ProgressRing = ({
  duration,
  onProgressChange,
}: {
  duration: number;
  onProgressChange: (progress: number) => void;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = duration / 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          const newProgress = prev + 1;
          onProgressChange(newProgress);
          return newProgress;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onProgressChange]);

  return (
    <RingProgress
      thickness={5}
      size={80}
      sections={[
        { value: progress, color: progress === 100 ? 'teal' : 'yellow' },
      ]}
      label={
        progress === 100 ? (
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <IconCheck style={{ width: rem(22), height: rem(22) }} />
            </ActionIcon>
          </Center>
        ) : (
          <Text c="yellow" fw={700} ta="center" size="lg">
            {progress}%
          </Text>
        )
      }
    />
  );
};

export default ProgressRing;
