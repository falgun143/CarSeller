import Image from "next/image";
import { Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <Grid
      container
      style={{
        padding: "5vw",

      }}
      alignItems="center"
    >
      <Grid item xs={12} md={6} lg={6}>
        <Typography variant="h2">
          Assignment for Quadiro Technologies
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/Quadiro.png" style={{ width: "50%", height: 250 }} />
      </Grid>
    </Grid>
  );
}
