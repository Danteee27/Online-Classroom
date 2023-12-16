import * as React from 'react';
import {useState} from 'react';
import {IconButton, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Add, AssignmentOutlined, MoreVert, PersonOutlined, Send} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

export default function AssignmentPage() {
    const a = {
        name: 'Midterm - Authentication',
        createdAt: 'Nov 15',
        maxGrade: 100,
        studentReview: {
            avatar: '',
            name: 'abc',
            reviewTime: 'Dec 3',
            reason: 'this work contains my ultimate effort. I cannot let it down this easily'
        },
        teacherReview: {
            avatar: '',
            name: 'Michael',
            reviewTime: 'Dec 3',
            reason: 'your opnion is subjective'
        },
        studentGrade: 10,
        description: 'use passport.js'
    }

    const sendReview = () => {
        // todo handle post review
    }

    const theme = useTheme();
    const [review, setReview] = useState("");

    const leftColumn = (
        <Box sx={{display: 'flex'}}>
            <Box sx={{
                background: theme.palette.primary.main,
                p: '.5rem',
                width: '40px',
                height: '40px',
                borderRadius: 100,
                mr: '1rem'
            }}>
                <AssignmentOutlined sx={{fill: 'white',}}/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography variant='h4' sx={{fontFamily:'Google'}}>{a.name}</Typography>
                    <IconButton><MoreVert/></IconButton>
                </Box>
                <Box sx={{display:'flex'}}><Typography variant={'subtitle2'}
                               sx={{
                                   fontFamily: 'Google',
                                   fontWeight: 500,
                                   fontSize: '.875rem'
                               }}>{a.teacherReview.name}</Typography>
                    <Box sx={{mx: '.325rem'}}>•</Box>
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '.875rem',
                                }}>{a.createdAt}</Typography>
                </Box>
                <Typography variant={'subtitle2'}
                            sx={{
                                fontFamily: 'Google',
                                fontSize: '.875rem',
                                borderBottom: '0.0625rem solid ' + theme.palette.primary.main,
                                mb: '1rem',
                                pb: '1rem'
                            }}>
                    <b>{a.studentGrade}</b>/{a.maxGrade}
                </Typography>
                <Typography variant={'body1'}
                            sx={{
                                fontSize: '.875rem',
                                borderBottom: '0.0625rem solid lightgrey',
                                mb: '1rem',
                                pb: '2rem'
                            }}>
                    {a.description}
                </Typography>
                <Box sx={{display: 'flex'}}><PersonOutlined sx={{fill: theme.palette.primary.main}}/>
                    <Typography variant={'h6'}
                                sx={{
                                    fontSize: '1rem',
                                    fontFamily: 'Google',
                                    color: theme.palette.primary.main
                                }}>
                        Student reviews
                    </Typography>
                </Box>
                <ChatDialog avatar={a.studentReview.avatar} name={a.studentReview.name} reason={a.studentReview.reason}
                            time={a.studentReview.reviewTime}/>
                <ChatDialog avatar={a.teacherReview.avatar} name={a.teacherReview.name} reason={a.teacherReview.reason}
                            time={a.teacherReview.reviewTime}/>
                <form autoComplete="off" style={{display: 'flex', paddingTop: '2ch'}} onSubmit={sendReview}>
                    <Box sx={{'& fieldset': {borderRadius: 100}, flexGrow: 1}}>
                        <TextField placeholder={'Add private comment...'}
                                   size="small"
                                   variant="outlined"
                                   onChange={e => setReview(e.target.value)}
                                   value={review}
                                   InputProps={{style: {fontSize: '.875rem'}}}
                                   sx={{display: 'flex'}}/>
                    </Box>
                    <IconButton type={"submit"}><Send/></IconButton>
                </form>
            </Box>
    </Box>)

    function ChatDialog(props) {
        return <Box sx={{display: 'flex', mt: '1rem'}}>
            <Avatar src={props.avatar} sx={{width: '32px', height: '32px'}}/>
            <Box sx={{pl: '.75rem'}}>
                <Box sx={{display: 'flex'}}>
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontFamily: 'Google',
                                    fontWeight: 500,
                                    fontSize: '.875rem'
                                }}>{props.name}</Typography>
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '.75rem',
                                    pt: '.125rem',
                                    pl: '.3rem'
                                }}>{props.time}</Typography>
                </Box>
                <Typography variant={'subtitle2'}
                            sx={{
                                fontWeight: 500,
                                fontSize: '.875rem'
                            }}>{props.reason}</Typography>
            </Box>
        </Box>
    }

    const rightColumn = (
        <Box>
            <Box sx={{
                boxShadow: 3,
                p: 2,
                border: '0.0625rem solid rgb(218,220,224)',
                borderRadius: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', mt: '0.5rem'
                }}><Typography
                    variant={'h5'}
                    sx={{fontColor: 'rgba(0,0,0,.549)', fontFamily: 'Google'}}>
                    Your work
                </Typography>
                    <Typography
                        variant={'h6'}
                        sx={{fontSize: '.875rem', fontColor: 'rgba(0,0,0,.549)', fontFamily: 'Google'}}>
                        Graded
                    </Typography></Box>
                <Button variant={'outlined'} sx={{textTransform: 'none', width: '100%', mt: '1rem'}}>
                    <Add/>
                    <Typography sx={{fontSize: '.875rem', fontFamily: 'Google', fontWeight: 500}}>Add or
                        create</Typography>
                </Button>
                <Button variant={'contained'} sx={{textTransform: 'none', width: '100%', my: '1rem'}}>
                    <Typography sx={{
                        fontSize: '.875rem',
                        fontFamily: 'Google',
                        fontWeight: 500,
                        color: 'white'
                    }}>Resubmit</Typography>
                </Button>
            </Box>


        </Box>)

    return (<Grid
            container
            spacing={3}
            alignItems="top"
            justifyContent="center"
            sx={{margin: '0 auto', mx: 'auto', maxWidth: '1000px',}}
        >
            <Grid item xs={8}>{leftColumn} </Grid>
            <Grid item xs={4}>{rightColumn}</Grid>
        </Grid>
    );
}