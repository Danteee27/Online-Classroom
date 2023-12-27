import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import { Copyright } from "../Copyright";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function ClassInvitationByLink({ hash }) {
  const navigate = useNavigate();
  const classCode = useParams().classCode;
  const userId = localStorage.getItem('userId');
  const fullName = localStorage.getItem('firstName') + ' '+ localStorage.getItem('lastName');

  const { data: classDetails } = useQuery({
    queryKey: ["classByClassCode", classCode],
    queryFn: async () => {
      const response = await axios.get(`api/v1/classes/byClasscode/${classCode}`);
      return response.data;
    },
  });

  const handleAcceptInvitation = async () => {
    const data = {
      fullName: fullName,
      userId: userId.toString(),
      role: 'student',
    };
console.log(data)
    try {
      const response = await axios.post(
        `api/v1/classes/${classDetails?.id}/classMemberships`,
        data
      );
      toast.success("You have accepted the invitation. Welcome to the class!");
      navigate("/u/home");
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
            {classDetails && (
              <Typography component="body1">
                You have been invited to join{' '}
                <b>
                  {classDetails.className}
                  {classDetails.description && " - " + classDetails.description}
                </b>{" "}
                as a <b>{'student'}</b>.
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
