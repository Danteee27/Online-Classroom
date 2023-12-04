import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { baseUrl } from "../../apis/api.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Copyright } from "../Copyright";

export default function SignUp() {
  const navigate = useNavigate();

const isPasswordValid = (password) => {
  return password.length >= 8 && password.length <= 16;
};

const isEmailValid = (email) => {
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);

  const formData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    password: data.get("password"),
    email: data.get("email"),
  };

  const confirmPassword = data.get("confirmPassword");

  // Validate email format
  if (!isEmailValid(formData.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }
  if (formData.email === ""){
    toast.error("Please enter your email.");
  }

  // Validate password
  if (!isPasswordValid(formData.password) || formData.password !== confirmPassword) {
    toast.error("Please check your password. It should be between 8 and 16 characters and match the confirm password.");
    return;
  }

  if (data.get(confirmPassword) !== formData.password)
  {
    toast.error("Your confirm password does not match.")
  }

  try {
    const response = await axios.post(
      baseUrl + "api/v1/auth/email/register",
      formData
    );

    console.log("Created account successfully", response.data);
    navigate("/verificationSent");
    localStorage.setItem("isAuthenticated", "1");
    localStorage.setItem("firstName", response.data.firstname);
    localStorage.setItem("lastName", response.data.lastname);
    localStorage.setItem("email", response.data.email);
  } catch (error) {
    toast.error(error.message);
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
            Create your account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Container>
  );
}
