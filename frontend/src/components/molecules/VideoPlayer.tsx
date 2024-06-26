import { images } from '@/assets';
import cn from '@/helpers/cn';
import { formatSeconds } from '@/helpers/formatDate';
import { ActionIcon, Progress } from '@mantine/core';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function VideoPlayer({
  id,
  url,
  isNotMobile,
  duration,
  thumbnail,
}: {
  id: string;
  url?: string;
  isNotMobile?: boolean;
  duration?: number;
  thumbnail?: string | null;
}) {
  const CustomPlaceholder = () => (
    <div
      className={cn(
        'w-full h-full bg-black border rounded-xl border-gray-400 relative',
        isNotMobile ? 'h-[450px]' : 'h-[200px]'
      )}>
      <Image
        src={thumbnail ? thumbnail : images.DEFAULT_THUMBNAIL}
        alt="thumbnail"
        height={160}
        width={160}
        className="w-full h-full object-cover object-center absolute top-0 left-0 bottom-0 right-0 blur-lg"
      />
      <div className="w-full h-full flex items-center justify-center">
        <ActionIcon
          variant="filled"
          aria-label="play"
          size={70}
          radius="100%"
          className="relative bottom-5">
          <IconPlayerPlayFilled
            style={{ width: '50%', height: '50%' }}
            stroke={1.5}
          />
        </ActionIcon>
      </div>
      <div className="border-t border-gray-600 px-5 py-4 text-white absolute bottom-0 right-0 left-0 flex items-center gap-5">
        <p>{formatSeconds(duration ?? 0)}</p>
        <Progress value={30} w={'100%'} />
        <div>
          <ActionIcon
            variant="outline"
            aria-label="play"
            radius="xl"
            flex={1}
            color="#fff">
            <IconPlayerPlayFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full border rounded-lg overflow-hidden flex items-center justify-center">
      <ReactPlayer
        key={id}
        url={url}
        width="100%"
        light={<CustomPlaceholder />}
        playing={true}
        height={isNotMobile ? 450 : 200}
        playIcon={<></>}
        controls
      />
    </div>
  );
}
