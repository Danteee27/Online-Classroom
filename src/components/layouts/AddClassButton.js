import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import {Add} from "@mui/icons-material";
import {Dialog, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import {baseUrl} from "../../apis/api.config";

export default function AddClassButton() {
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const [anchorElCreateClass, setAnchorElCreateClass] = React.useState(null);
    const [anchorElJoinClass, setAnchorElJoinClass] = React.useState(null);

    const [className, setClassName] = React.useState("");
    const [classNameError, setClassNameError] = React.useState(false);

    const [section, setSection] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [room, setRoom] = React.useState("");

    const [classInviteLink, setClassInviteLink] = React.useState("");
    const [classInviteLinkError, setClassInviteLinkError] = React.useState(false);

    const handleJoinClass = (event) => {
        event.preventDefault();

        setClassInviteLinkError(false);

        if (classInviteLink === '') {
            setClassInviteLinkError(true);
            return;
        }

        const data = {
            classInviteLink: classInviteLink,
        }

        // TODO: HANDLE JOIN CLASSROOM HERE

        // on complete
        setAnchorElJoinClass(null);
    }

    const handleCreateClass = async (event) => {
        event.preventDefault();

        setClassNameError(false);

        if (className === '') {
            setClassNameError(true);
            return;
        }

        const data = {
            userId: localStorage.getItem('userId').toString(),
            className: className,
            description: subject,
        }

        const response = await axios.post( 'api/v1/classes', data);
        console.log(response)
        // on complete
        setAnchorElCreateClass(null);
    }

    const joinClassForm = (
        <Dialog
            fullWidth
            open={Boolean(anchorElJoinClass)}
            onClose={() => setAnchorElJoinClass(null)}>
            <form autoComplete="off" onSubmit={handleJoinClass}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: '1.25rem',
                        margin: '1.25rem',
                    }}
                ><Typography variant={'h6'} sx={{fontFamily: 'Google', fontSize: 16}}>Join class</Typography>
                    <TextField label="Class invite link"
                               required variant="filled"
                               onChange={e => setClassInviteLink(e.target.value)}
                               value={classInviteLink}
                               error={classInviteLinkError}/>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={() => setAnchorElJoinClass(null)} color={'inherit'}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>Cancel</Button>
                        <Button type={"submit"}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>Join</Button>
                    </div>
                </Box>
            </form>
        </Dialog>)

    const createClassForm = (
        <Dialog
            fullWidth
            open={Boolean(anchorElCreateClass)}
            onClose={() => setAnchorElCreateClass(null)}>

            <form autoComplete="off" onSubmit={handleCreateClass}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: '1.25rem',
                        margin: '1.25rem',
                    }}
                ><Typography variant={'h6'} sx={{fontFamily: 'Google', fontSize: 16}}>Create class</Typography>

                    <TextField label="Class name"
                               required variant="filled"
                               onChange={e => setClassName(e.target.value)}
                               value={className}
                               error={classNameError}/>
                    <TextField label="Subject" variant="filled"
                               onChange={e => setSubject(e.target.value)}
                               value={subject}/>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={() => setAnchorElCreateClass(null)} color={'inherit'}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>Cancel</Button>
                        <Button type={"submit"}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>Create</Button>
                    </div>
                </Box>
            </form>
        </Dialog>)

    const addClass = (<Menu
        id="menu-add"
        anchorEl={anchorElMenu}
        onClose={() => setAnchorElMenu(null)}
        open={Boolean(anchorElMenu)}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}>
        <MenuItem onClick={(e) => setAnchorElJoinClass(e.currentTarget)}>
            Join Class
        </MenuItem>
        <MenuItem onClick={(e) => setAnchorElCreateClass(e.currentTarget)}>
            Create Class
        </MenuItem>
    </Menu>);

    return (
        <>
            <IconButton
                size="large"
                onClick={(e) => setAnchorElMenu(e.currentTarget)}
                color="inherit"
            >
                <Add/>
            </IconButton>
            {addClass}
            {joinClassForm}
            {createClassForm}
        </>
    );
}
