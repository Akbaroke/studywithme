import {
  Button,
  Card,
  Checkbox,
  Divider,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { isEmail, matchesField, useForm } from '@mantine/form';
import AuthLayout from '@/components/layouts/AuthLayout';
import TextLink from '@/components/atoms/TextLink';
import axios from '@/helpers/axios';
import { validatorNotOnlySpace, validatorPassword } from '@/helpers/validator';
import Notify from '@/components/atoms/Notify';
import { useRouter } from 'next/router';

type FormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termAndPrivacy: boolean;
};

export default function Register() {
  const router = useRouter();
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termAndPrivacy: false,
    },
    validate: {
      name: (value) =>
        value.length < 8
          ? 'Nama minimal harus 8 karakter.'
          : validatorNotOnlySpace(value)
          ? 'Nama tidak boleh hanya berisi spasi.'
          : null,
      email: isEmail('Email tidak valid.'),
      password: (value) =>
        value.length < 8
          ? 'Password minimal 8 karakter.'
          : validatorPassword(value)
          ? null
          : 'Password harus mengandung angka dan huruf.',
      confirmPassword: matchesField(
        'password',
        'Harus sama dengan kata sandi.'
      ),
      termAndPrivacy: (value) =>
        value ? null : 'Anda harus menyetujui syarat dan ketentuan.',
    },
  });

  const hanldeSubmitForm = async (values: FormType) => {
    Notify('loading', 'Mendaftarkan akun...', 'register');
    setIsLoading(true);
    try {
      const response = await axios.post('/users', {
        email: values.email,
        password: values.password,
        name: values.name,
      });
      Notify('success', 'Akun anda telah dibuat. Silakan verifikasi email.', 'register');
      router.push({
        pathname: '/verify-otp',
        query: { email: values.email },
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
      Notify('error', error.response.data.errors, 'register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card shadow="sm" padding="lg" radius="lg" withBorder p={40}>
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-lg font-bold">Register</h1>
          <p className="text-xs">Silakan masuk jika Anda sudah membuat akun.</p>
        </div>
        <Button
          leftSection={<FcGoogle size={12} />}
          variant="default"
          radius="md">
          <p className="text-xs">Register dengan google</p>
        </Button>
        <Divider my="xs" label="Atau" labelPosition="center" mt={20} />
        <form onSubmit={form.onSubmit((values) => hanldeSubmitForm(values))}>
          <TextInput
            label="Nama"
            placeholder="Jhon Doe"
            type="text"
            required
            key={form.key('name')}
            {...form.getInputProps('name', { type: 'input' })}
            radius="md"
            leftSection={<IconUser size={14} />}
            readOnly={isLoading}
          />
          <TextInput
            label="Email"
            placeholder="saya@email.com"
            type="email"
            required
            mt="md"
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
          <PasswordInput
            label="Konfirmasi Password"
            placeholder=""
            required
            mt="md"
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword', { type: 'input' })}
            radius="md"
            leftSection={<IconLock size={14} />}
            readOnly={isLoading}
            visible={visible}
            onVisibilityChange={toggle}
          />
          <div className="flex justify-between items-center my-5">
            <Checkbox
              label={
                <p>
                  Saya setuju dengan{' '}
                  <TextLink
                    href="/terms"
                    target="_blank"
                    text="Ketentuan
                  Layanan"
                  />{' '}
                  dan{' '}
                  <TextLink
                    href="/privacy"
                    target="_blank"
                    text="Kebijakan Privasi"
                  />
                </p>
              }
              size="xs"
              key={form.key('termAndPrivacy')}
              {...form.getInputProps('termAndPrivacy', { type: 'checkbox' })}
            />
          </div>
          <div className="flex justify-between items-center">
            <TextLink href="/login" text="Sudah daftar?" />
            <Button
              variant="filled"
              size="xs"
              type="submit"
              loading={isLoading}
              disabled={!form.isValid()}>
              Register
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
