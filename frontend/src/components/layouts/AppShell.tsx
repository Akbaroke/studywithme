import {
  ActionIcon,
  AppShell,
  Burger,
  Container,
  Group,
  ScrollArea,
  Tooltip,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import ScrollToTop from '../atoms/ScrollToTop';
import { useDisclosure } from '@mantine/hooks';
import Logo from '../atoms/Logo';

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

  const isActivePage = (href: string) =>
    rootPath.split('/').includes(href.replace('/', ''));

  const pathNotNavbar = ['/login', '/register', '/terms'];

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
            <Logo />
            <Group ml="xl" gap={0} visibleFrom="sm">
              {navLinkData.map((data, index) => (
                <Link href={data.href} key={index}>
                  {data.label}
                </Link>
              ))}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {navLinkData.map((data, index) => (
          <Link href={data.href} key={index}>
            {data.label}
          </Link>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}

const navLinkData: LinkData[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: '',
    href: '/tes',
  },
];
