import { useState } from "react";

// @desc   Request to sign in a user
// @route  POST /api/signin
export const useLogin = () => {
  const initialForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialForm);
  const [payload, setPayload] = useState({ loading: false, error: "" });

  const onInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setPayload({ error: "", loading: true });
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Header": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPayload({ error: "", loading: false, user: data });
    } catch (err) {
      setPayload({ error: err.message, loading: false });
    }
  };

  return [form, onInputChange, onFormSubmit, payload];
};

// @desc   Requeset to create a user
// @route  POST /api/user
export const useSignUp = () => {
  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [form, setForm] = useState(initialForm);
  const [payload, setPayload] = useState({ loading: false, error: "" });

  const onInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setPayload({ error: "", loading: true });
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Header": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPayload({ error: "", loading: false });
    } catch (err) {
      setPayload({ error: err.message, loading: false });
    }
  };

  return [form, onInputChange, onFormSubmit, payload];
};

// @desc   Requeset to signout
// @route  POST /api/user
export const useLogout = (redir) => {
  return () => {
    fetch("/api/signout").then((res) => {
      res.json().then(() => redir());
    });
  };
};
