import React from "react";
import { Container, Heading, Button, Flex } from "theme-ui";
const index = () => {
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">ToDo App</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            alert("Clicked");
          }}
        >
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default index;