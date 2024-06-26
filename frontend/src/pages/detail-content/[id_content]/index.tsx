import { getContentById } from '@/services/contentService';
import { GetServerSideProps } from 'next';
import { ContentModel, DetailContentModel } from '@/models/contentModel';
import {
  IconLock,
  IconPencil,
  IconPlayerPlay,
  IconPlus,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import Image from 'next/image';
import { images } from '@/assets';
import { ActionIcon, Badge, Button, Divider, Skeleton } from '@mantine/core';
import { formatDateOnly, formatSeconds } from '@/helpers/formatDate';
import Link from 'next/link';
import urlify from '@/helpers/urlify';
import ModalForm from '@/components/organisms/ModalForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { UserModel } from '@/models/userModel';
import { useRouter } from 'next/router';
import ModalConfirm from '@/components/organisms/ModalConfirm';
import Notify from '@/components/atoms/Notify';
import { deleteDetailContent } from '@/services/detailContentService';

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
            <p className="text-xs line-clamp-3 text-gray-300 break-words whitespace-pre-line">
              {urlify(content?.description)}
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
          {session?.role !== 'STUDENT' && (
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
        <div className="flex flex-col">
          {content?.detail_content?.map((item, index) => (
            <ListContent key={index} content={item} id_content={id_content} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ListContent = ({
  content,
  id_content,
}: {
  content: DetailContentModel;
  id_content: string;
}) => {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;

  const mutation = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      const response = await deleteDetailContent(id, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang menghapus konten..', 'delete-content');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['contents/' + id_content],
      });
      Notify('success', response, 'delete-content');
    },
    onError: (error: any) => {
      console.log(error);
      Notify('error', 'Konten gagal dihapus', 'delete-content');
    },
  });

  const onDeleteContent = async (id: string) => {
    if (session.token) {
      mutation.mutate({
        id: id,
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <div className="flex items-center gap-5">
      <Link
        href={`/detail-content/${id_content}/${content.id}`}
        className="flex items-center justify-between py-3 text-sm text-gray-500 [&>div>h2]:hover:text-gray-500 border-b border-dashed cursor-pointer flex-1">
        <div className="flex items-center gap-2">
          <h1>{content.serial_number}.</h1>
          <h2 className="font-medium text-black">{content.title}</h2>
        </div>
        <div className="flex items-center gap-4">
          {content.is_premium && <IconLock size={16} />}
          <Divider orientation="vertical" />
          <p>{formatSeconds(content.duration)}</p>
        </div>
      </Link>
      {session?.role !== 'STUDENT' && (
        <div className="flex items-center gap-2">
          <ModalForm
            formType="detail-content"
            id_content={id_content}
            id={content.id}
            title="Edit Materi"
            size="xl">
            <ActionIcon variant="light" size="lg" radius="md">
              <IconPencil size={18} />
            </ActionIcon>
          </ModalForm>
          <ModalConfirm
            btnTitle="Ya, hapus"
            title="Hapus Materi"
            text={`Apakah anda yakin ingin menghapus materi ini "${content.title}" ?`}
            type="danger"
            icon={<IconTrash size={18} />}
            onAction={() => onDeleteContent(content.id)}>
            <ActionIcon variant="light" size="lg" color="red" radius="md">
              <IconTrash size={18} />
            </ActionIcon>
          </ModalConfirm>
        </div>
      )}
    </div>
  );
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
    <div className="flex gap-10 py-10 md:flex-row flex-col">
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
      <div className="flex-1 min-w-[400px] flex flex-col gap-5 px-3 md:px-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton height={8} width={50} radius="xl" />
            <Skeleton height={8} width={200} radius="xl" />
          </div>
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="flex items-center justify-between py-4 border-b border-dashed cursor-pointer"
              key={index}>
              <div className="flex items-center gap-2">
                <Skeleton height={8} width={100} radius="xl" />
              </div>
              <div className="flex items-center gap-4">
                <Divider orientation="vertical" />
                <Skeleton height={8} width={50} radius="xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
