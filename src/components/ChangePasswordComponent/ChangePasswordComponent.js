import React, { useEffect, useState } from "react";

import ChangePasswordService from "../../services/ChangePasswordService";

export default function ChangePasswordComponent() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRetypePassword, setUserRetypePassword] = useState('');
  


    const updatePassword = (e) => {        
        ChangePasswordService.updatePassword(userPassword).then(res => {
           setUserPassword('');
           setUserRetypePassword('');

        }
        );       
    }
    return (

        <div className="row">
            <h3 className="text-center">Change Password</h3>
            <div className="col-md-2"></div>
            <div className="col-md-8">
           <form className="form-horizontal">
                                <div> <input type="hidden" id="userName" name="userName" value="e495" onChange={(e) => setUserName(e.target.value)} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="userPassword">Enter Password :</label>
                                    <div className="col-sm-4">
                                        <input type="password" className="form-control" id="userPassword" placeholder="Enter Re-type Password here" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="userRetypePassword">Enter Re-Type Password:</label>
                                    <div className="col-sm-4">
                                    <input type="password" className="form-control" id="userRetypePassword" placeholder="Enter Confirm Password here" value={userRetypePassword} onChange={(e) => setUserRetypePassword(e.target.value)} />
                                    </div>
                                </div>
                                </form>
                        <div className="col-sm-offset-6">
                            <button type="submit" className="btn btn-success" onClick={(e) => updatePassword(e)} > Submit</button>
                            <button type="button" className="btn btn-danger col-sm-offset-1" data-dismiss="modal">Cancle</button>
                        </div>
                        
                        </div>
                        <div className="col-md-2"></div>
        </div>
    );
}