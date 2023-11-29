import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import {baseUrl} from "../../apis/api.config";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import {Copyright} from "../Copyright";

export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const formData = {
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email'),
        }

        if (formData.password !== data.get('confirmPassword')) {
            toast.error("Passwords incorrect. Try again.");
        }

        try {
            const response = await axios.post(
                baseUrl + "api/auth/signup",
                formData
            );
            console.log("Created account successfully", response.data);
            navigate("/verificationSent");
            localStorage.setItem("isAuthenticated", "1");
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("email", response.data.email);

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Container maxWidth sx={{
            background: 'linear-gradient(to top left, rgba(255,255,210,255), rgba(220,255,240,255), rgba(202,250,255,255))',
            minHeight: '100vh'
        }}>
            <Container component="main" maxWidth="xs" sx={{
                minHeight: '100%',
                padding: 8,
            }}>
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: 2,
                        padding: 3,
                        borderRadius: 4,
                        background: 'white'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create your account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
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
                                    id="username"
                                    label="Username"
                                    name="username"
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
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
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
                <Copyright sx={{mt: 5}}/>
            </Container>
        </Container>
    );
}