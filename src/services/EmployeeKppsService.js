import axios from "axios";

const BASE_URL="http://localhost:9091/employee-key-perform-parameter?roleId=1&deptId=1&desigId=1&statusCdEnum=A";

class EmployeeKppsService{

    getKPPDetails(){
        return axios.get(BASE_URL)
    }
   
}


export default new EmployeeKppsService();