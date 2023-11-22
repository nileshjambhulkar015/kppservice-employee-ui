import axios from "axios";
import Cookies from 'js-cookie';

class ChangePasswordService {

    updatePassword(userName, userPassword) {
        if (null != Cookies.get('empId')) {
            return axios.put(`http://localhost:9091/login/change-password?userName=${userName}&userPassword=${userPassword}`)
        } else {
            alert("You need to login first")
            window.location.replace("http://localhost:3008/");
        }

    }
}


export default new ChangePasswordService();