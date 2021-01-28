import React from "react";
import { Container, Heading, Button, Flex } from "theme-ui";
import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init({})
const index = () => {
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">ToDo App</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default index;