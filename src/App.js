import Cookies from 'js-cookie';
import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";


import ViewProfileComponent from './components/ViewProfileComponent/ViewProfileComponent';
import MyComplaintComponent from './components/ComplaintManagementComponent/MyComplaintComponent';
import EmplyeeKppRatingsComponent from './components/EmplyeeKppManagementComponent/EmplyeeKppRatingsComponent';
import EmployeeCumulativeKppComponent from './components/EmplyeeKppManagementComponent/EmployeeCumulativeKppComponent';
import OthersPendingComplaintComponent from './components/ComplaintManagementComponent/OthersPendingComplaintComponent';
import OthersResolveComplaintComponent from './components/ComplaintManagementComponent/OthersResolveComplaintComponent';
import OthersInProgressComplaintComponent from './components/ComplaintManagementComponent/OthersInProgressComplaintComponent';



function App() {

  //remove cookies when click on logout
  const removeCookies = () => {
    Cookies.remove('empId');
    Cookies.remove('roleId');
    Cookies.remove('roleName');
    Cookies.remove('deptId');
    Cookies.remove('deptName');
    Cookies.remove('desigId');
    Cookies.remove('desigName');
    Cookies.remove('empEId');
    Cookies.remove('empFirstName');
    Cookies.remove('empMiddleName');
    Cookies.remove('empLastName');
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="http://localhost:3008" onClick={() => removeCookies()}>FutureBizops</a>
          </div>
          <ul className="nav navbar-nav">

            
            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">KPP Management
              <span className="caret"></span></a>
            <ul className="dropdown-menu">
            <li><Link to="/employeekpp">Add KPP</Link></li>
            <li><Link to="/viewKppReport">View Cumulative KPP</Link></li>

            </ul>
          </li>


            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Complaint Management
              <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><Link to="/myComplaint">My Complaints</Link></li>
              <li><Link to="/othersPendingComplaint">Other's Pending Complaint</Link></li>
              <li><Link to="/othersInProgressComplaint">Other's In Progress Complaint</Link></li>
              <li><Link to="/othersResolveComplaint">Other's Resolve Complaint</Link></li>
            </ul>
          </li>

            <li><Link to="/updateEmployeeProfile">View Profile</Link></li>
            <li><Link to="/changePassword">Change Password</Link></li>



          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Welcome: {Cookies.get('empEId')}</a></li>
            <li><a href="http://localhost:3008" onClick={() => removeCookies()}>Logout</a></li>
          </ul>
        </div>
      </nav>
      <Routes>

        <Route exact path="/" element={<EmplyeeKppRatingsComponent />}></Route>
        <Route exact path="/employeekpp" element={<EmplyeeKppRatingsComponent />}></Route>
        <Route exact path="/viewKppReport" element={<EmployeeCumulativeKppComponent />}></Route>
        <Route exact path="/updateEmployeeProfile" element={<ViewProfileComponent />}></Route>
        <Route exact path="/changePassword" element={<ChangePasswordComponent />}></Route>
        <Route exact path="/myComplaint" element={<MyComplaintComponent />}></Route>
        <Route exact path="/othersPendingComplaint" element={<OthersPendingComplaintComponent />}></Route>
        <Route exact path="/othersInProgressComplaint" element={<OthersInProgressComplaintComponent />}></Route>
        <Route exact path="/othersResolveComplaint" element={<OthersResolveComplaintComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
