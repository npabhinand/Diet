import React from "react";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import {  Route, Routes } from 'react-router-dom'

import Admin from "./admin/Admin"
import Customer from "./user/Customer";
import ViewRawFood from "./user/ViewRawFood";
import ViewCookedFood from "./user/ViewCookedFood";
import ViewExercises from "./user/ViewExercises";
import AddFeedback from "./user/AddFeedback";
import Profile from "./Pages/Profile";
// import Supervisor from './Pages/Supervisor';
import ViewFeedback from "./Pages/ViewFeedback";
import ExpertHome from "./expert/ExpertHome";
import ExpertChat from "./expert/ExpertChat";
import UserChat from "./user/UserChat"
function App() {
  return (
    <div className="App">
     
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/customer" element={<Customer/>}/>
          <Route path="/exercises" element={<ViewExercises/>}/>
          <Route path="/rawfood" element={<ViewRawFood/>}/>
          <Route path="/cookedfood" element={<ViewCookedFood/>}/>
          <Route path="/addfeedback" element={<AddFeedback/>}/>
          {/* <Route path="/chat" element={<Chat/>}/> */}
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/experthome" element={<ExpertHome/>}/>
          <Route path="/userchat" element={<UserChat/>}/>
          <Route path="/expertchat" element={<ExpertChat/>}/>
          {/* <Route path="/supervisor" element={<Supervisor/>}/> */}
          <Route path="/viewfeedback" element={<ViewFeedback/>}/>
       </Routes>
    </div>
  );
}

export default App;
