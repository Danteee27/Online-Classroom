import * as React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FolderOpenOutlined, MoreVert, TrendingUp} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";


function ClassItem({className, classSubject, teacherName, avatar}) {
    const navigate = useNavigate();

    return (<Card sx={{
        position: 'relative',
        borderRadius: 2,
        boxShadow: 0,
        border: '0.0625rem solid rgb(218,220,224)'
    }}>
        <CardActionArea onClick={()=> navigate('/u/class')}>
            <CardMedia
                component="img"
                height="100"
                image="https://www.gstatic.com/classroom/themes/img_graduation.jpg"
                alt="green iguana"
            />
            <CardContent sx={{position: 'absolute', top: 0, color: 'white'}}>
                <Typography
                    gutterBottom variant="h5" sx={{fontFamily: 'Google'}}>
                    {className ?? 'Class Name'}
                </Typography>
                <Typography variant="body2" sx={{fontFamily: 'Google', mt: -1, mb: '.25rem'}}>
                    {classSubject ?? 'Class Subject'}
                </Typography>
                <Typography variant="body2" sx={{fontFamily: 'Google'}}>
                    {teacherName ?? 'Teacher'}
                </Typography>
            </CardContent>
        </CardActionArea>
        {avatar}
        {!avatar && <Avatar sx={{position: 'absolute', top: 60, right: 20, width: 80, height: 80}}/>}
        <IconButton sx={{position: 'absolute', top: '1ch', right: '1ch', color: 'white'}}><MoreVert
            sx={{color: 'white'}}/></IconButton>
        <div style={{minHeight: 120}}/>
        <CardActions sx={{borderTop: '0.0625rem solid rgb(218,220,224)', display: 'flex', justifyContent: 'flex-end'}}>
            <IconButton><TrendingUp/></IconButton>
            <IconButton><FolderOpenOutlined/></IconButton>
        </CardActions>
    </Card>)
}

export default function HomePage() {

    const classes = [{
        className: '2310-CLC-AWP-20KTPM2',
        classSubject: 'Advanced Web Programming',
        teacher: 'Michael'
    }, {
        className: '2310-CLC-DSA-20KTPM1',
        classSubject: 'Data Structure and Algorithm',
        teacher: 'Jack'
    }, {
        className: '2310-CLC-ML-20KTPM2',
        classSubject: 'Machine Learning',
        teacher: 'Son'
    }];

    return (
        <div style={{
            display: 'grid',
            flexWrap: 'nowrap',
            gap: '1.25rem',
            margin: '1.25rem',
            gridTemplateColumns: 'repeat(4, minmax(100px, 1fr))'
        }}>
            {classes.map((item) => (
                <ClassItem
                    className={item.className}
                    classSubject={item.classSubject}
                    teacherName={item.teacher}
                />
            ))}
        </div>
    );
}