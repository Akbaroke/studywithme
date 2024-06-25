import { CategoryModel } from '@/models/categoryModel';
import { UserModel } from '@/models/userModel';
import { deleteCategory, getAllCategory } from '@/services/categoryService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Table from '../molecules/Table';
import { ActionIcon, Table as MantineTable } from '@mantine/core';
import ModalForm from './ModalForm';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import ModalConfirm from './ModalConfirm';
import Notify from '../atoms/Notify';
import { formatDate } from '@/helpers/formatDate';

export default function TableCategory() {
  const session: UserModel = useSession().data?.user as UserModel;
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<CategoryModel[]>({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const mutation = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      const response = await deleteCategory(id, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang menghapus kategori..', 'delete-category');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      Notify('success', response, 'delete-category');
    },
    onError: (error: any) => {
      console.log(error);
      Notify('error', 'Kategori gagal dihapus', 'delete-category');
    },
  });

  const onDeleteCategory = async (id: string) => {
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
      isLoading={isLoading}
      header={
        <>
          <MantineTable.Th w={50}>No.</MantineTable.Th>
          {['Nama', 'Terakhir Diubah']?.map((element, index) => (
            <MantineTable.Th key={index}>{element}</MantineTable.Th>
          ))}
          <MantineTable.Th w={110}>Action</MantineTable.Th>
        </>
      }
      body={data?.map((element, index) => (
        <MantineTable.Tr key={index}>
          <MantineTable.Td>{index + 1}</MantineTable.Td>
          <MantineTable.Td>{element.name}</MantineTable.Td>
          <MantineTable.Td
            width={100}
            styles={{ td: { whiteSpace: 'nowrap' } }}>
            {formatDate(element.updated_at)}
          </MantineTable.Td>
          <MantineTable.Td className="flex items-center gap-3 justify-evenly">
            <ModalForm
              formType="category"
              id={element.id}
              title="Edit Kategori">
              <ActionIcon variant="light" size="lg" radius="md">
                <IconPencil size={18} />
              </ActionIcon>
            </ModalForm>
            <ModalConfirm
              btnTitle="Ya, hapus"
              title="Hapus Kategori"
              text={`Apakah anda yakin ingin menghapus kategori ini "${element.name}" ?`}
              type="danger"
              icon={<IconTrash size={18} />}
              onAction={() => onDeleteCategory(element.id)}>
              <ActionIcon variant="light" size="lg" color="red" radius="md">
                <IconTrash size={18} />
              </ActionIcon>
            </ModalConfirm>
          </MantineTable.Td>
        </MantineTable.Tr>
      ))}
    />
  );
}
