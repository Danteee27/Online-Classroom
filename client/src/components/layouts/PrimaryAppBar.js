import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Copyright} from "../Copyright";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Add, Logout} from "@mui/icons-material";
import {MenuItem} from "@mui/material";
import AddClassButton from "./AddClassButton";

export default function PrimaryAppBar({onClick}) {

    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    const [anchorEl, setAnchorEl] = React.useState(null);
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

    const menu = (<Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        elevation={0}
        sx={
            {
                mt: "1px", "& .MuiMenu-paper":
                    {backgroundColor: "transparent",},
            }
        }
    >
        <Box sx={{
            width: '40dvh',
            borderRadius: 10,
            background: '#e9eef6',
            boxShadow: 2,
            margin: 2,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography component="h6" variant="subtitle2" sx={{fontFamily: 'Google'}}>
                {email ?? 'N/A'}
            </Typography>
            <br/>
            <Avatar
                sx={{width: 70, height: 70}}></Avatar>
            <Typography pt={2} component="h1" variant="h5">
                Hi, {username ?? 'N/A'}!
            </Typography>
            <ListItem disablePadding sx={{display: "block", margin: "1rem 0"}}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        px: 2.5,
                        background: '#f8fafd',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        margin: "3px",
                    }}
                >
                    <ListItemText
                        primary={'Manage your Account'}/>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        px: 2.5,
                        background: '#f8fafd',
                        margin: "3px",
                    }}
                >
                    <ListItemText
                        primary={'Languages'}/>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        px: 2.5,
                        background: '#f8fafd',
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        margin: "3px",
                    }}
                    onClick={handleLogout}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            justifyContent: "center",
                        }}
                    >
                        <Logout/>
                    </ListItemIcon>
                    <ListItemText
                        primary={'Sign out'}/>
                </ListItemButton>
            </ListItem>
            <Copyright/>
        </Box>
    </Menu>)

    return (
        <AppBar elevation={0}
                sx={{
                    borderBottom: '0.0625rem solid rgb(218,220,224)',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: '4rem'
                }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={onClick}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h5" component="div" sx={{flexGrow: 1, fontFamily: 'Google'}}>
                    Classroom
                </Typography>
                <div>
                    <AddClassButton/>
                    <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        color="inherit"
                    >
                        <Avatar/>
                    </IconButton>
                    {menu}
                </div>
            </Toolbar>
        </AppBar>
    );
}
