import React from "react";
import { useRouter } from "next/router";
import { Form, Segment, Button, Message } from "semantic-ui-react";
import styles from "@styles/Login.module.css";
import Link from "next/link";
import { useLogin } from "../hooks/useUser";
import { populateUser } from "../server/utils/populateUser";

const Login = () => {
  const [form, onInputChange, onFormSubmit, payload] = useLogin();
  const { push } = useRouter();
  const { error, loading, user } = payload;
  if (user) {
    push("/");
  }
  return (
    <div className={styles["log-in-container"]}>
      <Segment className={styles["log-in-box"]} color={error ? "red" : null}>
        {error && (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        )}
        <Form onSubmit={onFormSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              onChange={onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={onInputChange}
            />
          </Form.Field>
          <Form.Field style={{ textAlign: "right" }}>
            <Link href="/signup">Create an account</Link>
          </Form.Field>
          <Button type="submit" fluid color="blue" disabled={loading}>
            Log In
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { user } = await populateUser(ctx);
  if (user) {
    return {
      props: { user },
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
