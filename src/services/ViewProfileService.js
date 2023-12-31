import axios from "axios";
import Cookies from 'js-cookie';


const BASE_URL = "http://localhost:9091/employee";

class ViewProfileService {

    getEmployeeById(empId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + '/' + Cookies.get('empId'))
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008");
        }
    }

}

export default new ViewProfileService();