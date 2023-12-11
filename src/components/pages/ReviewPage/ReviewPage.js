import * as React from 'react';
import {useState} from 'react';
import {Dialog, IconButton, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import {ContentCopy, MoreVert, PersonAddAlt} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ReactMultiEmail} from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import {toast, useToast} from "react-toastify";

export default function ReviewPage() {
    const inviteStudentLink = 'https://a.b.com';

    const teachers = [
        {
            name: 'Michael',
            avatar: 'https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J'
        },
        {
            name: 'Jackson',
            status: 'invited'
        },
    ]

    const students = [
        {
            name: 'Phat',
            avatar: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg'
        },
        {
            name: 'Anh',
        },
        {
            name: 'Nhat'
        }
    ]

    const theme = useTheme();


    return (
        <> <Grid
            container
            spacing={3}
            alignItems="top"
            justifyContent="center"
            sx={{margin: '0 auto', maxWidth: '1000px',}}
        >
            <Grid item xs={12}>


            </Grid>
        </Grid>
        </>
    );
}