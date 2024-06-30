import Metadata from '@/components/atoms/Metadata';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Button, Card, PasswordInput, TextInput } from '@mantine/core';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconAt, IconLock } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

type FormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    initialValues: {
      email: email || '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
      password: (value) =>
        value.length < 8
          ? 'Password minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Password harus mengandung angka dan huruf.',
      confirmPassword: matchesField(
        'password',
        'Harus sama dengan kata sandi.'
      ),
    },
  });

  const hanldeSubmitForm = (values: FormType) => {
    console.log(values);
    form.setFieldError('email', 'Token reset password ini tidak valid.');
  };

  return (
    <AuthLayout>
      <Metadata title="Reset Password" />
      <Card shadow="sm" padding="lg" radius="lg" withBorder p={40}>
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-lg font-bold">Reset Password</h1>
          <p className="text-xs">
            Silakan masukkan password baru, pastikan isinya sama dengan password
            konfirmasi.
          </p>
        </div>
        <form onSubmit={form.onSubmit((values) => hanldeSubmitForm(values))}>
          <TextInput
            label="Email"
            placeholder="saya@email.com"
            type="email"
            required
            key={form.key('email')}
            value={form.values.email}
            {...form.getInputProps('email', { type: 'checkbox' })}
            radius="md"
            leftSection={<IconAt size={14} />}
            readOnly={isLoading}
          />
          <PasswordInput
            label="Password"
            placeholder=""
            required
            mt="md"
            key={form.key('password')}
            {...form.getInputProps('password', { type: 'checkbox' })}
            radius="md"
            leftSection={<IconLock size={14} />}
            readOnly={isLoading}
            visible={visible}
            onVisibilityChange={toggle}
          />
          <PasswordInput
            label="Konfirmasi Password"
            placeholder=""
            required
            mt="md"
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword', { type: 'checkbox' })}
            radius="md"
            leftSection={<IconLock size={14} />}
            readOnly={isLoading}
            visible={visible}
            onVisibilityChange={toggle}
          />
          <div className="flex justify-end items-center mt-5">
            <Button variant="filled" size="xs" type="submit">
              Reset Password
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, email } = ctx.query;

  return {
    props: {
      token,
      email,
    },
  };
};
