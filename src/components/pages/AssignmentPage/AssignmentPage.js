import * as React from 'react';
import {useState} from 'react';
import {IconButton, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Add, AssignmentOutlined, MoreVert, PersonOutlined, Send, Star} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";
import { useEffect } from 'react';

export default function AssignmentPage() {
    const {classId, assignmentId, membershipId} = useParams();
    const [flag, setFlag] = useState(0)
    const {data: classDetails} = useQuery(
        {
            queryKey: ["class", classId],
            queryFn: async () => {
                const response = await axios.get(`api/v1/classes/${classId}`);
                return response.data
            }
        });
    

    const { data: details } = useQuery({
        queryKey: ["assignmentDetails", classId, membershipId, assignmentId],
        queryFn: async () => {
            const response = await axios.get(`api/v1/classes/${classId}/classMemberships/${membershipId}/assignment/${assignmentId}`);
            return response.data;
        },
    });
    const assignment = classDetails?.assignments?.find(assignment => assignment.id.toString() === assignmentId);
    const {data: creator} = useQuery(
        {
            queryKey: ["user", assignment?.creator?.id],
            queryFn: async () => {
                if(assignment?.creator?.id === null) return null;

                const response = await axios.get(`api/v1/users/${assignment?.creator?.id}`);
                return response.data
            }
        });
        const [classMembership, setClassMembership] = useState(null);
        const userId = localStorage.getItem("userId").toString();
        const {data: userDetails} = useQuery(
            {
                queryKey: ["user", userId],
                queryFn: async () => {
                    const response = await axios.get(`api/v1/users/${userId}`);
                    return response.data
                }
        });

        useEffect(() => {
            // Assuming userDetails is fetched successfully
            const membership = userDetails?.classMemberships?.find(member => member.class.id === Number(classId));
            setClassMembership(membership);
          }, [userDetails, classId]); 
         
    const a = {
        name: assignment?.name,
        createdAt: details?.createdAt && new Date(details?.createdAt).toDateString(),
        maxGrade: assignment?.maxGrade,
        description: details?.description,
        studentName: details?.classMembership?.fullName ?? details?.classMembership?.user?.firstName + ' ' +details?.classMembership?.user?.lastName,
        teacherName: creator?.firstName + ' ' + creator?.lastName,
        studentExplanation: details?.studentExplanation,
        teacherComment: details?.teacherComment,
        studentComment: details?.studentComment,
        teacherFinalisedComment: details?.teacherFinalisedComment,
        grade: details?.grade ?? null,
        currentGrade: details?.currentGrade ?? 0,
        expectedGrade: details?.expectedGrade ?? 0,
        isFinalised: details?.isFinalised,
        isRequested: details?.isRequested,
        isReviewed: details?.isReviewed,
        isSubmitted: details?.isSubmitted
    }
    const [reviewData, setReviewData] = useState({
        createdAt: details?.createdAt && new Date(details?.createdAt).toDateString(),
        studentName: details?.classMembership?.fullName ?? details?.classMembership?.user?.firstName + ' ' +details?.classMembership?.user?.lastName,
        studentExplanation: details?.studentExplanation,
        teacherComment: details?.teacherComment,
        studentComment: details?.studentComment,
        teacherFinalisedComment: details?.teacherFinalisedComment,
        grade: '',
        currentGrade: details?.currentGrade ?? 0,
        expectedGrade: details?.expectedGrade ?? 0,
        isFinalised: details?.isFinalised,
        isRequested: details?.isRequested,
        isReviewed: details?.isReviewed,
        isSubmitted: details?.isSubmitted,
        // Add other fields as needed
      });
    
      const handleFieldChange = (fieldName) => (e) => {
        setReviewData((prevData) => ({
          ...prevData,
          [fieldName]: e.target.value,
        }));
      };
    const queryClient = useQueryClient();
    const theme = useTheme();
    const [review, setReview] = useState("");
    const handleFinalised = async () => {
        try {
            console.log(reviewData)
            const response = await axios.put(`/api/v1/classes/${classId}/classMemberships/${membershipId}/assignment/${assignmentId}`, 
            {
                ...reviewData,
                isFinalised: true,
            });
            console.log(response);
            toast.success("Successfully finalised!")
        }
        catch(e){
            toast.error(e);
            return;
        }
    }
    const handleEditAssignment = async () => {
        console.log(details)
        try {
          if (!['student', 'teacher'].includes(classMembership.role)) {
            throw new Error('Invalid role specified.');
          }
          if (classMembership.role === 'student') {
            if (a.isRequested === false) {
                setReviewData((prevReviewData) => ({
                    ...prevReviewData,
                    isRequested: true,
                  }));
            } else {
                if(flag === 1) {
                    setReviewData((prevReviewData) => ({
                        ...prevReviewData,
                        isRequested: false,
                      }));
                    toast.error("The teachers haven't graded  your work!");
                    return
                }
                else{
                    toast.error("You have already requested a review!");
                    return;
                }
            }
          } else if (classMembership.role === 'teacher') {
            console.log(a.isRequested)
            if (a.isRequested === true) {
                setReviewData((prevReviewData) => ({
                    ...prevReviewData,
                    isRequested: false,
                  }));
            } else if(details.isRequested !== true) {
                if(flag === 1) {
                    console.log("grading");
                    setReviewData((prevReviewData) => ({
                        ...prevReviewData,
                        isRequested: false,
                      }));
                }
                else{
                    toast.error("You have already reviewed this assignment!");
                    return;
                }
            }
          }
          const response = await axios.put(`/api/v1/classes/${classId}/classMemberships/${membershipId}/assignment/${assignmentId}`, reviewData);
          console.log(response);
      
          await queryClient.refetchQueries();
          
          if (classMembership.role === 'student') {
            toast.success("Request sent successfully!");
          } else if (classMembership.role=== 'teacher') {
            toast.success("Updated successfully!");
          }
        } catch (e) {
          toast.error(e.message || "An error occurred while updating the assignment.");
        }
      };
      useEffect(() => {
        if (a.grade === null) {
          setFlag(1);
        }
        else {setFlag(0)}
      }, [a.grade]); 
      
    const leftColumn = (
        <Box sx={{display: 'flex'}}>
            <Box sx={{
                background: theme.palette.primary.main,
                p: '.5rem',
                width: '40px',
                height: '40px',
                borderRadius: 100,
                mr: '1rem'
            }}>
                <AssignmentOutlined sx={{fill: 'white',}}/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Typography variant='h4' sx={{fontFamily:'Google'}}>{a.name}</Typography>
                    {classMembership?.role === "teacher" ? (
                    <Button
                    variant="outlined"
                    onClick={handleFinalised}
                    sx={{
                        color: theme.palette.primary.main,
                        mr: 0,
                        fontFamily: 'Google',
                        textTransform: 'none'
                    }}
                    // onClick={(e) => setAnchorElChangePassword(e.currentTarget)}
                >
                    <Star sx={{width: 20, height: 20, fill: theme.palette.primary.main}}/> &nbsp;&nbsp;Finalised 
                </Button>):null}
                </Box>
                <Box sx={{display:'flex'}}><Typography variant={'subtitle2'}
                               sx={{
                                   fontFamily: 'Google',
                                   fontWeight: 500,
                                   fontSize: '.875rem'
                               }}>{a.teacherName}</Typography>
                    <Box sx={{mx: '.325rem'}}>•</Box>
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '.875rem',
                                }}>{a.createdAt}</Typography>
                </Box>
                <Box sx={{ mb: '1rem', borderBottom: '0.0625rem solid lightgrey',}}>
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontFamily: 'Google',
                                    fontSize: '.875rem',
                                }}>
                        <b>{a.grade}</b>/100
                    </Typography>
                    { !a.isRequested && (
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontFamily: 'Google',
                                    fontSize: '.875rem',
                                    color: "red",
                                    mb: '1rem',
                                }}>
                        Expected Grade: {a.expectedGrade}
                    </Typography>)}
                </Box>
                <Typography variant={'body1'}
                            sx={{
                                fontSize: '.875rem',
                                borderBottom: '0.0625rem solid lightgrey',
                                mb: '1rem',
                                pb: '2rem'
                            }}>
                    {a.description}
                </Typography>
                <Box sx={{display: 'flex'}}><PersonOutlined sx={{fill: theme.palette.primary.main}}/>
                    <Typography variant={'h6'}
                                sx={{
                                    fontSize: '1rem',
                                    fontFamily: 'Google',
                                    color: theme.palette.primary.main
                                }}>
                        Comments
                    </Typography>
                </Box>
                {a.studentExplanation && <ChatDialog name={a.studentName} reason={a.studentExplanation}/>}
                {a.teacherComment && <ChatDialog name={a.teacherName} reason={a.teacherComment}/>}
                {a.studentComment && <ChatDialog name={a.studentName} reason={a.studentComment}/>}
                {a.teacherFinalisedComment && <ChatDialog name={a.teacherName} reason={a.teacherFinalisedComment}/>}
                <form autoComplete="off" style={{display: 'flex', paddingTop: '2ch'}} >
                    <Box sx={{'& fieldset': {borderRadius: 100}, flexGrow: 1}}>
                        <TextField placeholder={'Add private comment...'}
                                   size="small"
                                   variant="outlined"
                                   onChange={e => setReview(e.target.value)}
                                   value={review}
                                   InputProps={{style: {fontSize: '.875rem'}}}
                                   sx={{display: 'flex'}}/>
                    </Box>
                    <IconButton type={"submit"}><Send/></IconButton>
                </form>
            </Box>
    </Box>)

    function ChatDialog(props) {
        return <Box sx={{display: 'flex', mt: '1rem'}}>
            <Avatar src={props.avatar} sx={{width: '32px', height: '32px'}}/>
            <Box sx={{pl: '.75rem'}}>
                <Box sx={{display: 'flex'}}>
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontFamily: 'Google',
                                    fontWeight: 500,
                                    fontSize: '.875rem'
                                }}>{props.name}</Typography>
                    <Typography variant={'subtitle2'}
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '.75rem',
                                    pt: '.125rem',
                                    pl: '.3rem'
                                }}>{props.time}</Typography>
                </Box>
                <Typography variant={'subtitle2'}
                            sx={{
                                fontWeight: 500,
                                fontSize: '.875rem'
                            }}>{props.reason}</Typography>
            </Box>
        </Box>
    }
    const RightColumn = () => {
        const role = classMembership?.role;   
        const isTeacher = role === 'teacher';
        const isStudent = role === 'student';
        return ( <Box>
        {isTeacher &&  (<Box>
        <Box sx={{
            boxShadow: 3,
            p: 2,
            border: '0.0625rem solid rgb(218,220,224)',
            borderRadius: 2,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center', mt: '0.5rem'
            }}><Typography
                variant={'h5'}
                sx={{fontColor: 'rgba(0,0,0,.549)', fontFamily: 'Google', fontWeight: 500}}>
                Review
                 </Typography>
                
                </Box>
                {a.grade !== null ?(
                    <TextField
                    label="Adjusted Grade"
                    fullWidth
                    type="number"
                    value={reviewData.grade}
                    onChange={(e) => setReviewData({ ...reviewData, grade: Number(e.target.value) })}
                    margin="normal"
                    />
                ) : <TextField
                label="Initial Grade"
                fullWidth
                type="number"
                value={reviewData.grade}
                onChange={(e) => setReviewData({ ...reviewData, grade: Number(e.target.value) })}
                margin="normal"
                />}
                {a.teacherComment === null && a.grade !== null ? (
                    <TextField
                    label="Comment"
                    fullWidth
                    onChange={(e) => setReviewData({ ...reviewData, teacherComment: e.target.value })}
                    margin="normal"
                    />
                ) : a.teacherComment !== null && a.grade !== null ? (
                    <TextField
                    label="Comment"
                    fullWidth
                    onChange={(e) => setReviewData({ ...reviewData, teacherFinalisedComment: e.target.value })}
                    margin="normal"
                    />
                ): null}
            
            <Button variant={'contained'} sx={{textTransform: 'none', width: '100%', my: '1rem'}}
            onClick={()=>handleEditAssignment()}>
                <Typography sx={{
                    fontSize: '.875rem',
                    fontFamily: 'Google',
                    fontWeight: 500,
                    color: 'white'
                }}>Publish review</Typography>
            </Button>
        </Box>


    </Box>)} {isStudent && flag !==1 && a.isFinalised === false &&
    (<Box>
        <Box sx={{
            boxShadow: 3,
            p: 2,
            border: '0.0625rem solid rgb(218,220,224)',
            borderRadius: 2,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center', mt: '0.5rem'
            }}>
                <Typography
                variant={'h5'}
                sx={{fontColor: 'rgba(0,0,0,.549)', fontFamily: 'Google', fontWeight: 500}}>
                Request for review
                 </Typography>
                </Box>
            
                    <TextField
                    label="Expected Grade"
                    fullWidth
                    type="number"
                    value={reviewData.grade}
                    onChange={(e) => setReviewData({ ...reviewData, expectedGradeg: Number(e.target.value) })}
                    margin="normal"
                    />
                    {a.studentComment === null && a.grade !== null ? (
                        <TextField
                        label="Comment"
                        fullWidth
                        onChange={(e) => setReviewData({ ...reviewData, teacherComment: e.target.value })}
                        margin="normal"
                        />
                    ) : a.studentComment !== null && a.grade !== null ? (
                        <TextField
                        label="Comment"
                        fullWidth
                        onChange={(e) => setReviewData({ ...reviewData, teacherFinalisedComment: e.target.value })}
                        margin="normal"
                        />
                    ): null}
            
            <Button variant={'contained'} sx={{textTransform: 'none', width: '100%', my: '1rem'}}
            onClick={()=>handleEditAssignment()}>
                <Typography sx={{
                    fontSize: '.875rem',
                    fontFamily: 'Google',
                    fontWeight: 500,
                    color: 'white'
                }}>Publish request</Typography>
            </Button>
        </Box>
    </Box>)}</Box> );};

    return (<Grid
            container
            spacing={3}
            alignItems="top"
            justifyContent="center"
            sx={{margin: '0 auto', mx: 'auto', maxWidth: '1000px',}}
        >
            <Grid item xs={8}>{leftColumn} </Grid>
            <Grid item xs={4}>{RightColumn()}</Grid>
        </Grid>
    );
}