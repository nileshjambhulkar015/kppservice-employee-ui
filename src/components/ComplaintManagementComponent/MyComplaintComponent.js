import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";


import ComplaintService from '../../services/ComplaintService';
import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent';

export default function MyComplaintComponent() {


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
    const [empCompIdSearch, setEmpCompIdSearch] = useState();
    const [isSuccess, setIsSuccess] = useState(true)

    const [compResolveEmpName, setCompResolveEmpName] = useState('');
    const [compResolveEmpEId, setCompResolveEmpEId] = useState('');

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    const [complaints, setComplaints] = useState([])

    const [complaintTypes, setComplaintTypes] = useState([])

    const [departments, setDepartments] = useState([])


    const [compFromDate, setCompFromDate] = useState('')
    const [compToDate, setCompToDate] = useState('')
    const [asDeptId, setAsDeptId] = useState('')
    const [asCompId, setAsCompId] = useState('')
    const [asCompStatus, setAsCompStatus] = useState('')
    const [asCompTypeDeptId, setAsCompDeptId] = useState('')
  
    const [saveMyComplaintAlert, setSaveMyComplaintAlert] = useState(false);
    const [deleteMyComplaintAlert, setDeletMyComplaintAlert] = useState(false);
    const [updateMyComplaintAlert, setUpdatMyComplaintAlert] = useState(false);
    const handleClose = () => {

        setSaveMyComplaintAlert(false);
        setDeletMyComplaintAlert(false)
        setUpdatMyComplaintAlert(false)
        //setAnnounVenue('');
         //setAnnounTitle('');
       //  setAnnounDescription('')
        setRemark('');
    };

    useEffect(() => {

        ComplaintService.getAllDepartmentDetails().then((res) => {
            setDepartments(res.data);
        });

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

    const clearSearchData = () => {
        
        ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setComplaints(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }

        });

    }

    const handleDepartmentChange = (value) => {
        if (value == "Select Department") {
            value = null;
        }
        setAsCompDeptId(value)
    }




    // Advance search employee
    const advSearchEmployeeComplaints = (e) => {
        let empId = Cookies.get('empId');

        let empCompDeptId = Cookies.get('deptId')
        e.preventDefault()
        let advComplaintSearch = { compFromDate, compToDate, empId, empCompDeptId, asCompTypeDeptId, asCompId, asCompStatus };

        ComplaintService.advanceSearchComplaintDetails(advComplaintSearch).then(res => {
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
        let empEmailId = Cookies.get('empEmailId')
        let complaint = { empId, empEId, roleId, deptId, desigId, compTypeDeptId, compTypeId, compDesc, empEmailId, statusCd, employeeId };
        
        ComplaintService.saveComplaintDetails(complaint).then(res => {
            
            ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);

                setRemark('');

            });
            console.log("Department added");
        }
        );
        setSaveMyComplaintAlert(false)
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
            setCompResolveEmpName(complaint.compResolveEmpName);
            setCompResolveEmpEId(complaint.compResolveEmpEId);
            setRemark(complaint.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteComplaintById = (e) => {
        if (window.confirm("Do you want to delete this complaint ?")) {
        ComplaintService.deleteEmployeeComplaintById(empCompId).then(res => {
            ComplaintService.getEmployeeCompaintsDetailsByPaging().then((res) => {
                setComplaints(res.data.responseData.content);
                console.log(res.data.responseData.content)
            });
            console.log("Department deleted");
        }
        );
    } else {
        // User clicked Cancel
        console.log("User canceled the action.");
    }
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

        setUpdatMyComplaintAlert(false)
    }

    const onComplaintStatusChangeHandler = (event) => {
        setAsCompStatus(event);
    };

    const searchComplaintById = (e) => {
        setEmpCompIdSearch(e.target.value)

        ComplaintService.getEmployeeCompaintsByComplaintId(e.target.value).then((res) => {

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


    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }
    return (

        <React.Fragment>
            <div className="row">

                <h2 className="text-center">My Complaint List</h2>

                <div className="col-md-11">


                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <form className="form-horizontal">
                                    <label className="control-label col-sm-3" htmlFor="empCompIdSearch">Enter Complaint Id:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" id="empCompIdSearch" placeholder="Enter Complaint Id" value={empCompIdSearch} onChange={(e) => searchComplaintById(e)} />
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="col-sm-5" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveComplaint">Add Complaint</button>

                            <button type="button" className="btn btn-primary col-sm-offset-1" data-toggle="modal" data-target="#advanceSearchEmployee">Advance Search</button>
                            <button type="button" className="btn btn-primary col-sm-offset-1" onClick={() => clearSearchData()}>Clear Search</button>
                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Complaint No</th>
                                        <th className="text-center">Complaint Date</th>
                                        <th className="text-center">Complaint Resolved Date</th>
                                        <th className="text-center">Complaint Department</th>
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
                                                    <td>{complaint.compResolveDate}</td>
                                                    <td>{complaint.compTypeDeptName}</td>
                                                    <td>{complaint.compTypeName}</td>
                                                    <td>{complaint.compStatus}</td>


                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateDepartment" onClick={() => getComplaintById(complaint.empCompId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteComplaintById(complaint.empCompId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => getComplaintById(complaint.empCompId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            : <h1>No Data Found</h1>}
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
                                        <textarea rows={10} cols={50} className="form-control" id="compDesc" placeholder="Enter Complaint Description here" onChange={(e) => setCompDesc(e.target.value)} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveMyComplaintAlert(true)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
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




                                    <div className="row">
                                        <label className="control-label col-sm-4" htmlFor="companyName">Complaint Status:</label>
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <select className="form-control" id="asCompStatus" onChange={(e) => onComplaintStatusChangeHandler(e.target.value)} defaultValue={compStatus}>
                                                    <option>Select Complaint Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Resolved">Resolved</option>
                                                    <option value="Reject">Reject</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => advSearchEmployeeComplaints(e)}>Search</button>

                                <a href={BASE_URL_API + `/complaint/download-employee-complaint?compFromDate=${compFromDate}&compToDate=${compToDate}&empId=${Cookies.get('empId')}&empCompDeptId=${Cookies.get('deptId')}&asCompTypeDeptId=${asCompTypeDeptId}&empCompId=${asCompId}&asCompStatus=${asCompStatus}`}>
                                    <button type="button" className="btn btn-success col-sm-offset-1 "> Download</button>
                                </a>

                                <button type="button" className="btn btn-danger  col-sm-offset-1" data-dismiss="modal">Close</button>
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
                                    <label className="control-label col-sm-4" htmlFor="hodKppStatus">Working By Employee Name:</label>
                                    <div className="col-sm-3">
                                        {compResolveEmpName}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="hodKppStatus">Working By Employee Id:</label>
                                    <div className="col-sm-3">
                                        {compResolveEmpEId}
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
            {saveMyComplaintAlert && (
                <AlertboxComponent
                    show={saveMyComplaintAlert}
                    title="danger"
                    message="Do you want to save Complaint"
                    onOk={saveComplaintDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

            {updateMyComplaintAlert && (
                <AlertboxComponent
                    show={updateMyComplaintAlert}
                    title="danger"
                    message="Do you want to update Complaint"
                    onOk={updateComplaint}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}

             {deleteMyComplaintAlert && (
                <AlertboxComponent
                    show={deleteMyComplaintAlert}
                    title="danger"
                    message="Do you want to delete Complaint"
                    onOk={deleteComplaintById}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}
        </React.Fragment>
    );
}