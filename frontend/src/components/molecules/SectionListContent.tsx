import { ContentModel } from '@/models/contentModel';
import { Button, Divider, SimpleGrid } from '@mantine/core';
import React from 'react';
import CardContent from '../atoms/CardContent';
import TextLink from '../atoms/TextLink';

type Props = {
  title: string;
  data: ContentModel[];
};

export default function SectionListContent({ title, data }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{title}</h1>
          <TextLink href="" text="Tampilkan lebih banyak" />
        </div>
        <Divider mt={10} />
      </div>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }}>
        {data.map((item) => (
          <CardContent key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </div>
  );
}
