import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import Cookies from 'js-cookie';

export default function EmployeeKppComponent() {

    const [ekppMonth, setEkppMonth] = useState('');
    const [totalAchivedWeightage, setTotalAchivedWeightage] = useState('0');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('0');
    const [totalOverallTaskCompleted, setTotalOverallTaskCompleted] = useState('0');
    const [remark, setRemark] = useState('');
    const [evidence, setEvidence] = useState('');

    const [kppResponses, setKppResponses] = useState([])
    const [employeeKpps, setEmployeeKpps] = useState([{ kppId: "", empId: "", empEId: "", roleId: "", deptId: "", desigId: "", ekppAchivedWeight: "", ekppOverallAchieve: "", ekppOverallTaskComp: "", ekkpMonth: "" }]);
    useEffect(() => {
        EmployeeKppsService.getKPPDetails().then((res) => {
            setKppResponses(res.data);
        });
    }, []);

    const totalOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppOverallTaskComp, 0);
        setTotalAchivedWeightage(sum)
    }

    const totalOverallAchieve = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppOverallAchieve, 0);
        setTotalOverAllAchive(sum)
    }

    const totalAchivedWeight = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + currentValue.ekppAchivedWeight, 0);
        setTotalOverallTaskCompleted(sum)
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
            // "ekppStatus": "Pending",  // NEED TO MAKE IT DYNAMIC
            "ekppOverallTaskComp": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekppAchivedWeight": field === "ekppOverallAchieve" && !!e.target.value ? Number(e.target.value) + Number(kppOverallTarget) : 0,
            "ekppMonth": ekppMonth,
            [field]: e.target.value || 0,
        }
        totalOverallTaskComp(empKpps)
        totalOverallAchieve(empKpps)
        totalAchivedWeight(empKpps)
        setEmployeeKpps(empKpps);

    };

    const saveEmployeeKpp = (e) => {
        e.preventDefault()
        let ekppStatus = "In-Progress";
        let evidence = "evidence";
        /*let totalAchivedWeightage="totalAchivedWeightage";
        let totalOverAllAchive="totalOverAllAchive";
        let totalOverallTaskCompleted="totalOverallTaskCompleted";
         
         let remark="remark";
         let evidence="evidence";*/
        const payLoad = { "kppUpdateRequests": employeeKpps, totalAchivedWeightage, totalOverAllAchive, totalOverallTaskCompleted, ekppStatus, remark, evidence };
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
                        <label className="control-label col-sm-1 col-sm-offset-4"  >Select Month:</label>
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
                                <th>Achived Weightage</th>
                                <th>Over All Achive</th>
                                <th>Overall Task Completed</th>
                                <th>Overall Weightage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                kppResponses.map(
                                    (kppResponse, index) =>
                                        <tr key={kppResponse.kppId} className="text-justify">
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{kppResponse.kppObjective}</td>
                                            <td>{kppResponse.kppPerformanceIndi}</td>
                                            <td className='text-center'>{kppResponse.kppOverallTarget}</td>
                                            <td className='text-center'>{kppResponse.kppTargetPeriod}</td>
                                            <td>{kppResponse.kppUoM}</td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppAchivedWeight" defaultValue={kppResponse.ekppAchivedWeight}  disabled />
                                            </td>
                                            <td>
                                                <input type="number" className="form-control" min="0" name="ekppOverallAchieve" defaultValue={kppResponse.ekppOverallAchieve} onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallTarget)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name="ekppOverallTaskComp" defaultValue={kppResponse.ekppOverallTaskComp} disabled />
                                            </td>
                                            <td className='text-center'>{kppResponse.kppOverallWeightage}</td>

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
                                <td className='text-center'> <label className="control-label text-right" name="totalAchivedWeightage" onChange={(e) => setTotalAchivedWeightage(e.target.value)}>{totalAchivedWeightage}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverAllAchive" onChange={(e) => setTotalOverAllAchive(e.target.value)}>{totalOverAllAchive}</label></td>
                                <td className='text-center'> <label className="control-label text-right" name="totalOverallTaskCompleted" onChange={(e) => setTotalOverallTaskCompleted(e.target.value)}>{totalOverallTaskCompleted}</label></td>
                                <td className='text-center'></td>
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
                        <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                        <div className="col-sm-6">
                            <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                        </div>
                    </div>
                </form>

            </div>
            <div className="row">
                <div className="col-sm-10"></div>
                <div className="col-sm-2"><button type="submit" className="btn btn-success"   onClick={(e) => saveEmployeeKpp(e)}> Submit</button>

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

                                kppResponses.map(
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