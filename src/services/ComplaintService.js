import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API + "/complaint";


class ComplaintService {







    //at page load call all the departments load all departments
    getEmployeeCompaintsDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/complaint/complaint-search?empId=${Cookies.get('empId')}&statusCd=A&page=0&size=1200&sort=empCompId asc`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }


    //search complaint by complaint id
    getEmployeeCompaintsByComplaintId(empCompIdSearch) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/complaint/complaint-search?compId=${empCompIdSearch}&empId=${Cookies.get('empId')}&statusCd=A&page=0&size=1200&sort=empCompId asc`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // search department by its name
    getDepartmentDetailsByDeptNamePaging(deptName) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/department/search?deptName=${deptName}&statusCd=A&page=0&size=20&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //Upload department
    uploadExcelDept(formData) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API + "/department/upload-department", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getAllDepartmentExceptGM() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/department/all-dd-dept-except-gm")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    ////////////////
    getAllComplaintType() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/complaint-type/all-dd-comp-type")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    saveComplaintDetails(complaint) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL + "/employee-complaint", complaint)
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
            return axios.put(BASE_URL + "/employee-complaint", complaint)
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

    //when click on view button of UI
    getComplaintTypeById(compTypeId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-complaint-type-id?compTypeId=${compTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //get site from company for region id
    //Get all roles present in department table from designation for KPP
    getComplaintTypeByIdDD(compTypeId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/complaint-type/by-complaint-type-id?compTypeId=${compTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    getAllDepartmentFromComplaintType() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/complaint-type/comp-type-dd-dept")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    //Get all sites present in department table from designation for KPP
    getComplaintTypeByDeptId(compTypeDeptId) {
        console.log("Site Service regionid=", compTypeDeptId)
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + `/complaint-type/dd-comp-type-by-dept-id?compTypeDeptId=${compTypeDeptId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    getAllDepartmentDetails() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/department")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

       //advance search of employee
       advanceSearchComplaintDetails(advSearchComplaints) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/complaint/complaint-adv-search?page=0&size=200", advSearchComplaints)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

}


export default new ComplaintService();