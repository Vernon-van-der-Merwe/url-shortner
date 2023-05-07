import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import { Notifications } from '@mantine/notifications';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
        }}
      >
      <Notifications position="top-center" />
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </MantineProvider>
    </>
  );
}
