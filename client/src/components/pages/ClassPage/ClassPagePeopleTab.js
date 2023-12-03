import * as React from 'react';
import {IconButton, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import {MoreVert, PersonAddAlt} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function ClassPagePeopleTab() {

    const theme = useTheme();
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


    function Person({name, avatar, isUser, status}) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderBottom: '0.0625rem solid rgb(218,220,224)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <Avatar src={avatar} alt={name} sx={{width: 32, height: 32}}> {!avatar && name[0]}</Avatar>
                    <Typography variant={'body1'} sx={{
                        fontFamily: 'Google',
                        fontWeight: 500
                    }}>{name} {status && `(` + (status) + `)`}</Typography></div>
                {!isUser && <IconButton><MoreVert/></IconButton>}
            </div>);
    }

    const TeachersHeader = () => {
        return (<div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: theme.palette.primary.main,
            borderBottom: '0.0625rem solid ' + theme.palette.primary.main,
            marginBottom: '1rem'
        }}>
            <Typography variant={'h4'} sx={{fontFamily: 'Google'}}>Teachers</Typography>
            <IconButton size={'large'} sx={{
                color: theme.palette.primary.main
            }}><PersonAddAlt/></IconButton>
        </div>)
    }

    const StudentsHeader = () => {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: theme.palette.primary.main,
                borderBottom: '0.0625rem solid ' + theme.palette.primary.main,
                margin: '1rem 0'
            }}>
                <Typography variant={'h4'} sx={{fontFamily: 'Google'}}>Students</Typography>
                <IconButton size={'large'} sx={{
                    color: theme.palette.primary.main
                }}><PersonAddAlt/></IconButton>
            </div>)
    }

    return (
        <Grid
            container
            spacing={3}
            alignItems="top"
            justifyContent="center"
            sx={{margin: '0 auto', maxWidth: '1000px',}}
        >
            <Grid item xs={12}>
                <TeachersHeader/>
                {teachers.map(teacher =>{
                    return <Person name={teacher.name} status={teacher.status} avatar={teacher.avatar}/>
                })}
                <StudentsHeader/>
                {students.map(student =>{
                    return <Person name={student.name} status={student.status} avatar={student.avatar}/>
                })}
            </Grid>
        </Grid>
    );
}