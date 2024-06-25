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

  session?.role !== 'STUDENT' &&
    navLinkData.push({
      label: 'Mengelola Konten',
      href: '/manage-content',
    });

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

      <AppShell.Navbar py="md" px={4}>
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
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg" p={0} mb={100}>
          {children}
        </Container>
        <Footer />
      </AppShell.Main>
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
