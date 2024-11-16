const Recommendation_Question = {
    totalQuestions: 16,
    questions: [
        {
            id: 0,
            question: "فکر می‌کنید به درمانگر از چه حیطه‌ای نیاز دارید؟",
            choices: [
                { text: "فردی", answer: true, id: 0 },
                { text: "نوجوان", answer: true, id: 1 },
                { text: "کودک", answer: true, id: 2 },
                { text: "زوج", answer: true, id: 3 },
                { text: "خانواده", answer: true, id: 4 },
            ],
        },
        {
            id: 1,
            question: "ترجیح می‌دهید برگزاری جلسات‌تان چگونه باشد؟",
            choices: [
                { text: "حضوری", answer: true, id: 0 },
                { text: "مجازی", answer: true, id: 1 },
            ],
        },
        {
            id: 2,
            question: "سن شما چقدر است؟",
            choices: [
                { text: "کمتر از ۲۰", answer: true, id: 0},
                { text: "۲۰ - ۳۵", answer: true, id: 1},
                { text: "۳۶ - ۶۵", answer: true, id: 3},
                { text: "بالای ۶۶", answer: true, id: 4},
            ],
        },
        {
            id: 3,
            question: "انتظارات شما از درمانگرتان چیست؟ درمانگری که...(می‌توانید چند مورد را انتخاب کنید)",
            choices: [
                { text: "گوش دهد", answer: true, id: 0},
                { text: "گذشته من را کاوش کند", answer: true, id: 1},
                { text: "به من مهارت جدید آموزش دهد", answer: true, id: 2},
                { text: "اعتقادات مرا به چالش بکشد", answer: true, id: 3},
                { text: "به من تکلیف بدهد", answer: true, id: 4},
                { text: "راهنمایی‌ام کند که هدف هایم را مشخص کنم", answer: true, id: 5},
                { text: "فعالانه مرا چک کند", answer: true, id: 6},
                { text: "موارد دیگر", answer: true, id: 7},
                // { text: "نمیدانم", answer: true, id: 8},
            ],
        },
        {
            id: 4,
            question: "جنیست درمانگر خود را مشخص کنید.",
            choices: [
                { text: "درمانگر زن", answer: true, id: 0},
                { text: "درمانگر مرد", answer: true, id: 1},
                { text: "فرقی ندارد", answer: true, id: 2},
            ],
        },
        {
            id: 5,
            question: "ترجیح می‌دهید درمانگرتان مذهبی باشد یا غیرمذهبی؟",
            choices: [
                // { text: "درمانگر مسن", answer: true, id: 2},
                { text: "درمانگر مذهبی", answer: true, id: 0},
                { text: "درمانگر غیرمذهبی", answer: true, id: 1},
                { text: "فرقی ندارد", answer: true, id: 2},
            ],
        },
        {
            id: 6,
            question: "چگونه ترجیح می‌دهید با درمانگر خود در ارتباط باشید؟",
            choices: [
                { text: "پیام دادن", answer: true, id: 0},
                { text: "تماس تلفنی", answer: true, id: 1},
                { text: "ایمیل", answer: true, id: 2},
                { text: "به جز جلسات درمان در ارتباط نباشم", answer: true, id: 3},
            ],
        },
        {
            id: 7,
            question: "آیا در حال حاضر حملات پانیک اضطراب را تجربه می‌کنید یا هر فوبیایی دارید؟",
            choices: [
                { text: "بله", answer: true, id: 0},
                { text: "خیر", answer: true, id: 1},
            ],
        },
        {
            id: 8,
            question: "آخرین باری که به خودکشی فکر کردید چه زمانی بود؟",
            choices: [
                { text: "هیچوقت", answer: true, id: 0},
                { text: "بیش از یک سال پیش", answer: true, id: 1},
                { text: "بیش از ۳ماه پیش", answer: true, id: 2},
                { text: "بیش از یک ماه پیش", answer: true, id: 3},
                { text: "بیش از ۲هفته پیش", answer: true, id: 4},
            ],
        },
        {
            id: 9,
            question: "آیا به صورت مداوم به دیگران مشکوک می‌شوید؟",
            choices: [
                { text: "بله", answer: true, id: 0},
                { text: "خیر", answer: true, id: 1},
            ],
        },
        {
            id: 10,
            question: "مشکل تمرکز بر روی چیزهایی مانند خواندن روزنامه یا تماشای تلویزیون دارید؟",
            choices: [
                { text: "اصلا", answer: true, id: 0},
                { text: "نصف روز", answer: true, id: 1},
                { text: "تمام روز", answer: true, id: 2},
            ],
        },
        {
            id: 11,
            question: "آیا احساسات خود را نسبت به چیزهایی که دوست داشتید طی ماه های اخیر از دست داده اید؟",
            choices: [
                { text: "اغلب اوقات", answer: true, id: 0},
                { text: "بعضی اوقات", answer: true, id: 1},
                { text: "هیچوقت", answer: true, id: 2},
            ],
        },
        {
            id: 12,
            question: "آیا اخیراً رفتارهای مخربی مانند: ظلم به حیوانات، سرزنش دیگران، قلدری، رفتارهای انتقام جویانه داشته اید؟",
            choices: [
                { text: "خیلی زیاد", answer: true, id: 0},
                { text: "به ندرت", answer: true, id: 1},
                { text: "اصلا", answer: true, id: 2},
            ],
        },
        {
            id: 13,
            question: "آیا اخیراً از اختلالات خوردن رنج برده اید؟ مانند: کاهش وزن سریع، حذف وعده های غذایی، تمایل به ورزش زیاد، استفاده غیرعادی از ملین ها و بی اشتهایی غیر معمول؟",
            choices: [
                { text: "خیلی زیاد", answer: true, id: 0},
                { text: "به ندرت", answer: true, id: 1},
                { text: "اصلا", answer: true, id: 2},
            ],
        },
        {
            id: 14,
            question: "آیا اغلب فکر می کنید از همه بهتر هستید؟ آیا به مردم طوری نگاه می کنید که مدام از شما پایین ترند؟ آیا مشکلات شما بزرگتر از مشکلاتی است که دیگران دارند؟",
            choices: [
                { text: "خیلی زیاد", answer: true, id: 0},
                { text: "به ندرت", answer: true, id: 1},
                { text: "اصلا", answer: true, id: 2},
            ],
        },
        {
            id: 15,
            question: "چند مورد از گزینه های زیر در شما مشاهده میشود؟ صحبت بی وقفه، رفتار بی پروایانه، بی نظمی، ضعف در پیوسته گوش دادن، عدم تمرکز و پرت شدن حواس به آسانی، تاخیر/نامنظمی در زمان در ملاقات ها، به راحتی عصبانی شدن، نا توانی در نشستن به مدت زیاد، بی دقتی زیاد، فراموش کاری",
            choices: [
                { text: "۰", answer: true, id: 0},
                { text: "۱", answer: true, id: 1},
                { text: "۲", answer: true, id: 2},
                { text: "۳", answer: true, id: 3},
                { text: "۴", answer: true, id: 4},
                { text: "۵", answer: true, id: 5},
                { text: "۶", answer: true, id: 6},
                { text: "۷", answer: true, id: 7},
                { text: "۸", answer: true, id: 8},
                { text: "۹", answer: true, id: 9},
                { text: "۱۰", answer: true, id: 10},
            ],
        },
    ]
}

export default Recommendation_Question;