import * as React from 'react';
import {useState, useEffect} from 'react';
import { useTheme } from '@emotion/react';
import {Dialog, Icon, IconButton} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Typography, Select, MenuItem, Button, Box} from '@mui/material';
import { Assignment, Comment, MoreVert, Settings } from '@mui/icons-material'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EmptyConversation from '../../misc/EmptyConversation';
import { useNavigate } from 'react-router';

export default function ReviewPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedClassId, setSelectedClassId] = useState('default');
  const [assignments, setAssignments] = useState([]);
  //get classes
  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["classes"],
      queryFn: async () => {
        try {
          const response = await axios.get(`api/v1/users/${localStorage.getItem('userId')}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching data: ${error.message}`);
        }
      }
    });
  const classMemberships = data?.classMemberships?.filter(member => member.role === "teacher") ?? [];
  const classes = classMemberships.map(member => member.class);

   //get assignments for selected class
   const getAssignmentsWithReviewCount = async (classId) => {
    try {
      const response = await axios.get(`api/v1/classes/${classId}`);
      const assignments = response.data.assignments.filter(member => member.deleted !== true);
      const assignmentsWithReviewCount = await Promise.all(
        assignments.map(async (assignment) => {
          const reviews = await getAllAssginmentsOfStudents(classId, assignment.id);
          console.log(reviews)
          const reviewLeftCount = await getToReviewNumbers(reviews);
          
          // Add the reviewLeftCount to the assignment
          return { ...assignment, reviewLeftCount: reviewLeftCount };
        })
      );
      console.log(assignmentsWithReviewCount)
      return assignmentsWithReviewCount;
    } catch (error) {
      console.error(`Error fetching assignments: ${error.message}`);
      return [];
    }
  };

  const handleClassChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedClassId(selectedId);
  
    if (selectedId === 'default') {
      try {
        const assignmentsForAllClasses = await Promise.all(classes.map(classItem => getAssignmentsWithReviewCount(classItem.id)));
        const allAssignments = assignmentsForAllClasses.flat();
        setAssignments(allAssignments);
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
      }
    } else {
      try {
        const assignmentsForSelectedClass = await getAssignmentsWithReviewCount(selectedId);
        setAssignments(assignmentsForSelectedClass);
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    console.log(assignments);
  }, [assignments]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentsForAllClasses = await Promise.all(classes.map(classItem => getAssignmentsWithReviewCount(classItem.id)));
        const allAssignments = assignmentsForAllClasses.flat();
        setAssignments(allAssignments);
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
      }
    };

    fetchData();
  }, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  

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

  const getToReviewNumbers = async (assignmentListPromise) => {
    try {
      // Wait for the assignmentListPromise to resolve
      const assignmentList = await assignmentListPromise;
  
      // Now you can work with the resolved value
      console.log(assignmentList);
      
      // Assuming assignmentList is an array, filter and return the result
      const toReviewAssignments = assignmentList.filter(
        (assignment) => assignment.isRequested === true || assignment.grade === null
      );

      console.log(toReviewAssignments)
      return toReviewAssignments;
    } catch (error) {
      console.error('Error while getting to review numbers:', error);
      return [];
    }
  };

 

if (isLoading) {
  return <div>Loading...</div>;
}

if (isError) {
  return <div>Error fetching data</div>;
}



  
  return (
    <Grid container spacing={3} alignItems="top" justifyContent="center" sx={{ margin: '0 auto', maxWidth: '1000px' }}>
      <Grid item xs={12}>
        <Select sx={{ width: '200px', fontFamily: 'Google' }}  value={selectedClassId} onChange={handleClassChange}>
          <MenuItem value="default">All classes</MenuItem>
          {classes.map((classItem) => (
            <MenuItem key={classItem.id} value={classItem.id}>
              {classItem.className}
            </MenuItem>
          ))}
        </Select>
        {classes.map((classItem) => {
          const classAssignments = assignments.filter(assignment => assignment.class.className === classItem.className);
          
          // Only render the class header if there are assignments for the class
          if (selectedClassId !== "default" && classAssignments===0){
            return (
            <Box mt={3} sx={{px: 4, py: 4, border: '0.0625rem solid rgb(218,220,224)', borderRadius: 2, display: 'flex'}}>
              <EmptyConversation style={{width: '150px'}}/>
              <div style={{marginLeft: '4ch'}}>
                <Typography variant={'h5'}sx={{fontFamily: 'Google', color: theme.palette.primary.main}}>
                                                            sadasdasdsda
                </Typography>
                <Typography variant={'subtitle2'}
                              sx={{fontFamily: 'Google'}}>asdsdads
                </Typography>
                  <Button sx={{
                      textTransform: 'none', fontFamily: 'Google', border: '0.0625rem solid rgb(218,220,224)',
                      mb: -1,
                      mr: -1,
                      ml: 'auto',
                      display: 'flex', alignItems: 'center'
                  }}>
                      <Settings fill={theme.palette.primary.main} style={{width: '20px', marginRight: '1ch'}}/> Settings
                  </Button>
              </div>
           </Box>);
          }
          else if (classAssignments.length > 0) {
            return (
              <Box key={classItem.id} marginTop={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  color={theme.palette.primary.main}
                  borderBottom={`0.0625rem solid ${theme.palette.primary.main}`}
                  marginBottom="1rem"
                >
                  <Typography variant="h4" sx={{ fontFamily: 'Google' }}>{classItem.className}</Typography>
                </Box>
              {assignments
                .filter(assignment => assignment.class.className === classItem.className)
                .map((assignment)=> (
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
                      <Box    bgcolor={theme.palette.primary.main} 
                              alignContent='center'
                              paddingX="0.4rem" 
                              paddingTop='6px'
                              marginRight='1rem'
                              borderRadius={50}
                              color="#FFFFFF" 
                              >
                        <Icon component={Assignment} fontSize="medium" />
                      </Box>
                      <Box color='black'>
                        <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>{assignment.name}</Typography>
                        <Typography sx={{ fontFamily: 'Google', fontWeight:100, fontSize:12}}>{assignment.class.className} - Due {formatDate(assignment.dueDate)}</Typography>
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
                            {assignment.reviewLeftCount.length} to review
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
             </Box>
             );
           } return null; })}
      </Grid>
    </Grid>
  );
}
