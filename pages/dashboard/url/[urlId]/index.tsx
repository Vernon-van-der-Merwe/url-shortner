import { UrlStats } from "@/components/stats";
import { Button, Center, Container, Group, Loader, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconArrowDown } from "@tabler/icons-react";
import * as urlService from "@/services/page/urlService";
import { ShortenedUrl } from "@/model/ShortenedUrlModel";
import { DeleteUrlModal } from "@/components/Modals/deleteUrlModal";

export function Landing(props) {
  const router = useRouter();
  const { urlId } = router.query;

  const [loading, setLoading] = useState(true);
  const [urlItem, setUrlItem] = useState({} as ShortenedUrl);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (urlId) {
      urlService.get(urlId, setLoading, setUrlItem);
    }
  }, [urlId]);

  const handleDelete = async (item: ShortenedUrl) => {
    await urlService.deleteItem(item.id, setLoading);
    router.push("/dashboard/url");
  };

  return (
    <div>
      <Container>
        {loading ? (
          <Center h={"60vh"}>
            <Loader variant="dots" />
          </Center>
        ) : (
          <>
              <DeleteUrlModal opened={opened} setOpened={setOpened} id={urlId} itemName={urlItem.name} />
            <Group position="apart">
              <h1>{urlItem.name}</h1>
              <Button variant="outline" color="red" onClick={() => setOpened(true)}>
                Delete
              </Button>
            </Group>
            <UrlStats />
            <Paper mt={"30px"} mb={"50px"}>
              <Center h={"150px"}>
                <h1>Insert Graph Here 😊</h1>
              </Center>
            </Paper>
            <center>
              <h3>{urlItem.url}</h3>
            </center>
            <center>
              <h3>
                <IconArrowDown />
              </h3>
            </center>
            <center>
              <h3>{urlItem.shortUrl}</h3>
            </center>
          </>
        )}
      </Container>
    </div>
  );
}

export default Landing;
