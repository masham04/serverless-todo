import React, { useContext, useRef, useState } from "react";
import { Router, Link } from "@reach/router";
import { Container, Heading, Button, Flex,Input,Label, NavLink, Checkbox } from "theme-ui";
import { IdentityContext } from "../../identity-context";

export default () => {
    const { user } = useContext(IdentityContext);
   const inputRef = useRef();
   const [todo, settodo] = useState([]);
    return <Container>
        <Flex as="nav">
          <NavLink as={Link} to="/" p={2}>
            Home
          </NavLink>
          <NavLink as={Link} to={"/app"} p={2}>
            Dashboard
          </NavLink>
          {user && (
          <NavLink as={Link} to="#" p={2}>
            logout {user.user_metadata.full_name}
          </NavLink>
          )}
        </Flex>
        <Container
        as="form"
        onSubmit={e => {
          e.preventDefault();
          settodo([{done: false, value: inputRef.current.value},...todo])
          inputRef.current.value="";
        }}
        >
          <Label>
            <h2>Add&nbsp;Todo</h2>
            
          </Label>
          <Input ref={inputRef} sx={{marginLeft: 1}}/>

          <br/>
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
          <Flex sx={{flexDirection: "column"}}>
            <ul sx={{listStyleType: "none"}}>
              {todo.map(el => (
                <Flex as="li">
                  <Checkbox checked={el.done} />
                  <span>{el.value}</span>
                </Flex>
              ))}
            </ul>
          </Flex>
        </Container>
        </Container>;
  };