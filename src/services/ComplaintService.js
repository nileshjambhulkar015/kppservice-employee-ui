import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./EmployeeConstants";

const BASE_URL = BASE_URL_API+"/complaint";


class ComplaintService {



   



    //at page load call all the departments load all departments
    getEmployeeCompaintsDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/complaint/employee-search?empId=${Cookies.get('empId')}&statusCd=A&page=0&size=1200&sort=empCompId asc`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // search department by its name
    getDepartmentDetailsByDeptNamePaging(deptName) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/department/search?deptName=${deptName}&statusCd=A&page=0&size=20&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
   
     //Upload department
     uploadExcelDept(formData) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/department/upload-department",formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },});
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
        
    }

    getAllDepartmentExceptGM() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API +"/department/all-dd-dept-except-gm")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

    ////////////////
    getAllComplaintType() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API +"/complaint-type/all-dd-comp-type")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

    saveComplaintDetails(complaint) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL+"/employee-complaint", complaint)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     //when click on view button of UI
     getComplaintById(empCompId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-emp-comp-id?empCompId=${empCompId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    
    updateComplaintDetails(complaint) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL+"/employee-complaint", complaint)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //when click on view button of UI
deleteEmployeeComplaintById(empCompId) {
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL + `/employee-complaint?empCompId=${empCompId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


}


export default new ComplaintService();