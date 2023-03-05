import '../styles/register.css';
import React, { useState } from 'react';
import axios from 'axios';

const AddTestResults = () => {
    const [patientID, setpatientID] = useState('');
    const [testAppointmetID, settestAppointmetID] = useState('');
    const [testComment, settestComment] = useState('');
    const [testResult, settestResult] = useState('');
    const [reportfile, setReportfile] = useState('');

    const handleATRSubmit = (e) => {
        
        // const testResultsData = {patientID, testAppointmetID, testComment, testResult};
        // console.log(testResultsData);
        axios.post("http://127.0.0.1:5000//add_test_result", {patientID : patientID, testAppointmetID : testAppointmetID, testComment : testComment, testResult : testResult, reportfile : reportfile})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="vikasTestResultsContainer">
            <div className="vikasRegHead">Add Test Results</div>
            <form onSubmit={handleATRSubmit} className='vikasRegForm'>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Patient ID:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            className='vikasAdmitTextBox'
                            value={patientID}
                            required
                            onChange={(e) => setpatientID(e.target.value)} />
                    </div>
                </div>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Test Appointment ID:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            className='vikasAdmitTextBox'
                            value={testAppointmetID}
                            required
                            onChange={(e) => settestAppointmetID(e.target.value)} />
                    </div>
                </div>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Test Result:
                    </label>
                    <div className="vikasRegCol2">
                        <select
                            className='vikasATRSelectBox'
                            value={testResult}
                            required
                            onChange={(e) => settestResult(e.target.value)}>
                            <option value="null">Select</option>
                            <option value="Negative">Negative</option>
                            <option value="Positive">Positive</option>
                        </select>
                    </div>
                </div>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Comments:
                    </label>
                    <div className="vikasRegCol2">

                        <textarea rows="3" cols="60" type="text"
                            className='vikasATRCommentBox'
                            value={testComment}
                            required
                            onChange={(e) => settestComment(e.target.value)}>

                        </textarea>
                    </div>
                </div>
                <br />
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Upload Report:
                    </label>
                    <div className="vikasRegCol3">
                    <input className="vikasATRUploadButton"
                        type="file"
                        value={reportfile}
                        onChange= {(e) => setReportfile(e.target.value)} 
                    />
                    </div>
                </div>
                <div className="vikasRegButton">
                    <button type="submit" onClick={handleATRSubmit} >Add Result</button>
                </div>
            </form>
        </div>
    );
}

export default AddTestResults;