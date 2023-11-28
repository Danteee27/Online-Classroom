import React from 'react';
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import {Google} from "@mui/icons-material";
import axios from "axios";
import {baseUrl} from "../apis/api.config";

const GoogleLoginButton = () => {

    const login = useGoogleLogin({
        onSuccess: onResponseSuccess,
        onError: onResponseError
    })

    const navigate = useNavigate();

    async function onResponseSuccess(response) {
        console.log(response);

        const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${response.access_token}` },
            })
            .then(res => res.data);

        navigate("/home");
        localStorage.setItem("isAuthenticated", "1");
        localStorage.setItem("username", userInfo.name);
        localStorage.setItem("email", userInfo.email);
    }

    function onResponseError(response) {
        toast.error(response.message)
    }

    return (
        <IconButton sx={{color: '#d62d20', "&:hover": {backgroundColor: "#d62d2011"}}} onClick={() => login()}>
            <Google/>
        </IconButton>
    );
};

export default GoogleLoginButton;
