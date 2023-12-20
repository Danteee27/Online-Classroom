import * as React from 'react';
import {useState, useEffect} from 'react';
import { useTheme } from '@emotion/react';
import {Dialog, Icon, IconButton} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Typography, Select, MenuItem, Box} from '@mui/material';
import { Assignment, Comment, MoreVert } from '@mui/icons-material'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function ReviewPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedClassId, setSelectedClassId] = useState('default');
  const [className, setClassName] = useState('All Classes');
  const [assignments, setAssignments] = useState([]);

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
  const classMemberships = data?.classMemberships?.filter(member => member.role === "teacher") ?? [];
  const classes = classMemberships.map(member => member.class);

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

  const handleClassChange = (event) => {
    const selectedId = event.target.value;
    setSelectedClassId(selectedId);

    // Find the class name based on the selected ID
    const selectedClass = classes.find(classItem => classItem.id === selectedId);
    setClassName(selectedClass ? selectedClass.className : 'All Classes');

    // Manually trigger the assignment fetching
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
            onClick={() => navigate('/u/a?=' + assignment.id)}
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
                    <Typography sx={{ fontFamily: 'Google', fontWeight:100, fontSize:12}}>{className} - Due {formatDate(assignment.dueDate)}</Typography>
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
                      <Typography sx={{ fontFamily: 'Google', fontWeight:500 }}>3 to Review</Typography>
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
      </Grid>
    </Grid>
  );
}
