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
import {LinearProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Block, Edit} from "@mui/icons-material";
import './ManageAccountsPage.css';
import Typography from "@mui/material/Typography";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'app-table-header',
        flex: 1,
        hideable: false
    },
    {
        field: 'className',
        headerName: 'Class',
        headerClassName: 'app-table-header',
        flex: 3,
        renderCell: ({row}) => {
            return (<Box sx={{display: 'flex'}}>
                <Box sx={{ml: '.5rem'}}>
                    <Typography sx={{fontFamily: 'Google', fontWeight: 500, mb: '-.35rem'}}>{row.className}</Typography>
                    <Typography component={'a'} sx={{
                        fontFamily: 'Google',
                        fontSize: '.8rem',
                        mt: '-.35rem',
                        color: '#9c9c9c'
                    }}>{row.description}</Typography>
                </Box>
            </Box>)
        }
    },
    {
        field: 'actions',
        type: 'actions',
        headerClassName: 'app-table-header',
        align: 'center',
        hideable: false,
        flex: 1,
        getActions: (cell) => {
            if (cell.row.isActive) {
                return [<GridActionsCellItem
                    icon={<Block/>}
                    label={'Activate Class'}
                    onClick={() => { // TODO SET UNBAN USER HERE
                    }}
                    showInMenu
                />]
            } else {
                return [<GridActionsCellItem
                    icon={<Block sx={{fill: '#e33327'}}/>}
                    label={'Deactivate Class'}
                    onClick={() => { // TODO SET BAN USER HERE
                    }}
                    showInMenu
                    sx={{color: '#e33327'}}
                />]
            }
        }
    }
];

export default function ManageClassesPage() {
    const {data} = useQuery(
        {
            queryKey: ["adminClassess"],
            queryFn: async () => {
                const response = await axios.get(`api/v1/classes`);
                return response.data
            },
        });

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
