import { UrlTable } from "@/components/tables/UrlTable";
import { Button, Center, Container, Loader } from "@mantine/core";
import router from "next/router";
import { useEffect, useState } from "react";
import * as urlService from "@/services/page/urlService";

export function Landing() {
  const [loading, setLoading] = useState(true);
  const [urlList, setUrlList] = useState([]);
  
  useEffect(() => {
    urlService.getAll(setLoading, setUrlList);
  }, []);

  return (
    <div>
    <Container>
      <h1>Url's</h1>
      {loading ? (
        <Center h={"60vh"}>
          <Loader variant="dots" />
        </Center>
      ) : (
        // <Center pt={"80px"} pb={"10px"}>
          <UrlTable urls={urlList} />
        // </Center>
      )}
    </Container>
  </div>
  );
}

export default Landing;
