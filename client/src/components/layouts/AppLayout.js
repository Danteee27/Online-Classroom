import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import PrimaryAppBar from "./PrimaryAppBar";
import '../../App.css';
import AppDrawer from "./AppDrawer";


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function AppLayout({children}) {

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenOrClosed = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <PrimaryAppBar onClick={handleDrawerOpenOrClosed}/>
            <AppDrawer open={open}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
}
