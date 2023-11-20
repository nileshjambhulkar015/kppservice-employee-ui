import React from "react";
import {Route, BrowserRouter, Link, Routes} from 'react-router-dom';
import EmployeeKppComponent from "./components/EmployeeKppsComponent/EmployeeKppComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";
import UpdateHodProfileComponent from "./components/UpdateHodProfileComponent/UpdateHodProfileComponent";
function App() {
  return (
    <BrowserRouter>
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="http://localhost:3008">FutureBizops</a>
        </div>
        <ul className="nav navbar-nav">
          
          <li><Link to="/employeekpp">Add KPP</Link></li>
          <li><Link to="/employeekpp">View KPP</Link></li>    
          <li><Link to="/updateHodProfile">View Profile</Link></li>  
            <li><Link to="/changePassword">Change Password</Link></li>          
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> e1234</a></li>
          <li><a href="http://localhost:3008">Logout</a></li>
        </ul>
      </div>
    </nav>
    <Routes>
      
    <Route exact path="/" element={<EmployeeKppComponent />}></Route>
      <Route exact path="/employeekpp" element={<EmployeeKppComponent />}></Route>
      <Route exact path="/updateHodProfile" element={<UpdateHodProfileComponent />}></Route>
        <Route exact path="/changePassword" element={<ChangePasswordComponent />}></Route>
    </Routes>
  </BrowserRouter>    
  );
}

export default App;
