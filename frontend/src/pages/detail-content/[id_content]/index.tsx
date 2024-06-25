import { getContentById } from '@/services/contentService';
import { GetServerSideProps } from 'next';
import getSession from '@/services/getSession';
import { ContentModel } from '@/models/contentModel';
import { NextRequest } from 'next/server';
import { IconLock, IconPlayerPlay, IconUpload } from '@tabler/icons-react';
import Image from 'next/image';
import { images } from '@/assets';
import { Badge, Button, Divider } from '@mantine/core';
import { formatDateOnly, formatSeconds } from '@/helpers/formatDate';
import Link from 'next/link';

type Props = {
  content: ContentModel | null;
  id_content: string;
};

export default function Content({ id_content, content }: Props) {
  return (
    <div className="flex gap-10 py-10 md:flex-row flex-col">
      <div className="relative w-full md:max-w-[600px] min-h-[180px] max-w-none rounded-2xl overflow-hidden bg-gray-800">
        <Image
          src={
            content?.thumbnail ? content?.thumbnail : images.DEFAULT_THUMBNAIL
          }
          alt="thumbnail"
          height={160}
          width={160}
          className="w-full h-full object-cover object-center absolute top-0 left-0 bottom-0 right-0"
        />
        <div className="flex flex-col gap-14 relative z-10 text-white w-full min-h-[180px] p-7 sm:p-10 backdrop-blur-md bg-black/50 rounded-2xl">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap mt-3">
              {content?.categories?.map((category) => (
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
            <h1 className="text-2xl font-bold">{content?.title}</h1>
            <p className="text-xs text-gray-300">
              {content?.total_content === 0
                ? 'Belum ada'
                : content?.total_content}{' '}
              materi, terakhir diupdate pada{' '}
              {formatDateOnly(content?.updated_at ?? new Date())}
            </p>
            <p className="text-xs line-clamp-3 text-gray-300">
              {content?.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <Button
              variant="filled"
              leftSection={<IconPlayerPlay size={16} />}
              size="xs"
              radius="md"
              color="blue"
              onClick={() => {}}>
              Mulai Belajar
            </Button>
            <Button
              variant="outline"
              leftSection={<IconUpload size={16} />}
              size="xs"
              radius="md"
              color="white"
              onClick={() => {}}>
              Bagikan
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-[400px] flex flex-col gap-5 px-3 md:px-0">
        <div>
          <h2 className="text-xl font-semibold">Materi Pembelajaran</h2>
          <p className="text-sm text-gray-500">
            {content?.total_content === 0
              ? 'Belum ada'
              : content?.total_content}{' '}
            materi untuk dipelajari.
          </p>
        </div>
        <div className="flex flex-col">
          {content?.detail_content?.map((item, index) => (
            <Link
              href={`/detail-content/${id_content}/${item.id}`}
              key={index}
              className="flex items-center justify-between py-3 text-sm text-gray-500 [&>div>h2]:hover:text-gray-500 border-b border-dashed cursor-pointer">
              <div className="flex items-center gap-2">
                <h1>{item.serial_number}.</h1>
                <h2 className="font-medium text-black">{item.title}</h2>
              </div>
              <div className="flex items-center gap-4">
                {item.is_premium && <IconLock size={16} />}
                <Divider orientation="vertical" />
                <p>{formatSeconds(item.duration)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id_content } = ctx.query;
  const sessionData = await getSession(ctx.req as unknown as NextRequest);

  if (!id_content || typeof id_content !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const content = await getContentById(id_content, sessionData.token!);

    return {
      props: {
        content,
        id_content,
      },
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      notFound: true,
    };
  }
};
