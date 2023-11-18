import axios from "axios";

const BASE_URL="http://localhost:9091/hod-approval/employee-kpp?empId=1&statusCd=A";

class EmployeeKppsService{

    getKPPDetails(){
        return axios.get(BASE_URL)
    }
   
}


export default new EmployeeKppsService();