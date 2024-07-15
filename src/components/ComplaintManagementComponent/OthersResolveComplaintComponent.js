import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import OthersResolveComplaintService from '../../services/OthersResolveComplaintService';




export default function OthersResolveComplaintComponent() {


    const [compId, setCompId] = useState('');

    const [compTypeDeptId, setCompTypeDeptId] = useState('');

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

    //loading all department and roles while page loading at first time
    useEffect(() => {
        OthersResolveComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
            setComplaints(res.data.responseData.content);
            console.log(res.data.responseData.content)
        });

    }, []);


    const getComplaintById = (e) => {

        OthersResolveComplaintService.getComplaintById(e).then(res => {
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


    const updateComplaint = (e) => {

        e.preventDefault()
        let compStatus = "In Progress";
        let compResolveEmpId = Cookies.get('empId');
        let compResolveEmpName = Cookies.get('empFirstName') + " " + Cookies.get('empMiddleName') + " " + Cookies.get('empLastName');
        let compResolveEmpEId = Cookies.get('empEId');

        let complaint = { empCompId, compStatus, compResolveEmpId, compResolveEmpName, compResolveEmpEId };

        OthersResolveComplaintService.updateComplaintDetails(complaint).then(res => {
            OthersResolveComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);

            });
            console.log("Complaint added");
        }
        );

    }

    const onComplaintStatusChangeHandler = (event) => {
        setCompStatus(event);
    };



    return (

        <div>
            <div className="row">
                <h2 className="text-center">Resolve Complaint List</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div className="row">


                    </div>
                    <div className="row">

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
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>

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
                                    <label className="control-label col-sm-3" htmlFor="deptName" >Complaint Resolve Date:</label>
                                    <div className="col-sm-8">
                                        {compResolveDate}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Complaint Description :</label>
                                    <div className="col-sm-8">
                                        {compDesc}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="hodKppStatus">Complaint Status:</label>
                                    <div className="col-sm-3">
                                        {compStatus}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="remark">Remark :</label>
                                    <div className="col-sm-8">
                                        {remark}
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}