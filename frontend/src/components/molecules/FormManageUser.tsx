import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Badge, Button, Group, Radio, TextInput } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { ManageUserModel, RoleType, UserModel } from '@/models/userModel';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { validatorNotOnlySpace } from '@/helpers/validator';
import Notify from '../atoms/Notify';
import { getUserById, updateUser } from '@/services/manageUserService';

type Props = {
  id?: string;
  close: () => void;
};

export default function FormManageUser({ id, close }: Props) {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;

  const form = useForm<ManageUserModel>({
    validateInputOnChange: true,
    initialValues: {
      is_banned: false,
      role: null,
      name: '',
    },
    validate: {
      name: (value: string) =>
        value.length < 2
          ? 'Nama minimal harus 2 karakter.'
          : value.length > 40
          ? 'Nama maksimal 40 karakter.'
          : validatorNotOnlySpace(value)
          ? 'Nama tidak boleh hanya berisi spasi.'
          : null,
    },
  });

  useEffect(() => {
    if (id) {
      getUserById(id, session.token as string).then((data) => {
        form.setValues({
          name: data.name,
          role: data.role,
          is_banned: data.is_banned,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutation = useMutation({
    mutationFn: async ({
      newManageUser,
      token,
    }: {
      newManageUser: Partial<ManageUserModel>;
      token: string;
    }) => {
      const response = updateUser(id as string, newManageUser, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang memproses...', 'manage-user');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['manage-users'] });
      Notify('success', response, 'manage-user');
      close();
    },
    onError: (error: any) => {
      Notify('error', 'Gagal memperbarui data pengguna', 'manage-user');
      console.error('Error manage-user :', error);
    },
  });

  const handleSubmit = async () => {
    if (session.token) {
      mutation.mutate({
        newManageUser: form.values,
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Nama"
        required
        value={form.values.name}
        error={form.errors.name as string}
        onChange={(e) => form.setFieldValue('name', e.currentTarget.value)}
        readOnly={mutation.isPending}
      />
      <Radio.Group
        label="Peran"
        required
        value={form.values.role}
        readOnly={mutation.isPending}
        onChange={(e) => form.setFieldValue('role', e as RoleType)}>
        <div className="flex flex-col gap-3 mt-3 pl-3">
          <Radio value="STUDENT" label={<Badge color="gray">MURID</Badge>} />
          <Radio value="TEACHER" label={<Badge color="teal">GURU</Badge>} />
          <Radio value="ADMIN" label={<Badge color="#000">ADMIN</Badge>} />
        </div>
      </Radio.Group>
      <Button
        rightSection={<IconDeviceFloppy size={16} />}
        type="submit"
        radius="md"
        loading={mutation.isPending}
        disabled={!form.isValid()}
        styles={{
          root: {
            margin: '14px 30px',
          },
        }}>
        Simpan
      </Button>
    </form>
  );
}
