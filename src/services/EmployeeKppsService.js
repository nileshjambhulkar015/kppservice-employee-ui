import axios from "axios";
import Cookies from 'js-cookie';
import {  KPP_API_BASE_URL, LOGIN_UI_BASE_URL } from "./EmployeeConstants";

//const BASE_URL = KPP_API_BASE_URL+`/hod-approval/employee-kpp?empId=${Cookies.get('empId')}&statusCd=A`;
const BASE_URL = KPP_API_BASE_URL+`/employee-key-perform-parameter/kpp?roleId=${Cookies.get('roleId')}&deptId=${Cookies.get('deptId')}&desigId=${Cookies.get('desigId')}&statusCdEnum=A`;
class EmployeeKppsService {

    getKPPDetails() {
       /* if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }*/
       // console.log("new emop Id : ", empId)
        if (null != Cookies.get('empId')) {
           
            return axios.get(`http://localhost:9091/employee-kpp-status?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    saveEmployeeKppDetails(todos){


        if (null != Cookies.get('empId')) {
            return axios.put(KPP_API_BASE_URL+"/employee-key-perform-parameter",todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

}


export default new EmployeeKppsService();