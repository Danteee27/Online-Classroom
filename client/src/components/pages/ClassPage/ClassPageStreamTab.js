import * as React from 'react';
import {IconButton, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {InfoOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function ClassPageStreamTab() {

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
                            sx={{fontFamily: 'Google', fontWeight: 500, color: 'white'}}>ASD</Typography>
                <Typography variant='h6'
                            sx={{fontFamily: 'Google', fontWeight: 500, color: 'white'}}>asd</Typography>
            </Box>
            <IconButton sx={{color: 'white', position: 'absolute', right: '.5rem', bottom: '.5rem'}}>
                <InfoOutlined/>
            </IconButton>
        </Paper>
    )

    const leftColumn = (<Box>
        <Box sx={{border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2}}>
            Class code
            <br/>
            cl75z6n
        </Box>
        <Box mt={3} sx={{border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2}}>
            Upcoming
            <br/>
            No work due soon
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
            <Grid item xs={3}>{leftColumn} </Grid>
            <Grid item xs={9}>{rightColumn}</Grid>
        </Grid>
    );
}