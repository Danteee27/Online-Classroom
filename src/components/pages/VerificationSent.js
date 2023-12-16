import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Copyright } from "../Copyright";

export default function VerificationSent({ hash }) {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth
      sx={{
        background:
          "linear-gradient(to top left, rgba(255,255,210,255), rgba(220,255,240,255), rgba(202,250,255,255))",
        minHeight: "100vh",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: "100%",
          padding: 8,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            padding: 3,
            borderRadius: 4,
            background: "white",
          }}
        >
          <Typography component="h1" variant="h5">
            Verification Sent!
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} width="100%">
            <Typography component="body1">
              We have sent an e-mail to you for verification. Follow the link
              provided to finalize the signup process. Please contact us if you
              do not receive it within a few minutes.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color:'white' }}
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Container>
  );
}
