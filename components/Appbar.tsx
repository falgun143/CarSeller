"use client"
import { Button, AppBar as MuiAppBar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useLogin } from "../context/LoginContext";
import { decode_jwt } from "@falgunpal/jwt-helper-ts";

const Appbar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { login, setLogin } = useLogin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = Cookies.get("token");
  let role;
  if (token && process.env.NEXT_PUBLIC_JWT_SECRET) {
    const { payload } = decode_jwt(process.env.NEXT_PUBLIC_JWT_SECRET, token);
    role = payload.role;
  }

  const handleLogout = () => {
    Cookies.remove("token");
    setLogin(false);
    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <MuiAppBar position="static" style={{backgroundColor:"#34c300"}} >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 2,
            padding: 2,
            flexDirection: {
              xs: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{ cursor: "pointer", marginLeft: 2 }}
            onClick={() => {
              router.push("/");
            }}
          >
            HOME
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginRight: 10,
              flexDirection: {
                xs: "column",
                md: "row",
                lg: "row",
              },
            }}
          >
            {login ? (
              <>
                <Button variant="contained" onClick={handleLogout} style={{backgroundColor:"#36cc00"}} >
                  Logout
                </Button>

                {role === "ADMIN" && (
                  <Button
                  style={{backgroundColor:"#36cc00"}}
                    variant="contained"
                    onClick={() => {
                      router.push("/addcourse");
                    }}
                  >
                    AddCourses
                  </Button>
                )}
                       {role === "USER" && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      router.push("/courses");
                    }}
                    style={{backgroundColor:"#36cc00"}}
                  >
                    COURSES
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push("/login");
                  }}
                  style={{backgroundColor:"#36cc00"}}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push("/signup");
                  }}
                  style={{backgroundColor:"#36cc00"}}
                >
                  SignUp
                </Button>
              </>
            )}
          </Box>
        </Box>
      </MuiAppBar>
      {children}
    </>
  );
};

export default Appbar;
