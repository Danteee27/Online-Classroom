import React from 'react';
import { Paper, Table, TableBody, Button, TextField, Dialog, Menu, MenuItem, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton } from '@mui/material';
import {NoteAdd, Edit, DeleteForever, Download} from "@mui/icons-material";
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Language, Lock} from "@mui/icons-material";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";
import * as XLSX from 'xlsx';

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
                    <TableCell align="center" style={{border: '1px solid #ddd' }}>{student.id}</TableCell>
                    <TableCell align="center" style={{border: '1px solid #ddd' }}>{student.name}</TableCell>
                    {assignments.map((assignment) => (
                    <TableCell key={assignment.id} align="center" style={{ border: '1px solid #ddd' }}>
                        {student.grades[assignment.id]?.grade !== undefined
                        ? `${student.grades[assignment.id]?.grade}/100`
                        : '-'}
                    </TableCell>
                    ))}
                    <TableCell align="center" style={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                    {(assignments.reduce(
                        (sum, assignment) =>
                            sum +
                            ((student.grades[assignment.id]?.grade || 0) / (student.grades[assignment.id]?.maxGrade || 1)) *
                            (assignment.maxGrade || 0),0
                        ) / assignments.reduce((sum, assignment) => sum + (assignment.maxGrade || 0), 0) / 10 ).toFixed(2)}
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};



const students = [
  { id: 1, name: 'Sarah', grades: { 14: { grade: 90 }, 13: { grade: 85 }, 15: { grade: 85 } } },
  { id: 2, name: 'Max', grades: { 14: { grade: 95 }, 13: { grade: 92 },15: { grade: 85 } } },
  // Add more students as needed
  // ... (add more students)
];


const GradeTable = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const csvExport = (mode, assignmentName) => {
        let data;
      
        switch (mode) {
          case 'whole-table':
            // Calculate total maxGrade
            const totalMaxGrade = assignments.reduce((sum, assignment) => sum + (assignment.maxGrade || 0), 0);
            data = [
              // Headers
              ['Student ID', 'Student Name', ...assignments.map((assignment) => assignment.name), 'Total'],
              // Data
              ...students.map((student) => [
                student.id,
                student.name,
                ...assignments.map(
                  (assignment) =>
                    student.grades[assignment.id]?.grade !== undefined
                      ? `${student.grades[assignment.id]?.grade}/100`
                      : '-'
                ),
                // Calculate Total
                assignments.reduce(
                  (sum, assignment) =>
                    sum +
                    ((student.grades[assignment.id]?.grade || 0) / (student.grades[assignment.id]?.maxGrade || 1)) *
                      (assignment.maxGrade || 0),
                  0
                ) / totalMaxGrade / 10,
              ]),
            ];
            break;
      
          case 'only':
            // Extract the assignment name from mode
            const assignment = assignments.find((a) => a.name === assignmentName);
      
            if (!assignment) {
              console.error(`Assignment not found: ${assignmentName}`);
              return;
            }
      
            data = [
                // Headers
                ['Student ID', 'Student Name', assignmentName],
                // Data
                ...students.map((student) => [
                  student.id,
                  student.name,
                  student.grades[assignment.id]?.grade !== undefined
                    ? `${student.grades[assignment.id]?.grade}/100`
                    : '-',
                ]),
            ];
            break;
      
          default:
            // Handle unknown mode
            console.error(`Unknown download mode: ${mode}`);
            return;
        }
      
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'student_grades.xlsx');
      };
      
    const {classId} = useParams();
    const {data: classDetails} = useQuery(
        {
            queryKey: ["class", classId],
            queryFn: async () => {
                const response = await axios.get(`api/v1/classes/${classId}`);
                return response.data
            }
        });
    const assignments = classDetails?.assignments?.filter((assignment) => !assignment.deleted);
    const studentsList = classDetails?.classMemberships?.filter(member => member.role === "student");
    console.log(classDetails);
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
        </Box>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color={theme.palette.primary.main}
            marginBottom="1rem"
        >
            <Button
                    variant="outlined"
                    onClick={handleClick}
                    sx={{
                        color: theme.palette.primary.main,
                        mr: 0,
                        fontFamily: 'Google',
                        textTransform: 'none'
                    }}
                    // onClick={(e) => setAnchorElChangePassword(e.currentTarget)}
                >
                    <Download sx={{width: 20, height: 20, fill: theme.palette.primary.main}}/> &nbsp;&nbsp;Download 
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                >
                    <MenuItem
                        sx={{ fontSize: 'small' }}
                        onClick={() => csvExport('whole-table')}
                        >
                        Grade Table
                        </MenuItem>
                        {assignments.map((assignment) => (
                        <MenuItem
                            sx={{ fontSize: 'small' }}
                            key={assignment.id}
                            onClick={() => csvExport(`only`,`${assignment.name}`)}
                        >
                            Only {assignment.name} grade
                        </MenuItem>
                    ))}
            </Menu>
        </Box>
        <StudentGradesTable assignments={assignments} students={students} />
        </Box>
  );
};

export default GradeTable;
