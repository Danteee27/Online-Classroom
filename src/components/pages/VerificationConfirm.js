import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Copyright } from "../Copyright";
import axios from "axios";
import { baseUrl } from "../../apis/api.config";

export default function VerificationConfirm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const confirm = async () => {
    try {
      const response = await axios.post(baseUrl + "api/v1/auth/email/confirm", {
        hash: searchParams.get("hash"),
      });

      console.log("Confirmed registration", response.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
            Verification Confirm
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} width="100%">
            <Typography component="body1">
              Thank you. Please click this button to verify your account.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={confirm}
            >
              Confirm registration
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Container>
  );
}
