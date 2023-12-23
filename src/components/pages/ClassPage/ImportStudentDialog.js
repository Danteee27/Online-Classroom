import {Dialog, IconButton, LinearProgress, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import i18n from "i18next";
import Button from "@mui/material/Button";
import {ArticleOutlined, UploadFile} from "@mui/icons-material";
import * as React from "react";
import {useState} from "react";
import {parse} from "csv-parse/browser/esm/sync";
import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {toast} from "react-toastify";
import axios from "axios";
import {useParams} from "react-router-dom";

export function ImportStudentDialog(props) {
    const theme = useTheme();
    const {classId} = useParams();
    const [importStudentAnchorEl, setImportStudentAnchorEl] = useState(null);

    const [csvData, setCsvData] = useState([]);
    const [filename, setFilename] = useState("");

    const handleAddStudent = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < csvData.length; i++) {
                const data = {
                    fullName: csvData[i].fullName,
                    studentId: csvData[i].id,
                    role: 'student'
                }
                await axios.post(`api/v1/classes/${classId}/classMemberships`, data)
            }

            toast.success("Added students successfully!");
            setImportStudentAnchorEl(null);
        } catch (e) {
            toast.error(e.message);
        }
    }

    const columns = [
        {
            field: "id",
            headerName: "Student ID",
            flex: 1,
        },
        {
            field: "fullName",
            headerName: "Full Name",
            flex: 2
        }
    ];

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const {name} = file;
        setFilename(name);

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                return;
            }
            const {result} = evt.target;
            const records = parse(result, {
                columns: ["id", "fullName"],
                delimiter: ",",
                trim: true,
                skip_empty_lines: true,
                from_line: 2,
            });
            setCsvData(records);
        };
        reader.readAsBinaryString(file);
    };

    const dialog = <Dialog
        fullWidth
        sx={{mx: "auto", maxWidth: "500px"}}
        open={importStudentAnchorEl} onClose={() => setImportStudentAnchorEl(null)}>
        <form autoComplete="off" onSubmit={handleAddStudent}>
            <Box
                sx={{
                    display: "grid",
                    gap: "1.25rem",
                    margin: "1.25rem",
                }}
            >
                <Typography variant={"h6"}
                            sx={{fontFamily: "Google", fontSize: 16}}>{i18n.t("Import students")}</Typography>

                <DataGrid
                    autoHeight
                    rows={csvData}
                    columns={columns}
                    hideFooter
                    disableRowSelectionOnClick
                    disableColumnMenu
                    density={"comfortable"}
                    sx={{mt: 1, fontFamily: 'Google'}}
                    localeText={{
                        toolbarExport: 'Download Template'
                    }}
                    slots={{
                        toolbar: () => (
                            <GridToolbarContainer style={{
                                marginRight: '1rem',
                                marginTop: '.5rem'
                            }}>
                                <GridToolbarExport/>
                                <Button
                                    component="label"
                                    startIcon={<UploadFile/>}
                                >
                                    Upload
                                    <input type="file" accept=".csv" hidden onChange={handleFileUpload}/>
                                </Button>
                                {filename &&
                                    <Typography variant={"body2"} sx={{fontSize: '.75rem'}}>{filename}</Typography>}
                            </GridToolbarContainer>
                        ),
                        loadingOverlay: LinearProgress,
                    }}
                />
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button onClick={() => setImportStudentAnchorEl(null)} color={"inherit"}
                            sx={{textTransform: "none", fontFamily: "Google", fontSize: 14}}>{i18n.t("Cancel")}</Button>
                    <Button type={"submit"}
                            sx={{textTransform: "none", fontFamily: "Google", fontSize: 14}}>{i18n.t("Save")}</Button>
                </div>
            </Box>
        </form>
    </Dialog>;

    return <>
        <IconButton size={'large'}
                    onClick={(e) => setImportStudentAnchorEl(e.currentTarget)}
                    sx={{color: theme.palette.primary.main}}><ArticleOutlined/></IconButton>
        {dialog}
    </>;
}