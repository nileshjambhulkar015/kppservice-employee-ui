import axios from "axios";
class ChangePasswordService{
    
    updatePassword(userName, userPassword){
        return axios.put(`http://localhost:9091/login/change-password?userName=${userName}&userPassword=${userPassword}`)
    }
}


export default new ChangePasswordService();