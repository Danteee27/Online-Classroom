import * as React from 'react';
import {useState, useEffect} from 'react';
import { useTheme } from '@emotion/react';
import {Dialog, Icon, IconButton} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Typography, Select, MenuItem, Box, TextField, Button} from '@mui/material';
import { Assignment, Comment, MoreVert, Today } from '@mui/icons-material'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router';

export default function ToDoPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedClassId, setSelectedClassId] = useState('default');
  const [className, setClassName] = useState('All Classes');
  const [assignments, setAssignments] = useState([]);
  const [assignmentId, setAssignmentId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const [selectedAssignment, setSelectedAssignment] = useState({
    currentGrade: null,
    expectedGrade: 100,
    grade: null,
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
            const response = await axios.get(`api/v1/users/${localStorage.getItem('userId')}`);
            return response.data;
            } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
            }
        }
        });
    const classMemberships = data?.classMemberships?.filter(member => member.role === "student") ?? [];
    const classes = classMemberships.map(member => member.class);
    const submittedAssignments = classMemberships.map(member => member.classMembershipsAssignments);
    //console.log(submittedAssignments);
    //get assignments for selected class
    useEffect(() => {
    if (selectedClassId !== 'default'){
    const getAssignments = async () => {
      try {
        const response = await axios.get(`api/v1/classes/${selectedClassId}`);
        setAssignments(response.data.assignments.filter((assignment) => !assignment.deleted));
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`);
      }
    };

    // Call getAssignments when selectedClassId changes
    getAssignments();
    }
  }, [selectedClassId]);

  
  useEffect(() => {
    console.log(assignments);
  }, [assignments]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const submittedCheck = (id) =>{

  }
  const handleClassChange = (event) => {
    const selectedId = event.target.value;
    setSelectedClassId(selectedId);

    // Find the class name based on the selected ID
    const selectedClass = classes.find(classItem => classItem.id === selectedId);
    setClassName(selectedClass ? selectedClass.className : 'All Classes');
  };

  const getDeadline = (dateString) => {
    const deadlineDate = new Date(dateString);
    const currentDate = new Date();
  
    const differenceInMilliseconds = deadlineDate - currentDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    // Format the result as a string
    let formattedString = '';
  
    if (differenceInDays > 0) {
      formattedString += `${differenceInDays} days `;
    }
  
    formattedString += `${remainingHours} hours`;
  
    return formattedString;
  };


  const handleOpenModal = (id) => {
    setAssignmentId(id);
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
  
      const response = await axios.post(`/api/v1/classes/${selectedClassId}/classMemberships/${id}/assignment/${assignmentId}`, selectedAssignment);
  
      console.log(response);
      console.log("Assigned!");
    } catch (e) {
      toast.error(e.message);
    }
  };
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

        <Box
        marginTop={2}
        >
          {assignments.map((assignment) => (
            <Box 
            onClick={() => (handleOpenModal(assignment.id))}
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
                    <Typography sx={{ fontFamily: 'Google', fontWeight:700 }}>{assignment.name}</Typography>
                    <Typography sx={{ fontFamily: 'Google', fontWeight:100, fontSize:12}}>{className} - Due {formatDate(assignment.dueDate)}</Typography>
                  </Box>
              </Box>
              <Box display="flex" alignItems="center" padding='8px' >
                <Box display="flex" alignItems="center" color='grey' >
                  
                    <Box>
                      <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>{getDeadline(assignment.dueDate)} until deadline</Typography>
                    </Box>
                    <Box
                            alignContent='center'
                            paddingX="0.4rem" // Adjust padding as needed
                            paddingTop='6px'
                            borderRadius={50} // Adjust border radius as needed
                            
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
      </Grid>

      <Dialog open={openModal}>
        <Box p={2} sx={{ maxWidth: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Assignment
          </Typography>
          <TextField
            label="Expected Grade"
            fullWidth
            type="number"
            value={''}
            onChange={(e) => setSelectedAssignment({ ...selectedAssignment, expectedGrade: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            value={''}
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
