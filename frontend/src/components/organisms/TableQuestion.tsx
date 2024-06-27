import { UserModel } from '@/models/userModel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Table from '../molecules/Table';
import { ActionIcon, Table as MantineTable } from '@mantine/core';
import ModalForm from './ModalForm';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import ModalConfirm from './ModalConfirm';
import Notify from '../atoms/Notify';
import { formatDate } from '@/helpers/formatDate';
import { deleteQuestion, getAllQuestion } from '@/services/questionService';
import { QuestionModel } from '@/models/questionModel';

export default function TableQuestion() {
  const session: UserModel = useSession().data?.user as UserModel;
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<QuestionModel[]>({
    queryKey: ['questions'],
    queryFn: () => getAllQuestion(session.token as string),
  });

  const mutation = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      const response = await deleteQuestion(id, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang menghapus soal..', 'delete-question');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      Notify('success', response, 'delete-question');
    },
    onError: (error: any) => {
      console.log(error);
      Notify('error', 'Soal gagal dihapus', 'delete-question');
    },
  });

  const onDeleteQuestion = async (id: string) => {
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
          {['Soal', 'Total Pilihan', 'Terakhir Diubah']?.map(
            (element, index) => (
              <MantineTable.Th key={index}>{element}</MantineTable.Th>
            )
          )}
          <MantineTable.Th w={110}>Action</MantineTable.Th>
        </>
      }
      body={data?.map((element, index) => (
        <MantineTable.Tr key={index}>
          <MantineTable.Td>{index + 1}</MantineTable.Td>
          <MantineTable.Td
            style={{
              textAlign: 'left',
            }}>
            {element.question}
          </MantineTable.Td>
          <MantineTable.Td>{element.options.length}</MantineTable.Td>
          <MantineTable.Td
            width={100}
            styles={{ td: { whiteSpace: 'nowrap' } }}>
            {formatDate(element.updated_at)}
          </MantineTable.Td>
          <MantineTable.Td className="flex items-center gap-3 justify-evenly">
            <ModalForm
              formType="question"
              id={element.id}
              title="Edit Soal"
              size="lg">
              <ActionIcon variant="light" size="lg" radius="md">
                <IconPencil size={18} />
              </ActionIcon>
            </ModalForm>
            <ModalConfirm
              btnTitle="Ya, hapus"
              title="Hapus Soal"
              text={`Apakah anda yakin ingin menghapus soal ini ?`}
              type="danger"
              icon={<IconTrash size={18} />}
              onAction={() => onDeleteQuestion(element.id)}>
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
