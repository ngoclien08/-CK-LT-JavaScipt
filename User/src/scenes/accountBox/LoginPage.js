import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import HandleLogin from "../../api/handleLogin";
import { useMutation } from "@tanstack/react-query";
import {
  LoginContainer,
  LoginForm,
  Label,
  Input,
  Button,
} from "./Components/Components";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const Login = () => {
  const [loginForm, setLoginForm] = useState({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [handleError, sethandleError] = useState({});
  const mutation = useMutation({
    mutationFn: (body) => {
      return HandleLogin(body);
    },
  });

  const nav = useNavigate();
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    mutation.mutate(loginForm, {
      onSuccess: (data) => {
        if (!data?.success) {
          sethandleError(data);
        }
        if (data?.user?.roles === "1") {
          sethandleError({
            success: false,
            message: "Tài khoản này đã bị khoá !!",
          });
        } else {
          if (data.success) {
            return nav("/homepage");
          }
        }
      },
    });
  };

  const onChangeLogin = (event) => {
    sethandleError({});
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  return (
    <LoginContainer>
      <h2>Login</h2>
      <LoginForm>
        <Label htmlFor="name">User name:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          onChange={onChangeLogin}
          value={loginForm.name}
          required
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="pass"
          name="password"
          onChange={onChangeLogin}
          value={loginForm.password}
          required
        />
        <label>
          Show Password:
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleCheckboxChange}
          />
        </label>
        <Typography
          fontStyle={"italic"}
          color={"blue"}
          mb={2}
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          variant="h7"
          onClick={() => {
            nav("/", { state: "register" });
          }}
        >
          Register
        </Typography>
        {!handleError?.success && handleError?.message && (
          <Stack mb={3} sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{handleError?.message}</Alert>
          </Stack>
        )}

        <Button onClick={handleLogin}>Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
