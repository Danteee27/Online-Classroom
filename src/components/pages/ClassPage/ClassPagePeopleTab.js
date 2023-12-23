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
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import i18n from "i18next";
import {ImportStudentDialog} from "./ImportStudentDialog";

export default function ClassPagePeopleTab() {

    const {classId} = useParams();
    const {data: classDetails} = useQuery(
        {
            queryKey: ["class", classId],
            queryFn: async () => {
                const response = await axios.get(`api/v1/classes/${classId}`);
                return response.data
            }
        });

    const teachers = classDetails?.classMemberships.filter(member => member.role === "teacher");
    const students = classDetails?.classMemberships.filter(member => member.role === "student");
    const inviteStudentLink = 'https://a.b.com';

    const inviteTeachers = async (event) => {
        event.preventDefault();
        const emails = teacherEmails;

        for (let i = 0; i < emails.length; i++) {
            const data = {
                inviterId: localStorage.getItem('userId'),
                classId: classId,
                email: emails[i],
                role: 'teacher'
            }

            try {
                const response = await axios.post('api/v1/classes/inviteClassMembership', data)
                toast.success(`Invited ${emails[i]} successfully!`);
            } catch (e) {
                toast.error(e.message)
            }
        }

        // on complete
        setInviteTeacherAnchorEl(null)
    }

    const inviteStudents = async (event) => {
        event.preventDefault();
        const emails = studentEmails;

        for (let i = 0; i < emails.length; i++) {
            const data = {
                inviterId: localStorage.getItem('userId'),
                classId: classId,
                email: emails[i],
                role: 'student'
            }

            try {
                const response = await axios.post('api/v1/classes/inviteClassMembership', data)
                toast.success(`Invited ${emails[i]} successfully!`);
            } catch (e) {
                toast.error(e.message)
            }
        }

        // on complete
        setInviteStudentAnchorEl(null)
    }

    const theme = useTheme();

    const [inviteTeacherAnchorEl, setInviteTeacherAnchorEl] = useState(null);
    const [inviteStudentAnchorEl, setInviteStudentAnchorEl] = useState(null);
    const [teacherEmails, setTeacherEmails] = useState([]);
    const [studentEmails, setStudentEmails] = useState([]);

    function Person({name, avatar, isUser, status}) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
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
            <Typography variant={'h4'} sx={{fontFamily: 'Google'}}>{i18n.t('Teachers')}</Typography>
            <IconButton size={'large'}
                        onClick={(e) => setInviteTeacherAnchorEl(e.currentTarget)}
                        sx={{color: theme.palette.primary.main}}><PersonAddAlt/></IconButton>
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
                <Typography variant={'h4'} sx={{fontFamily: 'Google'}}>{i18n.t('Students')}</Typography>
                <Box>
                    <ImportStudentDialog/>
                    <IconButton size={'large'}
                                onClick={(e) => setInviteStudentAnchorEl(e.currentTarget)}
                                sx={{color: theme.palette.primary.main}}><PersonAddAlt/></IconButton></Box>
            </div>)
    }

    const inviteStudentDialog = (
        <Dialog
            fullWidth
            sx={{mx: 'auto', maxWidth: '500px'}}
            open={inviteStudentAnchorEl} onClose={() => setInviteStudentAnchorEl(null)}>
            <form autoComplete="off" onSubmit={inviteStudents}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: '1.25rem',
                        margin: '1.25rem',
                    }}
                >
                    <Typography variant={'h6'} sx={{fontFamily: 'Google', fontSize: 16}}>{i18n.t('Invite students')}</Typography>
                    <Typography variant={'h6'} sx={{fontSize: '0.875rem', fontWeight: 600}}>{i18n.t('Invite link')}</Typography>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginTop: '-1.5rem',
                        borderBottom: '0.0625rem solid rgb(218,220,224)',
                        marginBottom: '-1rem'
                    }}>
                        <Typography variant={'h6'} sx={{fontSize: '0.75rem'}}>{inviteStudentLink}</Typography>
                        <IconButton sx={{color: theme.palette.primary.main}} onClick={() => {
                            navigator.clipboard.writeText(inviteStudentLink);
                            toast.info('Link copied');
                        }}><ContentCopy sx={{width: 24, height: 24}}/></IconButton>
                    </div>
                    <ReactMultiEmail
                        placeholder={i18n.t('Input student emails')}
                        emails={studentEmails}
                        onChange={(_emails) => setStudentEmails(_emails)}
                        getLabel={(email, index, removeEmail) => {
                            return (
                                <div data-tag key={index} style={{fontSize: 14}}>
                                    <div data-tag-item style={{fontSize: 14}}>{email}</div>
                                    <span data-tag-handle onClick={() => removeEmail(index)}
                                          style={{fontSize: 14}}>×</span>
                                </div>
                            );
                        }}
                        style={{
                            minHeight: '2rem',
                            border: 'none',
                            borderBottom: '0.0625rem solid rgb(218,220,224)',
                            fontSize: 14
                        }}>
                    </ReactMultiEmail>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={() => setInviteStudentAnchorEl(null)} color={'inherit'}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>{i18n.t('Cancel')}</Button>
                        <Button type={"submit"} disabled={studentEmails.length === 0}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>{i18n.t('Invite')}</Button>
                    </div>
                </Box>
            </form>
        </Dialog>
    )

    const inviteTeacherDialog = (
        <Dialog
            fullWidth
            sx={{mx: 'auto', maxWidth: '500px'}}
            open={inviteTeacherAnchorEl} onClose={() => setInviteTeacherAnchorEl(null)}>
            <form autoComplete="off" onSubmit={inviteTeachers}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: '1.25rem',
                        margin: '1.25rem',
                    }}
                ><Typography variant={'h6'} sx={{fontFamily: 'Google', fontSize: 16}}>{i18n.t('Invite teachers')}</Typography>
                    <ReactMultiEmail
                        placeholder={i18n.t('Input teacher emails')}
                        emails={teacherEmails}
                        onChange={(_emails) => setTeacherEmails(_emails)}
                        getLabel={(email, index, removeEmail) => {
                            return (
                                <div data-tag key={index} style={{fontSize: 14}}>
                                    <div data-tag-item style={{fontSize: 14}}>{email}</div>
                                    <span data-tag-handle onClick={() => removeEmail(index)}
                                          style={{fontSize: 14}}>×</span>
                                </div>
                            );
                        }}
                        style={{
                            minHeight: '2rem',
                            border: 'none',
                            borderBottom: '0.0625rem solid rgb(218,220,224)',
                            fontSize: 14
                        }}>
                    </ReactMultiEmail>
                    <Typography variant={'body2'}>
                        {i18n.t('Teachers you add can do everything you can, except delete the class.')}
                    </Typography>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={() => setInviteTeacherAnchorEl(null)} color={'inherit'}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>{i18n.t('Cancel')}</Button>
                        <Button type={"submit"} disabled={teacherEmails.length === 0}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>{i18n.t('Invite')}</Button>
                    </div>
                </Box>
            </form>
        </Dialog>
    )

    return (
        <> <Grid
            container
            spacing={3}
            alignItems="top"
            justifyContent="center"
            sx={{margin: '0 auto', maxWidth: '1000px',}}
        >
            <Grid item xs={12}>
                <TeachersHeader/>
                {teachers &&
                    <Person name={teachers[0]?.user?.firstName + ' ' + teachers[0]?.user?.lastName }
                            // status={teachers[0].status}
                            // avatar={teachers[0].avatar}
                    />}
                {teachers && teachers.slice(1).map(teacher => {
                    return <div style={{borderTop: '0.0625rem solid rgb(218,220,224)',}}>
                        <Person name={teacher?.user?.firstName + ' ' + teacher?.user?.lastName }
                                // status={teacher.status}
                                // avatar={teacher.avatar}
                        /></div>
                })}
                <StudentsHeader/>
                {students != null && students.length > 0 &&
                    <Person name={students[0]?.fullName ?? students[0]?.user?.firstName + ' ' + students[0]?.user?.lastName}
                            // status={students[0].status}
                            // avatar={students[0].avatar}
                    />}
                {students && students.slice(1).map(student => {
                    return <div style={{borderTop: '0.0625rem solid rgb(218,220,224)',}}>
                        <Person name={student?.fullName ?? student?.user?.firstName + ' ' + student?.user?.lastName}
                                // status={teacher.status}
                                // avatar={teacher.avatar}
                        /></div>
                })}
            </Grid>
        </Grid>
            {inviteTeacherDialog}
            {inviteStudentDialog}
        </>
    );
}