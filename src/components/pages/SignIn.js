import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FacebookLoginButton from "../FacebookLoginButton";
import GoogleLoginButton from "../GoogleLoginButton";
import { Copyright } from "../Copyright";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post("api/v1/auth/email/login", formData);

      if (response.data.user.status.name === "Inactive") {
        toast.error("Please verify your email address.");
        return;
      }

      console.log("Log in successfully", response.data);
      navigate("/u/home");

      localStorage.setItem("isAuthenticated", "1");
      localStorage.setItem("firstName", response.data.user.firstName);
      localStorage.setItem("lastName", response.data.user.lastName);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("userId", response.data.user.id);
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            width="100%"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              just
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link href="forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color:'white' }}
            >
              Login
            </Button>
            <Divider> OR</Divider>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              <GoogleLoginButton />
              <FacebookLoginButton />
            </Box>
            <br />

            <Link href="/signUp" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Container>
  );
}
