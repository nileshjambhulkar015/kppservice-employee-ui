import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API + "/overall-kpp-feedback";


class OverallKppFeedbackService {

    ddAllFinancialYear() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API + "/cumulative/dd-report-fin-year")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }
    
    saveEmployeeKppFeedbackDetails(freezeEmpKPPMasterRequest){
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/overall-kpp-feedback/employee-kpp-feedback",freezeEmpKPPMasterRequest)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }

    //get kpp details for hod updating rating of employee
    getHODKPPDetailsYearly(finYear) {
        console.log("finYear : ", finYear)
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/overall-kpp-feedback/yearly-kpp?empId=${Cookies.get('empId')}&finYear=${finYear}`)
          
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }
}


export default new OverallKppFeedbackService();