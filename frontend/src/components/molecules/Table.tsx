import { Card, Table as MantineTable, Skeleton } from '@mantine/core';
import React from 'react';

type Props = {
  isLoading?: boolean;
  header: React.ReactNode;
  body: React.ReactNode;
};

export default function Table({ isLoading, body, header }: Props) {
  const ths = <MantineTable.Tr>{header}</MantineTable.Tr>;

  let headerCount = 0;
  React.Children.forEach(header, (child: any) => {
    headerCount = child.props.children.length;
  });

  return (
    <MantineTable
      withTableBorder
      withColumnBorders
      styles={{
        thead: {
          background: '#f0f0f0',
        },
        th: {
          textAlign: 'center',
        },
        td: {
          textAlign: 'center',
        },
      }}>
      <MantineTable.Thead>{ths}</MantineTable.Thead>
      <MantineTable.Tbody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <MantineTable.Tr key={index}>
                {Array.from({ length: headerCount }).map((_, index) => (
                  <MantineTable.Td key={index}>
                    <Skeleton height={8} radius="xl" />
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))
          : body}
      </MantineTable.Tbody>
    </MantineTable>
  );
}
