import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import EmployeeKppsService from '../../services/EmployeeKppsService';
import { BASE_URL_API } from '../../services/EmployeeConstants';
import axios from 'axios';

const EmplyeeKppRatingsComponent = () => {
    const [ekppMonth, setEkppMonth] = useState('');
    const [empRemark, setEmpRemark] = useState('');
 const [isSuccess, setIsSuccess] = useState(true)
    const [totalAchivedWeight, setTotalAchivedWeight] = useState('');
    const [totalOverAllAchive, setTotalOverAllAchive] = useState('');
    const [totalOverallTaskComp, setTotalOverallTaskComp] = useState('');
const[evidenceFileName, setEvidenceFileName] = useState('')
    const [selectedFile, setSelectedFile] = useState()

    const [kppMasterResponses, setKppMasterResponses] = useState()
    const [kppDetailsResponses, setKppDetailsResponses] = useState([])

    const YYYY_MM_DD_Formater = (date, format = 'YYYY-MM-DD') => {
        const t = new Date(date)
        const y = t.getFullYear()
        const m = ('0' + (t.getMonth() + 1)).slice(-2)
        const d = ('0' + t.getDate()).slice(-2)
        return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
    }



    const sumTotalAchivedWeight = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.empAchivedWeight), 0).toFixed(1);
        setTotalAchivedWeight(sum)
        return sum;
    }



    const sumTotalOverAllAchive = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.empOverallAchieve), 0);
        setTotalOverAllAchive(sum)
        return sum;
    }
    const sumTotalOverallTaskComp = (empKpps) => {
        const sum = empKpps.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.empOverallTaskComp), 0);
        setTotalOverallTaskComp(sum)
        return sum;
    }

    useEffect(() => {
        EmployeeKppsService.getKPPDetails().then((res) => {
            setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
            setKppMasterResponses(res.data);
            setEmpRemark(res.data.empRemark)
            setKppDetailsResponses(res.data.kppStatusDetails)
        });

        EmployeeKppsService.getEvidenceFileDetails(ekppMonth).then((res) => {
         
            setEvidenceFileName(res.data.responseData.evFileName);
         
        });
    }, []);

    const selectFile =  (e) => {
       setSelectedFile(e.target.files[0]);
    }
    const uploadFile =  (e) => {
       
        if (selectedFile) {
          let data = new FormData();
          data.append('multipartFile', selectedFile);
          data.append('empId',Cookies.get('empId'))
          
          data.append('evMonth', ekppMonth)
          EmployeeKppsService.uploadEvidence(data).then((res)=>{
            if(res.data.success){
                alert(res.data.responseMessage)
                EmployeeKppsService.getEvidenceFileDetails(ekppMonth).then((res) => {
         
                    setEvidenceFileName(res.data.responseData.evFileName);
                 
                });
               
            } else {
                alert(res.data.responseMessage)
            }

          });
          // axios.post('http://localhost:9091/evidence', data);
        }
    }

    const deleteFile =  (ekppMonth) => {
          EmployeeKppsService.deleteEvidence(ekppMonth).then((res)=>{
            if(res.data.success){
                alert(res.data.responseMessage)
            } else {
                alert(res.data.responseMessage)
            }
          });      
        
    }
  

    return (
        <div className='container-fluid'>
            <div className="row">
                <Formik initialValues={{
                    fields: kppDetailsResponses,
                    totalAchivedWeightage: 0,
                    totalOverAllAchive: 0,
                    totalOverallTaskCompleted: 0
                }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        let ekppStatus = "In-Progress";
                        let evidence = "evidence";
                        const payload = { "kppUpdateRequests": values?.fields, "totalAchivedWeightage": totalAchivedWeight, "totalOverAllAchive": totalOverAllAchive, "totalOverallTaskCompleted": totalOverallTaskComp, ekppMonth, ekppStatus, empRemark, evidence };
                        EmployeeKppsService.saveEmployeeKppDetails(payload).then(res => {
                            alert("Employee KPP added");
                            EmployeeKppsService.getKPPDetails().then((res) => {
                                setEkppMonth(YYYY_MM_DD_Formater(res.data.ekppMonth))
                                setKppMasterResponses(res.data);
                                setEmpRemark(res.data.empRemark)
                                setKppDetailsResponses(res.data.kppStatusDetails)
                            });
                        });
                    }}>
                    {({ values, setFieldValue }) => {

                        const handleTodoChange = (e, i, kppId, kppOverallWeightage, empOverallTaskComp, kppRating1) => {
                            console.log("e.target.value : ", e.target.value)
                            const field = e.target.name?.split(".")[1];
                            console.log("kppDetailsResponses[i].empOverallTaskComp =", empOverallTaskComp)

                            kppDetailsResponses[i] = {

                                ...kppDetailsResponses[i],


                                "kppId": kppId,
                                "empId": Cookies.get('empId'),
                                "empEId": Cookies.get('empEId'),
                                "roleId": Cookies.get('roleId'),
                                "deptId": Cookies.get('deptId'),
                                "desigId": Cookies.get('desigId'),
                                "empOverallTaskComp": field === "empOverallAchieve" && !!e.target.value ? (Number(e.target.value) / 5 * 100).toFixed(1) : 0,
                                "empAchivedWeight": field === "empOverallAchieve" && !!e.target.value ? ((kppOverallWeightage * (Number(e.target.value) / 5 * 100).toFixed(1)) / 100).toFixed(1) : 0,
                                "ekppMonth": ekppMonth,
                                [field]: parseInt(e.target.value || 0),
                            }
                            setFieldValue("totalAchivedWeightage", sumTotalAchivedWeight(kppDetailsResponses));
                            setFieldValue("totalOverAllAchive", sumTotalOverAllAchive(kppDetailsResponses));
                            setFieldValue("totalOverallTaskCompleted", sumTotalOverallTaskComp(kppDetailsResponses));


                            setFieldValue("fields", kppDetailsResponses)
                        };
                        return (
                            <Form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-1 "  >KPP Date:</label>
                                    <div className="col-sm-2">
                                        <input type="date" className="form-control" defaultValue={ekppMonth} name="ekppMonth" onChange={(e) => setEkppMonth(e.target.value)} />
                                    </div>
                                </div>
                                <table className="table table-bordered" >

                                    <thead>
                                        <tr>
                                            <td colSpan={21} className="text-center"><b>EMPLOYEE-WISE KEY PERFORMANCE INDICATORS (KPIs) FY 2022-2023</b></td>
                                        </tr>
                                        <tr>
                                            <th rowSpan={2} className="text-center">Sr No</th>
                                            <th rowSpan={2} className="text-center">INDIVIDUAL KPI / OBJECTIVES</th>
                                            <th rowSpan={2} className="text-center">PERFORMANCE INDICATOR</th>
                                            <th rowSpan={2} colSpan={2} className="text-center">OVERALL TARGET</th>
                                            <th rowSpan={2} className="text-center">UOM</th>
                                            <th colSpan={2} className="text-center">OVERALL WEIGHTAGE TO BE 100%</th>
                                            <th rowSpan={2} className="text-center">OVERALL ACHIEVEMENT</th>
                                            <th rowSpan={2} className="text-center">% OF TOTAL TASK COMPLETED</th>

                                            <th rowSpan={2} className="text-center">Hod Achived Weightage</th>
                                            <th rowSpan={2} className="text-center">Hod Ratings</th>
                                            <th rowSpan={2} className="text-center">Hod Overall Task Completed</th>
                                            <th rowSpan={2} className="text-center">GM Achived Weightage</th>
                                            <th rowSpan={2} className="text-center">GM Ratings</th>
                                            <th rowSpan={2} className="text-center">GM Overall Task Completed</th>
                                            <th colSpan={5} className="text-center">RATING RATIO COULD BE CHANGED AS PER TARGETS</th>
                                        </tr>
                                        <tr className="text-center">
                                            <th className="text-center">OVERALL WEIGHTAGE IN % </th>
                                            <th className="text-center">ACHIEVED WEIGHTAGE IN % </th>
                                            <th className="text-center">Rating 1</th>
                                            <th className="text-center">Rating 2</th>
                                            <th className="text-center">Rating 3</th>
                                            <th className="text-center">Rating 4</th>
                                            <th className="text-center">Rating 5</th>
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
                                                    <td>{kppResponse.uomName}</td>
                                                    <td className='text-center'>{kppResponse.kppOverallWeightage}</td>


                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.empAchivedWeight`} value={values?.fields?.[index]?.empAchivedWeight} disabled />
                                                    </td>

                                                    <td>
                                                        <input type="number" className="form-control"
                                                            name={`${index}.empOverallAchieve`}
                                                            min={0}
                                                            max={5}
                                                            defaultValue={values?.fields?.[index]?.empOverallAchieve}

                                                            onKeyDown={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, values?.fields?.[index]?.empOverallTaskComp, kppResponse.kppRating1)}
                                                            onChange={event => handleTodoChange(event, index, kppResponse.kppId, kppResponse.kppOverallWeightage, values?.fields?.[index]?.empOverallTaskComp, kppResponse.kppRating1)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" name={`${index}.empOverallTaskComp`} value={values?.fields?.[index]?.empOverallTaskComp} disabled />
                                                    </td>

                                                    <td className='text-center'>{kppResponse.hodAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.hodOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.hodOverallTaskComp}</td>
                                                    <td className='text-center'>{kppResponse.gmAchivedWeight}</td>
                                                    <td className='text-center'>{kppResponse.gmOverallAchieve}</td>
                                                    <td className='text-center'>{kppResponse.gmOverallTaskComp}</td>
                                                    <td className='text-center'>{kppResponse.kppRating1}</td>
                                                    <td className='text-center'>{kppResponse.kppRating2}</td>
                                                    <td className='text-center'>{kppResponse.kppRating3}</td>
                                                    <td className='text-center'>{kppResponse.kppRating4}</td>
                                                    <td className='text-center'>{kppResponse.kppRating5}</td>

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
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalAchivedWeightage === 0 ? sumTotalAchivedWeight(values?.fields) : values?.totalAchivedWeightage}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalOverAllAchive === 0 ? sumTotalOverAllAchive(values?.fields) : values?.totalOverAllAchive}</label></td>
                                            <td className='text-center'> <label className="control-label text-right">{values?.totalOverallTaskCompleted === 0 ? sumTotalOverallTaskComp(values?.fields) : values?.totalOverallTaskCompleted}</label></td>

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
                                    <div className="col-sm-2">
                                        <input type="file" className="form-control" id="fileUpload"  multiple={false}
                                        accept=".pdf"  onChange={(e)=>selectFile(e)}/>
                                       
                                        </div>
                                        <button type="submit" className="btn btn-info" onClick={(e) => uploadFile(e)}> Upload</button>
                                        
                                </div>

                                
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Uploaded File Name:</label>
                                    <div className="col-sm-2">
                                       {evidenceFileName}
                                       <button type="submit" className="btn btn-danger col-sm-offset-1" onClick={(e) => deleteFile(ekppMonth)}> Delete</button>
                                        </div>
                                        
                                       
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="empRemark">Enter Remark:</label>
                                    <div className="col-sm-6">
                                        <textarea row="5" className="form-control" id="empRemark" name="empRemark" defaultValue={empRemark} placeholder="Enter Remark here" onChange={(e) => setEmpRemark(e.target.value)} />
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
                                    <label className="control-label col-sm-4" htmlFor="gmKppStatus">GM Status</label>
                                    <div className="col-sm-6">
                                        <label htmlFor="empKppStatus">{kppMasterResponses?.gmKppStatus}</label>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2"><button type="submit" className="btn btn-success" disabled={kppMasterResponses?.hodKppStatus === "Approved"}> Submit</button>
                                        <a href={BASE_URL_API+`/report/in-progress-employee-kpp-status?empId=${Cookies.get('empId')}`}>
                                            <button type="button" className="btn btn-success col-sm-offset-1 " disabled={kppMasterResponses?.empKppStatus === "Pending"}
                                            > Download</button>
                                        </a>
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
export default EmplyeeKppRatingsComponent;