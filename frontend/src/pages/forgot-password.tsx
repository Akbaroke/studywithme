import Notify from '@/components/atoms/Notify';
import AuthLayout from '@/components/layouts/AuthLayout';
import axios from '@/helpers/axios';
import cn from '@/helpers/cn';
import useCountdown from '@/hooks/useCountdown';
import { Button, Card, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconAt } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type FormType = {
  email: string;
};

type StatusType = 'success' | 'error' | '';

export default function ForgotPassword() {
  const router = useRouter();
  const { time, setTime } = useCountdown();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<StatusType>('');
  const form = useForm<FormType>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
    },
  });

  const hanldeSubmitForm = async (values: FormType) => {
    Notify('loading', 'Mengirimkan email...', 'forgot-password');
    setIsLoading(true);
    try {
      const response = await axios.post('/users/forgot-password', {
        email: values.email,
      });
      console.log(response);
      setStatus('success');
      Notify(
        'success',
        'Link reset password berhasil dikirmkan di email anda.',
        'forgot-password'
      );
      setTime(60);
    } catch (error: any) {
      console.log(error);
      Notify('error', error.response.data.errors, 'forgot-password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card shadow="sm" padding="lg" radius="lg" withBorder p={40}>
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-lg font-bold">Lupa password</h1>
          <p className="text-xs">
            Lupa password Anda? Tidak masalah. Cukup beri tahu kami alamat email
            Anda dan kami akan mengirimkan tautan untuk mereset password yang
            memungkinkan Anda untuk memilih yang baru.
          </p>
        </div>
        {status !== '' && (
          <p
            className={cn('text-xs mb-3 font-bold', {
              'text-green-500': status === 'success',
              'text-red-500': status === 'error',
            })}>
            {status === 'success' &&
              'Kami telah mengirimkan tautan reset password melalui email.'}
            {status === 'error' &&
              'Kami gagal memproses permintaan coba kembali.'}
          </p>
        )}
        <form onSubmit={form.onSubmit((values) => hanldeSubmitForm(values))}>
          <TextInput
            label="Email"
            placeholder="saya@email.com"
            type="email"
            required
            key={form.key('email')}
            {...form.getInputProps('email', { type: 'checkbox' })}
            radius="md"
            leftSection={<IconAt size={14} />}
            readOnly={isLoading}
          />
          <div className="flex justify-between items-center mt-5">
            <Button variant="outline" size="xs" onClick={() => router.back()}>
              Batal
            </Button>
            <Button
              variant="filled"
              size="xs"
              type="submit"
              disabled={!form.isValid() || !!time}
              loading={isLoading}>
              {!time ? 'Kirim Email' : `Kirim Ulang Dalam ${time} detik`}
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
