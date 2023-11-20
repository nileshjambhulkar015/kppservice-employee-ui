import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL=`http://localhost:9091/hod-approval/employee-kpp?empId=${Cookies.get('empId')}&statusCd=A`;

class EmployeeKppsService{

    getKPPDetails(){
        return axios.get(BASE_URL)
    }
   
}


export default new EmployeeKppsService();