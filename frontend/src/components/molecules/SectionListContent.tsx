import { ContentModel } from '@/models/contentModel';
import { Divider, SimpleGrid } from '@mantine/core';
import React from 'react';
import { CardContent, CardContentSkeleton } from '../atoms/CardContent';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  title: string;
  data: ContentModel[];
  loading: boolean;
};

export default function SectionListContent({ title, data, loading }: Props) {
  const isNotMobile = useMediaQuery('(min-width: 768px)');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
        <Divider mt={10} />
      </div>
      {loading ? (
        <SimpleGrid
          cols={{ base: 2, xs: 3, sm: 4 }}
          spacing={{ base: 10, sm: 20 }}>
          {Array.from({ length: isNotMobile ? 4 : 8 }).map((_, index) => (
            <CardContentSkeleton key={index} />
          ))}
        </SimpleGrid>
      ) : (
        data?.length > 0 && (
          <SimpleGrid
            cols={{ base: 2, xs: 3, sm: 4 }}
            spacing={{ base: 10, sm: 20 }}>
            {data?.slice(0, isNotMobile ? 4 : 8).map((item) => (
              <CardContent key={item.id} {...item} />
            ))}
          </SimpleGrid>
        )
      )}
    </div>
  );
}
