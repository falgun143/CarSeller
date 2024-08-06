"use client";
import React from "react";
import SuprSendInbox, { SuprSendProvider } from "@suprsend/react-inbox";
import 'react-toastify/dist/ReactToastify.css' 

import {
  Grid,
  Typography,
  Container,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import 'react-toastify/dist/ReactToastify.css' // needed for toast notifications, can be ignored if hideToast=true
export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <Container
    maxWidth="lg"
    sx={{
      padding: isMobile ? '2vw' : '5vw',
      textAlign: isMobile ? 'center' : 'left',
    }}
  >
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      <Grid  item  xs={12} md={12}  >
      <SuprSendInbox   
         workspaceKey="irQ1EZbPcX87e9oZulrj"
      subscriberId="pIzG1VcpZ3dp3Ou1US8RKBvl1tS2OhclpWECzYOzNCU="
      distinctId="palfalgun@gmail.com" 
   
      />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 4,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          Car Seller Application
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="https://openclipart.org/image/800px/343980"
          alt="Quadiro Logo"
          style={{
            width: isMobile ? '80%' : '60%',
            height: '60%',
            maxWidth: '500px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Grid>
    </Grid>
  </Container>
     
   

    </>
  );
}
