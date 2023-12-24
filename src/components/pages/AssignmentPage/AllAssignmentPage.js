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
    const [classDetails, setClassDetails] = useState([]);
    const [assignmentDetails, setAssignmentDetails] = useState([]);
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
      useEffect(() => {
        const fetchData = async () => {
          try {
            const assignments = await getAllAssginmentsOfStudents(classId, assignmentId);
            setClassmembershipAssignments(assignments); console.log(classDetails)
            const class_ = await getClass(classId);
            setClassDetails(class_);
            
            console.log(assignmentDetails)
          } catch (error) {
            console.error(`Error fetching assignments: ${error.message}`);
          }
        };
    
        fetchData();
      }, []);
      useEffect(() =>  {
        setAssignmentDetails(classDetails.assignments.filter(assignment => assignment.id === assignmentId));
        console.log(assignmentDetails);
      }, [classDetails]);
    return (
    <Grid container spacing={3} alignItems="top" justifyContent="center" sx={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Grid item xs={12}>
        <Box marginTop={2}>
          <Box
            display="flex"
            alignItems="center"
            //justifyContent="space-between"
            color={theme.palette.primary.main}
            borderBottom={`0.0625rem solid ${theme.palette.primary.main}`}
            marginBottom="1rem"
          >
            <Typography variant="h4" sx={{ fontFamily: 'Google' }}>{classDetails.className}</Typography>
            <Typography  sx={{ fontFamily: 'Google' }}>{assignmentDetails.maxGrade}%</Typography>
          </Box>
        {classMembershipAssignments.map((assignment)=> (
          <Box 
          onClick={() => null}
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
                  <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>{assignment.classMembership.user.firstName}</Typography>
                  <Box display='flex'>
                    <Typography sx={{ fontFamily: 'Google', fontWeight:100, fontSize:12}}>Expected Grade: {assignment.expectedGrade}</Typography> 
                    <Typography sx={{ fontFamily: 'Google', fontWeight:100, fontSize:12, marginLeft:1}}> 
                        {assignment.grade !== null && (
                        <Typography sx={{ fontFamily: 'Google', fontWeight: 100, fontSize: 12 }}>
                        Current Grade: {assignment.grade}
                        </Typography>
                    )}</Typography>
                   </Box>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" padding='8px' >
              <Box display="flex" alignItems="center" color='grey' >
                <Box
                          alignContent='center'
                          paddingX="0.4rem" // Adjust padding as needed
                          paddingTop='6px'
                          borderRadius={50} // Adjust border radius as needed
                          
                          >
                    <Icon component={Comment} fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>
                        {assignment.grade === null
                        ? 'Request for grade'
                        : assignment.isRequested
                        ? 'Request for review'
                        : assignment.isReviewed
                        ? 'Reviewed': ''}
                    </Typography>
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