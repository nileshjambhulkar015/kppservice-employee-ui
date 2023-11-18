import React, { useEffect, useState } from "react";

import UpdateHodProfileService from "../../services/UpdateHodProfileService";


export default function UpdateHodProfileComponent() {

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');
    const [reportingEmpId, setReportingEmpId] = useState('');
    const [regionId, setRegionId] = useState('');
    const [regionName, setRegionName] = useState('');
    const [siteId, setSiteId] = useState('');
    const [siteName, setSiteName] = useState('');
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
    const [empBloodgroup, setEmpBloodgroup] = useState('');
    const [remark, setRemark] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const [employees, setEmployees] = useState([])
    const [roles, setRoles] = useState([])
    const [departments, setDepartments] = useState([])
    const [designations, setDesignations] = useState([])

    useEffect(() => {
        UpdateHodProfileService.getEmployeeById(empId).then(res => {
            let employee = res.data;
            console.log(employee)
            setEmpId(employee.empId)
            setEmpEId(employee.empEId)
            setRoleId(employee.roleId)
            setRoleName(employee.roleName)
            setDeptId(employee.deptId)
            setDeptName(employee.deptName)
            setDesigId(employee.desigId)
            setDesigName(employee.desigName)
            setReportingEmpId(employee.reportingEmpId)
            setRegionId(employee.regionId)
            setRegionName(employee.regionName)
            setSiteId(employee.siteId)
            setSiteName(employee.siteName)
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
            setEmpBloodgroup(employee.empBloodgroup)
            setRemark(employee.remark)
        }
        );


    }, [empId]);

    const showEmployeeById = (e) => {

        // window.location.reload(); 
    }


    const updateEmployeeDetails = (e) => {

        e.preventDefault()
        let statusCd = 'A';
        let regionId = '1';
        let siteId = '1';
        let employeeData = { empId, empEId, roleId, deptId, desigId, reportingEmpId, regionId, siteId, empFirstName, empMiddleName, empLastName, empDob, empMobileNo, empEmerMobileNo, empPhoto, emailId, tempAddress, permAddress, empGender, empBloodgroup, remark, statusCd };

        UpdateHodProfileService.updateEmployeeDetails(employeeData).then(res => {

        }
        );
    }

    return (
        <div className="row">
            <h2 className="text-center">Employee Details</h2>
            <form className="form-horizontal">
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
                        <label className="control-label col-sm-2 col-sm-offset-1" htmlFor="empFirstName">Employee Name:</label>
                        <div className="col-sm-9">
                            {empFirstName + ' ' + empMiddleName + ' ' + empLastName}
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

                        <label className="control-label col-sm-2" htmlFor="kppObjective" >Blood Group:</label>

                        <div className="col-sm-3">
                            {empBloodgroup}
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
}