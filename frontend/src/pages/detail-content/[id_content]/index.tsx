import { getContentById } from '@/services/contentService';
import { GetServerSideProps } from 'next';
import { ContentModel } from '@/models/contentModel';
import { IconPlayerPlay, IconPlus } from '@tabler/icons-react';
import Image from 'next/image';
import { images } from '@/assets';
import { ActionIcon, Badge, Button, Divider, Skeleton } from '@mantine/core';
import { formatDateOnly } from '@/helpers/formatDate';
import urlify from '@/helpers/urlify';
import ModalForm from '@/components/organisms/ModalForm';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { UserModel } from '@/models/userModel';
import { useRouter } from 'next/router';
import ListContent from '@/components/molecules/ListContent';
import Metadata from '@/components/atoms/Metadata';
import Notify from '@/components/atoms/Notify';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  id_content: string;
};

export default function Content({ id_content }: Props) {
  const router = useRouter();
  const session: UserModel = useSession().data?.user as UserModel;
  const {
    data: content,
    error,
    isLoading,
    isPending,
  } = useQuery<ContentModel>({
    queryKey: ['contents/' + id_content],
    queryFn: () => getContentById(id_content, session.token as string),
  });

  if (error) {
    return router.replace('/');
  }

  if (isLoading || !content) {
    return <SkeletonComponent />;
  }

  return (
    <div className="flex gap-10 sm:py-10 py-5 md:flex-row flex-col">
      <Metadata title="Kontent" />
      <div className="w-full md:max-w-[600px] min-h-[180px] h-max max-w-none rounded-2xl overflow-hidden bg-gray-800 relative md:sticky md:top-28">
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
            <p className="text-xs line-clamp-3 text-gray-300 break-words whitespace-pre-line">
              {urlify(content?.description)}
            </p>
          </div>
          <div className="flex md:justify-end justify-center items-center">
            <Button
              variant="filled"
              leftSection={<IconPlayerPlay size={16} />}
              size="xs"
              radius="md"
              color="blue"
              onClick={() => {
                content.detail_content.length === 0
                  ? Notify('error', 'Belum ada materi')
                  : router.push(
                      `/detail-content/${id_content}/${content.detail_content[0].id}`
                    );
              }}>
              Mulai Belajar
            </Button>
            {/* <Button
              variant="outline"
              leftSection={<IconUpload size={16} />}
              size="xs"
              radius="md"
              color="white"
              onClick={() => {}}>
              Bagikan
            </Button> */}
          </div>
        </div>
      </div>
      <div className="flex-1 sm:min-w-[300px] flex flex-col gap-5 px-3 md:px-0">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Materi Pembelajaran</h2>
            <p className="text-sm text-gray-500">
              {content?.total_content === 0
                ? 'Belum ada'
                : content?.total_content}{' '}
              materi untuk dipelajari.
            </p>
          </div>
          {(session?.role === 'TEACHER' || session?.role === 'ADMIN') && (
            <ModalForm
              formType="detail-content"
              id_content={id_content}
              title="Buat Materi"
              size="xl">
              <ActionIcon variant="light" size="lg" radius="md">
                <IconPlus size={18} />
              </ActionIcon>
            </ModalForm>
          )}
        </div>
        <AnimatePresence>
          <div className="flex flex-col">
            {content?.detail_content?.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}>
                <ListContent content={item} id_content={id_content} />
              </motion.div>
            ))}
            {isPending && <ListMateriSekeleton />}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
const itemVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
    },
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
      duration: 0.5,
    },
  }),
  exit: (index: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
    },
  }),
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id_content } = ctx.query;

  if (!id_content || typeof id_content !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      id_content,
    },
  };
};

const SkeletonComponent = () => {
  return (
    <div className="flex gap-10 sm:py-10 py-5 md:flex-row flex-col">
      <div className="relative w-full md:max-w-[600px] min-h-[180px] max-w-none rounded-2xl overflow-hidden bg-gray-100">
        <div className="flex flex-col gap-14 relative z-10 text-white w-full min-h-[180px] h-full justify-between p-7 sm:p-10 backdrop-blur-md rounded-2xl">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap mt-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton width={20} height={8} radius="xl" key={index} />
              ))}
            </div>
            <Skeleton height={8} width={50} radius="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} width={200} radius="xl" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton height={10} width={30} radius="xl" />
            <Skeleton height={10} width={30} radius="xl" />
          </div>
        </div>
      </div>
      <div className="flex-1 sm:min-w-[300px] flex flex-col gap-5 px-3 md:px-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton height={8} width={50} radius="xl" />
            <Skeleton height={8} width={200} radius="xl" />
          </div>
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, index) => (
            <ListMateriSekeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ListMateriSekeleton = () => (
  <div className="flex items-center justify-between py-4 border-b border-dashed cursor-pointer">
    <div className="flex items-center gap-2">
      <Skeleton height={8} width={100} radius="xl" />
    </div>
    <div className="flex items-center gap-4">
      <Divider orientation="vertical" />
      <Skeleton height={8} width={50} radius="xl" />
    </div>
  </div>
);