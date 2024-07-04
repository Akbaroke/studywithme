import {
  AppShell,
  Badge,
  Burger,
  Button,
  Container,
  Group,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import Logo from '../atoms/Logo';
import Footer from '../molecules/Footer';
import { signOut, useSession } from 'next-auth/react';
import { UserModel } from '@/models/userModel';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { images } from '@/assets';

type Props = {
  children: React.ReactNode;
};

interface LinkData {
  label: string;
  href: string;
}

export default function Appshell({ children }: Props) {
  const router = useRouter();
  const rootPath = router.pathname;
  const [opened, { toggle }] = useDisclosure();
  const session: UserModel = useSession().data?.user as UserModel;

  const isActivePage = (href: string) => rootPath === href;

  const navLinkData: LinkData[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Kategori',
      href: '/categories',
    },
    {
      label: 'Tentang Kami',
      href: '/about',
    },
  ];

  if (session?.role === 'TEACHER' || session?.role === 'ADMIN') {
    navLinkData.push({
      label: 'Mengelola',
      href: '/manage',
    });
  }

  return pathNotNavbar.includes(rootPath) ? (
    children
  ) : (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group visibleFrom="sm">
              <Logo />
            </Group>
            <Group hiddenFrom="sm" flex="1">
              <Logo className="ml-auto" />
            </Group>
            <Group ml="xl" gap={20} visibleFrom="sm">
              {navLinkData.map((data, index) =>
                isActivePage(data.href) ? (
                  <Link href={data.href} key={index}>
                    <Badge
                      variant="light"
                      color="#000"
                      styles={{
                        root: {
                          textTransform: 'capitalize',
                        },
                      }}>
                      {data.label}
                    </Badge>
                  </Link>
                ) : (
                  <Link href={data.href} key={index}>
                    <Badge
                      variant="transparent"
                      color="#000"
                      styles={{
                        root: {
                          textTransform: 'capitalize',
                        },
                      }}>
                      {data.label}
                    </Badge>
                  </Link>
                )
              )}
              <div className="flex gap-2">
                {session?.token ? (
                  <Button
                    variant="outline"
                    size="xs"
                    radius="md"
                    color="#000"
                    onClick={() => signOut()}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="xs"
                      radius="md"
                      color="#000"
                      onClick={() => router.push('/login')}>
                      Login
                    </Button>
                    <Button
                      variant="filled"
                      size="xs"
                      radius="md"
                      color="#000"
                      onClick={() => router.push('/register')}>
                      Register
                    </Button>
                  </>
                )}
              </div>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4} className="flex flex-col justify-between">
        <div className="flex flex-col gap-2 p-3">
          {navLinkData.map((data, index) =>
            isActivePage(data.href) ? (
              <Button
                key={index}
                variant="light"
                color="#000"
                radius="md"
                h={60}
                onClick={() => {
                  router.push(data.href);
                  toggle();
                }}>
                {data.label}
              </Button>
            ) : (
              <Button
                key={index}
                variant="transparent"
                color="#000"
                radius="md"
                h={60}
                onClick={() => {
                  router.push(data.href);
                  toggle();
                }}>
                {data.label}
              </Button>
            )
          )}
        </div>
        <div className="w-full px-3">
          {session?.token ? (
            <Button
              variant="outline"
              fullWidth
              radius="md"
              h={60}
              color="#000"
              onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              fullWidth
              radius="md"
              h={60}
              color="#000"
              onClick={() => router.push('/login')}>
              Login
            </Button>
          )}
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg" px={10} py={5}>
          {isActivePage('/') && (
            <FloatingWhatsApp
              className="floating-whatsapp-button"
              phoneNumber="6281310725348"
              accountName="studywithme_"
              chatMessage="Halo, ada yang bisa kami bantu ? 🙏"
              avatar="https://firebasestorage.googleapis.com/v0/b/chattytalks.appspot.com/o/personal%2F1e6728ca-7e54-4e6f-809c-3a5b7f44d2b6%2Fa46f94b0-ad26-426c-a525-c28d389e2b75.jpg?alt=media&token=c3a65715-ba21-4866-8ea7-284742e89440"
            />
          )}
          <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute top-5 -left-5 -z-10"></div>
          <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute bottom-0 right-0 -z-10"></div>
          {children}
        </Container>
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}

const pathNotNavbar = [
  '/login',
  '/register',
  '/forgot-password',
  '/terms',
  '/privacy',
  '/reset-password/[token]',
  '/verify-otp',
  '/reset-password',
];
