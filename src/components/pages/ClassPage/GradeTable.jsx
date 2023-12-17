import React from 'react';
import { Paper, Table, TableBody, Button, TextField, Dialog, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton } from '@mui/material';
import {NoteAdd, Edit, DeleteForever, Download} from "@mui/icons-material";
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";

const StudentGradesTable = ({ assignments, students }) => {
    const theme = useTheme();
        return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell align="center" rowSpan={2} style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                ID
                </TableCell>
                <TableCell align="center" rowSpan={2} style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                Name
                </TableCell>
                <TableCell colSpan={assignments.length} align="center" style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                Assignments
                </TableCell>
                <TableCell align="center" rowSpan={2} style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                Total
                </TableCell>
            </TableRow>
            <TableRow>
                {assignments.map((assignment) => (
                <TableCell key={assignment.id} align="center" style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                    {assignment.name}
                </TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {students.map((student) => (
                <TableRow key={student.id}>
                <TableCell align="center" style={{border: '1px solid #ddd'  }}>{student.id}</TableCell>
                <TableCell align="center" style={{border: '1px solid #ddd'  }}>{student.name}</TableCell>
                {assignments.map((assignment) => (
                    <TableCell key={assignment.id} align="center" style={{ border: '1px solid #ddd' }}>
                        {student.grades[assignment.id]?.grade !== undefined
                        ? `${student.grades[assignment.id]?.grade}/${assignment?.maxGrade}`
                        : '-'}
                    </TableCell>
                    ))}
                <TableCell align="center"style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                10.0
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};

const students = [
  { id: 1, name: 'Sarah', grades: { 14: { grade: 90 }, 2: { grade: 85, maxGrade: 100 } } },
  { id: 2, name: 'Max', grades: { 14: { grade: 95 }, 2: { grade: 92, maxGrade: 100 } } },
  // Add more students as needed
  // ... (add more students)
];

const GradeTable = () => {

    const theme = useTheme();
    const csvExport = () => {

    }
    const {classId} = useParams();
    const {data: classDetails} = useQuery(
        {
            queryKey: ["class", classId],
            queryFn: async () => {
                const response = await axios.get(`api/v1/classes/${classId}`);
                return response.data
            }
        });
        const assignments = classDetails?.assignments;
    return (
        <Box spacing={3} maxWidth="1000px" marginX="auto" overflowX="auto">

        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color={theme.palette.primary.main}
            borderBottom={`0.0625rem solid ${theme.palette.primary.main}`}
            marginBottom="1rem"
        >
            <Typography variant="h4" sx={{ fontFamily: 'Google' }}>Grade</Typography>
            <IconButton size={'large'}
                            onClick={csvExport()}
                            sx={{color: theme.palette.primary.main}}><Download/></IconButton>
        </Box>
        <StudentGradesTable assignments={assignments} students={students} />
        </Box>
  );
};

export default GradeTable;
