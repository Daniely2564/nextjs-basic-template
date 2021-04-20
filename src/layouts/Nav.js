import React, { useState } from "react";
import { Input, Menu, Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useLogout } from "../../hooks/useUser";
import Link from "next/link";

const Nav = ({ user }) => {
  const { pathname, push } = useRouter();
  const logout = useLogout(() => push("/login"));
  const [activeItem, setActiveItem] = useState();
  return (
    <Menu secondary color="blue" inverted>
      <Container>
        <Link href="/">
          <Menu.Item name="home" active={activeItem === "/"} />
        </Link>
        <Menu.Item name="messages" active={activeItem === "messages"} />
        <Menu.Item name="friends" active={activeItem === "friends"} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          {user ? (
            <Menu.Item onClick={logout}>Log Out</Menu.Item>
          ) : (
            <Link href="/login">
              <Menu.Item active={activeItem === "logout"}>Log In</Menu.Item>
            </Link>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Nav;
