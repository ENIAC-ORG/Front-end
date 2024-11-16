import React from "react";
import LoginContainer from "./components/LoginSignUp/LoginSignUp.jsx";
import Landing from "./components/LandingPage/LandingPage.jsx";
import AboutUS from "./components/aboutus/aboutus.jsx";
import Verification from "./components/Verification/verification.jsx";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import User_Panel from "./components/User_Panel/User_Panel.jsx";
import Home from "./components/Home/Home.jsx";
import * as Router from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorList from "./components/DoctorsList/DoctorsList.jsx";
import CourseList from "./components/TestPage/TestPage.jsx";
import MBTITest from "./components/Tests_lib/test_MBTI.jsx";
import GlasserTest from "./components/Tests_lib/test_Glasser.jsx";
import ReservationPage from "./components/Reservation/Reservation.jsx";
import DoctorPage from "./components/SeeingDoctorReservation/DoctorPage.jsx";
import Patient_Panel from "./components/Patient_Panel/Patient_Panel.jsx";
import PatientsList from "./components/Doctor's_Patients/PatientsList.jsx";
import DoctorRating from "./components/DoctorPannelRating/DoctorPannelRating.jsx";
import Doctor_FreeTime from "./components/Doctor_FreeTime/Doctor_FreeTime.jsx";
import Testresult from "./components/User_TestResult/TestResult.jsx";
import RecommendationPage from "./components/RecommendationPage/RecommendationPage.jsx";

function App() {
  return (
    <Router.BrowserRouter>
      <Router.Routes>
        <Router.Route path="/" element={<Home />}>
          {" "}
        </Router.Route>
        <Router.Route path="/User_Panel" element={<User_Panel />}>
          {" "}
        </Router.Route>
        <Router.Route path="/Home" element={<Home />}>
          {" "}
        </Router.Route>
        <Router.Route path="/Signup" element={<LoginContainer />}>
          {" "}
        </Router.Route>
        <Router.Route path="/Landing" element={<Landing />}>
          {" "}
        </Router.Route>
        <Router.Route path="/AboutUs" element={<AboutUS />}>
          {" "}
        </Router.Route>
        <Router.Route path="/verification" element={<Verification />}>
          {" "}
        </Router.Route>
        <Router.Route path="/ForgetPassword" element={<ForgetPassword />}>
          {" "}
        </Router.Route>
        <Router.Route path="/TestPage" element={<CourseList />}>
          {" "}
        </Router.Route>
        <Router.Route path="/Doctors" element={<DoctorList />}>
          {" "}
        </Router.Route>

        <Router.Route path="/MBTI" element={<MBTITest />}>
          {" "}
        </Router.Route>
        <Router.Route path="/Glasser" element={<GlasserTest />}>
          {" "}
        </Router.Route>
        <Router.Route path="/Reserve" element={<ReservationPage />}>
          {" "}
        </Router.Route>
        <Router.Route path="/DoctorPage" element={<DoctorPage />}>
          {" "}
        </Router.Route>

        <Router.Route path="/Patient_Panel" element={<Patient_Panel />}>
          {" "}
        </Router.Route>
        <Router.Route path="/PatientsList" element={<PatientsList />}>
          {" "}
        </Router.Route>
        <Router.Route path="/DoctorFreeTime" element={<Doctor_FreeTime />}>
          {" "}
        </Router.Route>
        <Router.Route path="/TestResult" element={<Testresult />}>
          {" "}
        </Router.Route>
        <Router.Route path="/DoctorRatings" element={<DoctorRating />}>
          {" "}
        </Router.Route>
        <Router.Route path="/RecommendationPage" element={<RecommendationPage />}>
          {" "}
        </Router.Route>
      </Router.Routes>
    </Router.BrowserRouter>
  );
}

export default App;
