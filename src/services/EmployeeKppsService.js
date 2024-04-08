import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./EmployeeConstants";


//const BASE_URL = KPP_API_BASE_URL + `/employee-key-perform-parameter/kpp?roleId=${Cookies.get('roleId')}&deptId=${Cookies.get('deptId')}&desigId=${Cookies.get('desigId')}&statusCdEnum=A`;
class EmployeeKppsService {

    getKPPDetails() {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API+`/employee-kpp-status?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

 

    saveEmployeeKppDetails(todos) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL_API + "/employee-kpp", todos)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    getEmployeeKPPReport(employeeId) {
        if (null != Cookies.get('empId')) {
            console.log(employeeId)
            return axios.get(BASE_URL_API+`/report/employee-kpp-status?empId=${employeeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    // view previous months kpp 
    getEmployeeKppReportDetailsByPaging() {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // view previous months kpp  bt from date and to date
    getEmployeeKppReportByDates(fromDate, toDate) {
        if (null != Cookies.get('empId')) {

            return axios.get(BASE_URL_API+`/cumulative/employee-kpp-cumulative?fromDate=${fromDate}&toDate=${toDate}&empId=${Cookies.get('empId')}&page=0&size=1200`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    getEvidenceFileDetails(ekppMonth) {
        if (null != Cookies.get('empId')) {
    
            return axios.get(BASE_URL_API+`/evidence/by-empid?empId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    uploadEvidence =  (data) => {

        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/evidence", data)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    deleteEvidence =  (evMonth) => {

        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL_API+`/evidence?empId=${Cookies.get('empId')}}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

}


export default new EmployeeKppsService();