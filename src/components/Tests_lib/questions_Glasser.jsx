const Glasser = {
    totalQuestions: 25,
    questions: [
        {
            id: 0,
            question: "این تست دارای ۲۵ سوال است. برای هر عبارت، به آن میزانی که به آن مورد نیاز دارید یا با آن موافق هستید از ۱ تا ۵ امتیاز دهید (۱ کمترین میزان نیاز یا موافقت و ۵ بیشترین میزان نیاز یا موافقت را نشان می‌دهد). به تمامی سوالات با دقت پاسخ دهید.",
            choices: [],
        },
        {
            id: 1,
            question: "احساس می‌کنید به چه میزان عشق، صمیمیت و مهرورزی نیاز دارید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "love",
        },
        {
            id: 2,
            question: "مسائلی مانند پس‌انداز، مخارج زندگی، مسکن، آینده شغلی و نظایر آنها تا چه اندازه ذهن شما را به خود مشغول می‌دارد؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "survive"
        },
        {
            id: 3,
            question: "تا چه اندازه نیاز دارید که تمام چیزهایی را که انجام می‌دهید خودتان انتخاب کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "freedom",
        },
        {
            id: 4,
            question: "تا چه اندازه تلاش می‌کنید در زمینۀ کار خود به عنوان یک فرد توانمند و با لیاقت خود را نشان داده و شناخته شوید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "power",
        },
        {
            id: 5,
            question: "چقدر به شوخی، مزاح و لطیفه‌گویی نیازمندید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "fun",
        },
        {
            id: 6,
            question: "تا چه اندازه رفاه و سعادت انسان‌های دیگر برایتان مهم است؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "love"
        },
        {
            id: 7,
            question: "تا چه اندازه به سلامت جسمانی، بهداشت و احتمال ابتلا به بیماری فکر می‌کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "survive"
        },
        {
            id: 8,
            question: "تا چه میزان اعتقاد دارید که هیچ کس نباید به شما بگوید که چگونه زندگی خود را اداره کنید (بگوید چه بکنید و چه نکنید)؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "freedom"
        },
        {
            id: 9,
            question: "تا چه اندازه دوست دارید که به دیگران دستور بدهید؟ (فرمان بدهید تا اینکه فرمان بگیرید)؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "power"
        },
        {
            id: 10,
            question: "تا چه میزان به اوقات فراغت و سرگرمی‌های مخصوص به خودتان نیاز دارید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "fun"
        },
        {
            id: 11,
            question: "چه مقدار نیاز دارید که دیگران شما را پذیرفته و دوستتان بدارند؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "love"
        },
        {
            id: 12,
            question: "شدت میل جنسی خود را چگونه ارزیابی می‌کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "survive"
        },
        {
            id: 13,
            question: "تا چه میزان تمایل دارید آن چه را که می‌خواهید بدون توجه به دخالت‌ها و فشارهای همسرتان یا شریک‌تان حتما به انجام رسانید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "freedom"
        },
        {
            id: 14,
            question: "فکر می‌کنید تا چه اندازه اهل پیشرفت و رقابت هستید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "power"
        },
        {
            id: 15,
            question: "میزان شوخ‌طبعی و خوش‌مشربی خود را چگونه ارزیابی می‌کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "fun"
        },
        {
            id: 16,
            question: "چه مقدار نیاز دارید که دیگران شما را مورد لطف و مهر و محبت قرار داده و شما نیز متقابلا به آنها محبت کنید و به آنها احساس تعلق  خاطر نمایید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "love"
        },
        {
            id: 17,
            question: "در انجام کارها و اقدامات مخاطره‌آمیز تا چه اندازه محتاطانه عمل می‌کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "survive"
        },
        {
            id: 18,
            question: "تا چه میزان اصرار دارید در تصمیم‌گیری های بزرگ و کوچک زندگی استقلال رأی داشته باشید و بر وفق مراد خود عمل کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "freedom"
        },
        {
            id: 19,
            question: "تا چه اندازه دوست دارید که دیگران (اعم از فرزند، همسر یا دوستان‌تان) به حرف شما گوش دهند و از آن پیروی کنند؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "power"
        },
        {
            id: 20,
            question: "تا چه میزان احساس می‌کنید که نیاز دارید به کارهای غیرجدی و غیررسمی (مانند دوچرخه‌سواری) ماهیگیری تماشای فیلم و دیگر سرگرمی‌های لذت‌بخش بپردازید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "fun"
        },
        {
            id: 21,
            question: "چه اندازه دوست دارید که با دیگران بجوشید و در مجالس، مراسم و فعالیت‌های گروهی فعالانه شرکت کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "love"
        },
        {
            id: 22,
            question: "از روبرویی با تجارب جدید و شروع راه‌های ناشناخته تا چه اندازه اجتناب می‌کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "survive"
        },
        {
            id: 23,
            question: "دیگران زمان‌هایی را برای خودتان در اختیار داشته باشید که هر گونه دل‌تان می‌خواهد از آن استفاده کنید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "freedom"
        },
        {
            id: 24,
            question: "تا چه اندازه تلاش می‌کنید تا ثابت کنید ایده، فکر یا راه شما درست است و اصرار دارید که دیگران را متقاعد کنید که آن را قبول کنند؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "power"
        },
        {
            id: 25,
            question: "تا چه اندازه به دنبال اوقات سرگرم‌کننده و موقعیت‌های شادی‌بخش مانند جشن‌ها، مهمانی‌ها، مراسم سرگرم‌کننده، بازی‌ها و نظایر آنها اید؟",
            choices: [
                { text: "۱", answer: true, id: 0},
                { text: "۲", answer: true, id: 1},
                { text: "۳", answer: true, id: 2},
                { text: "۴", answer: true, id: 3},
                { text: "۵", answer: true, id: 4},
            ],
            category: "fun"
        }
    ]
}

export default Glasser;