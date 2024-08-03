"use client"
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLogin } from "../../context/LoginContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const signup = () => {
  const [username, Setusername] = useState("");
  const [password, SetPassword] = useState("");
  const router = useRouter();
  const { setLogin } = useLogin();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
  
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token);
        setLogin(true);
        toast.success("Login Successful");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 401) {
          toast.error(data.message);
        } else if (status === 404) {
          toast.error(data.message );
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("Network or server error. Please try again later.");
      }
    }
  };
  

  return (
    <>
    <ToastContainer   theme="dark" />
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={onSubmit} style={{ width: "30%" }}>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            padding: 20,
            width: "100%",
            marginTop: 100,
          }}
        >
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Welcome Login Below
          </Typography>
          <TextField
            onChange={(e) => {
              Setusername(e.target.value);
            }}
            required
            label="Username"
            fullWidth={true}
             color="success"
          ></TextField>
          <TextField
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
            required
            label="Password"
            type="password"
            fullWidth={true}
             color="success"
          ></TextField>
          <Button variant="contained" style={{ width: "50%", backgroundColor:"#36cc00" }} type="submit">
            Login
          </Button>
        </Card>
      </form>
    </Box>
    </>
  );
};

export default signup;
