import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import {
  Button,
  TextInput,
  Checkbox,
  Input,
  ActionIcon,
  Tooltip,
  Textarea,
} from '@mantine/core';
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react';
import { UserModel } from '@/models/userModel';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Notify from '../atoms/Notify';
import { QuestionModel, OptionModel } from '@/models/questionModel';
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
} from '@/services/questionService';

type Props = {
  id?: string;
  close: () => void;
};

type QuestionForm = {
  question: string;
  options: OptionModel[];
};

export default function FormQuestion({ id, close }: Props) {
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;

  const form = useForm<QuestionForm>({
    validateInputOnChange: true,
    initialValues: {
      question: '',
      options: [{ option: '', is_answer: false }],
    },
    validate: {
      question: (value: string) =>
        value.length < 5
          ? 'Soal minimal harus 5 karakter.'
          : value.length > 10000
          ? 'Soal maksimal 10.000 karakter.'
          : null,
      options: {
        option: (value: string) =>
          value.length < 1
            ? 'Pilihan minimal harus 1 karakter.'
            : value.length > 5000
            ? 'Pilihan maksimal 5.000 karakter.'
            : null,
      },
    },
  });

  useEffect(() => {
    if (id) {
      getQuestionById(id, session.token as string).then((data) => {
        form.setValues({
          question: data.question,
          options: data.options,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutation = useMutation({
    mutationFn: async ({
      newQuestion,
      token,
    }: {
      newQuestion: Partial<QuestionModel>;
      token: string;
    }) => {
      const response = id
        ? updateQuestion(id, newQuestion, token)
        : createQuestion(newQuestion, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Sedang memproses soal..', 'action-questions');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      Notify('success', response, 'action-questions');
      close();
    },
    onError: (error: any) => {
      Notify('error', 'Gagal memproses soal', 'action-questions');
      console.error('Error creating questions:', error);
    },
  });

  const handleSubmit = async () => {
    if (session.token) {
      mutation.mutate({
        newQuestion: {
          ...form.values,
          question: form.values.question.trim(),
        },
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };

  const addOption = () => {
    form.insertListItem('options', {
      option: '',
      is_answer: false,
    });
  };

  const updateOption = (index: number, newOption: Partial<OptionModel>) => {
    form.setFieldValue(`options.${index}`, {
      ...form.values.options[index],
      ...newOption,
    });
  };

  const removeOption = (index: number) => {
    form.removeListItem('options', index);
  };

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={form.onSubmit(handleSubmit)}>
      <Textarea
        label="Soal"
        required
        value={form.values.question}
        error={form.errors.question as string}
        readOnly={mutation.status === 'pending'}
        onChange={(e) => form.setFieldValue('question', e.currentTarget.value)}
        autosize
        minRows={2}
        maxRows={4}
      />
      <Input.Label required>Pilihan Jawaban</Input.Label>
      {form.values.options.map((option, index) => (
        <div
          key={index}
          className="flex gap-2 items-center"
          data-aos={index > 0 && 'fade-up'}>
          <Tooltip
            label="Jawaban Benar"
            withArrow
            openDelay={300}
            transitionProps={{ transition: 'pop', duration: 300 }}>
            <Checkbox
              checked={option.is_answer}
              onChange={(e) =>
                updateOption(index, { is_answer: e.currentTarget.checked })
              }
              size="sm"
              radius="md"
            />
          </Tooltip>
          <TextInput
            className="flex-1"
            placeholder={`Pilihan ${index + 1}`}
            value={option.option}
            onChange={(e) =>
              updateOption(index, { option: e.currentTarget.value })
            }
            required
          />
          <ActionIcon
            variant="light"
            size="lg"
            color="red"
            radius="md"
            onClick={() => removeOption(index)}
            disabled={form.values.options.length === 1}>
            <IconTrash size={18} />
          </ActionIcon>
        </div>
      ))}
      <div className="flex justify-end items-center">
        {form.values.options[form.values.options.length - 1].option.trim() !==
          '' && (
          <ActionIcon
            variant="light"
            size="lg"
            radius="md"
            onClick={addOption}
            data-aos="zoom-out">
            <IconPlus size={18} />
          </ActionIcon>
        )}
      </div>
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
