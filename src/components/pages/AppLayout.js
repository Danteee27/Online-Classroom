import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ClassPage from "./ClassPage/ClassPage";
import Box from "@mui/material/Box";
import PrimaryAppBar from "../layouts/PrimaryAppBar";
import AppDrawer from "../layouts/AppDrawer";
import {styled} from "@mui/material/styles";
import HomePage from "./HomePage";
import {Outlet} from "react-router-dom";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function AppLayout() {
    const [openDrawer, setOpenDrawer] = React.useState(true);

    return (
        <div>
            <CssBaseline/>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <PrimaryAppBar onClick={() => setOpenDrawer(!openDrawer)}/>
                <AppDrawer open={openDrawer}/>
                <Box component="main" sx={{flexGrow: 1, p: 0}}>
                    <DrawerHeader/>
                    <Outlet/>
                </Box>
            </Box>
        </div>
    );
}