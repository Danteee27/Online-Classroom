import * as React from 'react';
import {useState, useEffect} from 'react';
import { useTheme } from '@emotion/react';
import {Dialog, Icon, IconButton} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Typography, Select, MenuItem, Box, TextField, Button} from '@mui/material';
import { Assignment, Comment, MoreVert, Today, Settings, Person } from '@mui/icons-material'; 
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router';
import EmptyConversation from '../../misc/EmptyConversation';

export default function AllAssignmentsPage() {
    const theme = useTheme();
    const {classId, assignmentId} = useParams();
    const [classMembershipAssignments, setClassmembershipAssignments] = useState([]);
    const [classMemberships, setClassMemberships] = useState([]);
    const [classDetails, setClassDetails] = useState([]);
    const [assignmentDetails, setAssignmentDetails] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const navigateToNewPath = (assignmentId, student, classId) => {
      if (!student.assignment){
        toast.error("Student hasn't submitted!")
        return;
      }
      const newPath = `/u/c/${classId}/a/${assignmentId}/m/${student.student.id}`; // Adjust the numbers as needed
      navigate(newPath);
    };
    const getClass = async (classId) =>{
        try {
            const response = await axios.get(`api/v1/classes/${classId}`);
            return response.data
        }
        catch(error){
            console.error(`Error fetching assignments: ${error.message}`);
            return null;
        }
    }
    const getAllAssginmentsOfStudents = async (classId, assignmentId) =>{
        try {
          const response = await axios.get(`api/v1/classes/${classId}/assignments/${assignmentId}`);
          console.log(response.data)
          return response.data;
        } catch (error) {
          console.error(`Error fetching assignments: ${error.message}`);
          return [];
        }
      };
      const associateAssignmentsWithStudents = (classMemberships, classMembershipAssignments) => {
        const result = [];
      
        classMemberships.forEach((membership) => {
          const assignment = classMembershipAssignments.find((assignment) => {
            // Assuming classMembership.id is a primitive type (e.g., number or string)
            return assignment.classMembership && assignment.classMembership.id === membership.id;
          });
      
          result.push({ student: membership, assignment });
        });
      
        return result;
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const assignments = await getAllAssginmentsOfStudents(classId, assignmentId);
            setClassmembershipAssignments(assignments); console.log(classDetails)
            const class_ = await getClass(classId);
            setClassDetails(class_);
            setAssignmentDetails(class_.assignments.filter(assignment => assignment.id === Number(assignmentId))[0]);
            setClassMemberships(class_.classMemberships.filter(member => member.role !== 'teacher'));
          } catch (error) {
            console.error(`Error fetching assignments: ${error.message}`);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        console.log(assignmentDetails);
        console.log(classMemberships)
      }, [assignmentDetails]);

      useEffect(() => {
        const studentsWithAssignments = associateAssignmentsWithStudents(classMemberships, classMembershipAssignments);
        setStudents(studentsWithAssignments);
      }, [classMemberships, classMembershipAssignments]);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
      };
    return (
    <Grid container spacing={3} alignItems="top" justifyContent="center" sx={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Grid item xs={12}>
        <Box marginTop={2}>
          <Box
            display="flex"
            alignItems="end"
            justifyContent="space-between"
            color={theme.palette.primary.main}
            borderBottom={`0.0625rem solid ${theme.palette.primary.main}`}
            marginBottom="0.5rem"
          >
            <Typography variant="h4" sx={{ fontFamily: 'Google' }}>{classDetails.className} - {assignmentDetails.name}</Typography>
            <Typography sx={{ fontFamily: 'Google', fontWeight:500, padding:'0.4rem' }}>{students.filter(student => student.assignment !== undefined).length}/{students.length} submitted</Typography>
        </Box>
          <Box
            alignItems="center"
            //justifyContent="space-between"
            color={theme.palette.primary.main}
            marginBottom="1rem"
          >
              <Box
                display="flex"
                alignItems="center"
                //justifyContent="space-between"
                color={theme.palette.primary.main}
              >
                <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>Description:</Typography>
                <Typography sx={{ fontFamily: 'Google', fontWeight:500, color: 'black', marginLeft: '0.5rem' }}>{assignmentDetails.description}</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                //justifyContent="space-between"
                color={theme.palette.primary.main}
              >
                <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>Percentage:</Typography>
                <Typography sx={{ fontFamily: 'Google', fontWeight:500, color: 'black', marginLeft: '0.5rem' }}>{assignmentDetails.maxGrade}%</Typography>
              </Box>
              {assignmentDetails.createdDate && (
                <Box
                  display="flex"
                  alignItems="center"
                  color={theme.palette.primary.main}
                >
                  <Typography sx={{ fontFamily: 'Google', fontWeight: 500, fontSize: 14, color: 'black' }}>
                    From {formatDate(assignmentDetails.createdDate)}
                  </Typography>
                  {assignmentDetails.dueDate && (
                    <Typography sx={{ fontFamily: 'Google', fontWeight: 500, fontSize: 14, color: 'black', marginLeft: '0.5rem' }}>
                      to {formatDate(assignmentDetails.dueDate)}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          {students
          .map((student)=> (
          <Box 
          onClick={() => navigateToNewPath(assignmentDetails.id,student,classDetails.id)}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          color={theme.palette.primary.main}
          marginBottom="1rem"
          sx={{ borderBottom: '0.3px solid',
                ':hover': {
                  backgroundColor: '#e1f0fc', 
                  borderRadius:'8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }, }}>
            <Box display="flex" alignItems="center" padding='8px' >
                <Box 
                        alignContent='center'
                        paddingX="0.2rem" 
                        paddingTop='6px'
                        marginRight='1rem'
                        color={theme.palette.primary.main} 
                        >
                  <Icon component={Person} fontSize="large" />
                </Box>
                <Box color='black'>
                {student.student.fullName != null ? (
                  <Typography sx={{ fontFamily: 'Google', fontWeight: 500 }}>{student?.student?.fullName}</Typography>
                ) : (
                  <Typography sx={{ fontFamily: 'Google', fontWeight: 500 }}>{student?.student?.user.firstName}</Typography>
                )}
                  {student.assignment ? (
                    <Typography sx={{ fontFamily: 'Google', fontWeight: 100, fontSize: 12 }}>
                      Submitted on {formatDate(student.assignment?.createdAt)}
                    </Typography>
                  ) : (
                    <Typography sx={{ fontFamily: 'Google', fontWeight: 100, fontSize: 12 }}>
                      Haven't submitted!
                    </Typography>
                  )}
                </Box>
            </Box>
            
            <Box display="flex" alignItems="center" padding='8px' >
              <Box display="flex" alignItems="center" color='grey' >
              <Box display='flex' borderRight={`0.0625rem solid ${theme.palette.primary.main}`} paddingRight='1rem'>
              {student?.assignment !== undefined &&
              <Typography sx={{ fontFamily: 'Google', fontWeight: 500, fontSize: 20, marginLeft: 1 }}>
                {student?.assignment.grade !== null && (
                  <Typography sx={{ fontFamily: 'Google', fontWeight: 500, fontSize: 16 }}>
                    {student?.assignment?.grade} / 100
                  </Typography>
                )}
              </Typography>}
              </Box>
               <Box alignContent='center' paddingLeft='1rem'>
                    <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>
                        {student.assignment?.grade === null
                        ? 'Request for grade'
                        : student.assignment?.isRequested
                        ? 'Request for review'
                        : !student.assignment?.isRequested
                        ? 'Reviewed'
                        : student.assignment?.isFinalised
                        ? 'Finalised'
                        : 'No request'}
                    </Typography>
                </Box>
                <Box
                          alignContent='center'
                          paddingX="0.4rem" // Adjust padding as needed
                          paddingTop='6px'
                          borderRadius={50} // Adjust border radius as needed
                          
                          >
                    <Icon component={Comment} fontSize="medium" />
                  </Box>
              </Box>
              <Box>
                <IconButton>
                <Icon component={MoreVert} fontSize="medium" />
                </IconButton>
              </Box>
            </Box>
          </Box>
       ))}
       </Box></Grid></Grid>
       );
}