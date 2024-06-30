import { useEffect, useRef, useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  Input,
  NumberInput,
  Radio,
  Select,
  Tabs,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react';
import { UserModel } from '@/models/userModel';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { validatorNotOnlySpaceSymbolTrue } from '@/helpers/validator';
import { DetailContentModel } from '@/models/contentModel';
import Notify from '../atoms/Notify';
import {
  createDetailContent,
  deleteDetailContent,
  getDetailContentById,
  updateDetailContent,
} from '@/services/detailContentService';
import dynamic from 'next/dynamic';
import { getAllQuestion } from '@/services/questionService';
import { QuestionModel } from '@/models/questionModel';
import ModalConfirm from '../organisms/ModalConfirm';

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
  video_url: string | null;
  serial_number: number;
  questions: { id_question: string; score: number }[];
};

export default function FormDetailContent({ id, id_content, close }: Props) {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;
  const [meteriType, setMeteriType] = useState<'video' | 'quiz'>('video');
  const bankSoal = useQuery<QuestionModel[]>({
    queryKey: ['questions'],
    queryFn: () => getAllQuestion(session?.token as string),
  });

  const [videoDuration, setVideoDuration] = useState<number>(0);

  const form = useForm<DetailContentForm>({
    validateInputOnChange: true,
    initialValues: {
      id_content: '',
      title: '',
      description: '',
      is_premium: false,
      video_url: '',
      serial_number: 0,
      questions: [{ id_question: '', score: 0 }],
    },
    validate: {
      title: (value: string) =>
        value.length < 3
          ? 'Judul minimal harus 3 karakter.'
          : validatorNotOnlySpaceSymbolTrue(value)
          ? 'Judul tidak boleh hanya berisi spasi.'
          : null,
      description: (value: string) =>
        value.length < 5
          ? 'Deskripsi minimal harus 5 karakter.'
          : value.length > 10000
          ? 'Deskripsi maksimal 10.000 karakter.'
          : null,
      video_url: (value: any) =>
        meteriType === 'video'
          ? !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(value?.trim())
            ? 'URL video tidak valid.'
            : value.trim().length < 5
            ? 'URL video wajib di isi.'
            : null
          : null,
      questions: (value: any) =>
        meteriType === 'quiz'
          ? value.length < 1
            ? 'Soal wajib di isi.'
            : null
          : null,
    },
  });

  useEffect(() => {
    if (id) {
      getDetailContentById(id, session.token!).then((data) => {
        console.log(data);
        if (data.video_url) {
          setMeteriType('video');
          form.setValues({
            title: data.title,
            description: data.description.trim(),
            is_premium: data.is_premium,
            video_url: data.video_url,
            questions: [{ id_question: '', score: 0 }],
            serial_number: data.serial_number,
          });
        } else {
          setMeteriType('quiz');
          form.setValues({
            title: data.title,
            description: data.description.trim(),
            is_premium: data.is_premium,
            questions: data.questions as any[],
            video_url: null,
            serial_number: data.serial_number,
          });
        }
      });
    }
    form.setValues({
      id_content,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutation2 = useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      const response = await deleteDetailContent(id, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang menghapus konten..', 'delete-content');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['contents/' + id_content],
      });
      Notify('success', response, 'delete-content');
    },
    onError: (error: any) => {
      console.log(error);
      Notify('error', 'Konten gagal dihapus', 'delete-content');
    },
  });

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
      const formValue = {
        id_content: form.values.id_content,
        title: form.values.title,
        is_premium: form.values.is_premium,
        description: form.values.description.trim(),
        serial_number: form.values.serial_number,
      };
      mutation.mutate({
        newDetailContent:
          meteriType === 'video'
            ? {
                ...formValue,
                duration: videoDuration,
                video_url: form.values.video_url,
              }
            : {
                ...formValue,
                questions: form.values.questions,
              },
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };

  const addQuestion = () => {
    form.insertListItem('questions', { id_question: '', score: 0 });
  };

  const updateQuestion = (index: number, newOption: Partial<any>) => {
    form.setFieldValue(`questions.${index}`, {
      ...form.values.questions[index],
      ...newOption,
    });
  };

  const removeQuestion = (index: number) => {
    form.removeListItem('questions', index);
  };

  const onDeleteContent = async (id: string) => {
    if (session.token) {
      mutation2.mutate({
        id: id,
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
        required
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
      <NumberInput
        label="Nomer Urut Materi"
        required
        value={form.values.serial_number}
        error={form.errors.serial_number as string}
        onChange={(e) => form.setFieldValue('serial_number', e as number)}
        readOnly={mutation.status === 'pending'}
      />
      <Radio.Group
        label="Jenis Materi"
        required
        value={meteriType}
        readOnly={mutation.status === 'pending'}
        onChange={(value) =>
          setMeteriType(value === 'video' ? 'video' : 'quiz')
        }>
        <Group mt="xs">
          <Radio value="video" label="Video" />
          <Radio value="quiz" label="Quiz" />
        </Group>
      </Radio.Group>
      {meteriType === 'video' ? (
        <TextInput
          required={meteriType === 'video'}
          label="URL Video"
          placeholder="https://example.com/video.mp4"
          value={form.values.video_url as string}
          error={form.errors.video_url as string}
          onChange={(e) =>
            form.setFieldValue('video_url', e.currentTarget.value)
          }
          readOnly={mutation.status === 'pending'}
        />
      ) : (
        <div>
          <Input.Label required={meteriType === 'quiz'}>Soal Quiz</Input.Label>
          <Input.Description mb={10}>
            Soal diambil dari bank soal
          </Input.Description>
          <div className="flex flex-col gap-5">
            {form.values.questions.map((option, index) => (
              <Fieldset
                legend={`Soal ${index + 1}`}
                variant="filled"
                radius="md"
                styles={{
                  legend: {
                    background: 'black',
                    color: 'white',
                    padding: '2px 10px',
                    borderRadius: '10px',
                  },
                }}
                key={index}>
                <Select
                  label="Soal"
                  value={option.id_question}
                  onChange={(e) => updateQuestion(index, { id_question: e })}
                  styles={{
                    option: {
                      borderBottom: '1px solid #eaeaea',
                    },
                  }}
                  data={bankSoal?.data?.map((value) => ({
                    value: value.id,
                    label: value.question,
                  }))}
                  clearable
                  searchable
                />
                <div className="flex items-top gap-3 mt-2">
                  <NumberInput
                    label="Nilai"
                    placeholder="0"
                    className="flex-1"
                    value={option.score}
                    onChange={(e) => updateQuestion(index, { score: e })}
                  />
                  <ActionIcon
                    className="relative top-6"
                    variant="light"
                    size="lg"
                    color="red"
                    radius="md"
                    onClick={() => removeQuestion(index)}
                    disabled={form.values.questions.length === 1}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </div>
              </Fieldset>
            ))}
            {form.values.questions[
              form.values.questions.length - 1
            ]?.id_question?.trim() && (
              <Fieldset
                legend={`Soal ${form.values.questions.length + 1}`}
                variant="filled"
                radius="md"
                onClick={addQuestion}
                className="cursor-pointer"
                styles={{
                  legend: {
                    background: 'black',
                    color: 'white',
                    padding: '2px 10px',
                    borderRadius: '10px',
                  },
                }}>
                <div className="flex items-center justify-center py-2">
                  <IconPlus size={25} />
                </div>
              </Fieldset>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 py-4 px-8">
        {id && (
          <ModalConfirm
            btnTitle="Ya, hapus"
            title="Hapus Materi"
            text={`Apakah anda yakin ingin menghapus materi ini "${form.values.title}" ?`}
            type="danger"
            icon={<IconTrash size={18} />}
            onAction={() => onDeleteContent(id)}>
            <ActionIcon variant="light" size="lg" color="red" radius="md">
              <IconTrash size={18} />
            </ActionIcon>
          </ModalConfirm>
        )}
        <Button
          fullWidth
          rightSection={<IconDeviceFloppy size={16} />}
          type="submit"
          radius="md"
          loading={mutation.status === 'pending'}
          disabled={!form.isValid()}>
          Simpan
        </Button>
      </div>
      <div style={{ display: 'none' }}>
        <ReactPlayer
          url={form.values.video_url as string}
          onDuration={setVideoDuration}
        />
      </div>
    </form>
  );
}
