import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EmployeeKppsService from "../../services/EmployeeKppsService";
export default function EmployeeCumulativeKppComponent() {

    const navigate = useNavigate();

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [totalMonths, setTotalMonths] = useState()
    const [sumOfEmployeeRatings, setSumOfEmployeeRatings] = useState()
    const [sumOfHodRatings, setSumOfHodRatings] = useState()
    const [sumOfGMRatings, setSumOfGMRatings] = useState()

    const [cummulativeRatings, setCummulativeRatings] = useState()
    const [avgCummulativeRatings, setAvgCummulativeRatings] = useState()

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        EmployeeKppsService.getEmployeeKppReportDetailsByPaging().then((res) => {


            if (res.data.success) {

                setSumOfEmployeeRatings(res.data.responseData.sumOfEmployeeRatings)
                setSumOfHodRatings(res.data.responseData.sumOfHodRatings)
                setSumOfGMRatings(res.data.responseData.sumOfGMRatings)
                setCummulativeRatings(res.data.responseData.cummulativeRatings)
                setTotalMonths(res.data.responseData.totalMonths)
                setAvgCummulativeRatings(res.data.responseData.avgCummulativeRatings)

                setEmployees(res.data.responseData.employeeKppStatusResponses.content);
            }
            else {
                alert("Kpp is not approved for month");

            }

        }).catch((err) => {
            alert(err.response.data.details)
        });

    }, []);


    const getKPPDetailsByDate = (e) => {
        EmployeeKppsService.getEmployeeKppReportByDates(fromDate, toDate).then((res) => {
            if (res.data.success) {
                setSumOfEmployeeRatings(res.data.responseData.sumOfEmployeeRatings)
                setSumOfHodRatings(res.data.responseData.sumOfHodRatings)
                setSumOfGMRatings(res.data.responseData.sumOfGMRatings)
                setCummulativeRatings(res.data.responseData.cummulativeRatings)
                setAvgCummulativeRatings(res.data.responseData.avgCummulativeRatings)

                setEmployees(res.data.responseData.employeeKppStatusResponses.content);
            } else {
                alert("Kpp is not found for month");

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
        <div className="row">
            <h3 className="text-center">View KPP</h3>
            <div className="form-group">
                <form className="form-horizontal" enctype="multipart/form-data">
                    <label className="control-label col-sm-1" htmlFor="deptNameSearch"> From Date:</label>

                    <div className="col-sm-2">
                        <input type="date" className="form-control" defaultValue={fromDate} name="fromDate" onChange={(e) => setFromDate(e.target.value)} />
                    </div>

                    <label className="control-label col-sm-1" htmlFor="deptNameSearch"> To Date:</label>
                    <div className="col-sm-2">
                        <input type="date" className="form-control" defaultValue={toDate} name="toDate" onChange={(e) => setToDate(e.target.value)} />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={(e) => getKPPDetailsByDate(fromDate, toDate)}>Search</button>
            </div>


            <div className="col-sm-8">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center">Sr No</th>
                            <th className="text-center">KPP Month</th>
                            <th className="text-center">Employee Ratings</th>
                            <th className="text-center">HOD Ratings</th>
                            <th className="text-center">GM Ratings Name</th>
                            <th className="text-center">Total Ratings</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                (employee, index) =>   //index is inbuilt variable of map started with 0
                                    <tr key={employee.empId}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-justify">{YYYY_MM_DD_Formater(employee.ekppMonth)}</td>
                                        <td className="text-center">{employee.empOverallAchive}</td>
                                        <td className="text-center">{employee.hodOverallAchieve}</td>
                                        <td className="text-center">{employee.gmOverallAchieve}</td>
                                        <td className="text-center">{employee.sumOfRatings}</td>

                                        <td className="text-center">

                                            <a href={`http://localhost:9091/report/completed-employee-kpp-status?empId=${employee.empId}&ekppMonth=${YYYY_MM_DD_Formater(employee.ekppMonth)}`}>
                                                <button type="submit" className="btn btn-info">Download</button>
                                            </a>
                                        </td>
                                    </tr>

                            )

                        }
                        <tr>
                            <th className="text-right">Total</th>
                            <td className="text-center"></td>
                            <td className="text-center">{sumOfEmployeeRatings}</td>
                            <td className="text-center">{sumOfHodRatings}</td>
                            <td className="text-center">{sumOfGMRatings}</td>
                            <td className="text-center"></td>
                            <td className="text-center"></td>
                        </tr>
                        <tr>
                            <th className="text-right">Overall Cummalative Ratings: </th>
                            <td className="text-center">{cummulativeRatings}</td>
                        </tr>
                        <tr>
                        <th className="text-right">Total Months:</th>
                        <td className="text-center">{totalMonths}</td>

                    </tr>
                        <tr>
                            <th className="text-right">Average Cummalative Ratings:</th>
                            <td className="text-center">{avgCummulativeRatings}</td>

                        </tr>
                    </tbody>

                </table>
            </div>





        </div>

    );
}