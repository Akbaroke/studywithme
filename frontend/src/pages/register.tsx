import {
  Button,
  Card,
  Checkbox,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAt, IconLock } from '@tabler/icons-react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { isEmail, useForm } from '@mantine/form';
import AuthLayout from '@/components/layouts/AuthLayout';
import TextLink from '@/components/atoms/TextLink';

type FormType = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Register() {
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: {
      email: isEmail('Email tidak valid.'),
      password: (value) =>
        value.length < 8
          ? 'Password minimal 8 karakter.'
          : /^(?=.*\d)(?=.*[a-zA-Z])/.test(value)
          ? null
          : 'Password harus mengandung angka dan huruf.',
    },
  });

  const hanldeSubmitForm = (values: FormType) => {
    console.log(values);
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
        <div className="flex gap-3 justify-between items-center [&>span]:border [&>span]:border-gray-100 [&>span]:w-full my-4 text-xs">
          <span></span>
          <p>Atau</p>
          <span></span>
        </div>
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
            key={form.key('password')}
            {...form.getInputProps('password', { type: 'checkbox' })}
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
                    text="Ketentuan
                  Layanan"
                  />{' '}
                  dan <TextLink href="/privacy" text="Kebijakan Privasi" />
                </p>
              }
              size="xs"
              key={form.key('remember')}
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
          </div>
          <div className="flex justify-between items-center">
            <TextLink href="/login" text="Sudah daftar?" />
            <Button variant="filled" size="xs" type="submit">
              Register
            </Button>
          </div>
        </form>
      </Card>
    </AuthLayout>
  );
}
