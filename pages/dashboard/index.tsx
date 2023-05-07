import { Button, Center, Container } from "@mantine/core";
import router from "next/router";

export function Landing() {
  return (
    <>
      <Container>
      <Center pt={"80px"} pb={"10px"}>
        <h1>Welcome to My url Shortner App</h1>
      </Center>
        <Center pt={"80px"} pb={"10px"}>
          Create your first shortened Url!
        </Center>
        <Center>
          <Button
            onClick={() => {
              router.push("/dashboard/url/create");
            }}
          >
            Add Url
          </Button>
        </Center>
      </Container>
    </>
  );
}

export default Landing;
