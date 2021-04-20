import React from "react";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import { Container } from "semantic-ui-react";

const Layout = ({ children, user }) => {
  return (
    <div>
      <Header user={user} />
      <Container className="main-container">{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
