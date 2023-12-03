import * as React from 'react';
import {IconButton, Paper, Tooltip, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import {ContentCopy, InfoOutlined, MoreVert} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import EmptyConversation from "../../misc/EmptyConversation";
import Settings from "../../misc/Settings";

export default function ClassPageStreamTab() {
    const classCode = "cl75z6n";
    const className = "2310-CLC-AWP-20KTPM2"
    const classSubject = "Advanced Web Programming"

    const theme = useTheme();
    const classCover = (
        <Paper elevation={0} sx={{
            backgroundSize: 'cover',
            backgroundImage: 'url(https://www.gstatic.com/classroom/themes/img_graduation.jpg)',
            height: '240px',
            borderRadius: 2,
            backgroundPosition: 'center',
            position: 'relative'
        }}>
            <Box sx={{position: 'absolute', left: '2.5rem', bottom: '1rem'}}>
                <Typography variant='h4'
                            sx={{fontFamily: 'Google', fontWeight: 500, color: 'white'}}>{className}</Typography>
                <Typography variant='h6'
                            sx={{fontFamily: 'Google', fontWeight: 500, color: 'white'}}>{classSubject}</Typography>
            </Box>
            <IconButton sx={{color: 'white', position: 'absolute', right: '.5rem', bottom: '.5rem'}}>
                <InfoOutlined/>
            </IconButton>
        </Paper>
    )

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

    const rightColumn = (<Box>
        <Box sx={{
            boxShadow: 3,
            p: 2,
            border: '0.0625rem solid rgb(218,220,224)',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Box sx={{gap: 1, display: 'flex', alignItems: 'center'}}><Avatar/>
                <Typography
                    sx={{fontSize: '.8125rem', fontColor: 'rgba(0,0,0,.549)'}}>
                    Announce something to your class
                </Typography></Box>
            <IconButton>
                <svg fill='#5f6368' focusable="false" width="24" height="24" viewBox="0 0 24 24" className=" NMm5M">
                    <path d="M19 5H4v6h2V7h13M5 19h15v-6h-2v4H5"></path>
                    <path
                        d="M16.29 10.71l-1.41-1.42L18.17 6l-3.29-3.29 1.41-1.42L21 6zm-8.58 12L3 18l4.71-4.71 1.41 1.42L5.83 18l3.29 3.29z"></path>
                </svg>
            </IconButton>
        </Box>
        <Box mt={3} sx={{px: 4, py: 4, border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2, display: 'flex'}}>
            <EmptyConversation style={{width: '150px'}}/>
            <div style={{marginLeft: '4ch'}}><Typography variant={'h5'}
                                                         sx={{fontFamily: 'Google', color: theme.palette.primary.main}}>
                This is where you can talk to your class
            </Typography>
                <Typography variant={'subtitle2'}
                            sx={{fontFamily: 'Google'}}>
                    Use the stream to share announcements, post assignments, and respond to student questions
                </Typography>
                <Button sx={{
                    textTransform: 'none', fontFamily: 'Google', border: '0.0625rem solid rgb(218,220,224)',
                    mb: -1,
                    mr: -1,
                    ml: 'auto',
                    display: 'flex', alignItems: 'center'
                }}>
                    <Settings fill={theme.palette.primary.main} style={{width: '20px', marginRight: '1ch'}}/>
                    Stream settings
                </Button>
            </div>
        </Box>
    </Box>)

    return (<Grid
            container
            spacing={3}
            alignItems="top"
            justifyContent="center"
            sx={{margin: '0 auto', mx: 'auto', maxWidth: '1000px',}}
        >
            <Grid item xs={12}>{classCover}</Grid>
            <Grid item xs={2.5}>{leftColumn} </Grid>
            <Grid item xs={9.5}>{rightColumn}</Grid>
        </Grid>
    );
}