import Logo from '@/components/atoms/Logo';
import { Button, Card, Input, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAt } from '@tabler/icons-react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function login() {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <div className="w-dvw h-dvh grid place-items-center">
      <div className="max-w-[600px]">
        <Logo />
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <h1>Login</h1>
          <p>
            Selamat datang kembali, masukkan kredensial Anda untuk melanjutkan.
          </p>
          <Button leftSection={<FcGoogle size={14} />} variant="default">
            Masuk dengan akun google
          </Button>
          <div className="flex gap-3 justify-between items-center [&>span]:border [&>span]:border-opacity-80 [&>span]:w-full">
            <span></span>
            <p>Atau</p>
            <span></span>
          </div>
          <Input placeholder="Your email" leftSection={<IconAt size={16} />} />
          <PasswordInput
            label="Password"
            defaultValue="secret"
            visible={visible}
            onVisibilityChange={toggle}
          />
          <PasswordInput
            label="Confirm password"
            defaultValue="secret"
            visible={visible}
            onVisibilityChange={toggle}
          />
        </Card>
      </div>
    </div>
  );
}
