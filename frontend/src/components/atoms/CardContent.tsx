import { images } from '@/assets';
import { formatSeconds } from '@/helpers/formatDate';
import { ContentModel } from '@/models/contentModel';
import { clickedContent } from '@/services/contentService';
import { Badge, Card, Skeleton } from '@mantine/core';
import { IconBrandYoutube, IconClock, IconEye } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { MdWorkspacePremium } from 'react-icons/md';
import LazyLoad from 'react-lazy-load';

export function CardContent({
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
  total_content,
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
      className="cursor-pointer [&>div>div>img]:hover:scale-110 min-h-[300px] h-full">
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
          <h1 className="sm:text-base text-sm font-semibold line-clamp-2">
            {title}
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex text-gray-400 items-center gap-1 sm:text-md text-xs">
                <IconClock size={12} />
                <p>{formatSeconds(total_duration ?? 0)}</p>
              </div>
              <div className="flex text-gray-400 items-center gap-1 sm:text-md text-xs">
                <IconBrandYoutube size={12} />
                <p>{total_content} Materi</p>
              </div>
            </div>
            <div className="flex text-gray-400 items-center gap-1 sm:text-md text-xs">
              <IoStatsChart size={12} />
              {/* <IconEye size={16} /> */}
              <p>{total_klik}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-3">
          {categories.map((category) => (
            <Badge
              key={category.id}
              color="blue"
              variant="light"
              size="sm"
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

export function CardContentSkeleton() {
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      className="min-h-[300px]">
      <Card.Section className="bg-black/20 w-full h-full">
        <Skeleton height={150} width={300} />
      </Card.Section>

      <div className="mt-3 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <Skeleton height={10} width="30%" radius="xl" />
          <div className="flex gap-4 flex-col">
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} width="50%" radius="xl" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton height={8} width="20%" radius="xl" key={index} />
          ))}
        </div>
      </div>
    </Card>
  );
}