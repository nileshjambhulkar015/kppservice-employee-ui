import axios from "axios";
import Cookies from 'js-cookie';
import { KPP_API_BASE_URL, LOGIN_UI_BASE_URL } from "./EmployeeConstants";

const BASE_URL = KPP_API_BASE_URL+"/employee";

class UpdateHodProfileService {

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getEmployeeById(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + Cookies.get('empId'))
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    updateEmployeeDetails(employee) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, employee)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new UpdateHodProfileService();