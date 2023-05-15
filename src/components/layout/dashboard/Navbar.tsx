import { useState } from 'react';
import { createStyles, Navbar as MantineNavbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import {
  IconHome,
  IconWorld,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconHome },
  { link: '/dashboard/url', label: 'My URLs', icon: IconWorld },
];

export function Navbar(props: { opened: boolean }) {
  const { opened } = props;
  const router = useRouter();

  const { user, logout } = useAuth();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    router.push('/auth/login');
  };

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        router.push(item.link);
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <MantineNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} >
      <MantineNavbar.Section grow>
        <Group className={classes.header} position="apart">
          <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
        </Group>
        {links}
      </MantineNavbar.Section>

      <MantineNavbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => handleLogout(event)}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
