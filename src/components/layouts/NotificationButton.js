import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import {DoneAll, Notifications} from "@mui/icons-material";
import {Badge} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export default function NotificationButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const notifications = [
        {
            message: 'Michael has reviewed your request and finalized your score',
            seen: true,
        },
        {
            message: 'Your assignment has been finalized',
            seen: false,
        },
        {
            message: 'Phat has submitted a review request',
            seen: false,
        },
        {
            message: 'Phat has replied to your grade review',
            seen: true,
        },
        {
            message: 'Michael has replied to your grade review request',
            seen: false,
        }
    ]
    const hasNewNotification = notifications?.some(notification => notification?.seen === false ?? false) ?? false;

    const handleMarkAllAsReadClick = async () => {

    }

    function NotificationItem(props) {
        return (
            <Button sx={{
                textTransform: 'none', textAlign:'start', color:'#5f6368',
                display: 'flex', width: '100%', gap: 1, background: 'transparent', p: 2, borderRadius: 3,
                ':hover': {
                    background: '#e0e5ec',
                }
            }}>
                <Avatar sx={{width: '40px', height: '40px'}}/>
                <Typography>{props.message}</Typography>
                <Badge variant={'dot'} color={'error'} invisible={props.seen}/>
            </Button>
        )
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
                mt: "1px", "& .MuiMenu-paper":
                    {backgroundColor: "transparent"}
            }}
        >
            <Box sx={{
                width: '40dvh',
                borderRadius: 10,
                background: '#e9eef6',
                boxShadow: 2,
                margin: 2,
                marginRight: 7,
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant="h6" sx={{
                    fontFamily: 'Google',
                    borderBottom: '0.0625rem solid rgb(218,220,224)'
                }}>Notifications</Typography>
                <Button variant={'text'} sx={{textTransform: 'none'}} onClick={handleMarkAllAsReadClick} startIcon={<DoneAll/>}>Mark all as read</Button>
                {notifications.map(notification => <NotificationItem message={notification?.message ?? ''}
                                                                     seen={notification?.seen ?? false}/>)}
            </Box>
        </Menu>)

    return (
        <>
            <IconButton
                size="large"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
            >
                <Badge color="error" variant="dot" overlap="circular" invisible={!hasNewNotification}>
                    <Notifications/>
                </Badge>
            </IconButton>
            {notificationMenu}
        </>
    );
}
