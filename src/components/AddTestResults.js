import '../styles/register.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from "uuid";

const AddTestResults = () => {

    const supabase = createClient('https://aorixqbhwobwdydcdrdb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvcml4cWJod29id2R5ZGNkcmRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODA0MDg0NiwiZXhwIjoxOTkzNjE2ODQ2fQ.LpjMSO2Mnbk3qQnJdJsuhT67PgF5FtpWmJmdMD_scdQ')

    const [testAppointmetID, settestAppointmetID] = useState('');
    const [testComment, settestComment] = useState('');
    const [testResult, settestResult] = useState('');
    const [reportfile, setReportfile] = useState(null);
    const [isUser, setIsuser] = useState(false);
   
    async function handleATRSubmit(e) {
        e.preventDefault();

        const File = reportfile;
        console.log(File)
        let url=null;
        if (File) {
            const filepath = "azad/" + uuidv4() + "-" + File['name']; //file name for storing the image
            const { data, error } = await supabase
                .storage
                .from('hms-files')
                .upload(filepath, File);
             url = "https://aorixqbhwobwdydcdrdb.supabase.co/storage/v1/object/public/hms-files/" + filepath
            setReportfile(null);
        }
        axios.post('https://dbms-backend-api.azurewebsites.net/add_test_result', { test_appointment_result_id: testAppointmetID, comment: testComment, result: testResult, report_link: url, access_token: localStorage.getItem("access_token") })
            .then((response) => {
                console.log(response.data);
                alert("Test Result Added Successfully");
                window.location.reload();

            }, (error) => {
                console.log(error);
                alert(error.response.data.message);
            }
            )
    };
    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "deo") { setIsuser(true); }
    }, []);
    return (
        <div>
            {isUser &&
        <div className="vikasTestResultsContainer">
            <div className="vikasRegHead">Add Test Results</div>
            <form onSubmit={handleATRSubmit} className='vikasRegForm'>
                {/* <div className="vikasRegRow">
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
                </div> */}
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
                            <option value="Positive">NA</option>
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


                        {reportfile && (
                            <div>
                                <h5>Uploaded File: {reportfile['name']}</h5>
                                <br />
                                <button onClick={() => setReportfile(null)}>Remove</button>
                            </div>
                        )}

                        <br />
                        <br />
                        <input className="inputfile"
                            type="file"
                            name="file"
                            id="file"
                            
                            onChange={(e) => {
                                setReportfile(e.target.files[0]);
                            }}
                        />
                        <label for="file">Select file</label>
                    </div>
                    
                </div>
                <div className="vikasRegButton">
                    <button type="submit" onClick={handleATRSubmit} >Add Result</button>
                </div>
            </form>
        </div>}
            {
                !isUser && <div className='notAuthorized'> <div class="w3-display-middle">
                    <h1 class="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
                    {/* <h class="w3-border-white w3-animate-left" style="margin:auto;width:50%"> */}
                    <h3 class="w3-center w3-animate-right">You dont have permission to view this page.</h3>
                    <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
                    <h6 class="w3-center w3-animate-zoom">error code:403 forbidden</h6>
                </div></div>
            }
        </div>
    );
}

export default AddTestResults;