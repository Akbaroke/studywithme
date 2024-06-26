import type { AppProps } from 'next/app';
import { Quicksand } from 'next/font/google';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Appshell from '@/components/layouts/AppShell';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = createTheme({});

const quicksand = Quicksand({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 0,
      offset: 0,
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={theme}
          forceColorScheme="light"
          defaultColorScheme="light">
          <main className={quicksand.className}>
            <Toaster
              richColors
              position="top-center"
              expand={true}
              duration={800}
            />
            <NextNProgress
              showOnShallow={false}
              options={{ showSpinner: false }}
              color="#000"
            />
            <Appshell>
              <Component {...pageProps} />
              <Analytics />
            </Appshell>
          </main>
        </MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
