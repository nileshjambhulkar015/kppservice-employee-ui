import React from "react";
import {Route, BrowserRouter as Router, Link, Switch} from 'react-router-dom';
import EmployeeKppComponent from "./components/EmployeeKppsComponent/EmployeeKppComponent";

function App() {
  return (
    <Router>
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">FutureBizops</a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active"><a href="#">Home</a></li>       
          <li><Link to="/employeekpp">Employee KPP</Link></li>
          <li><Link to="/employeekpp">View KPP</Link></li>    
          <li><Link to="/employeekpp">Update Profile</Link></li>  
          <li><Link to="/employeekpp">Change Password</Link></li>         
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> e1234</a></li>
          <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
      </div>
    </nav>
    <Switch>
      
   
      <Route exact path="/employeekpp" component={EmployeeKppComponent}></Route>
    </Switch>
  </Router>    
  );
}

export default App;
