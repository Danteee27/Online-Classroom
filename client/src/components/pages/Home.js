import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {Copyright} from "../Copyright";
import PrimarySearchAppBar from "../PrimarySearchAppBar";

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "api/auth/logout",
                {}
            );
            console.log("Log out successfully", response.data);
            localStorage.setItem("isAuthenticated", "0");
            navigate("/");
            // Add any additional logic or redirection after successful logout
        } catch (error) {
            console.error("Error logging in", error.response.data);
            // Handle errors, display messages, etc.
        }
    };

    const username = localStorage.getItem("username");

    return (
        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Avatar
                    sx={{width: 56, height: 56}}></Avatar>
                <br/>
                <Typography component="h1" variant="h5">
                    Welcome {username ?? 'N/A'}!
                </Typography>
                This is a homepage :D
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color={"error"}
                    sx={{mt: 3, mb: 2}}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </div>
    );
}