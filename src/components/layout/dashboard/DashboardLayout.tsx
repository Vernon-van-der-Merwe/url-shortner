import { useState } from "react";
import {
  AppShell,
  Navbar as MantineNavbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { Navbar } from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

type PageProps = {
  children: React.ReactNode; // 👈️ type children
};

export default function DashboardLayout(props: PageProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();


  // if (!user) {
  //   router.push("/auth/login")
  // }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar opened={opened}/>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Text>'Short'RL</Text>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}
