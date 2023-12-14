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

const renderRole = (cell) => {
    if (cell.value === 'admin')
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

    if (cell.value === 'teacher')
        return (<Chip
            avatar={<svg fill={'#44399f'} focusable="false" width="24" height="24" viewBox="0 0 24 24"
                         className=" NMm5M">
                <circle cx="17" cy="12.5" r="2.5"></circle>
                <path
                    d="M17 15.62c-1.67 0-5 .84-5 2.5V20h10v-1.88c0-1.66-3.33-2.5-5-2.5zM10 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm1.82 9.17c.01 0 0 0 0 0zM10 13c-2.67 0-8 1.34-8 4v3h8v-2H4v-.99c.2-.72 3.3-2.01 6-2.01.6 0 1.22.07 1.82.17h.01l2.07-1.55c-1.39-.41-2.85-.62-3.9-.62z"></path>
            </svg>}
            label={'Teacher'}
            sx={{
                backgroundColor: '#eeebfe', borderRadius: 2, "& .MuiChip-label": {
                    fontFamily: 'Google',
                    fontWeight: 500,
                    pl: '.5rem',
                    color: '#44399f'
                }
            }}/>);

    return (<Chip
            avatar={<Person fill={'#3a4354'}/>}
            label={'Student'}
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
                    <Typography sx={{fontFamily: 'Google', fontWeight: 500, mb: '-.35rem'}}>{row.username}</Typography>
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
            if (role1 === 'admin') return 1;
            if (role2 === 'admin') return -1;

            if (role1 === 'teacher') return 1;
            if (role2 === 'teacher') return -1;
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
                    {row.role !== 'student' &&
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
                    {row.role === 'student' &&
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
            if (cell.row.isBanned) {
                return [<GridActionsCellItem
                    icon={<Block/>}
                    label={'Unban User'}
                    onClick={() => { // TODO SET UNBAN USER HERE
                    }}
                    showInMenu
                />]
            } else {
                return [<GridActionsCellItem
                    icon={<Block sx={{fill: '#e33327'}}/>}
                    label={'Ban User'}
                    onClick={() => { // TODO SET BAN USER HERE
                    }}
                    showInMenu
                    sx={{color: '#e33327'}}
                />]
            }
    }}
];

const rows = [
    {
        id: 1, username: 'Snow', email: 'Jon@gmail.com', role: 'admin',
        avatar: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg'
    },
    {id: 2, username: 'Lannister', email: 'Cersei@gmail.com', role: 'teacher'},
    {id: 3, username: 'Lannister', email: 'Jaime@gmail.com', role: 'admin'},
    {id: 4, username: 'Stark', email: 'Arya@gmail.com', role: 'teacher'},
    {id: 5, username: 'Targaryen', email: 'Daenerys@gmail.com', role: 'student'},
    {id: 6, username: 'Melisandre', email: null, age: 150, role: 'student'},
    {id: 7, username: 'Clifford', email: 'Ferrara@gmail.com', role: 'student'},
    {id: 8, username: 'Frances', email: 'Rossini@gmail.com', role: 'student'},
    {id: 9, username: 'Roxie', email: 'Harvey@gmail.com', role: 'student'},
    {id: 10, username: 'Snow', email: 'Jon@gmail.com', role: 'admin'},
    {id: 12, username: 'Lannister', email: 'Cersei@gmail.com', role: 'teacher'},
    {id: 13, username: 'Lannister', email: 'Jaime@gmail.com', role: 'admin'},
    {id: 14, username: 'Stark', email: 'Arya@gmail.com', role: 'teacher'},
    {id: 15, username: 'Targaryen', email: 'Daenerys@gmail.com', role: 'student'},
    {id: 16, username: 'Melisandre', email: null, age: 150, role: 'student'},
    {id: 17, username: 'Clifford', email: 'Ferrara@gmail.com', role: 'student'},
    {id: 18, username: 'Frances', email: 'Rossini@gmail.com', role: 'student'},
    {id: 11, username: 'Roxie', email: 'Harvey@gmail.com', role: 'student'},
];

export default function ManageAccountsPage() {
    return (
        <Box sx={{
            alignItems: "top",
            justifyContent: "center",
            mt: '2rem', mx: 'auto', maxWidth: '1000px'
        }}>
            <DataGrid
                rows={rows}
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
