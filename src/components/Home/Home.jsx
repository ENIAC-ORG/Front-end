import React from "react";
import Slider from "../Slider/Slider.jsx";
import Footer from "../Footer/Footer";
import Statistic from "../Counter/Statistic.jsx";
import Tests from "../Tests/Tests.jsx";
import Doctors_Home from "../Doctor/doctor.jsx";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar.jsx";
import AboutSection from "../Recommendation/Recommendation.jsx";
import HomeCarousel from "../Crasoul/Crasoul.jsx";
import Chat_Intro from "../Chat/ChatIntroduction/Chat_intro.jsx";
function Home() {
  return (
    <div style={{ backgroundColor: "#FFFFFF",overflowX:'hidden' }}>
      <NavBar_SideBar />
      <HomeCarousel />
      <AboutSection />
      <Tests />
      <Doctors_Home />
      <Chat_Intro/>
      <Statistic />
      <Footer />
    </div>
  );
}

export default Home;
