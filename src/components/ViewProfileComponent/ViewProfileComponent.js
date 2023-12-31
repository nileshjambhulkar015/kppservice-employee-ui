import React, { useEffect, useState } from "react";

import ViewProfileService from "../../services/ViewProfileService";

export default function ViewProfileComponent() {

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
   
    const [roleName, setRoleName] = useState('');
 
    const [deptName, setDeptName] = useState('');
  
    const [desigName, setDesigName] = useState('');
 
   
  
    const [empFirstName, setEmpFirstName] = useState('');
    const [empMiddleName, setEmpMiddleName] = useState('');
    const [empLastName, setEmpLastName] = useState('');
    const [empDob, setEmpDob] = useState('');
    const [empPhoto, setEmpPhoto] = useState('');
    const [empMobileNo, setEmpMobileNo] = useState('');
    const [empEmerMobileNo, setEmpEmerMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [permAddress, setPermAddress] = useState('');
    const [empGender, setEmpGender] = useState('');
 
    useEffect(() => {
        ViewProfileService.getEmployeeById(empId).then(res => {
            let employee = res.data;
            console.log(employee)
            setEmpId(employee.empId)
            setEmpEId(employee.empEId)
           
            setRoleName(employee.roleName)
        
            setDeptName(employee.deptName)
            
            setDesigName(employee.desigName)
        
            setEmpFirstName(employee.empFirstName)
            setEmpMiddleName(employee.empMiddleName)
            setEmpLastName(employee.empLastName)
            setEmpDob(employee.empDob)
            setEmpPhoto(employee.empPhoto)
            setEmpMobileNo(employee.empMobileNo)
            setEmpEmerMobileNo(employee.empEmerMobileNo)
            setEmailId(employee.emailId)
            setTempAddress(employee.tempAddress)
            setPermAddress(employee.permAddress)
            setEmpGender(employee.empGender)
        }
        );
    }, [empId]);

    return (
        <div className="row">
            <h2 className="text-center">Employee Details</h2>
            <form className="form-horizontal">

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Name:</label>
                        <div className="col-sm-9">
                            {empFirstName + ' ' + empMiddleName + ' ' + empLastName}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Id:</label>
                        <div className="col-sm-9">
                            {empEId}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-3" htmlFor="deptId">Role Name:</label>
                        <div className="col-sm-3">
                            {roleName}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-3" htmlFor="deptId">Department Name:</label>
                        <div className="col-sm-3">
                            {deptName}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-3" htmlFor="desigId"> Designation Name:</label>
                        <div className="col-sm-3">
                            {desigName}
                        </div>
                    </div>
                </div>



                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empDob">Date Of Birth:</label>
                        <div className="col-sm-3">
                            {empDob}

                        </div>

                        <label className="control-label col-sm-2" htmlFor="empPhoto">Upload Photo:</label>

                        <div className="col-sm-3">
                            {empPhoto}
                        </div>
                    </div>
                </div>



                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empMobileNo">Mobile No 1:</label>
                        <div className="col-sm-3">
                            {empMobileNo}
                        </div>

                        <label className="control-label col-sm-2" htmlFor="empEmerMobileNo">Mobile No 2:</label>

                        <div className="col-sm-3">
                            {empEmerMobileNo}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="tempAddress">Temporary Address:</label>
                        <div className="col-sm-3">
                            {tempAddress}
                        </div>

                        <label className="control-label col-sm-2" htmlFor="permAddress">Permenent Address:</label>

                        <div className="col-sm-3">
                            {permAddress}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="emailId"> Email Id:</label>
                        <div className="col-sm-4">
                            {emailId}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empGender">Gender:</label>
                        <div className="col-sm-3">
                            {empGender}
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
}