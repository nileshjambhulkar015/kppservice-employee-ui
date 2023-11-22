import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/employee";

class UpdateHodProfileService {

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    getEmployeeById(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + Cookies.get('empId'))
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }
    }

    updateEmployeeDetails(employee) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, employee)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }
}


export default new UpdateHodProfileService();