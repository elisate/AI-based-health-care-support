
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Patient = () => {
    const [patientId, setPatientId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!patientId) {
            setError("Please enter a valid Patient ID.");
            return;
        }

        // Navigate to the patient profile page
        navigate(`/patient/patientpro/${patientId}`);
    };
    return (
        <div>
            <div className="forms">
                <div className="heades-container">
                    <h1 className="heades-title">Insert Your ID to View Your Profile</h1>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Insert ID No' name="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
                    <button className='doctor-btn' type='submit' style={{ marginBottom: "1rem" }}>View</button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}

            </div>
        </div>
    )
}

export default Patient
