import VideoPlayer from '@/components/molecules/VideoPlayer';
import cn from '@/helpers/cn';
import { formatSeconds } from '@/helpers/formatDate';
import urlify from '@/helpers/urlify';
import { ContentModel, DetailContentModel } from '@/models/contentModel';
import { getContentById } from '@/services/contentService';
import { getDetailContentById } from '@/services/detailContentService';
import getSession from '@/services/getSession';
import { ActionIcon, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconLock,
  IconLockOpen2,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextRequest } from 'next/server';

type Props = {
  content: ContentModel | null;
  detailContent: DetailContentModel | null;
  id_content: string;
  id_detail_content: string;
};

export default function DetailContent({
  content,
  detailContent,
  id_content,
  id_detail_content,
}: Props) {
  const router = useRouter();
  const isNotMobile = useMediaQuery('(min-width: 768px)');

  return (
    <div className="flex items-start gap-5 py-10">
      <div className="md:w-[200px] lg:w-[300px] md:flex flex-col gap-5 border rounded-lg p-3 hidden sticky top-28">
        <Link
          href={`/detail-content/${id_content}`}
          className="flex flex-col gap-0 p-3 border-b cursor-pointer hover:bg-gray-100 transition-all duration-300">
          <h1 className="text-md font-semibold">{content?.title}</h1>
          <p className="text-xs">{content?.total_content} meteri</p>
        </Link>
        <ScrollArea h={350}>
          <div className="flex flex-col gap-1">
            {content?.detail_content?.map((materi) => (
              <Link
                href={`/detail-content/${id_content}/${materi.id}`}
                key={materi.id}
                className={cn(
                  'flex items-center justify-between text-xs text-gray-600 [&_svg]:text-gray-400 p-2 rounded-lg hover:bg-black hover:text-white hover:shadow-lg transition-all duration-300',
                  materi.id === id_detail_content &&
                    'bg-black text-white shadow-lg'
                )}>
                <div className="flex items-center gap-2 flex-1">
                  <p>{materi.serial_number}</p>
                  <p className="line-clamp-2">{materi.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>{formatSeconds(materi.duration)}</p>
                  {materi.is_premium ? (
                    <IconLock size={16} />
                  ) : (
                    <IconLockOpen2 size={16} />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 relative">
        <VideoPlayer
          id={id_detail_content}
          isNotMobile={isNotMobile}
          url={detailContent?.video_url}
          duration={detailContent?.duration}
          thumbnail={content?.thumbnail}
        />
        <div className="w-full border rounded-lg mt-6">
          <div className="p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{detailContent?.title}</h1>
              <div className="flex items-center gap-2">
                <ActionIcon
                  variant="filled"
                  disabled={detailContent?.serial_number === 1}
                  onClick={() =>
                    router.push(
                      `/detail-content/${id_content}/${
                        content?.detail_content[
                          (detailContent?.serial_number ?? 0) - 2
                        ].id
                      }`
                    )
                  }
                  color="#000"
                  aria-label="prev"
                  radius="md"
                  size={35}>
                  <IconPlayerTrackPrev
                    style={{ width: '55%', height: '55%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon
                  variant="filled"
                  disabled={
                    detailContent?.serial_number === content?.total_content
                  }
                  onClick={() =>
                    router.push(
                      `/detail-content/${id_content}/${
                        content?.detail_content[
                          detailContent?.serial_number ?? 0 + 2
                        ].id
                      }`
                    )
                  }
                  color="#000"
                  aria-label="next"
                  radius="md"
                  size={35}>
                  <IconPlayerTrackNext
                    style={{ width: '55%', height: '55%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </div>
            </div>
            <p className="text-sm font-medium break-words whitespace-pre-line">
              {urlify(detailContent?.description)}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id_content, id_detail_content } = ctx.query;
  const sessionData = await getSession(ctx.req as unknown as NextRequest);

  if (!id_content || typeof id_content !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  if (!id_detail_content || typeof id_detail_content !== 'string') {
    return {
      redirect: {
        destination: '/detail-content/' + id_content,
        permanent: false,
      },
    };
  }

  try {
    const content = await getContentById(id_content, sessionData.token!);
    const detailContent = await getDetailContentById(
      id_detail_content,
      sessionData.token as string
    );

    return {
      props: {
        content,
        detailContent,
        id_content,
        id_detail_content,
      },
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      notFound: true,
    };
  }
};
