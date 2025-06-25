import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboardlayout from "./Components/Dashboardlayout";
import DoctorDashboard from "./Components/DoctorDashboard";
import Dasboardview from "./Components/Dasboardview";
import Signup from "./Website/Signup";
import AllDoctors from "./Components/AllDoctors";
import EditDoctor from "./Components/EditDoctor";
import AddDoctor from "./Components/AddDoctor";
import DoctorProfile from "./Components/DoctorProfile";
import PatientDashboard from "./Components/PatientDashboard";
import PatientLayout from "./PatientDashboard/PatientLayout";

import DoctorLayout from "./DoctorDashboard/DoctorLayout";
import AddPatient from "./Components/AddPatient";
import AllPatients from "./Components/AllPatients";
import Patient from "./PatientDashboard/Patient";
import DoctorTable from "./Components/DoctorTable";
import EditDoctorForm from "./Components/EditDoctorForm";

import PatientProfile from "./PatientDashboard/PatientProfile";
import PatientPro from "./PatientDashboard/PatientPro";
import PatientTable from "./DoctorDashboard/PatientTable";
import DocPatient from "./DoctorDashboard/DocPatient";
import DocPatientPro from "./DoctorDashboard/DocPatientPro";
import AdminPatient from "./Components/AdminPatient";
import AdminPatientPro from "./Components/AdminPatientPro";
import EditPatientForm from "./DoctorDashboard/EditPatientForm";
import Support from "./PatientDashboard/Support";
import Events from "./Components/Events";
import DoctorPatient from "./DoctorDashboard/DoctorPatient";

import DoctorDash from "./DoctorDashboard/DoctorDash";
import Settings from "./Components/Settings";
import DocSettings from "./DoctorDashboard/DocSettings";
import PaSettings from "./PatientDashboard/PaSettings";
import PatientEvent from "./PatientDashboard/PatientEvent";
import Welcome from "./Components/Welcome";

import PatientSymptomForm from "./PatientDashboard/PatientSymptomForm";
import HospitalSchedule from "./other_component/HospitalSchedule";
import AppointmentPage from "./PatientDashboard/AppointmentPage";
import SuperDashboardlayout from "./SuperAdmin/SuperDashboardlayout";
import SDasboardview from "./SuperAdmin/SDasboardview";
import SAllHospitals from "./SuperAdmin/SAllHospitals";

import MedicalAIassistant from "./DoctorDashboard/MedicalAIassistant";
import SingleAppointment from "./Components/SingleAppointment";
import AssignDoctor from "./Components/AssignDoctor";
import AssignedAppointment from "./DoctorDashboard/AssignedAppointment";
import SingleAssignedAppointment from "./DoctorDashboard/SingleAssignedAppointment";
import Treatment from "./DoctorDashboard/Treatment";
import DoctorPatientAssigned from "./DoctorDashboard/DoctorPatientAssigned";
import PatientIndexPage from "./PatientDashboard/PatientIndexPage";
import GeneralUsers from "./SuperAdmin/GeneralUsers";
import SAddHospital from "./SuperAdmin/SAddHospital";
import GeneralDoctors from "./SuperAdmin/GeneralDoctors";
import GeneralPatients from "./SuperAdmin/GeneralPatients";
// import ProtectedRoutes from './Components/ProtectedRoute.js'
import PatientDetailsPage from "./Components/PatientDetailsModal"
// import UserProfile from "./other_component/UseringProfile";

