import React from "react";
import "./DoctorsList.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DoctorProfile.jsx";
import DoctorProfile from "./DoctorProfile.jsx";
import Footer from "../Footer/Footer.jsx";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar.jsx";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DoctorsList = () => {
  const navigate = useNavigate();
  async function GetUserInfo(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios(
        "https://eniacgroup.ir/backend/accounts/get_user/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer <access token >
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const data = response.data.user;
        setinfo({
          FirstName: data.firstname == null ? "--" : data.firstname,
          LastName: data.lastname == null ? "--" : data.lastname,
          Email: data.email,
          BirthDay:
            data.date_of_birth == null ? "00-00-00" : data.date_of_birth,
          Gender: data.gender == null ? "--" : data.gender,
          PhoneNumber: data.phone_number == null ? "--" : data.phone_number,
        });
      }
    } catch (error) {
      if (error.response.status == 403) {
        withReactContent(Swal).fire({
          icon: "error",

          html: "<div dir='rtl'>برای مشاهده اطلاعات شخصی ورود به اکانت خود الزامی است!</div>",

          background: "#075662",
          color: "#fff",
          width: "35rem",
          backdrop: `
              rgba(84, 75, 87.0.9)
              left top
              no-repeat`,
          confirmButtonText: "تایید",
          confirmButtonColor: "#0a8ca0",
          preConfirm: () => {
            navigate("/Signup");
          },
        });
      }
    }
  }

  const [doctorProfile, setDoctorProfile] = useState([]);
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(
          "https://eniacgroup.ir/backend/profile/doctors/"
        );
        setDoctorProfile(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
  }, []);

  const [doctorProfileFardi, setDoctorProfileFardi] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileFardi = async () => {
      try {
        const response1 = await axios.get(
          "https://eniacgroup.ir/backend/profile/doctors/typed/",
          {
            params: {
              profile_type: "فردی",
            },
          }
        );
        setDoctorProfileFardi(response1.data);
        // console.log(doctorProfileFardi);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileFardi();
  }, []);

  const [doctorProfileBaby, setDoctorProfileBaby] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileBaby = async () => {
      try {
        const response1 = await axios.get(
          "https://eniacgroup.ir/backend/profile/doctors/typed/",
          {
            params: {
              profile_type: "کودک",
            },
          }
        );
        setDoctorProfileBaby(response1.data);
        // console.log(response1);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileBaby();
  }, []);

  const [doctorProfileFamily, setDoctorProfileFamily] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileFamily = async () => {
      try {
        const response1 = await axios.get(
          "https://eniacgroup.ir/backend/profile/doctors/typed/",
          {
            params: {
              profile_type: "زوج",
            },
          }
        );
        setDoctorProfileFamily(response1.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileFamily();
  }, []);

  const [doctorProfileEdu, setDoctorProfileEdu] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileEdu = async () => {
      try {
        const response1 = await axios.get(
          `https://eniacgroup.ir/backend/profile/doctors/typed`,
          // "https://eniacgroup.ir/backend/profile/doctors/typed/",
          {
            params: {
              profile_type: "نوجوان",
            },
          }
        );
        // const response1 = await axios(
        //   "https://eniacgroup.ir/backend/profile/doctors/typed/",
        //   {
        //     method: "GET",
        //     params: {
        //       profile_type: "نوجوان",
        //     },
        //    }
        // );
        setDoctorProfileEdu(response1.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };
    fetchDoctorProfileEdu();
  }, []);

  const [doctorProfileCoaching, setDoctorProfileCoaching] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileCoaching = async () => {
      try {
        const response1 = await axios.get(
          "https://eniacgroup.ir/backend/profile/doctors/typed/",
          {
            params: {
              profile_type: "کوچینگ",
            },
          }
        );
        setDoctorProfileCoaching(response1.data);
        // console.log(doctorProfileCoaching);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileCoaching();
  }, []);

  const [doctorProfilePsychiatry, setDoctorProfilePsychiatry] = useState([]);
  useEffect(() => {
    const fetchDoctorProfilePsychiatry = async () => {
      try {
        const response1 = await axios.get(
          "https://eniacgroup.ir/backend/profile/doctors/typed/",
          {
            params: {
              profile_type: "روان پزشکی",
            },
          }
        );
        setDoctorProfilePsychiatry(response1.data);
        // console.log(doctorProfilePsychiatry);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfilePsychiatry();
  }, []);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NavBar_SideBar />
      <div className="Doctor_List_body" style={{overflowX:"hidden"}}>
        <div className="DoctorList-background">
          <html>
            <head>
              <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
                rel="stylesheet"
              />
              <link
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
                rel="stylesheet"
              />
              <link href="lib/animate/animate.min.css" rel="stylesheet" />
              <link href="./owl.carousel.min.css" rel="stylesheet" />
            </head>
          </html>
          <div
            className="text-center mx-auto pb-2 wow fadeIn"
            data-wow-delay=".3s"
            style={{ maxWidth: "600px" }}
          >
            <h1 style={{ color: 'gray' }}>لیست مشاورها</h1>
            <div className="doctorBox">
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  style={{ display: "flex", flexWrap: "wrap" }}
                  className="tabs-style"
                  value={value}
                  onChange={handleChange}
                  aria-label="scrollable prevent tabs example"
                  // centered
                  variant="scrollable"
                  scrollButtons={false}>
                  <Tab style={{ fontFamily: "Ios15medium", fontSize: "18px" }} label="بالینی" {...a11yProps(0)} />
                  <Tab style={{ fontFamily: "Ios15medium", fontSize: "18px" }} label="کودک" {...a11yProps(1)} />
                  <Tab style={{ fontFamily: "Ios15medium", fontSize: "18px" }} label="تحصیلی" {...a11yProps(2)} />
                  <Tab style={{ fontFamily: "Ios15medium", fontSize: "18px" }} label="خانواده" {...a11yProps(3)} />
                  <Tab style={{ fontFamily: "Ios15medium", fontSize: "18px" }} label="کوچینگ" {...a11yProps(4)} />
                  <Tab style={{ fontFamily: "Ios15medium", fontSize: "18px" }} label="روان پزشکی" {...a11yProps(5)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className="distanceBetweenDoctor">
                  {doctorProfileFardi.map((index) => (
                    <DoctorProfile
                      Id={index?.id}
                      name={index?.name}
                      Description={index?.description}
                      Image={index?.image}
                      ProfileType={index?.profile_type}
                      IsPrivate={index?.is_private}
                      Psychiatrist={index?.psychiatrist}
                    />
                  ))}
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="distanceBetweenDoctor">
                  {doctorProfileBaby.map((index) => (
                    <DoctorProfile
                      Id={index?.id}
                      name={index?.name}
                      Description={index?.description}
                      Image={index?.image}
                      ProfileType={index?.profile_type}
                      IsPrivate={index?.is_private}
                      Psychiatrist={index?.psychiatrist}
                    />
                  ))}
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <div className="distanceBetweenDoctor">
                  {doctorProfileEdu.map((index) => (
                    <DoctorProfile
                      Id={index?.id}
                      name={index?.name}
                      Description={index?.description}
                      Image={index?.image}
                      ProfileType={index?.profile_type}
                      IsPrivate={index?.is_private}
                      Psychiatrist={index?.psychiatrist}
                    />
                  ))}
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <div className="distanceBetweenDoctor">
                  {doctorProfileFamily.map((index) => (
                    <DoctorProfile
                      Id={index?.id}
                      name={index?.name}
                      Description={index?.description}
                      Image={index?.image}
                      ProfileType={index?.profile_type}
                      IsPrivate={index?.is_private}
                      Psychiatrist={index?.psychiatrist}
                    />
                  ))}
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <div className="distanceBetweenDoctor">
                      {doctorProfileCoaching.map((index) => (
                        <DoctorProfile
                          Id={index?.id}
                          name={index?.name}
                          Description={index?.description}
                          Image={index?.image}
                          ProfileType={index?.profile_type}
                          IsPrivate={index?.is_private}
                          Psychiatrist={index?.psychiatrist}
                        />
                      ))}
                    </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={5}>
                {/* <div className="distanceBetweenDoctor">
                      {doctorProfileFardi.map((index) => (
                        <DoctorProfile
                          Id={index?.id}
                          name={index?.name}
                          Description={index?.description}
                          Image={index?.image}
                          ProfileType={index?.profile_type}
                          IsPrivate={index?.is_private}
                          Psychiatrist={index?.psychiatrist}
                        />
                      ))}
                    </div> */}
                    <h4 className="font-custom my-4">مشاوری در این زمینه موجود نیست!</h4>
              </CustomTabPanel>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DoctorsList;