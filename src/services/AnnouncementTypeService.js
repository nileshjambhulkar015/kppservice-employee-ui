import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API+"/announcement-type";


class AnnouncementTypeService {

//at page load call all the departments load all departments
getAnnouncementTypeDetailsByPaging() {
    if (null != Cookies.get('empId')) {
        return axios.get(BASE_URL+"/search?page=0&size=210")
    } else {
        alert("You need to login first")
        window.location.replace(LOGIN_UI_BASE_URL);
    }
}

saveAnnouncementTypeDetails(announcementType) {
    if (null != Cookies.get('empId')) {
        return axios.post(BASE_URL, announcementType)
    } else {
        alert("You need to login first")
        window.location.replace(LOGIN_UI_BASE_URL);
    }

}

getAnnouncementTypeById(announTypeId) {
    if (null != Cookies.get('empId')) {
        console.log("Inside service : ", announTypeId)
        return axios.get(BASE_URL + `/by-announcement-type-id?announTypeId=${announTypeId}`)
    } else {
        alert("You need to login first")
        window.location.replace(LOGIN_UI_BASE_URL);
    }

}

updateAnnouncementType(announType) {
    if (null != Cookies.get('empId')) {
        return axios.put(BASE_URL, announType)
    } else {
        alert("You need to login first")
        window.location.replace(LOGIN_UI_BASE_URL);
    }

}

    //////
    
    //when click on view button of UI
    

    


    
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

    getAllAnnouncementType() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API +"/announcement-type")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

     

}


export default new AnnouncementTypeService();