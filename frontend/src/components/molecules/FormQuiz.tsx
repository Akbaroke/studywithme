import { useForm } from '@mantine/form';
import { Button, Radio } from '@mantine/core';
import {
  IconArrowNarrowRight,
  IconCheck,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import { QuizQuestionModel } from '@/models/questionModel';
import cn from '@/helpers/cn';
import ModalConfirm from '../organisms/ModalConfirm';
import { useEffect } from 'react';

export type AnswerType = {
  id_question: string;
  id_answer: string;
  score: number;
};

type Props = {
  currentQuestionNumber: number;
  question: QuizQuestionModel;
  nextQuestion: (answer: AnswerType, questionNumber: number) => void;
  prevQuestion: (questionNumber: number) => void;
  totalQuestion: number;
  lastQuestion: (answer: AnswerType) => void;
  prevAnswer?: string;
};

type QuizForm = {
  answer: string;
};

export default function FormQuiz({
  currentQuestionNumber,
  question,
  nextQuestion,
  prevQuestion,
  totalQuestion,
  lastQuestion,
  prevAnswer,
}: Props) {
  const form = useForm<QuizForm>({
    validateInputOnChange: true,
    initialValues: {
      answer: '',
    },
    validate: {
      answer: (value: string) =>
        value === '' ? 'Harus di pilih jawaban yang menurut anda benar.' : null,
    },
  });

  useEffect(() => {
    if (prevAnswer) {
      console.log(prevAnswer);
      form.setValues({
        answer: prevAnswer,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevAnswer]);

  const handleSubmit = () => {
    const getAnswer = question.options.find(
      (op) => op.id === form.values.answer
    );
    if (currentQuestionNumber === totalQuestion) {
      lastQuestion({
        id_question: question.id_question,
        id_answer: form.values.answer as string,
        score: getAnswer?.is_answer ? question.score : 0,
      });
    } else {
      nextQuestion(
        {
          id_question: question.id_question,
          id_answer: form.values.answer as string,
          score: getAnswer?.is_answer ? question.score : 0,
        },
        currentQuestionNumber
      );
    }
    form.reset();
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">
        Soal No.{currentQuestionNumber}
      </h1>
      <p className="text-lg font-medium break-words whitespace-pre-line">
        {question.question}
      </p>
      <form
        className="flex flex-col gap-7 mt-2"
        onSubmit={form.onSubmit(handleSubmit)}>
        <Radio.Group
          required
          value={form.values.answer}
          onChange={(value) => form.setFieldValue('answer', value)}>
          <div className="flex flex-col gap-4 px-5">
            {question.options.map((value, index) => (
              <Radio
                styles={{
                  label: {
                    fontWeight: 500,
                    fontSize: 16,
                  },
                }}
                value={value?.id as string}
                label={value.option}
                key={index}
              />
            ))}
          </div>
        </Radio.Group>
        <div className="flex justify-between items-center mt-5">
          <Button
            className={cn({
              invisible: currentQuestionNumber === 1,
            })}
            onClick={() => prevQuestion(currentQuestionNumber)}
            type="button"
            variant="default"
            radius="md"
            styles={{
              root: {
                margin: '14px 30px',
              },
            }}>
            Sebelumnya
          </Button>
          {currentQuestionNumber === totalQuestion ? (
            <ModalConfirm
              btnTitle="Ya, Selesai"
              title="Selesaikan Soal"
              text={`Apakah anda yakin ingin menyelesaikan semua soal ?`}
              type="info"
              icon={<IconCheck size={18} />}
              onAction={handleSubmit}>
              <Button
                radius="md"
                disabled={!form.isValid()}
                styles={{
                  root: {
                    margin: '14px 30px',
                  },
                }}>
                Selesai
              </Button>
            </ModalConfirm>
          ) : (
            <Button
              rightSection={<IconArrowNarrowRight size={16} />}
              type="submit"
              radius="md"
              disabled={!form.isValid()}
              styles={{
                root: {
                  margin: '14px 30px',
                },
              }}>
              Selanjutnya
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
