import React, { useEffect, useState } from "react";
import EmployeeDOB from "../../services/EmployeeDOB";



export default function UpdateDoBComponent() {
   
    const [empDob, setEmpDob] = useState('');

    const updateDoB = (e) => {        
        EmployeeDOB.updateEmployeeDOB(empDob).then(res => {
          

        }
        );       
    }
    return (

        <div className="row">
            <h3 className="text-center">Update Date of Birth</h3>
            <div className="col-md-2"></div>
            <div className="col-md-8">
           <form className="form-horizontal">
                              
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="userPassword">Select Date Of Birth :</label>
                                    <div className="col-sm-4">
                                    <input type="date" className="form-control" defaultValue={empDob} name="empDob" onChange={(e) => setEmpDob(e.target.value)} />
                                    </div>
                                </div>
                                </form>
                        <div className="col-sm-offset-6">
                            <button type="submit" className="btn btn-success" onClick={(e) => updateDoB(e)} > Submit</button>
                            <button type="button" className="btn btn-danger col-sm-offset-1" data-dismiss="modal">Cancle</button>
                        </div>
                        
                        </div>
                        <div className="col-md-2"></div>
        </div>
    );
}