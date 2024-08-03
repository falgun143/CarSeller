import React, { useState } from "react";
import { Button, Card, TextField, Typography, Box } from "@mui/material";
import { decode_jwt } from "@falgunpal/jwt-helper-ts";
import Cookies from "js-cookie";
import axios from "axios";
import { useLogin } from "../../context/LoginContext";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddCourse = () => {
  const { login } = useLogin();
  const [carname, setCarname] = useState("");
  const [manufacturingyear, setManufacturingyear] = useState("");
  const[price, setPrice] = useState("");
  const[image, setImage]=useState("");
  const token = Cookies.get("token");
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);


  if (!login || !process.env.NEXT_PUBLIC_JWT_SECRET || !token) {
    return <div>Invalid Request</div>;
  }

  const { id } = decode_jwt(process.env.NEXT_PUBLIC_JWT_SECRET, token);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/addcourse", {
        carname,
        manufacturingyear,
        price,
        image,
        userId: id,
      });
      router.push("/getcourses");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Course
      </Typography>
      <form onSubmit={handleAddCourse} style={{ width: "100%", maxWidth: "600px" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            boxShadow: 3,
          }}
        >
          <TextField
            required
            label="Title"
            value={carname}
            onChange={(e) => setCarname(e.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Content"
            value={manufacturingyear}
            onChange={(e) => setManufacturingyear] = useState(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Box sx={{ flex: 1 }}>
              <Typography>Start Date:</Typography>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                dateFormat="MMMM d, yyyy"
                className="date-picker"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography>End Date:</Typography>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                dateFormat="MMMM d, yyyy"
                className="date-picker"
              />
            </Box>
          </Box>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Add Course
          </Button>
        </Card>
      </form>
    </Box>
  );
};

export default AddCourse;
