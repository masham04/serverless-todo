import React, { useContext } from "react";
import {Link} from 'gatsby'
import { Container, Heading, Button, Flex, NavLink } from "theme-ui";
import { IdentityContext } from '../../identity-context';

export default (props) => {
  const {user,identity: netlifyIdentity} = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
        <NavLink as={Link} to="#" p={2}>
           {user.user_metadata.full_name}
        </NavLink>
        )}
      </Flex>
      <br/>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Web App</Heading>
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
