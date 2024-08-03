import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Course } from "./cars";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

type CourseDetailsModalProps = {
  car: Course | null;
  onClose: () => void;
  userRole: "USER" | "ADMIN";
};

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  car,
  onClose,
  userRole,
}) => {
  const [carname, setCarname] = useState(car?.carname || "");
  const [manufacturingyear,setManufacturingyear] = useState(car?.manufacturingyear || "");
  const [price, setPrice] = useState(car?.price ||"");
  const [image, setImage] = useState(car?.image || "");


  const handleCarUpdate = async () => {
    if (!car) return;

    try {
      await axios.put(`/api/cars/${car.id}`, {
        carname,
        manufacturingyear,
        price,
        image
      });
      toast.success("Course updated!");
      onClose(); // Closing the modal after updating the car
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  if (!car) {
    return null; // Return null if car is not available
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: 600,
          padding: 3,
          backgroundColor: "white",
          borderRadius: 2,
          position: "relative",
          boxShadow: 3,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          {car.carname}
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={carname}
          onChange={(e) => setCarname(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={manufacturingyear}
          onChange={(e) =>setManufacturingyear(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="End Date"
          variant="outlined"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
             <TextField
          label="End Date"
          variant="outlined"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {userRole === "ADMIN" && (
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={handleCarUpdate}
          >
            Save Changes
          </Button>
        )}
      </Card>
    </Box>
  );
};

export default CourseDetailsModal;
