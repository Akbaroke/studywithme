import AuthLayout from '@/components/layouts/AuthLayout';
import cn from '@/helpers/cn';
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

  const hanldeSubmitForm = (values: FormType) => {
    console.log(values);
    setStatus('success');
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
            <Button variant="filled" size="xs" type="submit">
              Email Password Reset Link
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
