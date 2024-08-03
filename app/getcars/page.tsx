"use client";
import React, { useState, useEffect } from "react";
import { Typography, Box, Card, Button, Grid } from "@mui/material";
import axios from "axios";
import { useLogin } from "../../context/LoginContext";
import CarDetailsModal from "./CarDetailsModal";
import Cookies from "js-cookie";
import { decode_jwt } from "@falgunpal/jwt-helper-ts";
import { toast } from "react-toastify";

export type Car = {
  id: number;
  carname: String;
  manufacturingyear: String;
  price: String;
  image: String;
  userId: number;
};

const Cars = () => {
  const { login } = useLogin();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const token = Cookies.get("token");
  const [userRole, setUserRole] = useState<"USER" | "ADMIN">("USER"); // Default to USER

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_JWT_SECRET || !token) {
      return;
    }
    const { payload } = decode_jwt(process.env.NEXT_PUBLIC_JWT_SECRET, token);
    setUserRole(payload.role);

    async function getCars() {
      try {
        const response = await axios.get("/api/getcars");
        setCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    }

    if (login) {
      getCars();
    } else {
      setLoading(false);
    }
  }, [login, token]);

  const refreshCars = async () => {
    try {
      const response = await axios.get("/api/getcars");
      setCars(response.data.cars);
      toast.success(response.data.message);
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  if (!login) {
    return <Typography>Not logged in</Typography>;
  }

  if (loading) {
    return <Typography>...Loading</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {car.carname}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                {car.userId}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setSelectedCar(car)}
              >
                {userRole === "ADMIN" ? "Edit Details" : "View Details"}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          userRole={userRole}
          onClose={() => {
            setSelectedCar(null);
            refreshCars(); // Refresh cars when closing the modal
          }}
        />
      )}
    </Box>
  );
};

export default Cars;
