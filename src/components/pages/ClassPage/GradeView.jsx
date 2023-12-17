import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton } from '@mui/material';
import {NoteAdd, Edit, DeleteForever} from "@mui/icons-material";
import { useTheme } from '@emotion/react';

const GradeView = () => {
    const theme = useTheme();
  // Sample data for the table
    const assignmentData = [
        { id: 1, title: 'Essay on World History', dueDate: '2023-12-15', subject: 'History', percentage: 80, description: 'Write an essay on significant events in world history.' },
        { id: 2, title: 'Mathematics Quiz', dueDate: '2023-12-10', subject: 'Mathematics', percentage: 90, description: 'Solve math problems and submit your answers.' },
        { id: 3, title: 'Programming Project', dueDate: '2023-12-20', subject: 'Computer Science', percentage: 75, description: 'Develop a small programming project using a language of your choice.' },
        { id: 4, title: 'Literature Book Review', dueDate: '2023-12-18', subject: 'Literature', percentage: 85, description: 'Read a book and write a review summarizing your thoughts.' },
      ];

  return (
    <Box maxWidth="1000px" marginX="auto">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        color={theme.palette.primary.main}
        borderBottom={`0.0625rem solid ${theme.palette.primary.main}`}
        marginBottom="1rem"
      >
        <Typography variant="h4" sx={{ fontFamily: 'Google' }}>Assignments</Typography>
        <IconButton size={'large'}
                        onClick={(e) => (null)}
                        sx={{color: theme.palette.primary.main}}><NoteAdd/></IconButton>
      </Box>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="50px" >
                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    ID
                </Typography>
            </TableCell>
            <TableCell width="200px">
                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    Title
                </Typography>
            </TableCell>
            <TableCell width="120px">
                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    Deadline
                </Typography>
            </TableCell>
            <TableCell width="100px">
                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    Percentage
                </Typography>
            </TableCell>
            <TableCell width="300px">
                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                    Description
                </Typography>
            </TableCell>
            <TableCell width="100px"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignmentData.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.id}</TableCell>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.dueDate}</TableCell>
              <TableCell align='center'>{assignment.percentage}%</TableCell>
              <TableCell>{assignment.description}</TableCell>
              <TableCell align='center'>
                <Box
                  style={{ width: '50px' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <IconButton
                    size="large"
                    onClick={() => console.log(`Edit ${assignment.title}`)}
                    style={{ color: theme.palette.success.main }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={() => console.log(`Delete ${assignment.title}`)}
                    style={{ color: theme.palette.error.main }}
                  >
                    <DeleteForever />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default GradeView;