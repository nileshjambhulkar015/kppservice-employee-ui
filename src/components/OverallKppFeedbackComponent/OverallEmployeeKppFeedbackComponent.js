import React from 'react';
import { Form, Formik } from 'formik'
import { useEffect } from 'react';
import { useState } from 'react';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import Cookies from 'js-cookie';
import { BASE_URL_API } from '../../services/URLConstants';

import OverallKppFeedbackService from '../../services/OverallKppFeedbackService';

const OverallEmployeeKppFeedbackComponent = () => {
    const [ekppMonth, setEkppMonth] = useState('');
    const [empRemark, setEmpRemark] = useState('');
    const [finYearId, setFinYearId] = useState('');
    const [finYear, setFinYear] = useState('');

    const [totalEmpAchivedWeight, setTotalEmpAchivedWeight] = useState('');
    const [totalEmpOverallAchieve, setTotalEmpOverallAchieve] = useState('');
    const [totalEmpOverallTaskComp, setTotalEmpOverallTaskComp] = useState('');


    const [hodEmpId, setHodEmpId] = useState('');
    const [totalHodAchivedWeight, setTotalHodAchivedWeight] = useState('');
    const [totalHodOverallAchieve, setTotalHodOverallAchieve] = useState('');
    const [totalHodOverallTaskComp, setTotalHodOverallTaskComp] = useState('');


    const [gmEmpId, setGmEmpId] = useState('');
    const [totalGmAchivedWeight, setTotalGmAchivedWeight] = useState('');
    const [totalGmOverallAchieve, setTotalGmOverallAchieve] = useState('');
    const [totalGmOverallTaskComp, setTotalGmOverallTaskComp] = useState('');

    const [totalOverallRatings, setTotalOverallRatings] = useState();
    const [totalOverallPercentage, setTotalOverallPercentage] = useState();

    const [empKppFeedback, setEmpKppFeedback] = useState();

    const [totalAchivedWeight, setTotalAchivedWeight] = useState('');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('');
    const [totalOverallTaskComp, setTotalOverallTaskComp] = useState('');
    const [evidenceFileName, setEvidenceFileName] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])


    const [financialYears, setFinancialYears] = useState([])

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }

    const handleFinYearChange = (value) => {
        setFinYear(value)
    }


    useEffect(() => {
        OverallKppFeedbackService.ddAllFinancialYear().then((res) => {
            if (null != res.data && res.data.length > 0) {
                setFinancialYears(res.data);
                setFinYear(res.data?.[0]?.finYear)
            } else {
                console.log("Value not set");
            }
        });
    }, []);

    useEffect(() => {

        if (finYear) {
            OverallKppFeedbackService.getHODKPPDetailsYearly(finYear).then((res) => {
                if (null != res.data.ekppMonth) {
                    setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
                } else {
                    const newDate = new Date();
                    // Format to YYYY-MM-DD
                    const formattedDate = newDate.toISOString().split('T')[0];
                    setEkppMonth(formattedDate);
                }

                // setFinYear(res.data.responseData?.finYear)
                setTotalEmpAchivedWeight(res.data.responseData?.totalEmpAchivedWeight)
                setTotalEmpOverallAchieve(res.data.responseData?.totalEmpOverallAchieve)
                setTotalEmpOverallTaskComp(res.data.responseData?.totalEmpOverallTaskComp)

                setHodEmpId(res.data.responseData?.hodEmpId)
                setTotalHodAchivedWeight(res.data.responseData?.totalHodAchivedWeight)
                setTotalHodOverallAchieve(res.data.responseData?.totalHodOverallAchieve)
                setTotalHodOverallTaskComp(res.data.responseData?.totalHodOverallTaskComp)

                setGmEmpId(res.data.responseData?.gmEmpId)
                setTotalGmAchivedWeight(res.data.responseData?.totalGmAchivedWeight)
                setTotalGmOverallAchieve(res.data.responseData?.totalGmOverallAchieve)
                setTotalGmOverallTaskComp(res.data.responseData?.totalGmOverallTaskComp)

                //average % need to be set
                setTotalOverallRatings(res.data.responseData?.totalOverallRatings)
                setTotalOverallPercentage(res.data.responseData?.totalOverallPercentage)
                setEmpRemark(res.data?.empRemark)

                setKppMasterResponses(res.data.responseData);
                setKppDetailsResponses(res.data.responseData?.kppStatusDetails)
            });
        }

    }, [finYear]);




    console.log("kppDetailsResponses : ", kppDetailsResponses)
    return (
        <div className='container-fluid'>
            <div className="row">
                <Formik initialValues={{
                    fields: kppDetailsResponses,
                    totalEmpAchivedWeight: 0,  //want to set value for this
                    totalEmpOverallAchieve: 0,
                    totalEmpOverallTaskComp: 0,
                    totalOverallRatings: 0,
                    totalOverallPercentage: 0

                }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        let empKppStatus = "In-Progress";
                        let evidence = "evidence added";
                        let empId = Cookies.get('empId');
                        let empEId = Cookies.get('empEId');
                        let roleId = Cookies.get('roleId');
                        let deptId = Cookies.get('deptId');
                        let desigId = Cookies.get('desigId');

                        console.log("empId: ", empId)


                        console.log("kppDetailsResponses : ", kppDetailsResponses)


                        const payload = { "kppUpdateRequests": values?.fields, "finYear": finYear, "empId": empId, "empEId": empEId, "roleId": roleId, "deptId": deptId, "desigId": desigId, "totalEmpAchivedWeight": totalEmpAchivedWeight, "totalEmpOverallAchieve": totalEmpOverallAchieve, "totalEmpOverallTaskComp": totalEmpOverallTaskComp, "hodEmpId": hodEmpId, "totalHodAchivedWeight": totalHodAchivedWeight, "totalHodOverallAchieve": totalHodOverallAchieve, "totalHodOverallTaskComp": totalHodOverallTaskComp, "gmEmpId": gmEmpId, "totalGmAchivedWeight": totalGmAchivedWeight, "totalGmOverallAchieve": totalGmOverallAchieve, "totalGmOverallTaskComp": totalGmOverallTaskComp, "avgTotalOverallRating": totalOverallRatings, "avgTotalOverallPer": totalOverallPercentage, ekppMonth, empKppStatus, empRemark, evidence };

                        console.log("payload : ", payload)
                        OverallKppFeedbackService.saveEmployeeKppFeedbackDetails(payload).then(res => {
                            if (res.data.success) {
                                alert(res.data.responseMessage);

                                OverallKppFeedbackService.getHODKPPDetailsYearly(finYear).then((res) => {

                                    if (null != res.data.ekppMonth) {
                                        setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
                                    } else {
                                        const newDate = new Date();
                                        // Format to YYYY-MM-DD
                                        const formattedDate = newDate.toISOString().split('T')[0];
                                        setEkppMonth(formattedDate);
                                    }

                                    setTotalEmpAchivedWeight(res.data.responseData?.totalEmpAchivedWeight)
                                    setTotalEmpOverallAchieve(res.data.responseData?.totalEmpOverallAchieve)
                                    setTotalEmpOverallTaskComp(res.data.responseData?.totalEmpOverallTaskComp)

                                    setHodEmpId(res.data.responseData?.hodEmpId)
                                    setTotalHodAchivedWeight(res.data.responseData?.totalHodAchivedWeight)
                                    setTotalHodOverallAchieve(res.data.responseData?.totalHodOverallAchieve)
                                    setTotalHodOverallTaskComp(res.data.responseData?.totalHodOverallTaskComp)

                                    setGmEmpId(res.data.responseData?.gmEmpId)
                                    setTotalGmAchivedWeight(res.data.responseData?.totalGmAchivedWeight)
                                    setTotalGmOverallAchieve(res.data.responseData?.totalGmOverallAchieve)
                                    setTotalGmOverallTaskComp(res.data.responseData?.totalGmOverallTaskComp)

                                    //average % need to be set
                                    setTotalOverallRatings(res.data.responseData?.totalOverallRatings)
                                    setTotalOverallPercentage(res.data.responseData?.totalOverallPercentage)
                                    setEmpRemark(res.data?.empRemark)

                                    setKppMasterResponses(res.data.responseData);
                                    setKppDetailsResponses(res.data.responseData?.kppStatusDetails)
                                });

                            } else {
                                alert(res.data.responseMessage);
                            }
                        });


                    }}>
                    {({ values, setFieldValue }) => {
                        const handleTodoChange = (e, i, kppId, empKppFeedback) => {
                            const field = e.target.name?.split(".")[1];
                            kppDetailsResponses[i] = {

                                ...kppDetailsResponses[i],

                                "empKppFeedback": empKppFeedback,
                                [field]: e.target.value || '',

                            }


                            setFieldValue("fields", kppDetailsResponses)
                        };
                        console.log("values : ", values)
                        return (
                            <Form className="form-horizontal">

                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="deptName">Financial Year:</label>
                                    <div className="col-sm-2">

                                        <select className="form-control" id="finYear" onChange={(e) => handleFinYearChange(e.target.value)}>
                                            {
                                                financialYears.map(
                                                    financialYear =>
                                                        <option key={financialYear?.finYearId} value={financialYear?.finYearId}>{financialYear?.finYear}</option>
                                                )
                                            };

                                        </select>
                                    </div>

                                </div>

                                <table className="table table-bordered" >

                                    <thead>
                                        <tr>
                                            <td colSpan={21} className="text-center"><h3>EMPLOYEE KEY PERFORMANCE INDICATORS (KPIs) for FINANCIAL YEAR {finYear}</h3></td>
                                        </tr>
                                        <tr>
                                            <th rowSpan={2} className="text-center">Sr No</th>
                                            <th rowSpan={2} className="text-center">INDIVIDUAL KPI / OBJECTIVES</th>
                                            <th rowSpan={2} className="text-center">PERFORMANCE INDICATOR</th>
                                            <th rowSpan={2} colSpan={2} className="text-center">OVERALL TARGET</th>
                                            <th rowSpan={2} className="text-center">UOM</th>
                                            <th colSpan={2} className="text-center">OVERALL WEIGHTAGE TO BE 100%</th>
                                            <th rowSpan={2} className="text-center">SELF APPRIASEE OVERALL ACHIEVEMENT</th>
                                            <th rowSpan={2} className="text-center">SELF APPRIASEE % OF TOTAL TASK COMPLETED</th>

                                            <th rowSpan={2} className="text-center">FIRST APPRIASEE ACHIEVED WEIGHTAGE IN % </th>
                                            <th rowSpan={2} className="text-center">FIRST APPRIASEE OVERALL ACHIEVEMENT</th>
                                            <th rowSpan={2} className="text-center">FIRST APPRIASEE % OF TOTAL TASK COMPLETED</th>

                                            <th rowSpan={2} className="text-center">Overall Employee KPP Feedback</th>
                                            <th rowSpan={2} className="text-center">Overall HOD KPP Feedback</th>
                                            <th rowSpan={2} className="text-center">Overall GM KPP Feedback</th>

                                        </tr>
                                        <tr className="text-center">
                                            <th className="text-center">OVERALL WEIGHTAGE IN % </th>
                                            <th className="text-center">SELF APPRIASEE ACHIEVED WEIGHTAGE IN % </th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {values?.fields?.map(

                                            (kppResponse, index) =>

                                                <tr key={kppResponse.kppId} className="text-justify">
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{kppResponse.kppObjective}</td>
                                                    <td>{kppResponse.kppPerformanceIndi}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallTarget}</td>
                                                    <td className='text-center'>{kppResponse.kppTargetPeriod}</td>
                                                    <td className='text-center'>{kppResponse.uomName}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallWeightage}</td>
                                                    <td className='text-center'>{kppResponse.empAchivedWeight} </td>
                                                    <td className='text-center'>  {kppResponse.empOverallAchieve}</td>
                                                    <td className='text-center'> {kppResponse.empOverallTaskComp}</td>

                                                    <td className='text-center'>{kppResponse.gmAchivedWeight} </td>
                                                    <td className='text-center'>  {kppResponse.gmOverallAchieve}</td>
                                                    <td className='text-center'> {kppResponse.gmOverallTaskComp}</td>

                                                    <td className='col-sm-4'>

                                                        <textarea rows="3" className="form-control"
                                                            name={`${index}.empKppFeedback`}

                                                            value={values?.fields?.[index]?.empKppFeedback || ''}

                                                            onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.empKppFeedback)}
                                                        />


                                                    </td>
                                                    <td className='text-center'>{kppResponse.hodKppFeedback}</td>
                                                    <td className='text-center'>{kppResponse.gmKppFeedback}</td>
                                                </tr>
                                        )}
                                        <tr className="text-justify">
                                            <td></td>
                                            <td></td>
                                            <td className='text-right'> <label className="control-label text-right" htmlFor="reamrk">Total</label></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> </td>
                                            <td></td>
                                            <td className='text-center'></td>
                                            <td className='text-center'> <label className="control-label text-right">{kppMasterResponses?.totalEmpAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{kppMasterResponses?.totalEmpOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{kppMasterResponses?.totalEmpOverallTaskComp}</label></td>

                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmAchivedWeight}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallAchieve}</label></td>
                                            <td className='text-center'> <label className="control-label text-right" >{kppMasterResponses?.totalGmOverallTaskComp}</label></td>

                                        </tr>
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="empKppStatus">Key Strengths :</label>
                                    <div className="col-sm-6">
                                        <label htmlFor="empKppStatus">{kppMasterResponses?.empKeyStrength}</label>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="gmKppStatus">Area of Improvement :</label>
                                    <div className="col-sm-6">
                                        <label htmlFor="empKppStatus">{kppMasterResponses?.empAreaOfImprovement}</label>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="gmKppStatus">Training & Development Needs :</label>
                                    <div className="col-sm-6">
                                        <label htmlFor="empKppStatus">{kppMasterResponses?.empTrainginDevelopmentNeeds}</label>
                                    </div>
                                </div>

                                    <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="gmKppStatus">Eligibility for promotion ( Department Head Comments) :</label>
                                    <div className="col-sm-6">
                                        <label htmlFor="empKppStatus">{kppMasterResponses?.hodRemark}</label>
                                    </div>
                                </div>

                                    <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="gmKppStatus">Eligibility for Promotion ( Management Comments) :</label>
                                    <div className="col-sm-6">
                                        <label htmlFor="empKppStatus">{kppMasterResponses?.remark}</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2"><button type="submit" className="btn btn-success"> Submit</button>
                                        <a href={BASE_URL_API + `/report/in-progress-hod-kpp-status?empId=${Cookies.get('empId')}`}>
                                            <button type="button" className="btn btn-success col-sm-offset-1 " disabled={kppMasterResponses?.empKppStatus === "Pending"}>  Download</button></a>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </div>
    );
}
export default OverallEmployeeKppFeedbackComponent;