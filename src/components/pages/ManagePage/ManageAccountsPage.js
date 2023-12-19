import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import {Chip, LinearProgress, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Assignment, Block, Edit, Person} from "@mui/icons-material";
import './ManageAccountsPage.css';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";

const renderRole = (cell) => {
    if (cell.value.name === 'Admin')
        return (<Chip
            avatar={<Assignment sx={{fill: '#1d3f96'}}/>}
            label={'Admin'}
            sx={{
                backgroundColor: '#e2efff', borderRadius: 2, "& .MuiChip-label": {
                    fontFamily: 'Google',
                    fontWeight: 500,
                    pl: '.5rem',
                    color: '#1d3f96'
                }
            }}/>);

    return (<Chip
            avatar={<Person fill={'#3a4354'}/>}
            label={'User'}
            sx={{
                backgroundColor: '#f3f4f6', borderRadius: 2, "& .MuiChip-label": {
                    fontFamily: 'Google',
                    fontWeight: 500,
                    pl: '.5rem',
                    color: '#3a4354'
                }
            }}/>
    )
}

export default function ManageAccountsPage() {
    const {data , refetch} = useQuery(
        {
            queryKey: ["users"],
            queryFn: async () => {
                const response = await axios.get(`api/v1/users?limit=999`);
                return response.data.data
            },
        });

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerClassName: 'app-table-header',
            flex: 1,
            hideable: false
        },
        {
            field: 'username',
            headerName: 'Name',
            headerClassName: 'app-table-header',
            flex: 3,
            renderCell: ({row}) => {
                return (<Box sx={{display: 'flex'}}>
                    <Avatar src={row.avatar}/>
                    <Box sx={{ml: '.5rem'}}>
                        <Typography sx={{fontFamily: 'Google', fontWeight: 500, mb: '-.35rem'}}>{row.firstName + ' ' + row.lastName}</Typography>
                        <Typography component={'a'} href={"mailto:" + row.email} sx={{
                            fontFamily: 'Google',
                            fontSize: '.8rem',
                            mt: '-.35rem',
                            color: '#9c9c9c'
                        }}>{row.email}</Typography>
                    </Box>
                </Box>)
            }
        },
        {
            field: 'role',
            headerName: 'Role',
            headerClassName: 'app-table-header',
            flex: 1,
            sortComparator: (role1, role2) => {
                if (role1.name === 'Admin') return 1;
                if (role2.name === 'Admin') return -1;
            },
            renderCell: renderRole
        },
        {
            field: 'studentId',
            headerName: 'Student ID',
            headerClassName: 'app-table-header',
            flex: 1,
            renderCell: ({row}) => {
                return (
                    <>
                        {row.role.name !== 'User' &&
                            <Tooltip title={'Not Student'}>
                                <Container sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: 0,
                                    padding: 0,
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100%',
                                    fontFamily: 'Google',
                                    fontWeight: '500',
                                    fontSize: 15
                                }}></Container>
                            </Tooltip>
                        }
                        {row.role.name === 'User' &&
                            <TextField
                                placeholder={'Unassigned'}
                                inputProps={{
                                    style: {
                                        padding: '0.1rem 0 0 0',
                                        fontFamily: 'Google',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        textAlign: 'center'
                                    }
                                }}
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    borderColor: 'transparent',
                                    '& label.Mui-focused': {
                                        color: 'transparent',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: 'transparent',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'transparent',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'transparent',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'transparent',
                                        },
                                    },
                                }}
                            />
                        }
                    </>
                );
            }
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            headerClassName: 'app-table-header',
            type: 'dateTime',
            flex: 2,
        },
        {
            field: 'actions',
            type: 'actions',
            headerClassName: 'app-table-header',
            align: 'center',
            hideable: false,
            flex: 1,
            getActions: (cell) => {
                if (cell.row.isLocked) {
                    return [<GridActionsCellItem
                        icon={<Block/>}
                        label={'Unban User'}
                        onClick={async () => {
                            try {
                                const data = {
                                    isLocked: false
                                }
                                const response = await axios.patch(`api/v1/users/${cell.row.id}`, data);
                                await refetch()
                                toast.success(`Unbanned ${cell.row.firstName + ' ' + cell.row.lastName}.`)
                            } catch (e) {
                                toast.error(e.message);
                            }
                        }}
                        showInMenu
                    />]
                } else {
                    return [<GridActionsCellItem
                        icon={<Block sx={{fill: '#e33327'}}/>}
                        label={'Ban User'}
                        onClick={async () => {
                            try {
                                if(cell.row.role.name === 'Admin'){
                                    toast.error("Cannot ban admin.");
                                    return;
                                }

                                const data = {
                                    isLocked: true
                                }
                                const response = await axios.patch(`api/v1/users/${cell.row.id}`, data);
                                await refetch()
                                toast.success(`Banned ${cell.row.firstName + ' ' + cell.row.lastName}.`)
                            } catch (e) {
                                toast.error(e.message);
                            }
                        }}
                        showInMenu
                        sx={{color: '#e33327'}}
                    />]
                }
            }}
    ];

    return (
        <Box sx={{
            alignItems: "top",
            justifyContent: "center",
            mt: '2rem', mx: 'auto', maxWidth: '1000px'
        }}>
            <DataGrid
                rows={data ?? []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            createdAt: false,
                        },
                    },
                    sorting: {
                        sortModel: [{field: 'id', sort: 'asc'}],
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                disableColumnMenu
                density={"comfortable"}
                slots={{
                    toolbar: () => (
                        <GridToolbarContainer style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginRight: '1rem',
                            marginTop: '.5rem'
                        }}>
                            <GridToolbarColumnsButton/>
                            <GridToolbarFilterButton/>
                            <GridToolbarExport/>
                        </GridToolbarContainer>
                    ),
                    loadingOverlay: LinearProgress,
                    moreActionsIcon: () => <IconButton><Edit sx={{width: 20, height: 20}}/></IconButton>
                }}
            />
        </Box>
    );
}
