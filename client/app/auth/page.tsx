"use client";
import { useEffect } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import lodash from "lodash";

import { GoogleButton, FacebookButton } from "@/components";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { login } from "@/redux/slices/authSlices";
import { useAppSelector } from "@/redux/hooks/hooks";
import { selectLogin } from "@/redux/slices/authSlices";
import { STATUS } from "@/redux/status";
import { notifications } from "@mantine/notifications";

const Login = () => {
  const [type, toggle] = useToggle(["login", "register"]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuth, token, error, status, user } = useAppSelector(selectLogin);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      username: "",
      phone: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (data: typeof form.values) => {
    if (type === "login") {
      // TODO: login
      console.log("🚀🚀🚀 login"); //FIXME: remove in future
      dispatch(
        login(lodash.omit(data, ["name", "phone", "terms", "username"]))
      );
      router.refresh();
    } else {
      // TODO: register
      console.log("🚀🚀🚀 register"); //FIXME: remove in future
    }
  };

  useEffect(() => {
    toggle(searchParams.get("type") as string);
  }, [toggle, searchParams]);

  useEffect(() => {
    if (isAuth && token && status === STATUS.IDLE && user && !error) {
      redirect("/");
    }

    if (error)
      notifications.show({
        title: "Error occurred",
        message: error,
        color: "red",
      });
  }, [error, user, isAuth, status, token, router]);

  return (
    <Container size="500px" my="lg">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to Memories, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <FacebookButton radius="xl">Facebook</FacebookButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
                required={type === "register"}
                autoComplete="name"
              />
            )}
            {type === "register" && (
              <TextInput
                label="Username"
                placeholder="Your username"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                radius="md"
                required={type === "register"}
                autoComplete="username"
              />
            )}
            {type === "register" && (
              <TextInput
                label="Phone Number"
                placeholder="Your phone number"
                value={form.values.phone}
                onChange={(event) =>
                  form.setFieldValue("phone", event.currentTarget.value)
                }
                radius="md"
                autoComplete="phone"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
              autoComplete="email"
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
              radius="md"
              autoComplete="password"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() =>
                router.push(
                  `/auth?type=${type === "register" ? "login" : "register"}`
                )
              }
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
