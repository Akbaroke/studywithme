import Metadata from '@/components/atoms/Metadata';
import Notify from '@/components/atoms/Notify';
import AuthLayout from '@/components/layouts/AuthLayout';
import axios from '@/helpers/axios';
import cn from '@/helpers/cn';
import useCountdown from '@/hooks/useCountdown';
import {
  Anchor,
  Button,
  Card,
  FocusTrap,
  PinInput,
  Text,
  TextInput,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconAt } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type FormType = {
  email: string;
};

export default function VerifyOtp({ email }: { email: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [active, { toggle }] = useDisclosure(false);
  const { time, setTime } = useCountdown();
  const [otp, setOtp] = useState('');
  const [isErrorOtp, setIsErrorOtp] = useState(false);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Email tidak valid.'),
    },
  });

  const hanldeSubmitOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/users/verify-otp', {
        email: email,
        otp: otp,
      });
      console.log(response);
      Notify('success', 'Email berhasil terverifikasi');
      router.replace('/login');
    } catch (error: any) {
      setOtp('');
      setIsErrorOtp(true);
      Notify('error', error.response.data.errors, 'verify-otp');
      toggle();
      setTimeout(() => {
        setIsErrorOtp(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/users/resend-otp', {
        email: email,
      });
      setTime(60);
      setOtp('');
      console.log(response);
      Notify('success', 'Kirim ulang OTP berhasil.', 'resend-otp');
    } catch (error: any) {
      console.log(error);
      Notify('error', error.response.data.errors, 'resend-otp');
    } finally {
      setIsLoading(false);
    }
  };

  const hanldeSubmitForm = async (values: FormType) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/users/resend-otp', {
        email: values.email,
      });
      router.replace({
        query: { email: values.email },
      });
      console.log(response);
      toggle();
    } catch (error: any) {
      setErrorMessage(error.response.data.errors);
      console.log(error.response.data.errors);
      Notify('error', error.response.data.errors, 'resend-otp');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Metadata title="Verifikasi OTP" />
      {email ? (
        <Card shadow="sm" padding="lg" radius="lg" withBorder p={40}>
          <div className="flex flex-col gap-1 mb-4">
            <h1 className="text-lg font-bold">Verifikasi OTP</h1>
            <p className="text-xs">
              Silahkah cek email pesan masuk dan spam. Masukkan kode OTP yang
              telah diberikan!
            </p>
          </div>
          <div className="flex flex-col gap-8 mt-3">
            <FocusTrap active={active}>
              <PinInput
                type="number"
                placeholder="•"
                length={6}
                value={otp}
                error={isErrorOtp}
                readOnly={isLoading}
                onChange={(e) => setOtp(e)}
                oneTimeCode
                autoFocus
                className="w-max m-auto"
              />
            </FocusTrap>
            <div className="flex flex-col gap-3 justify-center items-center">
              <Button
                variant="filled"
                size="xs"
                fullWidth
                onClick={hanldeSubmitOtp}
                loading={isLoading}
                disabled={otp.length < 6}>
                Verify OTP
              </Button>
              <Text c="dimmed" size="xs" ta="center" mt={5}>
                Tidak menerima kode OTP ?{' '}
                {isLoading ? (
                  '...'
                ) : time ? (
                  `${time} detik`
                ) : (
                  <Anchor
                    size="xs"
                    component="button"
                    onClick={handleResendOtp}>
                    Kirim ulang
                  </Anchor>
                )}
              </Text>
            </div>
          </div>
        </Card>
      ) : (
        <Card shadow="sm" padding="lg" radius="lg" withBorder p={40}>
          <div className="flex flex-col gap-1 mb-4">
            <h1 className="text-lg font-bold">Verifikasi Email</h1>
            <p className="text-xs">
              Diperlukan verifikasi email. Cukup beri tahu kami alamat email
              Anda dan kami akan mengirimkan kode OTP untuk memastikan email
              anda aktif.
            </p>
          </div>
          {errorMessage !== '' && (
            <p className="text-xs mb-3 font-bold text-red-500">
              {errorMessage}
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
              <Button
                variant="outline"
                size="xs"
                onClick={() => router.push('/login')}>
                Batal
              </Button>
              <Button
                variant="filled"
                size="xs"
                type="submit"
                disabled={!form.isValid()}
                loading={isLoading}>
                Kirim Email
              </Button>
            </div>
          </form>
        </Card>
      )}
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { email } = ctx.query;

  return {
    props: {
      email: email ?? '',
    },
  };
};
