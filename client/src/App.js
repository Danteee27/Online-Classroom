import './App.css';
import SignIn from "./components/pages/SignIn.js";
import {Navigate, Route, Routes} from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {baseUrl} from "./apis/api.config";
import VerificationSent from "./components/pages/VerificationSent";

function App() {
    axios.defaults.baseURL = baseUrl;

    return (
        <div>
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
                <Route path="/home" element={<Home/>}/>
                <Route path="/" element={<Navigate to="/login" replace={true}/>}/>
            </Routes>
        </div>
    );
}

export default App;
