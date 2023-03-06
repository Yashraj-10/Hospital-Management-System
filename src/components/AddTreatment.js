import '../styles/register.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddTreatment = () => {
    // const [patientID, setpatientID] = useState('');
    const [docAppointmentID, setdocAppointmentID] = useState('');
    // const [treatmentDate, settreatmentDate] = useState('');

    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleAddTreatmentSubmit = (e) => {
        e.preventDefault();
        const treatment = {  docAppointmentID, tags };
        console.log(treatment);

        axios.post('https://dbms-backend-api.azurewebsites.net/add_treatment', { doc_appointment_id: docAppointmentID, treatment: tags, access_token: "" })
            .then((response) => {
                // console.log(response.data['access_token']);
                console.log(response.data);
                alert("Treatment Added Successfully");
                // history.push("/frontdesk");
            }, (error) => {
                console.log(error);
                alert("Treatment Addition Failed");
            }
            )

        console.log("Added Treatment");
        setIsPending(true);
    };
    useEffect(() => {
        // console.log("useEffect");
        // setpatientID('');
        setdocAppointmentID('');
        // settreatmentDate('');
        setTags([]);
        setIsPending(false);
    }, [isPending]);


    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };
    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }


    return (
        <div className="vikasAddTreatmentContainer">
            <div className="vikasRegHead">Add Treatment</div>
            <form className='vikasRegForm'>
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
                        Doctor Appointment ID:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            className='vikasAdmitTextBox'
                            value={docAppointmentID}
                            required
                            onChange={(e) => setdocAppointmentID(e.target.value)} />
                    </div>
                </div>
                {/* <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Treatment Date:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="date"
                            className='vikasAdmitTextBox'
                            value={treatmentDate}
                            required
                            onChange={(e) => settreatmentDate(e.target.value)} />
                    </div>
                </div> */}

                <div className="tagContainer">
                    <input
                        value={input}
                        placeholder="Enter Treatments"
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onChange={onChange}

                    />
                    {tags.map((tag, index) => (
                        <div className="tag">
                            <div className="tagRow">
                                <div className="tagCol1">
                                    {tag}
                                </div>
                                <div className="tagCol2">
                                    <button className='vikasDeleteTag' onClick={() => deleteTag(index)}>{index + 1}</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <br />
                <div className="vikasRegButton">
                    <button type="submit" required onClick={handleAddTreatmentSubmit} >Submit</button>
                </div>
            </form>

        </div>
    );
}

export default AddTreatment;