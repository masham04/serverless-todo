import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { IdentityContext } from "../../identity-context";
import { Container, Heading, Button, Flex, NavLink } from "theme-ui";
import Dash from '../components/Dashboard'

let DashLogOut = (props) => {
  const {identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Web App</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log In
        </Button>
      </Flex>
    </Container>
  );
};

export default (props) => {
  const { user } = useContext(IdentityContext);
  if (!user) {
    return (
      <Router>
        <DashLogOut path="/app" />
      </Router>
    );
  }
  return (
    <Router>
      <Dash path="/app" />
    </Router>
  );
};
