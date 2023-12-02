import './App.css';
import SignIn from "./components/pages/SignIn.js";
import {Navigate, Route, Routes} from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import MainPage from "./components/pages/MainPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {baseUrl} from "./apis/api.config";
import VerificationSent from "./components/pages/VerificationSent";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {StyledEngineProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            contrastText: '#5f6368',
            main: '#185acb',
        },
        secondary: {
            main: '#185acb',
            light: '#73a6ff',
        },
        text: {
            primary: '#5f6368',
        },
    },
    components:{
        MuiAppBar:{
            styleOverrides:{
                colorPrimary:{
                    backgroundColor: 'white',
                    backgroundImage: 'unset'
                },
            }
        }
    },
});

function App() {
    axios.defaults.baseURL = baseUrl;

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Routes>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/verificationSent" element={<VerificationSent/>}/>
                <Route path="/home" element={<MainPage/>}/>
                <Route path="/" element={<Navigate to="/login" replace={true}/>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
