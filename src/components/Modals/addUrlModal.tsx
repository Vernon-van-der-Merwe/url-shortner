import { useState } from "react";
import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { config } from "@/config/forms/config";
import * as urlService from "@/services/page/urlService";
import { useRouter } from "next/router";
import { CreateShortenedUrl } from "@/model/ShortenedUrlModel";


export function AddUrlModal({ opened, setOpened, setUrlList }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm(config.createUrl);

  const handleSubmit = async () => {
    const input: CreateShortenedUrl = {
      name: form.values.name,
      url: form.values.originalUrl,
    };

    await urlService.create(input, router, setLoading);
    await urlService.getAll(setLoading, setUrlList);
    
    form.reset();
    setOpened(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        title="Add a Url"
        transitionProps={{ transition: "fade", duration: 200 }}
        onClose={() => setOpened(false)}
      >
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
      </Modal>
    </>
  );
}
