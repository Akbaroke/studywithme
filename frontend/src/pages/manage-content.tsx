import Table from '@/components/molecules/Table';
import { deleteCategory, getAllCategory } from '@/services/categoryService';
import { ActionIcon, Tabs } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table as MantineTable } from '@mantine/core';
import { CategoryModel } from '@/models/categoryModel';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import ModalForm from '@/components/organisms/ModalForm';
import ModalConfirm from '@/components/organisms/ModalConfirm';
import Notify from '@/components/atoms/Notify';
import { useSession } from 'next-auth/react';
import { UserModel } from '@/models/userModel';

export default function ManageContent() {
  const session: UserModel = useSession().data?.user as UserModel;
  const queryClient = useQueryClient();
  const {
    data: dataCategory,
    error,
    isLoading,
  } = useQuery<CategoryModel[]>({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const mutation = useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      deleteCategory(id, token),
    onMutate: () => {
      Notify('loading', 'Sedang menghapus kategori..', 'delete-category');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      Notify('success', 'Kategori telah di hapus', 'delete-category');
    },
    onError: (error: any) => {
      console.error('Error creating category:', error);
      Notify('error', 'Kategori gagal di hapus', 'delete-category');
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
    <div className="w-full">
      <div className="flex flex-col gap-10 py-10 w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Mengelola Konten</h1>
          <p className="text-md font-medium text-gray-500 max-w-lg">
            Kelola materi pelajaran dan konten yang ada di studywithme.
          </p>
        </div>
        <Tabs variant="outline" defaultValue="kategori" className="w-full">
          <Tabs.List>
            <Tabs.Tab value="kategori">Kategori</Tabs.Tab>
            <Tabs.Tab value="kontent">Kontent</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="kategori">
            <div className="flex flex-col gap-3 my-5 px-5 w-full">
              <div className="flex items-center justify-between">
                <p className="text-md font-semibold">Kategori</p>
                <ModalForm formType="category" title="Buat Kategori">
                  <ActionIcon variant="light" size="lg" radius="md">
                    <IconPlus size={18} />
                  </ActionIcon>
                </ModalForm>
              </div>
              <Table
                isLoading={isLoading}
                header={
                  <>
                    <MantineTable.Th w={50}>No.</MantineTable.Th>
                    {['Nama']?.map((element, index) => (
                      <MantineTable.Th key={index}>{element}</MantineTable.Th>
                    ))}
                    <MantineTable.Th w={110}>Action</MantineTable.Th>
                  </>
                }
                body={dataCategory?.map((element, index) => (
                  <MantineTable.Tr key={index}>
                    <MantineTable.Td>{index + 1}</MantineTable.Td>
                    <MantineTable.Td>{element.name}</MantineTable.Td>
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
                        <ActionIcon
                          variant="light"
                          size="lg"
                          color="red"
                          radius="md">
                          <IconTrash size={18} />
                        </ActionIcon>
                      </ModalConfirm>
                    </MantineTable.Td>
                  </MantineTable.Tr>
                ))}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="kontent">
            <div className="flex flex-col gap-3 my-5 px-5">
              <p className="text-md font-semibold">Konten</p>
              {/* <Table
                header={[
                  'Thumbnail',
                  'Title',
                  'Premium',
                  'Total Konten',
                  'Kategori',
                  'Total Klik',
                ]}
              /> */}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
