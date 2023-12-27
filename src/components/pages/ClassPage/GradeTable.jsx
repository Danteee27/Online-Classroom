import React from 'react';
import { Paper, Table, TableBody, Button, TextField, Dialog, Menu, MenuItem, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton } from '@mui/material';
import {NoteAdd, Edit, DeleteForever, Download} from "@mui/icons-material";
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Language, Lock} from "@mui/icons-material";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const DNDTableCell = ({ assignment, onDrop }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'cell',
        item: { type: 'cell', id: assignment.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'cell',
        drop: (draggedItem) => onDrop(draggedItem.id, assignment.id),
    });

    return (
        <TableCell
            ref={(node) => drag(drop(node))}
            key={assignment.id} align="center" style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
            {assignment.name} - {assignment.maxGrade}%
        </TableCell>
    );
};

const StudentGradesTable = ({ assignments, students, refetch}) => {
    const navigate = useNavigate();
    const {classId} = useParams();
    const handleOnDrop = async (draggedId, droppedId) => {
        console.log(classId, draggedId, droppedId)
        if(draggedId === droppedId) return;

        const thisClass = await axios.get(`api/v1/classes/${classId}`);

        const draggedAssignment = thisClass.data.assignments.find(assignment => assignment.id === draggedId);
        const droppedAssignment = thisClass.data.assignments.find(assignment => assignment.id === droppedId);

        if (draggedAssignment.order === null) {
            draggedAssignment.order = draggedAssignment.id;
        }

        if (droppedAssignment.order === null) {
            droppedAssignment.order = droppedAssignment.id;
        }

        if (draggedAssignment.order === droppedAssignment.order) {
            if (droppedAssignment.id > draggedAssignment.id) {
                droppedAssignment.order += 1;
            } else {
                draggedAssignment.id += 1;
            }
        }

        const response1 = await axios.put(`api/v1/classes/${classId}/assignments/${draggedId}`, {
            order: droppedAssignment.order
        });

        const response2 = await axios.put(`api/v1/classes/${classId}/assignments/${droppedId}`, {
            order: draggedAssignment.order
        });

        await refetch();

        toast.success(`Moved successfully`)
    };

    const theme = useTheme();
        return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <DndProvider backend={HTML5Backend}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell align="center" rowSpan={2} style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                ID
                </TableCell>
                <TableCell align="center" rowSpan={2} style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                Name
                </TableCell>
                <TableCell colSpan={assignments?.length} align="center" style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                Assignments
                </TableCell>
                <TableCell align="center" rowSpan={2} style={{ fontWeight: 'bold', border: '1px solid #ddd'  }}>
                Total
                </TableCell>
            </TableRow>
            <TableRow>
                {assignments?.map((assignment) => (
                    <DNDTableCell assignment={assignment} onDrop={handleOnDrop} align="center" style={{
                        fontWeight: 'bold',
                        border: '1px solid #ddd'
                    }}/>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {students?.map((student) => (
                <TableRow key={student.id} sx={{"& .MuiTableCell-root:hover": {
                        cursor:'pointer',
                        background:'#fafafa'
                    }}}>
                    <TableCell align="center" style={{border: '1px solid #ddd' }}>{student.id}</TableCell>
                    <TableCell align="center" style={{border: '1px solid #ddd' }}>{student.name}</TableCell>
                    {assignments?.map((assignment) => (
                    <TableCell key={assignment.id} align="center" style={{ border: '1px solid #ddd'}} onClick={()=>{navigate('a/'+assignment.id + '/m/' + student.id)}}>
                        {student.grades[assignment.id]?.grade !== undefined
                        ? `${student.grades[assignment.id]?.grade}/100`
                        : '-'}
                    </TableCell>
                    ))}
                    <TableCell align="center" style={{ fontWeight: 'bold', border: '1px solid #ddd' }}>
                          {((assignments.reduce((sum, assignment) => {
                              const assignmentGrade = student.grades[assignment.id]?.grade || 0;
                              const assignmentMaxGrade = assignment.maxGrade || 1; // Ensure maxGrade is at least 1 to avoid division by zero

                              return sum + (assignmentGrade * assignmentMaxGrade / 100 / 10);
                            }, 0))).toFixed(2)}
                          </TableCell>
                      </TableRow>
                  ))}
            </TableBody>
        </Table>
        </DndProvider>
        </TableContainer>
    );
};




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
            const totalMaxGrade = assignments?.reduce((sum, assignment) => sum + (assignment.maxGrade || 0), 0);
            data = [
              // Headers
              ['Student ID', 'Student Name', ...assignments?.map((assignment) => assignment.name), 'Total'],
              // Data
              ...studentsWithGrades.map((student) => [
                student.id,
                student.name,
                ...assignments?.map(
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
        
              // Ensure students is not null or undefined before mapping
              data = studentsWithGrades
                ? [
                    // Headers
                    ['Student ID', 'Student Name', assignmentName],
                    // Data
                    ...studentsWithGrades.map((student) => [
                      student.id,
                      student.name,
                      student.grades[assignment.id]?.grade !== undefined
                        ? `${student.grades[assignment.id]?.grade}/100`
                        : '-',
                    ]),
                  ]
                : [];
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
    
    const [studentsWithGrades, setStudentsWithGrades] = useState([]);
    const {classId} = useParams();
    const {data: classDetails, refetch} = useQuery(
        {
            queryKey: ["class", classId],
            queryFn: async () => {
                const response = await axios.get(`api/v1/classes/${classId}`);
                return response.data
            }
        });
    const assignments = classDetails?.assignments?.filter((assignment) => !assignment.deleted).sort((a, b) => a.order - b.order);
    const studentsList = classDetails?.classMemberships?.filter(member => member.role === "student");
    //return {
    //  id: studentId,
    //  name: student?.fullName ?? student?.user?.firstName + ' ' + student?.user?.lastName,
    //  grades: grades,
    const getStudentGrades = async (students, assignments) => {
      try {
        const result = [];
    
        for (const assignment of assignments) {
          const assignmentId = assignment.id;
          const response = await axios.get(`api/v1/classes/${classId}/assignments/${assignmentId}`);
          const allAssignmentsOfStudents = response.data;
    
          for (const student of students) {
            const studentId = student.id;
            const studentName = student?.fullName ?? `${student?.user?.firstName} ${student?.user?.lastName}`;
            
            // Find the assignment for the current student
            const studentAssignment = allAssignmentsOfStudents.find(asm => asm.classMembership.id === studentId);
    
            // Store the grade information
            const gradeInfo = {
              grade: studentAssignment?.grade,
              maxGrade: assignment.maxGrade,
            };
    
            // If the student is not already in the result array, add them
            const existingStudent = result.find(entry => entry.id === studentId);
            if (!existingStudent) {
              result.push({
                id: studentId,
                name: studentName,
                grades: { [assignmentId]: gradeInfo },
              });
            } else {
              // If the student is already in the result array, update their grades
              existingStudent.grades[assignmentId] = gradeInfo;
            }
          }
        }
    
        // Return the final result array
        return result;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
        return [];
      }
    };
       
      
      const fetchStudentGrades = async () => {
        try {
          const studentsWithGrades = await getStudentGrades(studentsList, assignments);
          return studentsWithGrades;
        } catch (error) {
          console.error(`Error fetching student grades: ${error.message}`);
          return [];
        }
      };
      // Usage
      const fetchData = async () => {
        try {
          const grades = await fetchStudentGrades();
          console.log(grades);
          setStudentsWithGrades(grades);
        } catch (error) {
          console.error(`Error fetching student grades: ${error.message}`);
          setStudentsWithGrades([]); // Ensure that studentsWithGrades is set even on error
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      // Render only if studentsWithGrades is not null
      if (studentsWithGrades === null) {
        return <div>Loading...</div>; // or another loading indicator
      }
      
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
                        {assignments?.map((assignment) => (
                        <MenuItem
                            sx={{ fontSize: 'small' }}
                            key={assignment.id}
                            onClick={() => csvExport(`only`,`${assignment.name}`,studentsWithGrades)}
                        >
                            Only {assignment.name} grade
                        </MenuItem>
                    ))}
            </Menu>
        </Box>
        <StudentGradesTable assignments={assignments} students={studentsWithGrades} refetch={refetch}/>
        </Box>
  );
};

export default GradeTable;
