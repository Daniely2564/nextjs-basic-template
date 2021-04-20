import React from "react";
import { Form, Segment, Button, Message } from "semantic-ui-react";
import styles from "@styles/Login.module.css";
import Link from "next/link";
import { useSignUp } from "hooks/useUser";

const Signup = () => {
  const [form, onInputChange, onFormSubmit, payload] = useSignUp();
  const { error, loading } = payload;
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
            <label>First Name</label>
            <input
              placeholder="First Name"
              name="firstName"
              onChange={onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              name="lastName"
              onChange={onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={onInputChange}
            />
          </Form.Field>
          <Form.Field style={{ textAlign: "right" }}>
            <Link href="/login">Have an account?</Link>
          </Form.Field>
          <Button type="submit" fluid color="blue" disabled={loading}>
            Log In
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

export default Signup;
