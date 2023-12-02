import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppLayout from "../layouts/AppLayout";
import ClassPage from "./ClassPage";


export default function Home() {
    return (
        <div>
            <CssBaseline/>
            <AppLayout>
                <ClassPage/>
            </AppLayout>
        </div>
    );
}