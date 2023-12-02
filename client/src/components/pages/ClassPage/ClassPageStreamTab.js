import * as React from 'react';
import {IconButton, Paper, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import {CropFree, InfoOutlined, MoreVert} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

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
                    Class code
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
                <IconButton><CropFree sx={{color: theme.palette.primary.main}}/></IconButton>
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
                alignContent: 'end',
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
        <Box sx={{border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2}}>
            Announce something to your class
        </Box>
        <Box mt={3} sx={{border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2}}>
            This is where you can talk to your class
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