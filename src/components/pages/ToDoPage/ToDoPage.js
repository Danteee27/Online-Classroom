import * as React from 'react';
import {useState, useEffect} from 'react';
import { useTheme } from '@emotion/react';
import {Dialog, Icon, IconButton} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Typography, Select, MenuItem, Box, TextField, Button} from '@mui/material';
import { Assignment, Comment, MoreVert, Today, Settings } from '@mui/icons-material'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router';
import EmptyConversation from '../../misc/EmptyConversation';

export default function ToDoPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedClassId, setSelectedClassId] = useState('default');
  const [assignments, setAssignments] = useState([]);
  const [assignmentId, setAssignmentId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const userId = localStorage.getItem('userId').toString();
  
  const [selectedAssignment, setSelectedAssignment] = useState({
    currentGrade: null,
    grade: null,
    expectedGrade: 100,
    description: "...",
    studentReview: "",
    teacherComment: "",
    isFinalised: false,
    isRequested: false,
    isReviewed: false,
    isSubmitted: true
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  //get classes
    const { data, isLoading, isError } = useQuery(
        {
        queryKey: ["classes"],
        queryFn: async () => {
            try {
            const response = await axios.get(`api/v1/users/${userId}`);
            return response.data;
            } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
            }
        }
        });
    const classMemberships = data?.classMemberships?.filter(member => member.role === "student") ?? [];
    const classes = classMemberships.map(member => member.class);
    
    //const submittedAssignments = classMemberships[0].classMembershipAssignments;
    //get assignments for selected class
    const getAssignmentsForClass = async (classId) => {
      try {
        const response = await axios.get(`api/v1/classes/${classId}`);
        const assignments = response.data.assignments.filter(member => member.deleted !== true);
        const assignmentsWithSubmittedCheck = await Promise.all(
          assignments.map(async (assignment) => {
            const isSubmitted = await SubmittedCheck(classId,assignment.id)
            
            // Add the reviewLeftCount to the assignment
            return { ...assignment, isSubmitted: isSubmitted };
          })
        );
        console.log(assignmentsWithSubmittedCheck)
        return assignmentsWithSubmittedCheck;
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
        return [];
      }
    };

    const SubmittedCheck = async (classId, assignmentId) =>{
      try {
        const getClassMembership = classMemberships.filter(member => member.class.id === classId)
        console.log(getClassMembership)
        const response = await axios.get(`api/v1/classes/${classId}/classMemberships/${getClassMembership[0].id}/assignment/${assignmentId}`);
        console.log(response.data)
        return response.data.isSubmitted;
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
        return false;
      }
    };
    
    useEffect(() => {
      console.log(assignments);
      console.log(classMemberships)
    }, [assignments]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const assignmentsPromises = classes.map(classItem => getAssignmentsForClass(classItem.id));
          const assignmentsForAllClasses = await Promise.all(assignmentsPromises);
          const allAssignments = assignmentsForAllClasses.flat();
          setAssignments(allAssignments);
        } catch (error) {
          console.error(`Error fetching assignments: ${error.message}`);
        }
      };

      fetchData();
    }, []); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  
  
  const handleClassChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedClassId(selectedId);
  
    if (selectedId === 'default') {
      // If "All classes" is selected, fetch assignments for all classes
      try {
        const assignmentsPromises = classes.map(classItem => getAssignmentsForClass(classItem.id));
        const assignmentsForAllClasses = await Promise.all(assignmentsPromises);
        // Flatten the array of arrays into a single array
        const allAssignments = assignmentsForAllClasses.flat();
        setAssignments(allAssignments);
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
      }
    } else {
      // If a specific class is selected, fetch assignments for that class
      try {
        const assignmentsForSelectedClass = await getAssignmentsForClass(selectedId);
        setAssignments(assignmentsForSelectedClass);
  
        // Find the class name based on the selected ID
        const selectedClass = classes.find(classItem => classItem.id === selectedId);
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
      }
    }
  };

  const getDeadline = (assignment) => {
    console.log(assignment)
    if(assignment.isSubmitted === true){
      return "The assignment is submitted!"
    }
    const deadlineDate = new Date(assignment.dueDate);
    const currentDate = new Date();
  
    const differenceInMilliseconds = deadlineDate - currentDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    // Format the result as a string
    let formattedString = '';
  
    if (differenceInDays > 0) {
      formattedString += `${differenceInDays} days `;
    }
  
    if(remainingHours >= 0) {
    formattedString += `${remainingHours} hours until deadline`;
    }
    else{
      return "The assignment is overdue!"
    }
  
    return formattedString;
  };
  const getColorForAssignment = (assignment) => {
    if(assignment.isSubmitted === true){
      return "green"
    }
    const deadlineDate = new Date(assignment.dueDate);
    const currentDate = new Date();
  
    const differenceInMilliseconds = deadlineDate - currentDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    // Format the result as a string
    let formattedString = '';
  
    if (differenceInDays > 0) {
      formattedString += `${differenceInDays} days `;
    }
  
    if(remainingHours >= 0) {
      return "orange";
    }
    else{
      return "red"
    }
  };

  const navigateToNewPath = (assignmentId, classId) => {
    const studentId = classMemberships.filter(member => member.class.id === classId)[0].id
    const newPath = `/u/c/${classId}/a/${assignmentId}/m/${studentId}`; // Adjust the numbers as needed
    navigate(newPath);
  };

  const handleOpenModal = (assignment,classItem) => {
    if(assignment.isSubmitted === true) {
      toast.success("You have already submitted!");
      navigateToNewPath(assignment.id,classItem.id)
      return;
    }
    setAssignmentId(assignment.id);
    setSelectedClassId(assignment.class.id);
    setOpenModal(true);
  };  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAssignment = async () => {
    try {
      const filteredClassMemberships = classMemberships.filter(member => member.class.id === selectedClassId);
      // Assuming you want to get the 'id' of the first matching classMembership, adjust as needed
      const id = filteredClassMemberships.length > 0 ? filteredClassMemberships[0].id : null;
  
      console.log(id);
      console.log(selectedAssignment);
      const response = await axios.post(`/api/v1/classes/${selectedClassId}/classMemberships/${id}/assignment/${assignmentId}`);
      const putRequest = await axios.put(`/api/v1/classes/${selectedClassId}/classMemberships/${id}/assignment/${assignmentId}`, selectedAssignment);
      console.log(response);
      console.log(putRequest);
      toast.success("Successfully submitted!")
      handleCloseModal();
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <Grid container spacing={3} alignItems="top" justifyContent="center" sx={{ margin: '0 auto', maxWidth: '1000px' }}>
    <Grid item xs={12}>
      <Select sx={{ width: '200px', fontFamily: 'Google' }} value={selectedClassId} onChange={handleClassChange}>
        <MenuItem value="default">All classes</MenuItem>
        {classes.map((classItem) => (
          <MenuItem key={classItem.id} value={classItem.id}>
            {classItem.className}
          </MenuItem>
        ))}
      </Select>
      {classes.map((classItem) => {
          const classAssignments = assignments.filter(assignment => assignment.class.className === classItem.className);
          if (selectedClassId !== "defaul" && classAssignments===0){
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
          // Only render the class header if there are assignments for the class
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
            onClick={() => (handleOpenModal(assignment,classItem))}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color={theme.palette.primary.main}
            marginBottom="1rem"
            sx={{
              borderBottom: '0.3px solid',
              ':hover': {
                backgroundColor: '#e1f0fc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              },
            }}
          >
            <Box display="flex" alignItems="center" padding='8px'>
              <Box
                bgcolor={theme.palette.primary.main}
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
                <Typography sx={{ fontFamily: 'Google', fontWeight: 700 }}>{assignment.name}</Typography>
                <Typography sx={{ fontFamily: 'Google', fontWeight: 100, fontSize: 12 }}>{classItem.className} - Due {formatDate(assignment.dueDate)}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" padding='8px'>
              <Box display="flex" alignItems="center" color='grey'>
                <Box>
                  <Typography sx={{ fontFamily: 'Google', fontWeight: 500, color: getColorForAssignment(assignment) }}>{getDeadline(assignment)}</Typography>
                </Box>
                <Box
                  alignContent='center'
                  paddingX="0.4rem"
                  paddingTop='6px'
                  borderRadius={50}
                >
                  <Icon component={Today} fontSize="medium" />
                </Box>
              </Box>
              <Box>
                <IconButton paddingTop='6px'>
                  <Icon component={Comment} fontSize="medium" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      );
    } return null; })}
    </Grid>

      <Dialog open={openModal}>
        <Box p={2} sx={{ maxWidth: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Submit
          </Typography>
          <TextField
            label="Expected Grade"
            fullWidth
            type="number"
            value={selectedAssignment.expectedGrade || ''}  // Bind to expectedGrade
            onChange={(e) => setSelectedAssignment({ ...selectedAssignment, expectedGrade: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            value={selectedAssignment.description || ''}  // Bind to description
            onChange={(e) => setSelectedAssignment({ ...selectedAssignment, description: e.target.value })}
            margin="normal"
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={()=>handleCloseModal()} color="inherit" sx={{ textTransform: 'none', fontFamily: 'Google', fontSize: 14 }}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAssignment} sx={{ textTransform: 'none', fontFamily: 'Google', fontSize: 14 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Grid>
  );
}
