import React from "react";
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import {  Route, Routes } from 'react-router-dom'

import Admin from "./admin/Admin"
import Customer from "./Pages/Customer";
import ViewRawFood from "./components/ViewRawFood";
import ViewCookedFood from "./components/ViewCookedFood";
import ViewExercises from "./components/ViewExercises";
import AddFeedback from "./components/AddFeedback";
import Profile from "./Pages/Profile";
// import Supervisor from './Pages/Supervisor';
import ViewFeedback from "./Pages/ViewFeedback";

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
          <Route path="/profile" element={<Profile/>}/>
          {/* <Route path="/supervisor" element={<Supervisor/>}/> */}
          <Route path="/viewfeedback" element={<ViewFeedback/>}/>
       </Routes>
    </div>
  );
}

export default App;
