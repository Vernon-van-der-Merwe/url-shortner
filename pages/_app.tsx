import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { Notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { AuthContextProvider } from "@/context/AuthContext";

const noAuthRequired = ["/auth/login", "/auth/signup", "/error"];

export default function App(props: AppProps) {
  const router = useRouter();

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Url Shortener</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <AuthContextProvider>
          <Notifications position="top-center" />
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          )}
        </AuthContextProvider>
      </MantineProvider>
    </>
  );
}
