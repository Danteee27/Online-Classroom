import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {IconButton} from "@mui/material";
import {Facebook} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const FacebookLoginButton = () => {
    const navigate = useNavigate();
    const responseFacebook = (response) => {
        if (response.status === 'connected') {
            // Make a request to your server to authenticate the user with the received Facebook access token
            fetch('/auth/facebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({accessToken: response.accessToken}),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        // Handle successful login in your parent component or wherever needed
                        console.log('User authenticated:', data.user);

                        navigate("/home");
                        localStorage.setItem("isAuthenticated", "1");
                        localStorage.setItem("username", data.username);
                    } else {
                        // Handle authentication failure
                        console.error('Facebook authentication failed');
                    }
                })
                .catch((error) => {
                    console.error('Error during Facebook authentication:', error);
                });
        } else {
            // Handle Facebook login failure
            console.error('Facebook login failed');
        }
    };

    return (
        <FacebookLogin
            appId='1441819760101668'
            callback={responseFacebook}
            render={renderProps => (
                <IconButton sx={{color: '#187cf4', "&:hover": {backgroundColor: "#187cf411"}}}
                            onClick={renderProps.onClick}>
                    <Facebook/>
                </IconButton>
            )}
        />
    );
};

export default FacebookLoginButton;
