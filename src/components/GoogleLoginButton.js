import { Google } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../apis/api.config";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: onResponseSuccess,
    onError: onResponseError,
  });

  const navigate = useNavigate();

  async function onResponseSuccess(response) {
    console.log(response.access_token);
    try {
      const userInfo = await axios.post(baseUrl + "api/v1/auth/google/login", {
        access_token: response.access_token,
      });
      navigate("/u/home");
      localStorage.setItem("isAuthenticated", "1");
      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);
      console.log(userInfo);
    } catch (error) {
      toast.error(error.message);
      return;
    }
    return;
  }

  function onResponseError(response) {
    toast.error(response.message);
  }

  return (
    <IconButton
      sx={{ color: "#d62d20", "&:hover": { backgroundColor: "#d62d2011" } }}
      onClick={() => login()}
    >
      <Google />
    </IconButton>
  );
};

export default GoogleLoginButton;
