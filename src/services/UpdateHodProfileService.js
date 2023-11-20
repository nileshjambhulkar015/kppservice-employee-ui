import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:9091/employee";

class UpdateHodProfileService{

  
    getKPPDetails(){
        return axios.get(BASE_URL)
    }

    getEmployeeById(empId) {
        console.log(empId)
        return axios.get(BASE_URL + '/' +  Cookies.get('empId'))
    }

    updateEmployeeDetails(employee) {

        return axios.put(BASE_URL, employee)
    }
}


export default new UpdateHodProfileService();