import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  Button,
  Group,
  NumberInput,
  Radio,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { UserModel } from '@/models/userModel';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { validatorNotOnlySpaceSymbolTrue } from '@/helpers/validator';
import { DetailContentModel } from '@/models/contentModel';
import Notify from '../atoms/Notify';
import {
  createDetailContent,
  getDetailContentById,
  updateDetailContent,
} from '@/services/detailContentService';
import dynamic from 'next/dynamic';

// Load ReactPlayer dynamically to ensure server-side rendering is handled properly
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

type Props = {
  id?: string;
  id_content?: string;
  close: () => void;
};

type DetailContentForm = {
  id_content: string;
  title: string;
  description: string;
  is_premium: boolean;
  video_url: string;
  serial_number: number;
};

export default function FormDetailContent({ id, id_content, close }: Props) {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;

  const [videoDuration, setVideoDuration] = useState<number>(0);
  console.log(videoDuration);

  const form = useForm<DetailContentForm>({
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
        value.length < 10 ? 'Deskripsi minimal harus 10 karakter.' : null,
    },
  });

  useEffect(() => {
    if (id) {
      getDetailContentById(id, session.token!).then((data) => {
        form.setValues({
          title: data.title,
          description: data.description.trim(),
          is_premium: data.is_premium,
          video_url: data.video_url,
          serial_number: data.serial_number,
        });
      });
    }
    form.setValues({
      id_content,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutation = useMutation({
    mutationFn: async ({
      newDetailContent,
      token,
    }: {
      newDetailContent: Partial<DetailContentModel | any>;
      token: string;
    }) => {
      const response = id
        ? await updateDetailContent(id, newDetailContent, token)
        : await createDetailContent(newDetailContent, token);
      return response;
    },
    onMutate: () => {
      Notify(
        'loading',
        'Sedang memproses detail konten..',
        'action-detail-content'
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['contents/' + id_content],
      });
      Notify('success', response, 'action-detail-content');
      close();
    },
    onError: (error: any) => {
      Notify('error', 'Gagal memproses detail konten', 'action-detail-content');
      console.error('Error creating content:', error);
    },
  });

  const handleSubmit = async () => {
    if (session.token) {
      mutation.mutate({
        newDetailContent: { ...form.values, duration: videoDuration },
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
      <TextInput
        label="URL Video"
        placeholder="https://example.com/video.mp4"
        value={form.values.video_url}
        error={form.errors.video_url as string}
        onChange={(e) => form.setFieldValue('video_url', e.currentTarget.value)}
        readOnly={mutation.status === 'pending'}
      />
      <NumberInput
        label="Nomer Urut Materi"
        required
        value={form.values.serial_number}
        error={form.errors.serial_number as string}
        onChange={(e) => form.setFieldValue('serial_number', e as number)}
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
      <div style={{ display: 'none' }}>
        <ReactPlayer
          url={form.values.video_url}
          onDuration={setVideoDuration}
        />
      </div>
    </form>
  );
}
