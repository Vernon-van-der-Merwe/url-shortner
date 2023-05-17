import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
} from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function NotFoundTitle() {
  const router = useRouter();
  const { err } = router.query;
  let message =
    "Unfortunately, this is only a 500 page. You may have mistyped the address, or something went wrong on our side.";
  const handleRedirect = () => {
    router.push("/auth/login");
  };
  if (err) {
    message = err as string;
  }

  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>500</div>
      <Title className={classes.title}>Whoops, Something went wrong.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {message}
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={handleRedirect}>
          To the home page 🦹🏻‍♂️!
        </Button>
      </Group>
    </Container>
  );
}
