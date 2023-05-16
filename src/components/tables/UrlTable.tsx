import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  Menu,
  Button,
  Loader,
  Center,
} from "@mantine/core";
import { useRouter } from "next/router";
import { ShortenedUrl } from "@/model/ShortenedUrlModel";
import Moment from "react-moment";
import { IconMenu2, IconTrash } from "@tabler/icons-react";
import * as urlService from "@/services/page/urlService";
import { AddUrlModal } from "../Modals/addUrlModal";

export function UrlTable(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [urlList, setUrlList] = useState<ShortenedUrl[]>([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    urlService.getAll(setLoading, setUrlList);
  }, []);

  const handleDelete = async (item: ShortenedUrl) => {
    await urlService.deleteItem(item.id, setLoading);
    await urlService.getAll(setLoading, setUrlList);
    setLoading(false);
  };

  const handleRowClick = (id: string, router) => {
    router.push(`/dashboard/url/${id}`);
  };

  const rows = urlList.map((item: ShortenedUrl) => {
    return (
        <tr key={item.id}>
          <td onClick={() => handleRowClick(item.id, router)}>
            <Group spacing="sm">
              <Text size="sm" weight={500} truncate w={150}>
                {item.name}
              </Text>
            </Group>
          </td>
          <td onClick={() => handleRowClick(item.id, router)}>
          <Text truncate w={150}>
            {item.shortUrl}
            </Text>          </td>
          <td onClick={() => handleRowClick(item.id, router)}>
            <Text truncate w={150}>
            {item.url}
            </Text>
            </td>
          <td onClick={() => handleRowClick(item.id, router)}>
            <Moment format="ddd MMM D YYYY @ h:mm A" date={item.createdAt} />
          </td>
          <td onClick={() => handleRowClick(item.id, router)}>
            <Moment format="ddd MMM D YYYY @ h:mm A" date={item.updatedAt} />
          </td>
          <td>
            <Menu>
              <Menu.Target>
                <Button
                  leftIcon={<IconMenu2 size={20} />}
                  variant="subtle"
                  size="md"
                  compact
                  pl={"11px"}
                  pr={"3px"}
                ></Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </td>
        </tr>
    );
  });

  return (
    <>
    <AddUrlModal opened={opened} setOpened={setOpened} setUrlList={setUrlList} />
      <Group position="apart" mt="xl">
        <h2>Url List</h2>
        <Button className="fl" onClick={() => setOpened(true)}>
          Add Url
        </Button>
      </Group>
      <ScrollArea>
        {loading ? (
          <Center h={"60vh"}>
            <Loader variant="dots" />
          </Center>
        ) : (
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>ShortUrl</th>
                <th>LongUrl</th>
                <th>Added</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </ScrollArea>
    </>
  );
}
