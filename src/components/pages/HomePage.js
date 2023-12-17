import * as React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FolderOpenOutlined, MoreVert, TrendingUp} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

function ClassItem({ className, classSubject, teacherName, avatar, classId }) {
    const navigate = useNavigate();
  
    return (
      <Card
        sx={{
          position: 'relative',
          borderRadius: 2,
          boxShadow: 0,
          border: '0.0625rem solid rgb(218,220,224)',
        }}
      >
        <CardActionArea onClick={() => navigate('/u/c/' + classId)}>
          <CardMedia
            component="img"
            height="100"
            image="https://www.gstatic.com/classroom/themes/img_graduation.jpg"
            alt="green iguana"
          />
          <CardContent
            sx={{ position: 'absolute', top: 0, color: 'white' }}
          >
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontFamily: 'Google' }}
            >
              {className ?? 'Class Name'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'Google', mt: -1, mb: '.25rem' }}
            >
              {classSubject ?? 'Class Subject'}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'Google' }}>
              {teacherName ?? 'Teacher'}
            </Typography>
          </CardContent>
        </CardActionArea>
        {avatar}
        {!avatar && (
          <Avatar
            sx={{
              position: 'absolute',
              top: 60,
              right: 20,
              width: 80,
              height: 80,
            }}
          />
        )}
        <IconButton
          sx={{
            position: 'absolute',
            top: '1ch',
            right: '1ch',
            color: 'white',
          }}
        >
          <MoreVert sx={{ color: 'white' }} />
        </IconButton>
        <div style={{ minHeight: 120 }} />
        <CardActions
          sx={{
            borderTop: '0.0625rem solid rgb(218,220,224)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton>
            <TrendingUp />
          </IconButton>
          <IconButton>
            <FolderOpenOutlined />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
  
  export default function HomePage() {
    const { data: classes } = useQuery({
      queryKey: ['classes'],
      queryFn: async () => {
        const response = await axios.get(
          `api/v1/users/${localStorage.getItem('userId')}`
        );
        return response.data.classMemberships;
      },
    });
  
    return (
      <div
        style={{
          display: 'grid',
          flexWrap: 'nowrap',
          gap: '1.25rem',
          margin: '1.25rem',
          gridTemplateColumns: 'repeat(4, minmax(100px, 1fr))',
        }}
      >
        {classes &&
          classes.map((item) => (
            <ClassItem
              key={item.class.id} // Add a unique key to each ClassItem
              className={item.class.className}
              classSubject={item.class.description}
              teacherName={item.user.lastName + ' ' + item.user.firstName}
              classId={item.class.id}
            />
          ))}
      </div>
    );
  }
  