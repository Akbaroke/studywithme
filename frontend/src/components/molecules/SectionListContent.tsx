import { ContentModel } from '@/models/contentModel';
import { Button } from '@mantine/core';
import React from 'react';

type Props = {
  title: string;
  data: ContentModel[];
};

export default function SectionListContent({ title, data }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>{title}</h1>
        <Button variant="filled" size="xs">
          Tampilkan lebih banyak
        </Button>
      </div>
      <div>
        {data.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}
