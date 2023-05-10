import { useState } from "react";
import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { config } from "@/config/forms/config";
import * as urlService from "@/services/page/urlService";
import { useRouter } from "next/router";
import { CreateShortenedUrl } from "@/model/ShortenedUrlModel";

export function DeleteUrlModal({ opened, setOpened, id, itemName }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("object");
    await urlService.deleteItem(id, setLoading);
    router.push("/dashboard/url");
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
        <div style={{ maxWidth: 320, margin: "auto" }}>
          Are you sure you want to delete {itemName}?
          <Group position="center" mt="xl">
            <Button onClick={handleSubmit} loading={loading}>
              YES
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
}
