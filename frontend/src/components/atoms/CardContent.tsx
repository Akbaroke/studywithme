import { images } from '@/assets';
import { formatSeconds } from '@/helpers/formatDate';
import { ContentModel } from '@/models/contentModel';
import { clickedContent } from '@/services/contentService';
import { Badge, Card } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { MdWorkspacePremium } from 'react-icons/md';
import LazyLoad from 'react-lazy-load';

export default function CardContent({
  id,
  title,
  description,
  thumbnail,
  is_premium,
  total_duration,
  categories,
  total_klik,
  updated_at,
  created_at,
}: ContentModel) {
  const router = useRouter();

  const onClickCard = async () => {
    router.push(`/detail-content/${id}`);
    await clickedContent(id);
  };

  return (
    <Card
      onClick={onClickCard}
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      className="cursor-pointer [&>div>div>img]:hover:scale-110 min-h-[300px]">
      <Card.Section className="relative bg-black/20">
        {is_premium && (
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
        <LazyLoad className="w-full h-[150px] overflow-hidden">
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
          <h1 className="sm:text-md text-xs font-medium line-clamp-2">
            {title}
          </h1>
          <div className="flex gap-4 items-center">
            <div className="flex text-gray-400 items-center gap-1 text-xs">
              <IoStatsChart size={12} />
              <p>{total_klik}</p>
            </div>
            <div className="flex text-gray-400 items-center gap-1 text-xs">
              <IconClock size={12} />
              <p>{formatSeconds(total_duration ?? 0)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-3">
          {categories.map((category) => (
            <Badge
              key={category.id}
              color="blue"
              variant="light"
              size="xs"
              styles={{
                label: {
                  textTransform: 'capitalize',
                },
              }}>
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
