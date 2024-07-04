import Metadata from '@/components/atoms/Metadata';
import Notify from '@/components/atoms/Notify';
import AuthLayout from '@/components/layouts/AuthLayout';
import axios from '@/helpers/axios';
import { validatorPassword } from '@/helpers/validator';
import { Button, Card, PasswordInput, TextInput } from '@mantine/core';
import { matchesField, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconAt, IconLock } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type FormType = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function ForgotPassword({ token }: { token: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: {
      newPassword: (value) =>
        value.length < 8
          ? 'Password minimal 8 karakter.'
          : validatorPassword(value)
          ? null
          : 'Password harus mengandung angka dan huruf.',
      confirmNewPassword: matchesField(
        'newPassword',
        'Harus sama dengan kata sandi.'
      ),
    },
  });

  const hanldeSubmitForm = async (values: FormType) => {
    Notify('loading', 'Mendaftarkan akun...', 'reset-password');
    setIsLoading(true);
    try {
      const response = await axios.post('/users/reset-password', {
        token: token,
        newPassword: values.newPassword,
      });
      Notify('success', 'Password berhasil diperbarui.', 'reset-password');
      // console.log(response);
      router.replace('/login');
    } catch (error: any) {
      // console.log(error);
      if (error.response.data.errors === 'jwt malformed') {
        router.replace('/login');
        Notify(
          'error',
          'Reset password gagal, token tidak sah.',
          'reset-password'
        );
      } else {
        Notify('error', error.response.data.errors, 'reset-password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Metadata title="Reset Password" />
      <Card shadow="sm" padding="lg" radius="lg" withBorder p={40}>
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-lg font-bold">Reset Password</h1>
          <p className="text-xs">
            Silahkan ubah password baru kamu. Pastikan password baru kamu mudah
            diingat.
          </p>
        </div>
        <form onSubmit={form.onSubmit((values) => hanldeSubmitForm(values))}>
          <PasswordInput
            label="Password Baru"
            placeholder=""
            required
            key={form.key('newPassword')}
            {...form.getInputProps('newPassword', { type: 'input' })}
            radius="md"
            leftSection={<IconLock size={14} />}
            readOnly={isLoading}
            visible={visible}
            onVisibilityChange={toggle}
          />
          <PasswordInput
            label="Konfirmasi Password Baru"
            placeholder=""
            required
            mt="md"
            key={form.key('confirmNewPassword')}
            {...form.getInputProps('confirmNewPassword', { type: 'input' })}
            radius="md"
            leftSection={<IconLock size={14} />}
            readOnly={isLoading}
            visible={visible}
            onVisibilityChange={toggle}
          />
          <div className="flex justify-between items-center mt-5">
            <Button
              variant="outline"
              size="xs"
              onClick={() => router.replace('/login')}>
              Batal
            </Button>
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
  const { token } = ctx.query;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: token ?? '',
    },
  };
};
