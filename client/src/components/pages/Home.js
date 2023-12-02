import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {Copyright} from "../Copyright";
import PrimarySearchAppBar from "../layouts/PrimaryAppBar";
import AppLayout from "../layouts/AppLayout";

export default function Home() {



    return (
        <div>
            <AppLayout><Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                This is a homepage :D
            </Box></AppLayout>
            <CssBaseline/>
        </div>
    );
}