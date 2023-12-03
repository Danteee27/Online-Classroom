import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import {Add} from "@mui/icons-material";
import {Dialog, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function AddClassButton() {
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const [anchorElCreateClass, setAnchorElCreateClass] = React.useState(null);

    const [className, setClassName] = React.useState("");
    const [classNameError, setClassNameError] = React.useState(false);

    const [section, setSection] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [room, setRoom] = React.useState("");

    const handleCreateClass = (event) => {
        event.preventDefault();

        setClassNameError(false);

        if (className === '') {
            setClassNameError(true);
            return;
        }

        const data = {
            className: className,
            section: section,
            subject: subject,
            room: room
        }

        // TODO: HANDLE CREATE CLASSROOM HERE

        // on complete
        setAnchorElCreateClass(null);
    }

    const noticeDialog = (
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
                    <TextField label="Section" variant="filled"
                               onChange={e => setSection(e.target.value)}
                               value={section}/>
                    <TextField label="Subject" variant="filled"
                               onChange={e => setSubject(e.target.value)}
                               value={subject}/>
                    <TextField label="Room" variant="filled"
                               onChange={e => setRoom(e.target.value)}
                               value={room}/>
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
        <MenuItem onClick={() => {
        }}>
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
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => setAnchorElMenu(e.currentTarget)}
                color="inherit"
            >
                <Add/>
            </IconButton>
            {addClass}
            {noticeDialog}
        </>
    );
}
