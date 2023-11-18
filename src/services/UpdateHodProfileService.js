import axios from "axios";

const BASE_URL = "http://localhost:9091/employee";

class UpdateHodProfileService{

  
    getKPPDetails(){
        return axios.get(BASE_URL)
    }

    getEmployeeById(empId) {
        console.log(empId)
        return axios.get(BASE_URL + '/' + 1)
    }

    updateEmployeeDetails(employee) {

        return axios.put(BASE_URL, employee)
    }
}


export default new UpdateHodProfileService();