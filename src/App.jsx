import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./page/HomePage";
import Login from "./page/Login"; 
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import ManageSkills from "./page/ManageSkills";
import ManageExpernince from "./page/ManageExpernince";
import ManageProject from "./page/ManageProject";
import ViewProject from "./page/ViewProject";
import UpdateProject from "./page/UpdateProject";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/userSlices";
import UpdateExpernince from "./page/sub-component/UpdateExpernince";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/expernince" element={<ManageExpernince />} />
        <Route path="/manage/projects" element={<ManageProject />} />
        <Route path="/view/project/:id" element={<ViewProject />} />
        <Route path="/update/project/:id" element={<UpdateProject />} />
        <Route path="/update/expernince/:id" element={<UpdateExpernince />} />
        {/* <Route path="/paragraph" element={<ParagraphToList />} /> */}
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
};

export default App;
