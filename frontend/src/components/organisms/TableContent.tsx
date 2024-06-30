import { ContentModel } from '@/models/contentModel';
import { UserModel } from '@/models/userModel';
import { deleteContent, getAllContent } from '@/services/contentService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import Table from '../molecules/Table';
import { ActionIcon, Table as MantineTable } from '@mantine/core';
import ModalForm from './ModalForm';
import { IconPencil, IconScreenShare, IconTrash } from '@tabler/icons-react';
import ModalConfirm from './ModalConfirm';
import Notify from '../atoms/Notify';
import { formatDate } from '@/helpers/formatDate';
import LazyLoad from 'react-lazy-load';
import Image from 'next/image';
import { images } from '@/assets';
import { useRouter } from 'next/router';

export default function TableContent() {
  const router = useRouter();
  const session: UserModel = useSession().data?.user as UserModel;
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<ContentModel[]>({
    queryKey: ['contents'],
    queryFn: getAllContent,
  });

  const mutation = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      const response = await deleteContent(id, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang menghapus konten..', 'delete-content');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
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
    <Table
      minWidth={1500}
      isLoading={isLoading}
      header={
        <>
          <MantineTable.Th w={50}>No.</MantineTable.Th>
          {[
            'Sampul',
            'Judul',
            // 'Premium',
            'Total Konten',
            'Kategori',
            'Total Klik',
            'Terakhir Diubah',
          ]?.map((element, index) => (
            <MantineTable.Th key={index}>{element}</MantineTable.Th>
          ))}
          <MantineTable.Th w={110}>Action</MantineTable.Th>
        </>
      }
      body={data?.map((element, index) => (
        <MantineTable.Tr key={index}>
          <MantineTable.Td>{index + 1}</MantineTable.Td>
          <MantineTable.Td>
            <LazyLoad className="w-[120px] h-[80px] overflow-hidden rounded-lg mx-auto my-3 shadow-lg">
              <Image
                src={
                  element.thumbnail
                    ? element.thumbnail
                    : images.DEFAULT_THUMBNAIL
                }
                height={160}
                width={160}
                onClick={() => router.push(`/detail-content/${element.id}`)}
                className="w-full h-full object-cover object-center transition-all duration-300 cursor-pointer"
                alt="Norway"
              />
            </LazyLoad>
          </MantineTable.Td>
          <MantineTable.Td width={400}>{element.title}</MantineTable.Td>
          {/* <MantineTable.Td>
            {element.is_premium ? (
              <IconCheck size={18} className="m-auto text-green-600" />
            ) : (
              <IconX size={18} className="m-auto text-red-600" />
            )}
          </MantineTable.Td> */}
          <MantineTable.Td>{element.total_content}</MantineTable.Td>
          <MantineTable.Td>
            {element.categories?.map((cat) => cat.name).join(', ')}
          </MantineTable.Td>
          <MantineTable.Td>{element.total_klik}</MantineTable.Td>
          <MantineTable.Td
            width={100}
            styles={{ td: { whiteSpace: 'nowrap' } }}>
            {formatDate(element.updated_at)}
          </MantineTable.Td>
          <MantineTable.Td>
            <div className="flex items-center gap-3 justify-evenly">
              <ActionIcon
                variant="light"
                size="lg"
                radius="md"
                onClick={() => router.push(`/detail-content/${element.id}`)}>
                <IconScreenShare size={18} />
              </ActionIcon>
              <ModalForm
                formType="content"
                size="xl"
                id={element.id}
                title="Edit Konten">
                <ActionIcon variant="light" size="lg" radius="md">
                  <IconPencil size={18} />
                </ActionIcon>
              </ModalForm>
              <ModalConfirm
                btnTitle="Ya, hapus"
                title="Hapus Konten"
                text={`Apakah anda yakin ingin menghapus konten ini "${element.title}" ?`}
                type="danger"
                icon={<IconTrash size={18} />}
                onAction={() => onDeleteContent(element.id)}>
                <ActionIcon variant="light" size="lg" color="red" radius="md">
                  <IconTrash size={18} />
                </ActionIcon>
              </ModalConfirm>
            </div>
          </MantineTable.Td>
        </MantineTable.Tr>
      ))}
    />
  );
}
