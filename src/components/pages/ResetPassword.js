import { Divider, IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Copyright } from "../Copyright";
import axios from "axios";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const isPasswordValid = (password) => {
      return password.length >= 8 && password.length <= 16;
    };

    const formData = {
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
    if (
      !isPasswordValid(formData.password) ||
      formData.password !== formData.confirmPassword
    ) {
      toast.error(
        "Please check your password. It should be between 8 and 16 characters and match the confirm password."
      );
      return;
    }
    try {
      if (formData.confirmPassword !== formData.password) {
        toast.error("Please enter the same password twice.");
        return;
      }

      const response = await axios.post("api/v1/auth/reset/password", {
        hash: searchParams.get("hash"),
        password: formData.password,
      });
      toast("Password reset successfully.");

      navigate("/login");
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
            Reset Password
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
              id="password"
              label="New Password"
              name="password"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Divider> OR</Divider>
            <br />

            <Link href="/login" variant="body2">
              {"Back to Log In"}
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Container>
  );
}
