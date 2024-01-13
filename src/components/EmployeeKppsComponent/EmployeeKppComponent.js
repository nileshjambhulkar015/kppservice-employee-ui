import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import Cookies from 'js-cookie';

export default function EmployeeKppComponent() {
    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])

   // console.log("Kpp totalOverallAchieve: ",kppMasterResponses?.totalOverallAchieve)

    const [ekppMonth, setEkppMonth] = useState('');
    const [totalEmpAchivedWeight, setTotalEmpAchivedWeight] = useState(kppMasterResponses?.totalEmpAchivedWeight);
    const [totalEmpOverallAchieve, setTotalEmpOverallAchieve] = useState(kppMasterResponses?.totalEmpOverallAchieve);
    const [totalEmpOverallTaskComp, setTotalEmpOverallTaskComp] = useState(kppMasterResponses?.totalEmpOverallTaskComp);
    const [empRemark, setEmpRemark] = useState(kppMasterResponses?.empRemark);
    const [evidence, setEvidence] = useState('');

    const [employeeKpps, setEmployeeKpps] = useState([{ kppId: "", empId: "", empEId: "", roleId: "", deptId: "", desigId: "", empAchivedWeight: "", empOverallAchieve: "", empOverallTaskComp: "", ekppMonth: "" }]);
    useEffect(() => {
        EmployeeKppsService.getKPPDetails().then((res) => {


            setKppMasterResponses(res.data);
            setKppDetailsResponses(res.data.kppStatusDetails)
        });
    }, []);

    useEffect(()=>{
        setTotalEmpAchivedWeight(kppMasterResponses?.totalEmpAchivedWeight);
        setTotalEmpOverallAchieve(kppMasterResponses?.totalEmpOverallAchieve);
        setTotalEmpOverallTaskComp(kppMasterResponses?.totalEmpOverallTaskComp);        
        setKppDetailsResponses(kppDetailsResponses)
    },[kppMasterResponses]);
    console.log("kppDetailsResponses line =",kppDetailsResponses)
    

    const handleTotalAchivedWeightage = (empKpps) => {
      
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.empOverallTaskComp), 0);
        setTotalEmpAchivedWeight(sum)
    }

    const handleTotalOverallAchieve = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.empAchivedWeight), 0);
        setTotalEmpOverallAchieve(sum)
    }

    const handleTotalOverallTaskCompleted = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.empAchivedWeight), 0);
        setTotalEmpOverallTaskComp(sum)
    }

    const handleTodoChange = (e, i, kppId, kppOverallTarget) => {
        const field = e.target.name;
        const empKpps = [...employeeKpps];
       
        empKpps[i] = {
            ...empKpps[i],
            "kppId": kppId,
            "empId": Cookies.get('empId'),
            "empEId": Cookies.get('empEId'),
            "roleId": Cookies.get('roleId'),
            "deptId": Cookies.get('deptId'),
            "desigId": Cookies.get('desigId'),
            "empOverallTaskComp": field === "empOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "empAchivedWeight": field === "empOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekppMonth": ekppMonth,
            [field]: e.target.value || 0,
        }
        handleTotalAchivedWeightage(empKpps)
        handleTotalOverallAchieve(empKpps)
        handleTotalOverallTaskCompleted(empKpps)   
      
        setEmployeeKpps(empKpps);

    };

    const saveEmployeeKpp = (e) => {
        e.preventDefault()
        let ekppStatus = "In-Progress";
        let evidence = "evidence";

        const payLoad = { "kppUpdateRequests": employeeKpps, totalEmpAchivedWeight, totalEmpOverallAchieve, totalEmpOverallTaskComp, ekppStatus, empRemark, evidence };
        console.log(payLoad)
        EmployeeKppsService.saveEmployeeKppDetails(payLoad).then(res => {
            alert("Employee KPP added");
        }
        );
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <form className="form-horizontal">
                
                    
                    <div className="form-group">
                        <label className="control-label col-sm-1 "  >Select Date:</label>
                        <div className="col-sm-2">
                            <input type="date" className="form-control" name="ekppMonth" onChange={(e) => setEkppMonth(e.target.value)} />
                        </div>
                    </div>
                    
                 
                    <table className="table table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th className='text-center'>Sr No</th>
                                <th className='text-center'>Objective</th>
                                <th className='text-center'>Key Performance Indicator</th>
                                <th>Overall Target</th>
                                <th>Target Period</th>
                                <th>UOM</th>
                                <th>Emp Achived Weightage</th>
                                <th>Emp Ratings</th>
                                <th>Emp Overall Task Completed</th>
                                <th>Overall Weightage</th>
                                <th>Hod Achived Weightage</th>
                                <th>Hod Ratings</th>
                                <th>Hod Overall Task Completed</th>
                                <th>GM Achived Weightage</th>
                                <th>GM Ratings</th>
                                <th>GM Overall Task Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                kppDetailsResponses.map(
                                    (kppResponse, index) =>
                                  
                                        <tr key={kppResponse.kppId} className="text-justify">
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td className='text-center'>{kppResponse.kppOverallTarget}</td>
                                            <td className='text-center'>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                            <td>
                                                <input type="text" className="form-control" name="empAchivedWeight" defaultValue={kppResponse.empAchivedWeight} value={employeeKpps[index]?.empAchivedWeight} disabled />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" min="0" name="empOverallAchieve" defaultValue={kppResponse.empOverallAchieve} onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallTarget)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="empOverallTaskComp" defaultValue={kppResponse.empOverallTaskComp} value={employeeKpps[index]?.empOverallTaskComp}    disabled />
                                            </td>
                                            <td className='text-center'>{kppResponse.kppOverallWeightage}</td>

                                            <td className='text-center'>{kppResponse.hodAchivedWeight}</td>
                                            <td className='text-center'>{kppResponse.hodOverallAchieve}</td>
                                            <td className='text-center'>{kppResponse.hodOverallTaskComp}</td>
                                            <td className='text-center'>{kppResponse.gmAchivedWeight}</td>
                                            <td className='text-center'>{kppResponse.gmOverallAchieve}</td>
                                            <td className='text-center'>{kppResponse.gmOverallTaskComp}</td>

                                        </tr>
                                )
                            }
                            <tr className="text-justify">
                                <td></td>
                                <td></td>
                                <td className='text-right'> <label className="control-label text-right" htmlFor="reamrk">Total</label></td>
                                <td className='text-center'></td>
                                <td className='text-center'> </td>
                                <td></td> 
                                <td className='text-center'> <label className="control-label text-right" name="totalEmpAchivedWeight" onChange={(e) => setTotalEmpAchivedWeight(e.target.value)}>{totalEmpAchivedWeight}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalEmpOverallAchieve" onChange={(e) => setTotalEmpOverallAchieve(e.target.value)}>{totalEmpOverallAchieve}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalEmpOverallTaskComp" onChange={(e) => setTotalEmpOverallTaskComp(e.target.value)}>{totalEmpOverallTaskComp}</label></td>
                                <td className='text-center'></td>
                                <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodAchivedWeight}</label></td>
                                <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodOverallAchieve}</label></td>
                                <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalHodOverallTaskComp}</label></td>
                                <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmAchivedWeight}</label></td>
                                <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallAchieve}</label></td>
                                <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallTaskComp}</label></td>
                                
                            </tr>
                        </tbody>
                    </table>

                  
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk">Upload Evidence:</label>
                                <div className="col-sm-3">
                                    <input type="file" className="form-control" id="deptName" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="empRemark">Enter Remark:</label>
                                <div className="col-sm-6">
                                    <textarea row="5" className="form-control" id="empRemark" name="empRemark" placeholder="Enter Remark here" value={kppMasterResponses?.empRemark} onChange={(e) => setEmpRemark(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="empKppStatus">Employee Status</label>
                                <div className="col-sm-6">
                                    <label htmlFor="empKppStatus">{kppMasterResponses?.empKppStatus}</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="hodKppStatus">Hod Status</label>
                                <div className="col-sm-6">
                                    <label htmlFor="empKppStatus">{kppMasterResponses?.hodKppStatus}</label>
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="hodKppStatus">Hod Remark</label>
                            <div className="col-sm-6">
                                <label htmlFor="empKppStatus">{kppMasterResponses?.hodRemark}</label>
                            </div>
                        </div>

                            <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="gmKppStatus">GM Status</label>
                                <div className="col-sm-6">
                                    <label htmlFor="empKppStatus">{kppMasterResponses?.gmKppStatus}</label>
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="hodKppStatus">GM Remark</label>
                            <div className="col-sm-6">
                                <label htmlFor="empKppStatus">{kppMasterResponses?.gmRemark}</label>
                            </div>
                        </div>

                       
                </form>

            </div>
            <div className="row">
                <div className="col-sm-8"></div>
                <div className="col-sm-2"><button type="submit" className="btn btn-success" disabled={kppMasterResponses?.empKppStatus==="Approved"} onClick={(e) => saveEmployeeKpp(e)}> Submit</button>
                <button type="submit" className="btn btn-success col-sm-offset-1 " disabled={kppMasterResponses?.empKppStatus==="Pending"} onClick={(e) => saveEmployeeKpp(e)}> Download</button>
                </div>                
            </div>
            <div className="row">
                <h4>  *Note - Please refere the below table for ratings:</h4>
                <div className="col-sm-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th>Sr No</th>
                                <th className='text-center'>KPP Objective</th>
                                <th>Rating 1</th>
                                <th>Rating 2</th>
                                <th>Rating 3</th>
                                <th>Rating 4</th>
                                <th>Rating 5</th>

                            </tr>
                        </thead>
                        <tbody>

                            {

                                kppDetailsResponses.map(
                                    (kppResponse, index) =>
                                        <tr className="text-center">
                                            <td>{index + 1}</td>
                                            <td className="text-justify">{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppRating1}</td>
                                            <td>{kppResponse.kppRating2}</td>
                                            <td>{kppResponse.kppRating3}</td>
                                            <td>{kppResponse.kppRating4}</td>
                                            <td>{kppResponse.kppRating5}</td>
                                        </tr>
                                )


                            }

                        </tbody>

                    </table>
                </div></div>       </div>


    );
}