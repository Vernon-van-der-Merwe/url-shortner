import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
  createStyles,
} from "@mantine/core";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { config } from "@/config/forms/config";
import { auth } from "@/config/firebase";
import * as AuthService from "@/services/page/authService";

const styles = createStyles((theme, _params, getRef) => ({
  center: {
    height: "100vh",
  },
  container: {
    width: "500px",
  },
}));

const Login = (props: PaperProps) => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  
  if (user) {
    router.push("/dashboard");
  }

  const [type, toggle] = useToggle(["login", "register"]);
  const [loading, setLoading] = useState(false);
  const form = useForm(config.login);
  const { classes } = styles();



  const handleLogin = async () => {
    setLoading(true)
    const { email, password } = form.values
    await AuthService.login(auth, email, password, router);
    setLoading(false)
  }

  const handleRegister = async () => {
    const { name, email, password } = form.values
    await AuthService.register(name, email, password, router, setLoading);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    form.validate()
    if (form.isValid()) {
      type == "login" ? handleLogin() : handleRegister()
    }
  };

  return (
    <Center className={classes.center}>
      <Paper
        radius="md"
        p="xl"
        {...props}
        withBorder
        className={classes.container}
      >
        <Text size="lg" weight={500}>
          Welcome to ShortUrl, {type} with
        </Text>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={handleSubmit}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              type="email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />
          </Stack>

          <Group position="center" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" loading={loading}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default Login;
