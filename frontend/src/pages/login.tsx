import { Button, Card, Divider, PasswordInput, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAt, IconLock } from '@tabler/icons-react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { isEmail, useForm } from '@mantine/form';
import AuthLayout from '@/components/layouts/AuthLayout';
import TextLink from '@/components/atoms/TextLink';
import { validatorPassword } from '@/helpers/validator';
import Notify from '@/components/atoms/Notify';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Metadata from '@/components/atoms/Metadata';

type FormType = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
      password: (value) =>
        value.length < 8
          ? 'Password minimal 8 karakter.'
          : validatorPassword(value)
          ? null
          : 'Password harus mengandung angka dan huruf.',
    },
  });

  const callbackUrl: any = router.query.callbackUrl || '/';
  const hanldeSubmitForm = async (values: FormType) => {
    Notify('loading', 'Memverifikasi akun...', 'login');
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });
      if (res?.ok) {
        Notify('success', 'Akun anda telah dibuat. Silakan login.', 'login');
        router.replace(callbackUrl);
      } else {
        switch (
          Number(res?.error?.replace('Request failed with status code ', ''))
        ) {
          case 401:
            Notify('error', 'Email atau password salah.', 'login');
            break;
          case 402:
            Notify('error', 'Email belum di verifikasi.', 'login');
            router.push({
              pathname: '/verify-otp',
              query: { email: values.email },
            });
            break;
          default:
            Notify('error', 'Gagal login.', 'login');
            break;
        }
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Metadata title="Login" />
      <Card shadow="sm" padding="lg" radius="lg" withBorder p={40}>
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-lg font-bold">Login</h1>
          <p className="text-xs">
            Selamat datang kembali, masukkan kredensial Anda untuk melanjutkan.
          </p>
        </div>
        <Button
          leftSection={<FcGoogle size={12} />}
          onClick={() =>
            Notify(
              'error',
              'Sementara tidak tersedia, fitur dalam tahap pengembangan',
              'login'
            )
          }
          variant="default"
          radius="md">
          <p className="text-xs">Masuk dengan google</p>
        </Button>
        <Divider my="xs" label="Atau" labelPosition="center" mt={20} />
        <form onSubmit={form.onSubmit((values) => hanldeSubmitForm(values))}>
          <TextInput
            label="Email"
            placeholder="saya@email.com"
            type="email"
            required
            key={form.key('email')}
            {...form.getInputProps('email', { type: 'input' })}
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
            {...form.getInputProps('password', { type: 'input' })}
            radius="md"
            leftSection={<IconLock size={14} />}
            readOnly={isLoading}
            visible={visible}
            onVisibilityChange={toggle}
          />
          <div className="flex justify-end items-center my-5">
            <TextLink href="/forgot-password" text="Lupa password?" />
          </div>
          <div className="flex justify-between items-center">
            <TextLink href="/register" text="Register" />
            <Button
              variant="filled"
              size="xs"
              type="submit"
              loading={isLoading}
              disabled={!form.isValid()}>
              Log in
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
