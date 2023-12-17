import * as React from 'react';
import {useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Language, Lock} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import {Dialog, MenuItem, Select, useTheme} from "@mui/material";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import TextField from "@mui/material/TextField";
import {toast} from "react-toastify";
import axios from "axios";
import {baseUrl} from "../../apis/api.config";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

export default function SettingsPage() {
    const theme = useTheme();
    const [language, setLanguage] = useState(0);

    const userId = localStorage.getItem('userId');
    const {data: user} = useQuery(
        {
            queryKey: ["user", userId],
            queryFn: async () => {
                const response = await axios.get(`api/v1/users/${userId}`);
                return response.data
            }
        });

    const isPasswordValid = (password) => {
        return password.length >= 8 && password.length <= 16;
    };

    const navigate = useNavigate();
    const handleChangePassword = async(e) =>{
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const currentPassword = data.get("currentPassword");
        const newPassword = data.get("newPassword");
        const confirmNewPassword = data.get("confirmNewPassword");

        // Validate password
        if (!isPasswordValid(newPassword) ||
            newPassword !== confirmNewPassword
        ) {
            toast.error(
                "Please check your password. It should be between 8 and 16 characters and match the confirm password."
            );
            return;
        }

        if (confirmNewPassword !== newPassword) {
            toast.error("Your confirm password does not match.");
            return;
        }


        const formData = {
            password: newPassword,
        };

        try {
            const response = await axios.post(
                baseUrl + "api/v1/auth/email/register",
                formData
            );

            console.log("Created account successfully", response.data);
            navigate("/verificationSent");
        } catch (error) {
            toast.error(error.message);
        }
    }

    const [anchorElChangePassword, setAnchorElChangePassword] = React.useState(null);
    const changePasswordForm = (
        <Dialog
            fullWidth
            open={Boolean(anchorElChangePassword)}
            onClose={() => setAnchorElChangePassword(null)}>

            <Box
                component="form"
                noValidate
                onSubmit={handleChangePassword}
                sx={{p: 3}}
            >
                <Typography variant={'h4'} sx={{fontFamily: 'Google'}}>Change Password</Typography>
                <Grid container spacing={2} sx={{pt: 2}}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="currentPassword"
                            label="Current Password"
                            name="currentPassword"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="newPassword"
                            label="New Password"
                            name="newPassword"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            id="confirmNewPassword"
                            label="Confirm New Password"
                            name="confirmNewPassword"
                        />
                    </Grid>
                </Grid>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2, color: 'white', mr: 0, fontFamily: 'Google'}}>
                        Save
                    </Button>
                </div>
            </Box>
        </Dialog>)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const formData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
        };

        try {
            const response = await axios.patch(
                `api/v1/users/${localStorage.getItem('userId')}`,
                formData
            );

            toast.success("Account updated successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };

    function GroupSettings({header, children}) {
        return (<Box sx={{
            border: '0.0625rem solid rgb(218,220,224)',
            borderRadius: 2,
            py: '1.5rem',
            px: '1.5rem',
            mb: '.50rem'
        }}>
            <Typography variant={'h4'} sx={{fontFamily: 'Google'}}>{header}</Typography>
            {children}
        </Box>)
    }

    const profileSettings = (<GroupSettings header={'Profile'}>
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{mt: 3}}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        defaultValue={user?.email}
                        disabled
                        variant={'filled'}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        defaultValue={user?.firstName}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        defaultValue={user?.lastName}
                    />
                </Grid>
            </Grid>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    variant="outlined"
                    sx={{
                        mt: 3,
                        mb: 2,
                        color: theme.palette.primary.main,
                        mr: 0,
                        fontFamily: 'Google',
                        textTransform: 'none'
                    }}
                    // onClick={(e) => setAnchorElChangePassword(e.currentTarget)}
                >
                    <Lock sx={{width: 20, height: 20, fill: theme.palette.primary.main}}/> &nbsp;&nbsp;Change Password
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2, color: 'white', mr: 0, fontFamily: 'Google'}}>
                    Save
                </Button>
            </div>
        </Box>
    </GroupSettings>);


    const languages = (<GroupSettings header={'Other'}>
        <List>
            <ListItem>
                <ListItemIcon> <Language/></ListItemIcon>
                <ListItemText>Languages</ListItemText>
                <Select
                    value={language}
                    sx={{width: '200px'}}
                    onChange={e => setLanguage(e.target.value)}>
                    <MenuItem value={0}><span className="fi fi-us"/>&nbsp;English (US)</MenuItem>
                    <MenuItem value={1}><span className="fi fi-vn"/>&nbsp;Vietnamese</MenuItem>
                </Select>
            </ListItem>
        </List>
    </GroupSettings>);

    return (
        <><Grid
            container
            spacing={3}
            alignItems="top"
            justifyContent="center"
            sx={{margin: '0 auto', mx: 'auto', maxWidth: '800px',}}
        >
            <Grid item xs={12}>{profileSettings}</Grid>
            <Grid item xs={12}>{languages} </Grid>
        </Grid>
            {changePasswordForm}
        </>
    );
}
