import { Drawer, ScrollArea } from '@mantine/core';
import React from 'react';

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});
  withCloseButton?: boolean;
};

export default function MenuDrawer({
  title,
  isOpen,
  onClose,
  children,
  position,
  size,
  withCloseButton,
}: Props) {
  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title={title ?? 'Menu'}
      styles={{
        title: {
          fontWeight: position === 'bottom' ? 'lighter' : 'bold',
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
      withCloseButton={withCloseButton}
      position={position}
      radius="lg"
      size={size}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 1,
      }}>
      {children}
    </Drawer>
  );
}
