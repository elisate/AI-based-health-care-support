import React from 'react'
import "../dashboardstyles/DoctorCard.css";
import { useNavigate } from 'react-router-dom';
const DoctorCard = ({getdoctor}) =>{
    const navigation = useNavigate();
    const handleNavigate = (_id) => {
        navigation(`/all-doctors/doctor_profile/${_id}`);
    }
    return (
        <div >
            <div className="doctos-card">
            <div className="doctor-header">
                <img src={getdoctor.profileImage} alt={getdoctor.userName} />
            </div>
            <div className="doctor-info">
                <h3>{getdoctor.userName}</h3>
                <p className="speciality">{getdoctor.Speciality}</p>
            </div>
            <div className="doctor-stats">
                {/* <div className="stat">
                    <p>{doctor.patients}</p>
                    <small>Patient</small>
                </div> */}
                <div className="stat">
                    <p>{getdoctor.userAge} yrs</p>
                    <small>Doc age</small>
                </div>
                {/* <div className="stat">
                    <p>{doctor.points}</p>
                    <small>Points</small>
                </div> */}
            </div>
            <button className="view" onClick={() => handleNavigate(getdoctor._id)}>View Profile</button>
        </div>
        </div>
    )
}

export default DoctorCard
