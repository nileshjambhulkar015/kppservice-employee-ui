import React from "react";
import { Route, BrowserRouter, Link, Routes } from 'react-router-dom';
import EmployeeKppComponent from "./components/EmployeeKppsComponent/EmployeeKppComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent";
import UpdateHodProfileComponent from "./components/UpdateHodProfileComponent/UpdateHodProfileComponent";
import Cookies from 'js-cookie';
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

            <li><Link to="/employeekpp">Add KPP</Link></li>
            <li><Link to="/employeekpp">View KPP</Link></li>
            <li><Link to="/updateHodProfile">View Profile</Link></li>
            <li><Link to="/changePassword">Change Password</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Welcome: {Cookies.get('empEId')}</a></li>
            <li><a href="http://localhost:3008" onClick={() => removeCookies()}>Logout</a></li>
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