import UseringProfile from "./other_component/UseringProfile";
import UserLastChats from "./PatientDashboard/UserLastChats";
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        

        <Route path="/welcome" element={<Welcome />} />
        {/* ----------------------HOSPITAL DASHBOARD-------------------------- */}
        <Route path="/" element={<Dashboardlayout />}>
          <Route path="/dashboard" element={<Dasboardview />} />
          <Route
            path="/dashboard/doctor-dashboard"
            element={<DoctorDashboard />}
          />
          <Route
            path="/assign-doctor/:appointment_id"
            element={<AssignDoctor />}
          />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/all-doctors" element={<AllDoctors />} />
          <Route path="/edit-doctor" element={<EditDoctor />} />
          <Route
            path="/dashboard/edit-doctorform/:id"
            element={<EditDoctorForm />}
          />
          <Route
            path="/singleAppointment/:appointment_id"
            element={<SingleAppointment />}
          />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/createSchedule" element={<HospitalSchedule />} />
          <Route
            path="/all-doctors/doctor_profile/:id"
            element={<DoctorProfile />}
          />

          <Route path="/all-patients" element={<AllPatients />} />
          <Route path="/doctor-view" element={<DoctorTable />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/dashboard/patient-profile" element={<AdminPatient />} />
          <Route
            path="/dashboard/patient-profile/:patientId"
            element={<AdminPatientPro />}
          />
          <Route path="/patient-profile/:id" element={<PatientProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard/settings" element={<UseringProfile/>} />
          <Route path="/patients/:nationalId" element={<PatientDetailsPage />} />


        </Route>
        {/* ------------------ PATIENT --------------------------- */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="/patient" index element={<PatientIndexPage />} />
          {/* <Route path="/patient" element={<PatientPro/>}/> */}
          <Route path="/patient/patient-pro" element={<Patient />} />
          <Route path="/patient/patient-profile" element={<PatientProfile />} />
          <Route
            path="/patient/patientpro/:patientId"
            element={<PatientPro />}
          />
          <Route path="/patient/support" element={<Support />} />
          <Route path="/patient/settings" element={<UseringProfile/>} />
          <Route path="/patient/event" element={<PatientEvent />} />
          <Route path="/patient/pridict" element={<PatientSymptomForm />} />
          <Route
            path="/patient/findAppointment/:id"
            element={<AppointmentPage />}
          />
          <Route path="/patient/lastChat" element={<UserLastChats/>}/>
        </Route>

        {/* ---------------------DOCTOR------------------- */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="/doctor" index element={<DoctorDash />} />
          <Route path="/doctor/dash" element={<DoctorDash />} />
          <Route
            path="/doctor/all-patients"
            element={<DoctorPatientAssigned />}
          />
          <Route path="/doctor/patient-pro" element={<DocPatient />} />
          <Route path="/doctor/AIassistant" element={<MedicalAIassistant />} />
          <Route
            path="/doctor/singleAppointmentForDoctor/:appointment_id"
            element={<SingleAssignedAppointment />}
          />
          <Route
            path="/doctor/patient-profile/:id"
            element={<DoctorPatient />}
          />
          <Route
            path="/doctor/TreatPatient/:appointmentId"
            element={<Treatment />}
          />
          <Route
            path="/doctor/patientpro/:patientId"
            element={<DocPatientPro />}
          />
          <Route path="/doctor/edit-patient" element={<PatientTable />} />
          <Route
            path="/doctor/edit-patientform/:id"
            element={<EditPatientForm />}
          />

          <Route path="/doctor/settings" element={<UseringProfile/>} />
          <Route path="/doctor/Appointment" element={<AssignedAppointment />} />
          <Route
            path="/doctor/SingleAssignedAppointment/:appointmentId"
            element={<SingleAssignedAppointment />}
          />
        </Route>

        {/* --------------------SUPER ADMIN ROUTES ----------------------------------------*/}
        <Route path="/" element={<SuperDashboardlayout />}>
          <Route index element={<SDasboardview />} />
          <Route path="/super" element={<SDasboardview />} />

          <Route path="/Sall-Hospitals" element={<SAllHospitals />} />

          <Route path="/Sadd-Hospitals" element={<SAddHospital />} />
          <Route path="/generalUsers" element={<GeneralUsers />} />
          <Route path="/GeneralDoctors" element={<GeneralDoctors/>}/>
          <Route path="/GeneralPatients" element={<GeneralPatients/>}/>
          <Route path="/userProfile" element={<UseringProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
