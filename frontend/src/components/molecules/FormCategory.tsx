import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, NumberInput, TextInput } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import axios from '@/helpers/axios';
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from '@/services/categoryService';
import { UserModel } from '@/models/userModel';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryModel } from '@/models/categoryModel';
import { validatorNotOnlySpace } from '@/helpers/validator';

type Props = {
  id?: string;
  close: () => void;
};

type CategoryForm = {
  name: string;
};

export default function FormCategory({ id, close }: Props) {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;

  const form = useForm<CategoryForm>({
    validateInputOnChange: true,
    initialValues: {
      name: '',
    },
    validate: {
      name: (value: string) =>
        value.length < 2
          ? 'Nama minimal harus 2 karakter.'
          : validatorNotOnlySpace(value)
          ? 'Nama tidak boleh hanya berisi spasi.'
          : null,
    },
  });

  useEffect(() => {
    if (id) {
      getCategoryById(id).then((data) => {
        form.setValues({ name: data.name });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutation = useMutation({
    mutationFn: ({
      newCategory,
      token,
    }: {
      newCategory: Partial<CategoryModel>;
      token: string;
    }) =>
      id
        ? updateCategory(id, newCategory, token)
        : createCategory(newCategory, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      close();
    },
    onError: (error: any) => {
      console.error('Error creating category:', error);
    },
  });

  const handleSubmit = async () => {
    if (session.token) {
      mutation.mutate({
        newCategory: form.values,
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };
  console.log(mutation.status);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Nama"
        required
        value={form.values.name}
        error={form.errors.name as string}
        onChange={(e) => form.setFieldValue('name', e.currentTarget.value)}
        readOnly={mutation.status === 'pending'}
      />
      <Button
        rightSection={<IconDeviceFloppy size={16} />}
        type="submit"
        radius="md"
        loading={mutation.status === 'pending'}
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