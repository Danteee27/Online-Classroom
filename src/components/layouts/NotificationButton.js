import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { DoneAll, Notifications } from "@mui/icons-material";
import { Badge } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import i18n from "i18next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SocketContext } from "../../context/socket";
import { toast } from "react-toastify";
import { useNavigate
 } from "react-router-dom";
export default function NotificationButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { data: notifications, refetch } = useQuery({
    queryKey: ["userId", userId],
    queryFn: async () => {
      const response = await axios.get(
        `api/v1/classes/user/${userId}/notifications`
      );
      console.log(response.data);
      return response.data;
    },
  });

  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    socket.on(userId, (notification) => {
      toast.info(notification.title);
      console.log(notification);
      refetch();
    });

    return () => socket.off(userId);
  });

  const hasNewNotification =
    notifications?.some(
      (notification) => notification?.seen === false ?? false
    ) ?? false;

  const handleMarkAllAsReadClick = async () => {
    const notification = {
      senderId: 55,
      receiverId: 55,
      classMembershipAssignmentId: 18,
      title: "You have a new review request",
      description: "Phat has submitted a review request",
    };

    socket.emit("clientNotification", notification);
  };

  const {data: userDetails} = useQuery(
    {
        queryKey: ["user", localStorage.getItem("userId").toString()],
        queryFn: async () => {
            const response = await axios.get(`api/v1/users/${localStorage.getItem("userId").toString()}`);
            return response.data
        }
  });
  const navigateToNewPath = (assignmentId, studentId, classId) => {
    if (!studentId){
      toast.error("Student hasn't submitted!")
      return;
    }
    const newPath = `/u/c/${classId}/a/${assignmentId}/m/${studentId}`; // Adjust the numbers as needed
    navigate(newPath);
  };
  const getAssignmentId = (assignmentId) =>{
    if (assignmentId){
        console.log(userDetails);
    }
  }
  function NotificationItem(props) {
    return (
      <Button
        sx={{
          textTransform: "none",
          textAlign: "start",
          color: "#5f6368",
          display: "flex",
          width: "100%",
          gap: 1,
          background: "transparent",
          p: 2,
          borderRadius: 3,
          ":hover": {
            background: "#e0e5ec",
          },
        }}
        onClick={navigate('')}
      >
        <Avatar sx={{ width: "40px", height: "40px" }} />
        <div>
          <Typography variant="subtitle1">
            {props.sender.user.lastName + " " + props.sender.user.firstName}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {props.title}
          </Typography>
          <Typography variant="body2">{props.description}</Typography>
          <Typography variant="body2">{props.assignmentName}</Typography>
        </div>
        <Badge variant={"dot"} color={"error"} invisible={props.isRead} />
      </Button>
    );
  }

  const notificationMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      elevation={0}
      sx={{
        mt: "1px",
        "& .MuiMenu-paper": { backgroundColor: "transparent" },
      }}
    >
      <Box
        sx={{
          width: "40dvh",
          borderRadius: 10,
          background: "#e9eef6",
          boxShadow: 2,
          margin: 2,
          marginRight: 7,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Google",
            borderBottom: "0.0625rem solid rgb(218,220,224)",
          }}
        >
          {i18n.t("Notifications")}
        </Typography>
        <Button
          variant={"text"}
          sx={{ textTransform: "none" }}
          onClick={handleMarkAllAsReadClick}
          startIcon={<DoneAll />}
        >
          {i18n.t("Mark all as read")}
        </Button>
        {notifications?.map((notification) => (
          <NotificationItem {...notification} />
        ))}
      </Box>
    </Menu>
  );

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
      >
        <Badge
          color="error"
          variant="dot"
          overlap="circular"
          invisible={!hasNewNotification}
        >
          <Notifications />
        </Badge>
      </IconButton>
      {notificationMenu}
    </>
  );
}
