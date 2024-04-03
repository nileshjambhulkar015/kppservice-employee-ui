import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./EmployeeConstants";




class ViewProfileService {

    getEmployeeById(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + '/employee/byEmpId?empId=' + Cookies.get('empId'))
           // return axios.get(BASE_URL_API + '/byEmpId?empId=' + Cookies.get('empId'))
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}

export default new ViewProfileService();