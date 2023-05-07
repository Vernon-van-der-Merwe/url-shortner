import { config } from "@/config/forms/config";
import { CreateShortenedUrl } from "@/model/ShortenedUrlModel";
import {
  Button,
  Center,
  Container,
  Group,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

import * as urlService from "@/services/page/urlService";

export function CreateStore({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm(config.createUrl);

    const handleSubmit = async () => {
      const input: CreateShortenedUrl = {
        name: form.values.name,
        url: form.values.originalUrl,
      };

      await urlService.create(input, router, setLoading);
    };

  return (
    <>
      <Container>
        <Center>
          <h1>Add Url</h1>
        </Center>
        <form
          onSubmit={form.onSubmit(async () => {
            handleSubmit();
          })}
        >
          <div style={{ maxWidth: 320, margin: "auto" }}>
            <TextInput
              mt="md"
              mb="md"
              label="Name"
              placeholder="Give this url a name "
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Original URL"
              mb="md"
              placeholder="The longer URL, that you want to shorten"
                {...form.getInputProps("originalUrl")}
            />

            <Group position="center" mt="xl">
              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </Group>
          </div>
        </form>
      </Container>
    </>
  );
}

export default CreateStore;
