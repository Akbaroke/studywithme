import { Drawer, ScrollArea } from '@mantine/core';
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
};

export default function MenuDrawer({ isOpen, onClose, children }: Props) {
  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title="Menu"
      styles={{
        title: {
          fontWeight: 700,
        },
        header: {
          padding: '0 25px',
        },
        body: {
          padding: '0 25px',
          paddingBottom: '50px',
          overflow: 'hidden',
          height: 'max-content',
        },
      }}
      withCloseButton={false}
      position="left"
      radius="lg"
      size="xs"
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 1,
      }}>
      {children}
    </Drawer>
  );
}
