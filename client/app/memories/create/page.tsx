"use client";
import React from "react";
import {
  Container,
  Paper,
  Text,
  Group,
  Stack,
  TextInput,
  Button,
  Textarea,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { FileUpload } from "@/components";

const MemoryCreate = () => {
  // const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      title: "",
      slug: "",
      body: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },

    // validate: {
    //   email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    //   password: (val) =>
    //     val.length <= 6
    //       ? "Password should include at least 6 characters"
    //       : null,
    // },
  });

  return (
    <Container size="sm" mt={50}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500} mb={20}>
          Welcome to Memory, Create a new memory.
        </Text>

        <form
          onSubmit={form.onSubmit((data) => {
            console.log(data);
          })}
        >
          <Stack>
            <TextInput
              label="Memory Title"
              placeholder="What is your memory title?"
              value={form.values.title}
              onChange={(event) =>
                form.setFieldValue("title", event.currentTarget.value)
              }
              radius="md"
              required
            />

            <TextInput
              required
              label="Slug"
              placeholder="Slug will generate automatically"
              value={form.values.slug}
              onChange={(event) =>
                form.setFieldValue("slug", event.currentTarget.value)
              }
              error={form.errors.slug && "Invalid slug"}
              radius="md"
            />

            <Text fw={500} mb={-15}>
              Place of memory
            </Text>
            <Grid>
              <Grid.Col xs={8}>
                <TextInput
                  required
                  description="Street"
                  placeholder="Ex: Holding #65, Wall Street"
                  value={form.values.street}
                  onChange={(event) =>
                    form.setFieldValue("street", event.currentTarget.value)
                  }
                  error={form.errors.street && "Invalid slug"}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col xs={4}>
                <TextInput
                  required
                  description="Zip Code"
                  placeholder="Ex: 4560"
                  value={form.values.zip}
                  onChange={(event) =>
                    form.setFieldValue("zip", event.currentTarget.value)
                  }
                  error={form.errors.zip && "Invalid slug"}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col xs={4}>
                <TextInput
                  required
                  description="City"
                  placeholder="Ex: Dhaka"
                  value={form.values.city}
                  onChange={(event) =>
                    form.setFieldValue("city", event.currentTarget.value)
                  }
                  error={form.errors.city && "Invalid slug"}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col xs={4}>
                <TextInput
                  required
                  description="State"
                  placeholder="Ex: Khulna"
                  value={form.values.state}
                  onChange={(event) =>
                    form.setFieldValue("state", event.currentTarget.value)
                  }
                  error={form.errors.state && "Invalid slug"}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col xs={4}>
                <TextInput
                  required
                  description="Country"
                  placeholder="Ex: Bangladesh"
                  value={form.values.country}
                  onChange={(event) =>
                    form.setFieldValue("country", event.currentTarget.value)
                  }
                  error={form.errors.country && "Invalid slug"}
                  radius="md"
                />
              </Grid.Col>
            </Grid>

            <Textarea
              placeholder="Write some description about your memory."
              label="Description"
              error={
                form.errors.body &&
                "Description should include at least 200 characters."
              }
              radius="md"
              withAsterisk
              required
              value={form.values.body}
              onChange={(event) =>
                form.setFieldValue("body", event.currentTarget.value)
              }
              minRows={10}
            />

            {/* TODO: file upload */}
            <FileUpload />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="button" radius="md" variant="outline" color="yellow">
              Cancel
            </Button>
            <Button type="submit" radius="md">
              Create New
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default MemoryCreate;
