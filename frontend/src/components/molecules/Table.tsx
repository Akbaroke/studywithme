import {
  ActionIcon,
  Table as MantineTable,
  NumberFormatter,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';

type Props = {
  data: any[];
  header: string[];
};

export default function Table({ data, header }: Props) {
  const rows = []?.map((element, index) => (
    <MantineTable.Tr key={index}>
      {data?.map((element, index) => (
        <MantineTable.Td key={index}>{element}</MantineTable.Td>
      ))}
      <MantineTable.Td className="flex items-center gap-3 justify-evenly">
        <ActionIcon variant="light" size="lg">
          <IconTrash size={18} />
        </ActionIcon>
        <ActionIcon variant="light" size="lg">
          <IconPencil size={18} />
        </ActionIcon>
      </MantineTable.Td>
    </MantineTable.Tr>
  ));

  const ths = (
    <MantineTable.Tr>
      {header?.map((element, index) => (
        <MantineTable.Th key={index}>{element}</MantineTable.Th>
      ))}
      <MantineTable.Th>Action</MantineTable.Th>
    </MantineTable.Tr>
  );

  return (
    <MantineTable.ScrollContainer minWidth={500}>
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
        <MantineTable.Tbody>{rows}</MantineTable.Tbody>
      </MantineTable>
    </MantineTable.ScrollContainer>
  );
}
