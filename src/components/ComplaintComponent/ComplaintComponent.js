import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";


import ComplaintService from '../../services/ComplaintService';

export default function ComplaintComponent() {


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

    const [deptId, setDeptId] = useState('');


    const [complaints, setComplaints] = useState([])

    const [complaintTypes, setComplaintTypes] = useState([])

    const [departments, setDepartments] = useState([])

    //loading all department and roles while page loading at first time
    useEffect(() => {
        ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
            setComplaints(res.data.responseData.content);
            console.log(res.data.responseData.content)
        });


        ComplaintService.getAllDepartmentFromComplaintType().then((res) => {
            setDepartments(res.data);
            setCompTypeDeptId(res.data?.[0].deptId)

            let compTypeDeptId = res.data?.[0].deptId;
            // console.log("region id =", regionId)
            ComplaintService.getComplaintTypeByDeptId(compTypeDeptId).then((res1) => {
                setComplaintTypes(res1.data);
                setCompTypeId(res1.data?.[0]?.compTypeId)


            });
        });


    }, []);


    //for region  change
    const handleDepartmentIdChange = (value) => {
        let compTypeDeptId = value;
        setCompTypeDeptId(compTypeDeptId);
        ComplaintService.getComplaintTypeByDeptId(compTypeDeptId).then((res1) => {
            setComplaintTypes(res1.data);
            setCompTypeId(res1.data?.[0]?.compTypeId)

        });

    };




    const saveComplaintDetails = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let roleId = Cookies.get('roleId')
        let deptId = Cookies.get('deptId')
        let desigId = Cookies.get('desigId')
        let empId = Cookies.get('empId')
        let empEId = Cookies.get('empEId')
        let complaint = { empId, empEId, roleId, deptId, desigId, compTypeDeptId, compTypeId, compDesc, statusCd, employeeId };

        ComplaintService.saveComplaintDetails(complaint).then(res => {
            console.log("res=", res.data)
            ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);

                setRemark('');

            });
            console.log("Department added");
        }
        );
        // window.location.reload(); 
    }

    const getComplaintById = (e) => {

        ComplaintService.getComplaintById(e).then(res => {
            let complaint = res.data;
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
        // window.location.reload(); 
    }


    const deleteDepartmentById = (e) => {
        ComplaintService.deleteEmployeeComplaintById(empCompId).then(res => {
            ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);
                console.log(res.data.responseData.content)
            });
            console.log("Department deleted");
        }
        );
    }

    const updateComplaint = (e) => {

        e.preventDefault()

        let complaint = { empCompId, compDesc };

        ComplaintService.updateComplaintDetails(complaint).then(res => {
            ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);

            });
            console.log("Complaint added");
        }
        );

    }



    return (

        <div>
            <div className="row">
                <h2 className="text-center">Complaint List</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div className="row">

                        <div className="col-sm-12" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveComplaint">Add Complaint</button>

                        </div>
                    </div>
                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Complaint No</th>
                                    <th className="text-center">Complaint Date</th>
                                    <th className="text-center">Complaint Type</th>
                                    <th className="text-center">Complaint Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    complaints.map(
                                        (complaint, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={complaint.empCompId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{complaint.compId}</td>
                                                <td>{complaint.compDate}</td>
                                                <td>{complaint.compTypeName}</td>
                                                <td>{complaint.compStatus}</td>


                                                <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => getComplaintById(complaint.empCompId)}>Update</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteDepartmentById(complaint.empCompId)}>Delete</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => getComplaintById(complaint.empCompId)}>View</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>




            {/* Modal for save department details */}
            <div className="modal fade" id="saveComplaint" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Complaint</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Select Department Name:</label>
                                    <div className="col-sm-4">
                                        <select className="form-control" id="deptId" onChange={(e) => handleDepartmentIdChange(e.target.value)}>

                                            {
                                                departments.map(
                                                    department =>
                                                        <option key={department.deptId} value={department.deptId}>{department.deptName}</option>
                                                )
                                            };

                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="compTypeId">Select Complaint Type:</label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="compTypeId" onChange={(e) => setCompTypeId(e.target.value)}>

                                            {
                                                complaintTypes.map(
                                                    complaintType =>
                                                        <option key={complaintType.compTypeId} value={complaintType.compTypeId}>{complaintType.compTypeName}</option>
                                                )
                                            };

                                        </select>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="compDesc">Enter Complaint Description:</label>
                                    <div className="col-sm-8">
                                        <textarea row={50} cols={50} className="form-control" id="compDesc" placeholder="Enter Complaint Description here" onChange={(e) => setCompDesc(e.target.value)} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveComplaintDetails(e)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
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
            <div className="modal fade" id="showData" role="dialog">
                <div className="modal-dialog modal-lg">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Complaint Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div> <input type="hidden" id="deptId" name="deptId" value={empCompId} /></div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Complaint Id:</label>
                                    <div className="col-sm-8">
                                        {compId}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Complaint Type Name:</label>
                                    <div className="col-sm-8">
                                        {compTypeName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Complaint Start Date:</label>
                                    <div className="col-sm-8">
                                        {compDate}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Complaint Resolve Date:</label>
                                    <div className="col-sm-8">
                                        {compResolveDate}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Complaint Description :</label>
                                    <div className="col-sm-8">
                                        {compDesc}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Complaint Status:</label>
                                    <div className="col-sm-8">
                                        {compStatus}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Remark:</label>
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