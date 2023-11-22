import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = `http://localhost:9091/hod-approval/employee-kpp?empId=${Cookies.get('empId')}&statusCd=A`;

class EmployeeKppsService {

    getKPPDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }

}


export default new EmployeeKppsService();