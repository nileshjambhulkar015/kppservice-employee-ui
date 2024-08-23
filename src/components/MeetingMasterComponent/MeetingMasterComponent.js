import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import MeetingMasterService from '../../services/MeetingMasterService';
export default function MeetingMasterComponent() {

    const [meetId, setMeetId] = useState('');
    const [meetStartDate, setMeetStartDate] = useState('');
    const [meetEndDate, setMeetEndDate] = useState('');
    const [meetCreatedByEmpId, setMeetCreatedByEmpId] = useState('');
    const [meetCreatedByEmpEId, setMeetCreatedByEmpEId] = useState('');
    const [meetCreatedByEmpName, setMeetCreatedByEmpName] = useState('');

    const [meetCreatedByRoleId, setMeetCreatedByRoleId] = useState('');
    const [meetCreatedByRoleName, setMeetCreatedByRoleName] = useState('');
    const [meetCreatedByDeptId, setMeetCreatedByDeptId] = useState('');
    const [meetCreatedByDeptName, setMeetCreatedByDeptName] = useState('');
    const [meetCreatedByDesigId, setMeetCreatedByDesigId] = useState('');
    const [meetCreatedByDesigName, setMeetCreatedByDesigName] = useState('');
    const [meetVenue, setMeetVenue] = useState('');
    const [meetTitle, setMeetTitle] = useState('');
    const [meetDescription, setMeetDescription] = useState('');
    const [meetStatus, setMeetStatus] = useState('');
    const [remark, setRemark] = useState('');



    const [meetings, setMeetings] = useState([])

    //loading all department and roles while page loading at first time
    useEffect(() => {
        MeetingMasterService.getEmployeeMeetingByPaging().then((res) => {
            setMeetings(res.data.responseData.content);
            console.log(res.data.responseData.content)
        });
    }, []);

    const showMeetingById = (e) => {

        MeetingMasterService.getMeetingById(e).then(res => {
            let meeting = res.data;
            setMeetId(meeting.meetId)
            setMeetStartDate(meeting.meetStartDate)
            setMeetEndDate(meeting.meetEndDate)
            setMeetCreatedByEmpId(meeting.meetCreatedByEmpId)
            setMeetCreatedByEmpEId(meeting.meetCreatedByEmpEId)
            setMeetCreatedByEmpName(meeting.meetCreatedByEmpName)
            setMeetCreatedByRoleId(meeting.meetCreatedByRoleId)
            setMeetCreatedByRoleName(meeting.meetCreatedByRoleName)
            setMeetCreatedByDeptId(meeting.meetCreatedByDeptId)
            setMeetCreatedByDeptName(meeting.meetCreatedByDeptName)
            setMeetCreatedByDesigId(meeting.meetCreatedByDesigId)
            setMeetCreatedByDesigName(meeting.meetCreatedByDesigName)
            setMeetVenue(meeting.meetVenue)
            setMeetTitle(meeting.meetTitle)
            setMeetDescription(meeting.meetDescription)
            setMeetStatus(meeting.meetStatus)
            setRemark(meeting.remark)

        }
        );
    }

    const cancelMeeting = (e) => {

        MeetingMasterService.getMeetingById(e).then(res => {
            let ExsitingMeeting = res.data;
          
            let meetId = ExsitingMeeting.meetId;
       
        
        let meetStatus='Cancel'
        let meeting = { meetId, meetStatus};

        MeetingMasterService.cancelEmployeeMeeting(meeting).then(res => {
            MeetingMasterService.getEmployeeMeetingByPaging().then((res) => {
                setMeetings(res.data.responseData.content);
                console.log(res.data.responseData.content)
            });
            console.log("Meeting cancel");
        }
        );
    });

    }


    const saveMeeting = (e) => {
        e.preventDefault()
        let statusCd = 'A';
        let meetStatus='Pending'
        let employeeId= Cookies.get('empId');

         let meetCreatedByEmpId = Cookies.get('empId')
         let meetCreatedByEmpEId = Cookies.get('empEId')
         let meetCreatedByEmpName = Cookies.get('empFirstName') +' '+Cookies.get('empMiddleName')+' '+Cookies.get('empLastName')
         let meetCreatedByRoleId = Cookies.get('roleId')
         let meetCreatedByRoleName = Cookies.get('roleName')
         let meetCreatedByDeptId =Cookies.get('deptId')
         let meetCreatedByDeptName = Cookies.get('deptName')
         let meetCreatedByDesigId =  Cookies.get('desigId')
         let meetCreatedByDesigName =  Cookies.get('desigName')
         
         let meeting = { meetStartDate, meetEndDate,meetCreatedByEmpId,meetCreatedByEmpEId,meetCreatedByEmpName,meetCreatedByRoleId,meetCreatedByRoleName,meetCreatedByDeptId,meetCreatedByDeptName,meetCreatedByDesigId,meetCreatedByDesigName,meetVenue,meetTitle,meetDescription,meetStatus, remark, statusCd,employeeId };
        console.log("Meting", meeting)
         MeetingMasterService.saveEmployeeMeetingDetails(meeting).then(res => {
            
            MeetingMasterService.getEmployeeMeetingByPaging().then((res) => {
                setMeetings(res.data.responseData.content);
            });

            
            
        }
        );
        
    }

    return (

        <div>
            <div className="row">
                <h2 className="text-center">Meeting List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-11" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveMeeting">Add Meeting</button>

                        </div>
                    </div>
                    <div className="row">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Sr No</th>
                                    <th className="text-center">Organiser Name</th>
                                    <th className="text-center">Organiser Department</th>
                                    <th className="text-center">Organiser Designation</th>

                                    <th className="text-center">Start DateTime</th>
                                    <th className="text-center">End DateTime</th>
                                    <th className="text-center">Meeting Venue</th>
                                    <th className="text-center">Meeting Title</th>
                                    <th className="text-center">Status</th>

                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    meetings.map(
                                        (meeting, index) =>   //index is inbuilt variable of map started with 0
                                            <tr key={meeting.meetId}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{meeting.meetCreatedByEmpName}</td>
                                                <td>{meeting.meetCreatedByDeptName}</td>
                                                <td>{meeting.meetCreatedByDesigName}</td>

                                                <td>{meeting.meetStartDate}</td>
                                                <td>{meeting.meetEndDate}</td>
                                                <td>{meeting.meetVenue}</td>
                                                <td>{meeting.meetTitle}</td>
                                                <td>{meeting.meetStatus}</td>
                                                <td>
                                                
                                                    <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showMeetingById(meeting.meetId)}>View</button>
                                                    <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => cancelMeeting(meeting.meetId)}>Cancel</button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


                {/* Modal for save department details */}
                <div className="modal fade" id="saveMeeting" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Department</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName">Meeting Start Date Time:</label>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" className="form-control" defaultValue={meetStartDate} name="meetStartDate" onChange={(e) => setMeetStartDate(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting End Date Time:</label>
                                        <div className="col-sm-4">
                                            <input type="datetime-local" className="form-control" id="meetEndDate" defaultValue={meetEndDate} name="meetEndDate" onChange={(e) => setMeetEndDate(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Location:</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" id="meetVenue" placeholder="Enter Meeting Location here" value={meetVenue} onChange={(e) => setMeetVenue(e.target.value)} />

                                        </div>
                                    </div>





                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Title:</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" id="meetTitle" placeholder="Enter Meeting Title here" value={meetTitle} onChange={(e) => setMeetTitle(e.target.value)} />

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Description:</label>
                                        <div className="col-sm-8">
                                            <textarea rows="5" className="form-control" id="meetDescription" placeholder="Enter Meeting Description here" value={meetDescription} onChange={(e) => setMeetDescription(e.target.value)} />

                                        </div>
                                    </div>



                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveMeeting(e)} > Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Modal for save data when user click on Add button */}
                <div className="modal fade" id="s" role="dialog">
                    <div className="modal-dialog modal-lg">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Meeting Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">




                                </form>
                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>



                {/* Modal for show data when user click on view button */}
                <div className="modal fade" id="showData" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Meeting Details</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Start Date Time:</label>
                                        <div className="col-sm-8">
                                            {meetStartDate}
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting End Date Time:</label>
                                        <div className="col-sm-8">
                                            {meetEndDate}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Name:</label>
                                        <div className="col-sm-8">
                                            {meetCreatedByEmpName}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Employee Id:</label>
                                        <div className="col-sm-8">
                                            {meetCreatedByEmpEId}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organisser Department Name:</label>
                                        <div className="col-sm-8">
                                            {meetCreatedByDeptName}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Organiser Designation:</label>
                                        <div className="col-sm-8">
                                            {meetCreatedByDesigName}
                                        </div>
                                    </div>




                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Location:</label>
                                        <div className="col-sm-8">
                                            {meetVenue}
                                        </div>
                                    </div>





                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Title:</label>
                                        <div className="col-sm-8">
                                            {meetTitle}
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Description:</label>
                                        <div className="col-sm-8">
                                            {meetDescription}
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="deptName" >Meeting Status:</label>
                                        <div className="col-sm-8">
                                            {meetStatus}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-4" htmlFor="reamrk" >Remark :</label>
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


        </div>
    );
}