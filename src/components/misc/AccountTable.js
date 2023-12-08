import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import {LinearProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Edit} from "@mui/icons-material";
import './AccountTable.css';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'app-table-header',
        flex: 1,
        hideable: false
    },
    {
        field: 'role',
        headerName: 'Role',
        headerClassName: 'app-table-header',
        flex: 1,
    },
    {
        field: 'email',
        headerName: 'Email',
        headerClassName: 'app-table-header',
        sortable: false,
        flex: 3,
    },
    {
        field: 'username',
        headerName: 'Username',
        headerClassName: 'app-table-header',
        flex: 3,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        headerClassName: 'app-table-header',
        type: 'dateTime',
        flex: 2,
    },
    {
        field: 'updatedAt',
        type: 'dateTime',
        headerName: 'Updated At',
        headerClassName: 'app-table-header',
        flex: 2,
    },
    {

        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        headerClassName: 'app-table-header',
        align: 'center',
        flex: 1,
        renderCell: () => {
            return (<IconButton><Edit sx={{width: 20, height: 20}}/> </IconButton>)
        }
    }
];

const rows = [
    {id: 1, username: 'Snow', email: 'Jon', age: 35},
    {id: 2, username: 'Lannister', email: 'Cersei', age: 42},
    {id: 3, username: 'Lannister', email: 'Jaime', age: 45},
    {id: 4, username: 'Stark', email: 'Arya', age: 16},
    {id: 5, username: 'Targaryen', email: 'Daenerys', age: null},
    {id: 6, username: 'Melisandre', email: null, age: 150},
    {id: 7, username: 'Clifford', email: 'Ferrara', age: 44},
    {id: 8, username: 'Frances', email: 'Rossini', age: 36},
    {id: 9, username: 'Roxie', email: 'Harvey', age: 65},
];

export default function AccountTable() {
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
                            updatedAt: false,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                disableColumnMenu
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
                }}
            />
        </Box>
    );
}
