import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API,LOGIN_UI_BASE_URL } from "./EmployeeConstants";

class ChangePasswordService {

    updatePassword(userPassword) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API+`/login/change-password?userName=${Cookies.get('empEId')}&userPassword=${userPassword}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new ChangePasswordService();