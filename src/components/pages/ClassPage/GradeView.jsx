import React, { useEffect } from 'react';
import { Paper, Table, TableBody, Button, TextField, Dialog, TableCell, TableContainer, TableHead, TableRow, Typography, Box, IconButton, Icon } from '@mui/material';
import {NoteAdd, Edit, DeleteForever, DocumentScanner, Book} from "@mui/icons-material";
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";

const GradeView = () => {
  const theme = useTheme();
  const userId = localStorage.getItem("userId").toString();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const {data: userDetails} = useQuery(
    {
        queryKey: ["user", localStorage.getItem("userId").toString()],
        queryFn: async () => {
            const response = await axios.get(`api/v1/users/${localStorage.getItem("userId").toString()}`);
            return response.data
        }
  });
  const [classMembership, setClassMembership] = useState(null);
  const {classId} = useParams();

  const {data: classDetails} = useQuery(
        {
            queryKey: ["class", classId],
            queryFn: async () => {
                const response = await axios.get(`api/v1/classes/${classId}`);
                return response.data
            }
        });
  const formatDate = (dateString) => {
          const date = new Date(dateString);
          const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
          return new Intl.DateTimeFormat('en-GB', options).format(date);
        };
  const assignments = classDetails?.assignments?.filter((assignment) => !assignment.deleted);
  const queryClient = useQueryClient();
  const [newAssignment, setNewAssignment] = useState({
    name: '',
    creatorId:userId,
    dueDate: '',
    maxGrade: '',
    description: '',
  });
  const [selectedAssignment, setSelectedAssignment] = useState({
    name: '',
    dueDate: '',
    maxGrade: '',
    description: '',
    deleted: false
  });
  
  const handleOpenEditModal = (assignment) => {
    setSelectedAssignment({ ...assignment });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedAssignment(null);
    setOpenEditModal(false);
  };
  const handleOpenModal = () => {
    console.log(assignments);
    setOpenModal(true);
  };  

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCreateAssignment = async () => {
    console.log('Creating a new assignment', newAssignment);
  
    try {
      const response = await axios.post(`api/v1/classes/${classId}/assignments`, newAssignment);
      console.log(response);
    } catch (e) {
      toast.error(e.message);
    }
  
    setNewAssignment({
      creatorId: userId,
      name: '',
      dueDate: '',
      maxGrade: '',
      description: '',
    });
  
    await queryClient.refetchQueries(["class", classId]);
    handleCloseModal();
  };
  

  const handleEditAssignment = async (assignment) => {
    try {
      const response = await axios.put( `api/v1/classes/${classId}/assignments/${assignment.id}`, assignment);
      console.log(response)
      // Refetch the data after deletion
      await queryClient.refetchQueries(["class", classId]);
      toast.success("Assignment updated successfully!");
    } catch (e) {
      toast.error(e.message);
    }
    handleCloseEditModal();
  };
  const handleDeleteAssignment = async (assignment) => {
    try {
      // Set the "deleted" field to true
      const updatedAssignment = {
        ...assignment,
        deleted: true,
      };
  
      // Perform the API call to update the assignment
      const response = await axios.put(`api/v1/classes/${classId}/assignments/${assignment.id}`, updatedAssignment);
      console.log(response);
      // Refetch the data after updating
      await queryClient.refetchQueries(["class", classId]);
      toast.success("Assignment deleted successfully!");
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    // Assuming userDetails is fetched successfully
    const membership = userDetails?.classMemberships?.find(member => member.class.id === Number(classId));
    setClassMembership(membership);
    console.log(membership.role);
  }, [userDetails, classId]); 
  return (
    <Box spacing={3} maxWidth="1000px" marginX="auto">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        color={theme.palette.primary.main}
        borderBottom={`0.0625rem solid ${theme.palette.primary.main}`}
        marginBottom="1rem"
      >
        <Typography variant="h4" sx={{ fontFamily: 'Google' }}>Assignments</Typography>
        {classMembership?.role==="teacher" && <IconButton size={'large'}
                        onClick={(e) => handleOpenModal()}
                        sx={{color: theme.palette.primary.main}}><NoteAdd/></IconButton>}
      </Box>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="50px" >
            </TableCell>
            <TableCell width="200px" >
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
          {assignments?.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell><Icon style={{ color: theme.palette.primary.main }}><Book/></Icon></TableCell>
              <TableCell>{assignment.name}</TableCell>
              <TableCell>{formatDate(assignment.dueDate)}</TableCell>
              <TableCell align='center'>{assignment.maxGrade}%</TableCell>
              <TableCell>{assignment.description}</TableCell>
              <TableCell align='center'>
                <Box
                  style={{ width: '50px' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >{classMembership?.role==="teacher" && 
                  <IconButton
                    size="large"
                    onClick={() => handleOpenEditModal(assignment)}
                    style={{ color: theme.palette.success.main }}
                  >
                    <Edit/>
                  </IconButton>}
                  {classMembership?.role==="teacher" && 
                  <IconButton
                    size="large"
                    onClick={() => handleDeleteAssignment(assignment)}
                    style={{ color: theme.palette.error.main }}
                  >
                    <DeleteForever />
                  </IconButton>}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog open={openModal} onClose={handleCloseModal}>
        <Box p={2} sx={{ maxWidth: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Create New Assignment
            </Typography>
            <TextField
              label="Name"
              fullWidth
              value={newAssignment.name}
              onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
              margin="normal"
            />
            <TextField
              label="MaxGrade"
              type="number"
              fullWidth
              value={newAssignment.maxGrade}
              onChange={(e) => setNewAssignment({ ...newAssignment, maxGrade: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
              margin="normal"
            />

            <TextField
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
              margin="normal"
            />
          <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={()=>handleCloseModal} color={'inherit'}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>Cancel</Button>
                        <Button type={"submit"} onClick={()=>handleCreateAssignment()}
                                sx={{textTransform: 'none', fontFamily: 'Google', fontSize: 14}}>Create</Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <Box p={2} sx={{ maxWidth: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Edit Assignment
          </Typography>
          <TextField
            label="Name"
            fullWidth
            value={selectedAssignment?.name || ''}
            onChange={(e) => setSelectedAssignment({ ...selectedAssignment, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Percentage"
            fullWidth
            type="number"
            value={selectedAssignment?.maxGrade || ''}
            onChange={(e) => setSelectedAssignment({ ...selectedAssignment, maxGrade: Number(e.target.value) })}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            value={selectedAssignment?.description || ''}
            onChange={(e) => setSelectedAssignment({ ...selectedAssignment, description: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Deadline"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="date"
            value={selectedAssignment?.dueDate}
            onChange={(e) => setSelectedAssignment({ ...selectedAssignment, dueDate: e.target.value })}
            margin="normal"
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={()=>handleCloseEditModal()} color="inherit" sx={{ textTransform: 'none', fontFamily: 'Google', fontSize: 14 }}>
              Cancel
            </Button>
            <Button type="submit" onClick={()=>handleEditAssignment(selectedAssignment)} sx={{ textTransform: 'none', fontFamily: 'Google', fontSize: 14 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>

    </Box>
  );
};

export default GradeView;