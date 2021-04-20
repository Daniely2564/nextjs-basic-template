import React from "react";
import Nav from "./Nav";

const Header = ({ user }) => {
  return (
    <header>
      <Nav user={user} />
    </header>
  );
};

export default Header;
