import { ManageUserModel, UserModel } from '@/models/userModel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Table from '../molecules/Table';
import { ActionIcon, Badge, Table as MantineTable } from '@mantine/core';
import ModalForm from './ModalForm';
import { IconPencil } from '@tabler/icons-react';
import ModalConfirm from './ModalConfirm';
import Notify from '../atoms/Notify';
import { formatDate } from '@/helpers/formatDate';
import { getAllUsers, updateUser } from '@/services/manageUserService';
import { MdBlock } from 'react-icons/md';
import { CgUnblock } from 'react-icons/cg';

export default function TableManageContent() {
  const session: UserModel = useSession().data?.user as UserModel;
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<ManageUserModel[]>({
    queryKey: ['manage-users'],
    queryFn: () => getAllUsers(session.token as string),
  });
  console.log(data);

  const mutation = useMutation({
    mutationFn: async ({
      id,
      is_banned,
      token,
    }: {
      id: string;
      is_banned: boolean;
      token: string;
    }) => {
      const response = await updateUser(id, { is_banned }, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', `Sedang memproses data akun...`, 'manage-user');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['manage-users'] });
      Notify('success', response, 'manage-user');
    },
    onError: (error: any) => {
      console.log(error);
      Notify('error', 'Gagal mengubah status akun', 'manage-user');
    },
  });

  const onTogleStatusBanned = async (id: string, is_banned: boolean) => {
    if (session.token) {
      mutation.mutate({
        id: id,
        is_banned: !is_banned,
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
          {['Nama', 'Peran', 'Terakhir Diubah']?.map((element, index) => (
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
            {element.role === 'STUDENT' && <Badge color="gray">MURID</Badge>}
            {element.role === 'TEACHER' && <Badge color="teal">GURU</Badge>}
            {element.role === 'ADMIN' && <Badge color="#000">ADMIN</Badge>}
          </MantineTable.Td>
          <MantineTable.Td
            width={100}
            styles={{ td: { whiteSpace: 'nowrap' } }}>
            {formatDate(element?.updated_at as Date)}
          </MantineTable.Td>
          <MantineTable.Td className="flex items-center gap-3 justify-evenly">
            <ModalForm
              formType="manage-user"
              id={element.id}
              title="Edit Akun Pengguna">
              <ActionIcon variant="light" size="lg" radius="md">
                <IconPencil size={18} />
              </ActionIcon>
            </ModalForm>
            <ModalConfirm
              btnTitle={`Ya, ${element.is_banned ? 'Unbanned' : 'Banned'}`}
              title={`${element.is_banned ? 'Unbanned' : 'Banned'} Akun`}
              text={`Apakah anda yakin ingin melakukan ${
                element.is_banned ? 'unbanned' : 'banned'
              } terhadap akun ini "${element.name}" ?`}
              type={element.is_banned ? 'success' : 'danger'}
              icon={
                element.is_banned ? (
                  <CgUnblock size={18} />
                ) : (
                  <MdBlock size={18} />
                )
              }
              onAction={() =>
                onTogleStatusBanned(element.id as string, element.is_banned)
              }>
              <ActionIcon
                variant="light"
                size="lg"
                color={element.is_banned ? 'green' : 'red'}
                radius="md">
                {element.is_banned ? (
                  <CgUnblock size={18} />
                ) : (
                  <MdBlock size={18} />
                )}
              </ActionIcon>
            </ModalConfirm>
          </MantineTable.Td>
        </MantineTable.Tr>
      ))}
    />
  );
}
