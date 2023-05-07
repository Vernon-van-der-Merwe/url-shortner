import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import { ShortenedUrl } from "@/model/ShortenedUrlModel";
import Moment from 'react-moment';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  disabled: {
    pointerEvents: "none",
  },
}));

const handleRowClick = (id: string, router) => {
  router.push(`/dashboard/url/${id}`);
};

export function UrlTable(props) {
  const router = useRouter();

  const data = props.urls;

  const rows = data.map((item: ShortenedUrl) => {
    return (
      <tr key={item.id}>
        <td onClick={() => handleRowClick(item.id, router)}>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td onClick={() => handleRowClick(item.id, router)}>
          {item.shortUrl}
        </td>
        <td onClick={() => handleRowClick(item.id, router)}>{item.url}</td>
        <td onClick={() => handleRowClick(item.id, router)}><Moment format="ddd MMM D YYYY @ h:mm A" date={item.createdAt}/></td>
        <td onClick={() => handleRowClick(item.id, router)}><Moment format="ddd MMM D YYYY @ h:mm A" date={item.updatedAt}/></td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>ShortUrl</th>
            <th>LongUrl</th>
            <th>Added</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
