import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export function Copyright(props) {
    return (
        <Typography variant="caption" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                AWP Online Classroom
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}