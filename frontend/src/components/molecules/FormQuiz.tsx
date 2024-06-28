import { useForm } from '@mantine/form';
import { Button, Radio } from '@mantine/core';
import { IconArrowNarrowRight, IconCheck } from '@tabler/icons-react';
import { QuizQuestionModel } from '@/models/questionModel';
import cn from '@/helpers/cn';
import ModalConfirm from '../organisms/ModalConfirm';
import { useEffect } from 'react';

export type AnswerType = {
  question_number: number;
  id_question: string;
  id_answer: string;
  score: number;
};

type Props = {
  currentQuestionNumber: number;
  setCurrentQuestionNumber: (value: number) => void;
  question: QuizQuestionModel;
  totalQuestion: number;
  answers: AnswerType[];
  setAnswers: (value: AnswerType[]) => void;
  saveAnswer: (answers: AnswerType[]) => void;
};

type QuizForm = {
  answer: string;
};

export default function FormQuiz({
  currentQuestionNumber,
  setCurrentQuestionNumber,
  question,
  totalQuestion,
  answers,
  setAnswers,
  saveAnswer,
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
    const existingAnswer = answers.find(
      (a) => a.question_number === currentQuestionNumber
    );
    if (existingAnswer) {
      form.setFieldValue('answer', existingAnswer.id_answer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionNumber, answers]);

  const handleSubmit = (values: QuizForm) => {
    const answer: AnswerType = {
      question_number: currentQuestionNumber,
      id_question: question.id_question,
      id_answer: values.answer,
      score: question.options.find((opt) => opt.id === values.answer)?.is_answer
        ? question.score
        : 0,
    };

    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (a) => a.question_number === currentQuestionNumber
    );

    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = answer;
    } else {
      updatedAnswers.push(answer);
    }

    setAnswers(updatedAnswers);

    if (currentQuestionNumber === totalQuestion) {
      saveAnswer(updatedAnswers);
    } else {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }

    form.reset();
  };

  const prevQuestion = (questionNumber: number) => {
    if (questionNumber > 1) {
      setCurrentQuestionNumber(questionNumber - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-xl font-semibold">
        Soal No.{currentQuestionNumber}
      </h1>
      <p className="text-sm md:text-md font-medium break-words whitespace-pre-line">
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
                    fontSize: 14,
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
            size="xs"
            radius="md">
            Sebelumnya
          </Button>
          {currentQuestionNumber === totalQuestion ? (
            <ModalConfirm
              btnTitle="Ya, Selesai"
              title="Selesaikan Soal"
              text={`Apakah anda yakin ingin menyelesaikan semua soal ?`}
              type="info"
              icon={<IconCheck size={18} />}
              onAction={form.onSubmit(handleSubmit)}>
              <Button radius="md" size="xs" disabled={!form.isValid()}>
                Selesai
              </Button>
            </ModalConfirm>
          ) : (
            <Button
              rightSection={<IconArrowNarrowRight size={16} />}
              type="submit"
              radius="md"
              disabled={!form.isValid()}
              size="xs">
              Selanjutnya
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
