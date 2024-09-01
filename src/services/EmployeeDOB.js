import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API,LOGIN_UI_BASE_URL } from "./URLConstants";

class EmployeeDOB {

    updateEmployeeDOB(empDob) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API+`/employee/update-dob?empId=${Cookies.get('empId')}&empDob=${empDob}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new EmployeeDOB();