import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Copyright } from "../Copyright";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function ClassInvitation({ hash }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("userId");
  const role = searchParams.get("role");
  const inviterId = searchParams.get("inviterId");
  const classId = searchParams.get("classId");

  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await axios.get(`api/v1/users/${userId}`);
      return response.data;
    },
  });

  const { data: inviter } = useQuery({
    queryKey: ["user", inviterId],
    queryFn: async () => {
      const response = await axios.get(`api/v1/users/${inviterId}`);
      return response.data;
    },
  });

  const { data: classDetails } = useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const response = await axios.get(`api/v1/classes/${classId}`);
      return response.data;
    },
  });

  const fullName = user?.firstName + ' '+user?.lastName;

  const handleAcceptInvitation = async () => {
    const data = {
      userId: userId,
      role: role,
      fullName: fullName
    };

    try {
      const response = await axios.post(
        `api/v1/classes/${classId}/classMemberships`,
        data
      );
      toast.success("You have accepted the invitation. Welcome to the class!");
      navigate(userId !== localStorage.getItem("userId") ? "/login" : "/u");
    } catch (e) {
      toast.error(e.message);
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
            Class Invitation
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} width="100%">
            {user && inviter && classDetails && (
              <Typography component="body1">
                Dear <b>{user.firstName + " " + user.lastName}</b>,
                <br />
                You have been invited by{" "}
                <b>{inviter.firstName + " " + inviter.lastName} </b> to join{" "}
                <b>
                  {classDetails.className}
                  {classDetails.description && " - " + classDetails.description}
                </b>{" "}
                as a <b>{role}</b>.
                <br />
                Kindly confirm your acceptance at your earliest convenience.
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
              onClick={handleAcceptInvitation}
            >
              I Accept the invitation
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Container>
  );
}
