import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import {
  Button,
  Group,
  MultiSelect,
  Radio,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { UserModel } from '@/models/userModel';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { validatorNotOnlySpaceSymbolTrue } from '@/helpers/validator';
import {
  createContent,
  getContentById,
  updateContent,
} from '@/services/contentService';
import { ContentModel } from '@/models/contentModel';
import { getAllCategory } from '@/services/categoryService';
import { CategoryModel } from '@/models/categoryModel';
import Notify from '../atoms/Notify';

type Props = {
  id?: string;
  close: () => void;
};

type ContentForm = {
  id_content: string;
  title: string;
  description: string;
  is_premium: boolean;
  video_url: string;
  serial_number: number;
};

export default function FormDetailContent({ id, close }: Props) {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;

  const form = useForm<ContentForm>({
    validateInputOnChange: true,
    initialValues: {
      id_content: '',
      title: '',
      description: '',
      is_premium: false,
      video_url: '',
      serial_number: 0,
    },
    validate: {
      title: (value: string) =>
        value.length < 3
          ? 'Judul minimal harus 3 karakter.'
          : validatorNotOnlySpaceSymbolTrue(value)
          ? 'Judul tidak boleh hanya berisi spasi.'
          : null,
      description: (value: string) =>
        value.length < 10
          ? 'Deskripsi minimal harus 10 karakter.'
          : validatorNotOnlySpaceSymbolTrue(value)
          ? 'Deskripsi tidak boleh hanya berisi spasi.'
          : null,
    },
  });

  useEffect(() => {
    if (id) {
      getContentById(id, session.token!).then((data) => {
        form.setValues({
          title: data.title,
          description: data.description,
          is_premium: data.is_premium,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutation = useMutation({
    mutationFn: async ({
      newContent,
      token,
    }: {
      newContent: Partial<ContentModel | any>;
      token: string;
    }) => {
      const response = id
        ? await updateContent(id, newContent, token)
        : await createContent(newContent, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang memproses konten..', 'action-content');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      Notify('success', response, 'action-content');
      close();
    },
    onError: (error: any) => {
      Notify('error', 'Gagal memproses konten', 'action-content');
      console.error('Error creating content:', error);
    },
  });

  const handleSubmit = async () => {
    if (session.token) {
      mutation.mutate({
        newContent: form.values,
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Judul"
        required
        value={form.values.title}
        error={form.errors.title as string}
        onChange={(e) => form.setFieldValue('title', e.currentTarget.value)}
        readOnly={mutation.status === 'pending'}
      />
      <Textarea
        label="Deskripsi"
        required
        value={form.values.description}
        error={form.errors.description as string}
        onChange={(e) =>
          form.setFieldValue('description', e.currentTarget.value)
        }
        autosize
        minRows={2}
        maxRows={4}
      />
      <Radio.Group
        label="Premium"
        required
        value={form.values.is_premium ? 'true' : 'false'}
        readOnly={mutation.status === 'pending'}
        onChange={(e) =>
          form.setFieldValue('is_premium', e === 'true' ? true : false)
        }>
        <Group mt="xs">
          <Radio value="true" label="Ya" />
          <Radio value="false" label="Tidak" />
        </Group>
      </Radio.Group>
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
