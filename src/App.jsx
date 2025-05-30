import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboardlayout from "./Components/Dashboardlayout";
import DoctorDashboard from "./Components/DoctorDashboard";
import Dasboardview from "./Components/Dasboardview";
import Layout from "./Website/Layout";
import Home from "./Website/Home";
import About from "./Website/About";
import Contact from "./Website/Contact";
import Login from "./Website/Login";
import Signup from "./Website/Signup";
import AllDoctors from "./Components/AllDoctors";
import EditDoctor from "./Components/EditDoctor";
import AddDoctor from "./Components/AddDoctor";
import DoctorProfile from "./Components/DoctorProfile";
import PatientDashboard from "./Components/PatientDashboard";
import PatientLayout from "./PatientDashboard/PatientLayout";
import NurseLayout from "./NurseDasboard/NurseLayout";
import AddNurse from "./Components/AddNurse";
import AllNurses from "./Components/AllNurses";
import NurseProfile from "./Components/NurseProfile";
import DoctorLayout from "./DoctorDashboard/DoctorLayout";
import AddPatient from "./Components/AddPatient";
import AllPatients from "./Components/AllPatients";
import Patient from "./PatientDashboard/Patient";
import DoctorTable from "./Components/DoctorTable";
import EditDoctorForm from "./Components/EditDoctorForm";
import NurseTable from "./Components/NurseTable";
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
import DoctorPati from "./DoctorDashboard/DoctorPati";
import DoctorDash from "./DoctorDashboard/DoctorDash";
import Settings from "./Components/Settings";
import DocSettings from "./DoctorDashboard/DocSettings";
import PaSettings from "./PatientDashboard/PaSettings";
import PatientEvent from "./PatientDashboard/PatientEvent";
import Welcome from "./Components/Welcome";

import Test from "./Components/Test";
import PatientSymptomForm from "./PatientDashboard/PatientSymptomForm";
import HospitalSchedule from "./other_component/HospitalSchedule";
import AppointmentPage from "./PatientDashboard/AppointmentPage";
import SuperDashboardlayout from "./SuperAdmin/SuperDashboardlayout";
import SDasboardview from "./SuperAdmin/SDasboardview";
import SPatientDashboard from "./SuperAdmin/SPatientDashboard";
import SAllHospitals from "./SuperAdmin/SAllHospitals";
import SAddDoctor from "./SuperAdmin/SAddDoctor";
import MedicalAIassistant from "./DoctorDashboard/MedicalAIassistant";
import SingleAppointment from "./Components/SingleAppointment";
import AssignDoctor from "./Components/AssignDoctor";
import AssignedAppointment from "./DoctorDashboard/AssignedAppointment";
import SingleAssignedAppointment from "./DoctorDashboard/SingleAssignedAppointment";
import Treatment from "./DoctorDashboard/Treatment";
import DoctorPatientAssigned from "./DoctorDashboard/DoctorPatientAssigned";
// import ProtectedRoutes from './Components/ProtectedRoute.js'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" index element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/welcome" element={<Welcome />} />
         {/* ----------------------HOSPITAL DASHBOARD-------------------------- */}
        <Route path="/" element={<Dashboardlayout />}>
          <Route path="/dashboard" element={<Dasboardview />} />
          <Route
            path="/dashboard/doctor-dashboard"
            element={<DoctorDashboard />}
          />
          <Route path="/assign-doctor/:appointment_id" element={<AssignDoctor/>} />
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
          <Route path="/all-nurses" element={<AllNurses />} />
          <Route path="/add-nurse" element={<AddNurse />} />
          <Route
            path="dashboard/nurse-profile/:id"
            element={<NurseProfile />}
          />
          <Route path="/nurse-doctor" element={<NurseTable />} />
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
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
        {/* ------------------ PATIENT --------------------------- */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="/patient/patient-pro" element={<Patient />} />
          <Route path="/patient/patient-profile" element={<PatientProfile />} />
          <Route
            path="/patient/patientpro/:patientId"
            element={<PatientPro />}
          />
          <Route path="/patient/support" element={<Support />} />
          <Route path="/patient/settings" element={<PaSettings />} />
          <Route path="/patient/event" element={<PatientEvent />} />
          <Route path="/patient/pridict" element={<PatientSymptomForm />} />
          <Route
            path="/patient/findAppointment/:id"
            element={<AppointmentPage />}
          />
        </Route>
        {/* ----------------------------------------------------- */}
        <Route path="/nurse" element={<NurseLayout />}></Route>
        {/* ---------------------DOCTOR------------------- */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="/doctor/dash" element={<DoctorDash />} />
          <Route path="/doctor/all-patients" element={<DoctorPatientAssigned/>} />
          <Route path="/doctor/patient-pro" element={<DocPatient />} />
          <Route path="/doctor/AIassistant" element={<MedicalAIassistant />} />
           <Route path="/doctor/singleAppointmentForDoctor/:appointment_id" element={<SingleAssignedAppointment/>} />
          <Route
            path="/doctor/patient-profile/:id"
            element={<DoctorPatient />}
          />
          <Route path="/doctor/TreatPatient/:appointmentId" element={<Treatment/>}/>
          <Route
            path="/doctor/patientpro/:patientId"
            element={<DocPatientPro />}
          />
          <Route path="/doctor/edit-patient" element={<PatientTable />} />
          <Route
            path="/doctor/edit-patientform/:id"
            element={<EditPatientForm />}
          />
          <Route path="/doctor/all-nurses" element={<AllNurses />} />
          <Route path="/doctor/nurse-doctor" element={<NurseTable />} />
          <Route path="/doctor/nurse-profile/:id" element={<NurseProfile />} />
          <Route path="/doctor/settings" element={<DocSettings />} />
           <Route path="/doctor/Appointment" element={<AssignedAppointment/>} />
          <Route path="/doctor/SingleAssignedAppointment/:appointmentId" element={<SingleAssignedAppointment/>}/>
        </Route>

        {/* --------------------SUPER ADMIN ROUTES ----------------------------------------*/}
        <Route path="/" element={<SuperDashboardlayout />}>
          <Route index element={<SDasboardview />} />
          <Route path="/super" element={<SDasboardview />} />
          <Route
            path="/dashboard/doctor-dashboard"
            element={<DoctorDashboard />}
          />
          <Route path="/Spatient-dashboard" element={<SPatientDashboard />} />
          <Route path="/Sall-doctors" element={<SAllHospitals/>} />
          <Route path="/Sedit-doctor" element={<EditDoctor />} />
          {/* <Route
            path="/dashboard/edit-doctorform/:id"
            element={<EditDoctorForm />}
          /> */}

          <Route path="/Sadd-doctor" element={<SAddDoctor />} />
          {/* <Route path="/createSchedule" element={<HospitalSchedule />} /> */}
          {/* <Route
            path="/all-doctors/doctor_profile/:id"
            element={<DoctorProfile />}
          /> */}
          {/* <Route path="/all-nurses" element={<AllNurses />} />
          <Route path="/add-nurse" element={<AddNurse />} /> */}
          {/* <Route
            path="dashboard/nurse-profile/:id"
            element={<NurseProfile />}
          /> */}
          <Route path="/nurse-doctor" element={<NurseTable />} />
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
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
