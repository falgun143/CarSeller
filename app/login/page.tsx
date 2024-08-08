"use client";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLogin } from "../../context/LoginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { decode_jwt } from "@falgunpal/jwt-helper-ts";

const LoginSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters" }).max(12, { message: "Username must be maximum of 12 characters" }),
  password: z.string().min(7, { message: "Password must be at least 7 characters" }).max(12, { message: "Password must be maximum of 12 characters" }),
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ path: string; message: string }[]>([]);
  const router = useRouter();
  const { setLogin, setrole } = useLogin();

  const validateField = (field: string, value: string) => {
    const result = LoginSchema.safeParse({ [field]: value });
    if (!result.success) {
      return result.error.errors.find((err) => err.path.includes(field)) || null;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    // Clear error for the field being updated
    setErrors((prevErrors) =>
      prevErrors.filter((error) => error.path !== name)
    );

    // Update the state for the specific input field
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }

    // If the value is empty, clear the error for that field
    if (value.trim() === "") {
      setErrors((prevErrors) =>
        prevErrors.filter((error) => error.path !== name)
      );
      return;
    }

    // Validate the updated field if it is not empty
    if (error) {
      setErrors((prevErrors) => [
        ...prevErrors,
        { path: name, message: error.message },
      ]);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the whole form
    const result = LoginSchema.safeParse({ username, password });
    if (!result.success) {
      setErrors(
        result.error.errors.map((err) => ({
          path: String(err.path[0]), // Convert path to string
          message: err.message,
        }))
      );
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token);

        let role = "";
        if (process.env.NEXT_PUBLIC_JWT_SECRET) {
          const { payload } = decode_jwt(
            process.env.NEXT_PUBLIC_JWT_SECRET,
            token
          );
          role = payload.role;
        }

        setLogin(true);
        setrole(role);
        toast.success("Login Successful, redirecting...");
        setTimeout(() => {
          router.push("/getcars");
        }, 3000);
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401 || status === 404) {
          toast.error(data.message);
          
        }
        else if (status === 405) {
          console.log(error.response.data.errors);
          setErrors(error.response.data.errors);
        }
        
        else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("Network or server error. Please try again later.");
      }
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} theme="dark" />

      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: {
              xs: "90%",
              md: "30%",
            },
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            padding: 20,
            marginTop: 100,
          }}
        >
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Welcome Login Below
          </Typography>
          <TextField
            name="username"
            value={username}
            onChange={handleInputChange}
            required
            label="Username"
            fullWidth
            color="success"
            error={errors.some((err) => err.path === "username")}
            helperText={errors.find((err) => err.path === "username")?.message}
          />
          <TextField
            name="password"
            value={password}
            onChange={handleInputChange}
            required
            label="Password"
            type="password"
            fullWidth
            color="success"
            error={errors.some((err) => err.path === "password")}
            helperText={errors.find((err) => err.path === "password")?.message}
          />
          <Button
            variant="contained"
            style={{ width: "50%", backgroundColor: "#36cc00" }}
            type="submit"
          >
            Login
          </Button>
        </Card>
      </form>
    </>
  );
};

export default Login;
