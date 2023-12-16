import * as React from 'react';
import {useState} from 'react';
import {IconButton, Tooltip, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Add, ContentCopy, MoreVert, PersonOutlined, Send} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

export default function AssignmentPage() {
    const classCode = "cl75z6n";

    const theme = useTheme();

    const sendReview = () => {
        // todo handle post review
    }

    const leftColumn = (<Box>
        <Box sx={{border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2, padding: '1ch 2ch'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                < Typography variant={'subtitle2'} sx={{fontFamily: 'Google', justifyContent: 'space-between'}}>
                    Class invite link
                </Typography>
                <IconButton><MoreVert/></IconButton>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                <Typography variant={'h6'}
                            sx={{
                                fontFamily: 'Google',
                                color: theme.palette.primary.main,
                                alignContent: 'end'
                            }}>{classCode}
                </Typography>
                <Tooltip title={'copy'}><IconButton><ContentCopy sx={{color: theme.palette.primary.main}}/></IconButton></Tooltip>
            </Box>
        </Box>
        <Box sx={{border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2, padding: 2, mt: 3}}>
            < Typography variant={'subtitle2'} sx={{fontFamily: 'Google', justifyContent: 'space-between'}}>
                Upcoming
            </Typography>
            <Typography variant={'caption'}>
                No work due soon
            </Typography>
            <Button sx={{
                textTransform: 'none',
                fontWeight: 600,
                mb: -1,
                mr: -1,
                ml: 'auto',
                display: 'block'
            }}>
                <Typography variant={'subtitle2'}
                            sx={{fontFamily: 'Google', fontWeight: 500, fontSize: '.875rem'}}>
                    View all
                </Typography>
            </Button>
        </Box>
    </Box>)

    const studentReview = {
        avatar: '',
        name: 'abc',
        reviewTime: 'Dec 3',
        reason: 'this work contains my ultimate effort. I cannot let it down this easily'
    };
    const teacherReview = {avatar: '', name: 'Michael', reviewTime: 'Dec 3', reason: 'your opnion is subjective'}

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

    const [review, setReview] = useState("");

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

            <Box mt={3}
                 sx={{px: 2, py: 2, border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2,
                     boxShadow: 3,}}>
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
                <ChatDialog avatar={studentReview.avatar} name={studentReview.name} reason={studentReview.reason}
                            time={studentReview.reviewTime}/>
                <ChatDialog avatar={teacherReview.avatar} name={teacherReview.name} reason={teacherReview.reason}
                            time={teacherReview.reviewTime}/>
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