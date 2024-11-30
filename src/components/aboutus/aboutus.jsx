import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./AboutUs.module.css";
import NavBar_SideBar from '../SidebarNabar/NavBar_SideBar';
import Footer from '../Footer/Footer';


const AboutUsPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <body className={styles.aboutusbody}>
                <NavBar_SideBar />
                <div className={styles.backgroundaboutus}>
                    <div className={styles.aboutusSection1}>
                        <br /><br /><br /><br />
                        <p className={styles.title}>همراه شما در مسیر رشد و آرامش
                            <br />
                        </p>
                        <p className={styles.discription}>
                            با تیمی از متخصصین حرفه‌ای برای پشتیبانی و راهنمایی به سوی زندگی بهتر
                        </p>
                        <br />

                        <p className={styles.follow}>
                            :ما را دنبال کنید
                            <br />
                            <a align='center' href="https://github.com/ENIAC-ORG">
                                <img src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo-768x432.png" className={styles.imagegit}></img>
                            </a>
                        </p>
                    </div>

                    <div className={styles.aboutusSection2}>
                        <p className={styles.paragsize}>
                            مرکز مشاوره ما با تیمی از روانشناسان و روانپزشکان حرفه‌ای، در فضایی امن و آرام به شما کمک می‌کند تا مسیر بهبود و رشد را با اطمینان طی کنید.
                            این مرکز خدمات متنوعی همچون روان‌درمانی فردی، مشاوره خانواده و زوج، درمان آنلاین، و روانپزشکی ویژه کودکان، نوجوانان، و سالمندان را فراهم آورده است.
                            با ما همراه شوید تا در کنار هم از چالش‌ها عبور کرده و به سوی آرامش و زندگی بهتر گام برداریم
                        </p>

                        <img src="https://www.uab.edu/news/images/2018/CC_10.2.jpg" className={styles.image1space} alt="Cinque Terre" width="300" height="200" />
                    </div>

                    <div align='center' className={styles.aboutusSection3}>
                        <table className={styles.tableaboutus} align='center'>
                            <tr>
                                <th><span className={styles.button1}>گروه روان پزشکان و پزشکان سلامت</span></th>
                                <th><span className={styles.button1}>گروه زوج درمانگران</span></th>
                                <th><span className={styles.button1}>گروه روان درمانگران فردی</span></th>
                                <th><span className={styles.button1}>گروه مشاوره کودک</span></th>
                            </tr>
                            <tr style={{ paddingTop: '20px' }}>
                                <th><span className={styles.button1}>واحد روان سنجی و پژوهش</span></th>
                                <th><span className={styles.button1}>گروه مشاورین تحصیلی و شغلی</span></th>
                                <th><span className={styles.button1}>گروه مشاورین پیش از ازدواج</span></th>
                                <th><span className={styles.button1}>گروه مشاوره نوجوان</span></th>
                            </tr>
                        </table>
                    </div>

                    <div className={styles.aboutusSection4}>
                        <img src="https://www.uab.edu/news/images/2018/CC_10.3.jpg" className={styles.image1space} alt="Cinque Terre" width="300" height="200" />

                        <p className={styles.paragsize2}>
                            آماده‌اید اولین گام را برای بهبود و آرامش بردارید؟
                            <br />
                            با رزرو نوبت، فرصت گفتگو با مشاوران و متخصصان مجرب ما را فراهم کنید و در مسیری به سوی سلامت روان و کیفیت بهتر زندگی قدم بگذارید.
                            همین حالا نوبت خود را رزرو کنید
                            <br />
                            <a href='/ReservationPage'>
                                <button className={styles.button2}>رزرو نوبت</button>
                            </a>
                        </p>
                    </div>
                </div>
                <Footer />
            </body>
        </>
    );
};

export default AboutUsPage;