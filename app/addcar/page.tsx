"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, TextField, Typography, Box } from "@mui/material";
import { decode_jwt } from "@falgunpal/jwt-helper-ts";
import Cookies from "js-cookie";
import axios from "axios";
import { useLogin } from "../../context/LoginContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCar = () => {
  const { login } = useLogin();
  const [carname, setCarname] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isClient, setIsClient] = useState(false); // State to track if client-side rendering
  const [userRole, setUserRole] = useState<"USER" | "ADMIN" | null>(null); // Track user role
  const router = useRouter();

  useEffect(() => {
    if (login) {
      const token = Cookies.get("token");
      if (process.env.NEXT_PUBLIC_JWT_SECRET && token) {
        const { payload } = decode_jwt(
          process.env.NEXT_PUBLIC_JWT_SECRET,
          token
        );
        setUserRole(payload.role);
      }
      setIsClient(true);
    }
  }, [login]);

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== "ADMIN") {
      toast.error("You are not authorized to add a car.");
      return;
    }

    try {
      const token = Cookies.get("token");
      if (process.env.NEXT_PUBLIC_JWT_SECRET && token) {
        const { id } = decode_jwt(process.env.NEXT_PUBLIC_JWT_SECRET, token);
        await axios.post("/api/addcar", {
          carname,
          manufacturingDate,
          price,
          image,
          userId: id,
        });
        toast.success("Car added successfully");
        setTimeout(() => {
          toast.success("Redirecting to cars Page");
          router.push("/getcars");
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  if (!login || userRole !== "ADMIN" || !isClient) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "#333" }}>
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#666" }}>
          You do not have permission to access this page.
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "#36cc00" }}
          onClick={() => router.push("/")}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: "#2ba000" }}>
          Add Car
        </Typography>
        <form
          onSubmit={handleAddCar}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              paddingTop: 8,
              paddingLeft: 2,
              paddingRight: 2,
              paddingBottom: 3,
              boxShadow: 3,
            }}
          >
            <TextField
              required
              label="Car Name"
              onChange={(e) => setCarname(e.target.value)}
              fullWidth
              color="success"
            />
            <TextField
              required
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              color="success"
            />
            <TextField
              required
              label="Image Link"
              onChange={(e) => setImage(e.target.value)}
              fullWidth
              color="success"
            />
            <TextField
              label="Manufacturing Year"
              variant="outlined"
              fullWidth
              required
              type="date"
              onChange={(e) => setManufacturingDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                marginTop: 2,
                "& .MuiInputBase-input": {
                  paddingTop: "16px",
                  paddingBottom: "16px",
                },
                "& .MuiInputLabel-root": {
                  top: "-10px", 
                },
              }}
              color="success"
            />
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: 2, backgroundColor: "#36cc00", width: "50%" }}
            >
              Add Car
            </Button>
          </Card>
        </form>
      </Box>
    </>
  );
};

export default AddCar;
