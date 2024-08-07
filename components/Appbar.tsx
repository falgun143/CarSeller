"use client";
import { Button, AppBar as MuiAppBar, Box, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useLogin } from "../context/LoginContext";
import SuprSendInbox, { SuprSendProvider } from "@suprsend/react-inbox";
import "react-toastify/dist/ReactToastify.css";

const Appbar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { login, setLogin, role } = useLogin();

  const handleLogout = () => {
    Cookies.remove("token");
    setLogin(false);
    router.push("/");
  };

  return (
    <>
      <MuiAppBar position="static" style={{ backgroundColor: "#34c300" }}>
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
            gap:5
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
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  style={{ backgroundColor: "#36cc00" }}
                >
                  Logout
                </Button>

                {role === "ADMIN" && (
                  <Button
                    style={{ backgroundColor: "#36cc00" }}
                    variant="contained"
                    onClick={() => {
                      router.push("/addcar");
                    }}
                  >
                    AddCar
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => {
                    router.push("/getcars");
                  }}
                  style={{ backgroundColor: "#36cc00" }}
                >
                  VIEWCARS
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push("/login");
                  }}
                  style={{ backgroundColor: "#36cc00" }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push("/signup");
                  }}
                  style={{ backgroundColor: "#36cc00" }}
                >
                  SignUp
                </Button>
              </>
            )}
               <SuprSendInbox   
         workspaceKey="irQ1EZbPcX87e9oZulrj"
      subscriberId="pIzG1VcpZ3dp3Ou1US8RKBvl1tS2OhclpWECzYOzNCU="
      distinctId="palfalgun@gmail.com" 
      themeType="dark"
   
      />
          </Box>
        </Box>
      </MuiAppBar>
      {children}
    </>
  );
};

export default Appbar;
