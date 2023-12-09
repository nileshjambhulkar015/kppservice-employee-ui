import axios from "axios";
import Cookies from 'js-cookie';
import { KPP_API_BASE_URL,LOGIN_UI_BASE_URL } from "./EmployeeConstants";

class ChangePasswordService {

    updatePassword(userName, userPassword) {
        if (null != Cookies.get('empId')) {
            return axios.put(KPP_API_BASE_URL+`/login/change-password?userName=${userName}&userPassword=${userPassword}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new ChangePasswordService();