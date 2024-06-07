import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleRegister from "../../api/handleRegister";
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
const Register = () => {
  const [RegisterForm, setRegisterForm] = useState({
    name: "",
    password: "",
    repassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [handleError, sethandleError] = useState({});
  const mutation = useMutation({
    mutationFn: (body) => {
      return HandleRegister(body);
    },
  });

  const nav = useNavigate();
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
  const Handleregister = async (event) => {
    event.preventDefault();
    if (RegisterForm.password !== RegisterForm.repassword) {
      return sethandleError({
        success: false,
        message: "Mật khẩu phải giống nhau!",
      });
    }
    mutation.mutate(RegisterForm, {
      onSuccess: (data) => {
        if (data.success) {
          setRegisterForm({
            name: "",
            password: "",
            repassword: "",
          });
          alert(data.message);
          return nav("/");
        }
        sethandleError(data);
        console.log("data " + data);
      },
      onError: (err) => {
        console.log("Error " + err);
      },
    });
  };

  const onChangeRegister = (event) => {
    sethandleError({});
    setRegisterForm({
      ...RegisterForm,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <LoginContainer>
      <h2>Register</h2>
      <LoginForm>
        <Label htmlFor="name">User Name:</Label>
        <Input
          type="text"
          id="name"
          name="name"
          onChange={onChangeRegister}
          value={RegisterForm.name}
          required
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="pass"
          name="password"
          onChange={onChangeRegister}
          value={RegisterForm.password}
          required
        />
        <Label htmlFor="password">Re Password:</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="repass"
          name="repassword"
          onChange={onChangeRegister}
          value={RegisterForm.repassword}
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
            nav("/");
          }}
        >
          Login
        </Typography>
        {!handleError?.success && handleError?.message && (
          <Stack mb={3} sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{handleError?.message}</Alert>
          </Stack>
        )}
        <Button onClick={Handleregister}>Register</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Register;
