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
  thumbnail: string;
  title: string;
  description: string;
  is_premium: boolean;
  categories: string[];
};

export default function FormContent({ id, close }: Props) {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery<
    CategoryModel[]
  >({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const form = useForm<ContentForm>({
    validateInputOnChange: true,
    initialValues: {
      thumbnail: '',
      title: '',
      description: '',
      is_premium: false,
      categories: [],
    },
    validate: {
      title: (value: string) =>
        value.length < 3
          ? 'Judul minimal harus 3 karakter.'
          : value.length > 250
          ? 'Deskripsi maksimal 250 karakter.'
          : validatorNotOnlySpaceSymbolTrue(value)
          ? 'Judul tidak boleh hanya berisi spasi.'
          : null,
      description: (value: string) =>
        value.length > 10000 ? 'Deskripsi maksimal 10.000 karakter.' : null,
      categories: (value) =>
        value.length > 0 ? null : 'Pilih minimal 1 kategori.',
    },
  });

  useEffect(() => {
    if (id) {
      getContentById(id, session.token!).then((data) => {
        form.setValues({
          thumbnail: data.thumbnail ?? '',
          title: data.title,
          description: data.description.trim(),
          is_premium: data.is_premium,
          categories: data.categories.map((category) => category.id),
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
        newContent: {
          ...form.values,
          description: form.values.description.trim(),
        },
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
        label="Judul"
        required
        value={form.values.title}
        error={form.errors.title as string}
        onChange={(e) => form.setFieldValue('title', e.currentTarget.value)}
        readOnly={mutation.status === 'pending'}
      />
      <Textarea
        label="Deskripsi"
        value={form.values.description}
        error={form.errors.description as string}
        onChange={(e) =>
          form.setFieldValue('description', e.currentTarget.value)
        }
        readOnly={mutation.status === 'pending'}
        autosize
        minRows={2}
        maxRows={4}
      />
      {/* <Radio.Group
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
      </Radio.Group> */}
      <MultiSelect
        label="Kategori"
        required
        placeholder={isLoadingCategories ? 'Tunggu...' : ''}
        data={dataCategories?.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        value={form.values.categories}
        error={form.errors.categories as string}
        onChange={(e) => form.setFieldValue('categories', e)}
        disabled={isLoadingCategories}
        readOnly={mutation.status === 'pending'}
        clearable
      />
      <TextInput
        label="URL Sampul"
        placeholder="https://example.com/image.jpg"
        value={form.values.thumbnail}
        error={form.errors.thumbnail as string}
        onChange={(e) => form.setFieldValue('thumbnail', e.currentTarget.value)}
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
