import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import OthersPendingComplaintService from '../../services/OthersPendingComplaintService';
import ComplaintService from '../../services/ComplaintService';
import { BASE_URL_API } from '../../services/EmployeeConstants';




export default function OthersPendingComplaintComponent() {


    const [compId, setCompId] = useState('');
    const [isSuccess, setIsSuccess] = useState(true)
    const [compTypeDeptId, setCompTypeDeptId] = useState('');
    const [empCompIdSearch, setEmpCompIdSearch] = useState();
    const [compStatus, setCompStatus] = useState('');
    const [compDate, setCompDate] = useState('');
    const [compResolveDate, setCompResolveDate] = useState('');
    const [empCompId, setEmpCompId] = useState('');
    const [compDesc, setCompDesc] = useState('');
    const [compTypeId, setCompTypeId] = useState('');
    const [compTypeName, setCompTypeName] = useState('');
    const [remark, setRemark] = useState('');

    const [empId, setEmpId] = useState('');
    const [empEId, setEmpEId] = useState('');
    const [empName, setEmpName] = useState('');
    const [empMobileNo, setEmpMobileNo] = useState('');

    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');
    const [deptId, setDeptId] = useState('');

    const [deptName, setDeptName] = useState('');
    const [desigId, setDesigId] = useState('');
    const [desigName, setDesigName] = useState('');



    const [complaints, setComplaints] = useState([])

    const [complaintTypes, setComplaintTypes] = useState([])

    const [departments, setDepartments] = useState([])

    const [compFromDate, setCompFromDate] = useState('')
    const [compToDate, setCompToDate] = useState('')
    const [asCompDeptId, setAsCompDeptId] = useState('')
    const [asCompId, setAsCompId] = useState('')
    const [asCompStatus, setAsCompStatus] = useState('')
    const [empCompDeptId, setEmpCompDeptId] = useState('')

    //loading all department and roles while page loading at first time
    useEffect(() => {
        OthersPendingComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
            setComplaints(res.data.responseData.content);
            console.log(res.data.responseData.content)
        });

        OthersPendingComplaintService.getAllDepartmentDetails().then((res) => {
            setDepartments(res.data);
        });


    }, []);


    const handleDepartmentChange = (value) => {
        if (value == "Select Department") {
            value = null;
        }
        setEmpCompDeptId(value)
    }

    // Advance search employee
    const advSearchEmployeeComplaints = (e) => {
        let empId = null;
        let asCompStatus = 'Pending';
        let asCompTypeDeptId = Cookies.get('deptId')

        e.preventDefault()
        let advComplaintSearch = { compFromDate, compToDate, empId, empCompDeptId, asCompTypeDeptId, asCompId, asCompStatus };

        OthersPendingComplaintService.advanceSearchComplaintDetails(advComplaintSearch).then(res => {
            if (res.data.success) {
                setIsSuccess(true);
                setComplaints(res.data.responseData.content);
                
            }
            else {
                setIsSuccess(false);
            }
        }
        );
    }




    const getComplaintById = (e) => {

        OthersPendingComplaintService.getComplaintById(e).then(res => {
            let complaint = res.data;

            setEmpId(complaint.empId)
            setEmpEId(complaint.empEId)


            setEmpName(complaint.empName)
            setEmpMobileNo(complaint.empMobileNo)
            setRoleId(complaint.roleId)
            setRoleName(complaint.roleName)
            setDeptId(complaint.deptId)
            setDeptName(complaint.deptName)
            setDesigId(complaint.desigId)
            setDesigName(complaint.desigName)


            setEmpCompId(complaint.empCompId)
            setCompId(complaint.compId)
            setCompTypeId(complaint.compTypeId)
            setCompDate(complaint.compDate)
            setCompResolveDate(complaint.compResolveDate)
            setCompStatus(complaint.compStatus)
            setCompTypeName(complaint.compTypeName)
            setCompDesc(complaint.compDesc)
            setRemark(complaint.remark)
        }
        );

    }

    const searchComplaintById = (e) => {
        setEmpCompIdSearch(e.target.value)

        OthersPendingComplaintService.getEmployeeCompaintsByComplaintId(e.target.value).then((res) => {

            if (res.data.success) {
                setIsSuccess(true);
                setComplaints(res.data.responseData.content);
                // setEmployees(res.data.responseData.content?.filter((item) => item.roleId !== 1));
            }
            else {
                setIsSuccess(false);
            }
        });
    }


    const updateComplaint = (e) => {

        e.preventDefault()
        let compStatus = "In Progress";
        let compResolveEmpId = Cookies.get('empId');
        let compResolveEmpName = Cookies.get('empFirstName') + " " + Cookies.get('empMiddleName') + " " + Cookies.get('empLastName');
        let compResolveEmpEId = Cookies.get('empEId');

        let complaint = { empCompId, compStatus, compResolveEmpId, compResolveEmpName, compResolveEmpEId };

        OthersPendingComplaintService.updateComplaintDetails(complaint).then(res => {
            OthersPendingComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content?.filter((item) => item.compStatus == 'Pending'));

            });
            console.log("Complaint added");
        }
        );

    }






    return (

        <div>
            <div className="row">


                <h2 className="text-center">Other's Pending Complaint List</h2>

                <div className="col-md-11">

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <form className="form-horizontal">
                                    <label className="control-label col-sm-2" htmlFor="empCompIdSearch">Enter Complaint Id:</label>
                                    <div className="col-sm-2">
                                        <input type="text" className="form-control" id="empCompIdSearch" placeholder="Enter Complaint Id" value={empCompIdSearch} onChange={(e) => searchComplaintById(e)} />
                                    </div>
                                    <div className="col-sm-7" align="right">
                                        <button type="button" className="btn btn-primary col-sm-offset-1" data-toggle="modal" data-target="#advanceSearchEmployee">Advance Search</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                    {isSuccess?
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Action</th>
                                    <th className="text-center">Complaint No</th>

                                    <th className="text-center">Employee Name</th>
                                    <th className="text-center">Employee ID</th>
                                    <th className="text-center">Role</th>
                                    <th className="text-center">Department</th>
                                    <th className="text-center">Designation</th>


                                    <th className="text-center">Complaint Date</th>
                                    <th className="text-center">Complaint Type</th>
                                    <th className="text-center">Complaint Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    complaints.map(
                                        (complaint, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={complaint.empCompId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td> <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => getComplaintById(complaint.empCompId)}>View</button></td>
                                                <td>{complaint.compId}</td>


                                                <td>{complaint.empName}</td>
                                                <td>{complaint.empEId}</td>
                                                <td>{complaint.roleName}</td>
                                                <td>{complaint.deptName}</td>
                                                <td>{complaint.desigName}</td>


                                                <td>{complaint.compDate}</td>
                                                <td>{complaint.compTypeName}</td>
                                                <td>{complaint.compStatus}</td>




                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :<h1>No Data Found</h1>}
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>



            {/* Modal for Advance search for employe comlaint details */}
            <div className="modal fade" id="advanceSearchEmployee" role="dialog">
                <form className="form-horizontal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Advance Search Complaint</h4>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">

                                    <div className="row">
                                        <label className="control-label col-sm-4" htmlFor="regionName">Complaint Statrt Date:</label>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="compFromDate" defaultValue={compFromDate} name="compFromDate" onChange={(e) => setCompFromDate(e.target.value)} />                                 </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-sm-4" htmlFor="regionName">Comlaint End Date:</label>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <input type="date" className="form-control" id="compToDate" defaultValue={compToDate} name="compToDate" onChange={(e) => setCompToDate(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>





                                    <div className="row">
                                        <label className="control-label col-sm-4" htmlFor="regionName">Department Name:</label>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <select className="form-control" id="asDeptId" defaultValue={null} onChange={(e) => handleDepartmentChange(e.target.value)}>
                                                    <option>Select Department</option>
                                                    {
                                                        departments.map(
                                                            department =>
                                                                <option key={department.deptId} value={department.deptId}>{department.deptName}</option>
                                                        )
                                                    };

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => advSearchEmployeeComplaints(e)}>Search</button>


                                <a href={BASE_URL_API + `/complaint/download-employee-complaint?compFromDate=${compFromDate}&compToDate=${compToDate}&empCompDeptId=${empCompDeptId}&asCompTypeDeptId=${Cookies.get('deptId')}&empCompId=${asCompId}&asCompStatus=Pending`}>
                                    <button type="button" className="btn btn-success col-sm-offset-1 "> Download</button>
                                </a>
                                <button type="button" className="btn btn-danger col-sm-offset-1" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>



            {/* Modal for update user details */}
            <div className="modal fade" id="updateDepartment" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Update Complaint</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div> <input type="hidden" id="empCompId" name="deptId" value={empCompId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Complaint For:</label>
                                    <div className="col-sm-8">
                                        {compTypeName}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Complaint Description:</label>
                                    <div className="col-sm-8">
                                        <textarea row="5" className="form-control" id="compDesc" placeholder="Enter Complaint Description here" value={compDesc} onChange={(e) => setCompDesc(e.target.value)} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateComplaint(e)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>


            {/* Modal for show data when user click on view button */}
            {/* Modal for show data when user click on view button */}
            <div className="modal fade" id="showData" role="dialog">
                <div className="modal-dialog modal-lg">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Complaint Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div> <input type="hidden" id="empCompId" name="deptId" value={empCompId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="compId" >Complaint Id:</label>
                                    <div className="col-sm-3">
                                        {compId}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Employee Name:</label>
                                    <div className="col-sm-8">
                                        {empName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Employee ID:</label>
                                    <div className="col-sm-8">
                                        {empEId}
                                    </div>
                                </div>



                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Mobile Number:</label>
                                    <div className="col-sm-3">
                                        {empMobileNo}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Role Name:</label>
                                    <div className="col-sm-3">
                                        {roleName}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Department Name:</label>
                                    <div className="col-sm-3">
                                        {deptName}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="empName" >Designation Name:</label>
                                    <div className="col-sm-8">
                                        {desigName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="deptName" >Complaint Type Name:</label>
                                    <div className="col-sm-8">
                                        {compTypeName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="deptName" >Complaint Start Date:</label>
                                    <div className="col-sm-8">
                                        {compDate}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Complaint Description :</label>
                                    <div className="col-sm-8">
                                        {compDesc}
                                    </div>
                                </div>



                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateComplaint(e)} > Assign To Me</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}