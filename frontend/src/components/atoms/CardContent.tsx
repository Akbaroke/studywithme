import { images } from '@/assets';
import { ContentModel } from '@/models/contentModel';
import { Badge, Card } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { MdWorkspacePremium } from 'react-icons/md';
import LazyLoad from 'react-lazy-load';

export default function CardContent({
  id,
  title,
  description,
  thumbnail,
  isPremium,
  total_duration,
  categories,
  total_kliks,
  updated_at,
  created_at,
}: ContentModel) {
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      className="cursor-pointer [&>div>div>img]:hover:scale-110 min-h-[320px]">
      <Card.Section className="relative bg-black/20">
        {isPremium && (
          <Badge
            color="#000"
            leftSection={<MdWorkspacePremium size={12} />}
            className="absolute top-2 right-2 z-10"
            styles={{
              label: {
                textTransform: 'capitalize',
              },
            }}>
            Premium
          </Badge>
        )}
        <LazyLoad className="w-full h-[150px] overflow-hidden" threshold={0.95}>
          <Image
            src={thumbnail ? thumbnail : images.DEFAULT_THUMBNAIL}
            height={160}
            width={160}
            className="w-full h-full object-cover object-center transition-all duration-300"
            alt="Norway"
          />
        </LazyLoad>
      </Card.Section>

      <div className="mt-3 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-md font-medium">{title}</h1>
          <div className="flex gap-4 items-center">
            <div className="flex text-gray-400 items-center gap-1 text-xs">
              <IoStatsChart size={12} />
              <p>{total_kliks}</p>
            </div>
            <div className="flex text-gray-400 items-center gap-1 text-xs">
              <IconClock size={12} />
              <p>{total_duration} menit</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-3">
          {categories.map((category) => (
            <Badge
              key={category}
              color="blue"
              variant="light"
              className="text-xs"
              styles={{
                label: {
                  textTransform: 'capitalize',
                },
              }}>
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
