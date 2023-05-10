import { UrlTable } from "@/components/tables/UrlTable";
import { Button, Center, Container, Group, Loader } from "@mantine/core";
import router from "next/router";
import { useEffect, useState } from "react";
import * as urlService from "@/services/page/urlService";
import { AddUrlModal } from "@/components/Modals/addUrlModal";
import { ShortenedUrl } from "@/model/ShortenedUrlModel";

export function Landing() {
  return (
    <div>
      <Container>
          <UrlTable/>
      </Container>
    </div>
  );
}

export default Landing;
