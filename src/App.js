import "./App.css";
import SignIn from "./components/pages/SignIn.js";
import {Navigate, Route, Routes} from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import AppLayout from "./components/pages/AppLayout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {baseUrl} from "./apis/api.config";
import VerificationSent from "./components/pages/VerificationSent";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ClassPage from "./components/pages/ClassPage/ClassPage";
import HomePage from "./components/pages/HomePage";
import VerificationConfirm from "./components/pages/VerificationConfirm.js";
import ForgotPassword from "./components/pages/ForgotPassword.js";
import ResetPassword from "./components/pages/ResetPassword.js";
import ManagePage from "./components/pages/ManagePage/ManagePage";
import ReviewPage from "./components/pages/ReviewPage/ReviewPage";
import AssignmentPage from "./components/pages/AssignmentPage/AssignmentPage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      contrastText: "#5f6368",
      main: "#185acb",
    },
    secondary: {
      main: "#185acb",
      light: "#73a6ff",
    },
    text: {
      primary: "#5f6368",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
          backgroundImage: "unset",
        },
      },
    },
  },
});

const toast = (
  <ToastContainer
    position="bottom-left"
    autoClose={1500}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
);

function App() {
  axios.defaults.baseURL = baseUrl;

  return (
    <ThemeProvider theme={theme}>
      {toast}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verificationSent" element={<VerificationSent />} />
        <Route path="/verificationConfirm" element={<VerificationConfirm />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="/u" element={<AppLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="c" element={<ClassPage />} />
          <Route path="a" element={<AssignmentPage />} />
          <Route path="calendar" element={<div />} />
          <Route path="toReview" element={<ReviewPage />} />
          <Route path="toDo" element={<div />} />
          <Route path="archivedClasses" element={<div />} />
          <Route path="settings" element={<div />} />
          <Route path="manage" element={<ManagePage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
