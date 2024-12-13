const MBTI = {
    totalQuestions: 70,
    questions: [
        {
            id: 0,
            question: "این تست دارای ۷۰ سوال است. در پاسخ به سوالات، گزینه‌ای را انتخاب کنید که به شخصیت واقعی شما نزدیک‌‌تر است، نه ویژگی‌هایی که می‌خواهید داشته باشید. پاسخ درست یا غلط وجود ندارد. به تمامی سوالات با دقت پاسخ دهید.",
            choices: [],
        },
        {
            id: 1,
            question:"وقتی در یک مهمانی هستید:",
            choices: [
                { text: "با تعداد زیادی از افراد، از جمله غریبه‌ها ارتباط می‌گیرید.", answer: true, id: 0},
                { text: "با تعداد کمی از افرادی که می‌شناسید تعامل می‌کنید.", answer: true, id: 1},
            ],
        },
        {
            id: 2,
            question: "کدام عبارت توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "بیشتر بر اساس حقایق تصمیم می‌گیرم تا بر اساس فرضیات ذهنی خودم.", answer: true, id: 0},
                { text: "بیشتر بر اساس فرضیات ذهنی خودم تصمیم می‌گیرم تا بر اساس حقایق.", answer: true, id: 1},
            ],
        },
        {
            id: 3,
            question: "من بیشتر:",
            choices: [
                { text: "رویا پرداز هستم و دوست ندارم درگیر تکرار و روزمرگی شوم.", answer: true, id: 0},
                { text: "کمتر رویا پردازی می‌کنم و درگیر روزمرگی هستم.", answer: true, id: 1},
            ],
        },
        {
            id: 4,
            question: "بیشتر تحت تاثیر کدام مورد هستید؟",
            choices: [
                { text: "اصول و قواعد", answer: true, id: 0},
                { text: "احساسات", answer: true, id: 1},
            ],
        },
        {
            id: 5,
            question: "بیشتر به کدام مورد کشیده می‌شوید؟",
            choices: [
                { text: "چیزهای قانع کننده", answer: true, id: 0},
                { text: "چیزهای تاثیرگذار و احساسی", answer: true, id: 1},
            ],
        },
        {
            id: 6,
            question: "کدام عبارت توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "من اهل برنامه ریزی هستم.", answer: true, id: 0},
                { text: "دوست دارم کارهایم را بدون تعهد به برنامه ریزی انجام بدهم.", answer: true, id: 1},
            ],
        },
        {
            id: 7,
            question: "کدام عبارت در مورد شما درست است؟",
            choices: [
                { text: "با احتیاط انتخاب کنید.", answer: true, id: 0},
                { text: "چیزی را بدون فکر کردن انتخاب کنید", answer: true, id: 1},
            ],
        },
        {
            id: 8,
            question: "در مهمانی‌ها:",
            choices: [
                { text: "تا دیر وقت می‌مانید و انرژیتان به مرور بیشتر می‌شود.", answer: true, id: 0},
                { text: "انرژیتان به مرور کم شده و زود مهمانی را ترک می‌کنید.", answer: true, id: 1},
            ],
        },
        {
            id: 9,
            question: "بیشتر جذب کدام دسته از آدم‌ها می‌شوید؟",
            choices: [
                { text: "منطقی و فهیم", answer: true, id: 0},
                { text: "خلاق و مبتکر", answer: true, id: 1},
            ],
        },
        {
            id: 10,
            question: "کدام مورد برای شما جالب‌تر است؟",
            choices: [
                { text: "حقایق حال حاضر اطراف‌تان چه هستند.", answer: true, id: 0},
                { text:"احتمالات ممکن اطراف‌تان چه می‌توانند باشند.", answer: true, id: 1},
            ],
        },
        {
            id: 11,
            question: "کدام مورد بیشتر در قضاوت شما از دیگران تاثیرگذار است؟",
            choices: [
                { text: "بیشتر به این فکر می‌کنید قوانین حاکم چه هستند تا شرایط خاص آن فرد.", answer: true, id: 0},
                { text: "بیشتر به شرایط خاص آن فرد فکر می‌کنید تا قوانین .", answer: true, id: 1},
            ],
        },
        {
            id: 12,
            question: "در برخورد با دیگران، تمایل دارید که تا حدودی:",
            choices: [
                { text: "بی‌طرف و منطقی باشید.", answer: true, id: 0},
                { text: "احساسی و شخصی باشید.", answer: true, id: 1},
            ],
        },
        {
            /* not sure about the translation */
            id: 13,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "من انسان بسیار وقت شناسی هستم.", answer: true, id: 0},
                { text: "معمولا برای رسیدن به کارها و قرار هایم کمتر به وقت توجه می‌کنم.", answer: true, id: 1},
            ],
        },
        {
            id: 14,
            question: "کدام شرایط برای شما آزاردهنده‌تر است؟",
            choices: [
                { text: "کارهای ناتمام زیادی داشته باشید.", answer: true, id: 0},
                { text: "کارهای به اتمام رسیده بیشتری داشته باشید.", answer: true, id: 1},
            ],
        },
        {
            id: 15,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "در گروه‌های اجتماعی پیگیر حواشی مرتبط با دیگران هستید.", answer: true, id: 0},
                { text: "در گروه‌های اجتماعی، پیگیر اخبار و حواشی اطرافتان نیستید.", answer: true, id: 1},
            ],
        },
        {
            id: 16,
            question: "در انجام کارهای معمولی و روزمره:",
            choices: [
                { text: "ترجیح می‌دهید آنها را به روش معمول و مانند روش اکثریت انجام دهید.", answer: true, id: 0},
                { text: "ترجیح می‌دهید به روش خودتان آنها را انجام دهید.", answer: true, id: 1},
            ],
        },
        {
            id: 17,
            question: "از نظر من نویسنده‌ها باید:",
            choices: [
                { text: "وقایع را همان گونه که هستند توصیف کنند.", answer: true, id: 0},
                { text: "توضیحات را با تمثیل و استعارات بیان کنند.", answer: true, id: 1},
            ],
        },
        {
            id: 18,
            question: "کدام مورد در روابط‌تان برای شما مهم‌تر است؟",
            choices: [
                { text: "ثبات و پایبندی به عقاید خود", answer: true, id: 0},
                { text: "توجه به ظرافت‌ها و بالا و پایین‌های شخصیتی افراد در روابط", answer: true, id: 1},
            ],
        },
        {
            id: 19,
            question: "کدام مورد برای شما راحت‌تراست؟",
            choices: [
                { text: "قضاوت بر اساس عقل و منطق", answer: true, id: 0},
                { text: "قضاوت بر اساس ارزش‌ها", answer: true, id: 1},
            ],
        },
        {
            id: 20,
            question: "کدام چیزها برای شما جذاب‌تر است؟",
            choices: [
                { text: "مسائل قطعی و حل شده", answer: true, id: 0},
                { text: "مسائلی که قطعیت کمتری دارند و حل نشده‌اند", answer: true, id: 1},
            ],
        },
        {
            id: 21,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "جدی و مصمم هستم.", answer: true, id: 0},
                { text: "آسان‌‌گیر هستم.", answer: true, id: 1},
            ],
        },
        {
            id: 22,
            question: "قبل از تماس تلفنی:",
            choices: [
                { text: "از قبل به جملاتم  فکر می‌کنم.", answer: true, id: 0},
                { text: "از قبل جملات مد نظرم را تکرار و تمرین می‌کنم.", answer: true, id: 1},
            ],
        },
        {
            id: 23,
            question: "حقایق:",
            choices: [
                { text: "خودشان گویای همه چیز هستند.", answer: true, id: 0},
                { text: "اصول را توضیح می‌دهند.", answer: true, id: 1},
            ],
        },
        {
            id: 24,
            question: "از نظر من انسان‌های رویاپرداز:",
            choices: [
                { text: "آزاردهنده هستند.", answer: true, id: 0},
                { text: "جالب و هیجان‌انگیز هستند.", answer: true, id: 1},
            ],
        },
        {
            id: 25,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "آرام و خونسرد هستید.", answer: true, id: 0},
                { text: "هیجانی و خونگرم هستید.", answer: true, id: 1},
            ],
        },
        {
            id: 26,
            question: "کدام گزینه بدتر است؟",
            choices: [
                { text: "بی عدالتی", answer: true, id: 0},
                { text: "بی رحمی", answer: true, id: 1},
            ],
        },
        {
            id: 27,
            question: "آیا رویدادها باید:",
            choices: [
                { text: "با انتخاب دقیق رخ دهند.", answer: true, id: 0},
                { text: "به صورت تصادفی و شانسی رخ دهند.", answer: true, id: 1},
            ],
        },
        {
            id: 28,
            question: "کدام گزینه به شما حس بهتری می‌دهد؟",
            choices: [
                { text: "خرید کردن", answer: true, id: 0},
                { text: "داشتن گزینه برای خرید", answer: true, id: 1},
            ],
        },
        {
            id: 29,
            question: "در جمع دیگران:",
            choices: [
                { text: "شما صحبت را شروع می‌کنید.", answer: true, id: 0},
                { text: "منتظر می‌مانید تا دیگران با شما صحبت را شروع کنند.", answer: true, id: 1},
            ],
        },
        {
            id: 30,
            question: "کدام مورد درست است؟",
            choices: [
                { text: "عقل سلیم به ندرت اشتباه می‌کند.", answer: true, id: 0},
                { text: "به وفور اشتباه می‌کند.", answer: true, id: 1},
            ],
        },
        ///////////////////////////////////////////////////////////////////
        {
            id: 31,
            question: "کودکان اغلب:",
            choices: [
                { text: "به اندازه کافی عاقلانه رفتار نمی‌کنند.", answer: true, id: 0},
                { text: "به اندازه کافی از تخیل خود استفاده نمی‌کنند", answer: true, id: 1},
            ],
        },
        {
            id: 32,
            question: "در تصمیم‌گیری با کدام یک بیشتر احساس راحتی می‌کنید؟",
            choices: [
                { text: "تصمیم‌گیری بر اساس استانداردها", answer: true, id: 0},
                { text: "تصمیم‌گیری بر اساس احساسات", answer: true, id: 1},
            ],
        },
        {
            id: 33,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "بیشتر قاطع هستید تا مهربان.", answer: true, id: 0},
                { text: "بیشتر مهربان هستید تا قاطع.", answer: true, id: 1},
            ],
        },
        
        {
            id: 34,
            question: "کدام یک بیشتر تحسین‌برانگیز است؟",
            choices: [
                { text: "توانایی سازماندهی و منظم بودن", answer: true, id: 0},
                { text: "توانایی تطبیق و کنار آمدن", answer: true, id: 1},
            ],
        },
        {
            id: 35,
            question: "برای کدام یگ بیشتر ارزش می‌گذارید؟",
            choices: [
                { text: "ثبات و پایداری", answer: true, id: 0},
                { text: "ذهن باز و انعطاف‌پذیری", answer: true, id: 1},
            ],
        },
        {
            id: 36,
            question: "یا تعامل جدید و غیر معمول با دیگران:",
            choices: [
                { text: "شما را تحریک و انرژی می‌بخشد.", answer: true, id: 0},
                { text: "از توان شما می‌کاهد.", answer: true, id: 1},
            ],
        },
        {
            id: 37,
            question: "شما بیشتر:",
            choices: [
                { text: "فردی عملی هستید.", answer: true, id: 0},
                { text: "فردی خیالی هستید.", answer: true, id: 1},
            ],
        },
        {
            id: 38,
            question: "آیا بیشتر احتمال دارد که:",
            choices: [
                { text: "ببینید دیگران چگونه مفید هستند.", answer: true, id: 0},
                { text: "ببینید دیگران چگونه فکر می‌کنند", answer: true, id: 1},
            ],
        },
        {
            id: 39,
            question: "کدام یک رضایت‌بخش‌تر است؟",
            choices: [
                { text: "بحث و بررسی کامل یک موضوع", answer: true, id: 0},
                { text: "رسیدن به توافق در مورد یک موضوع", answer: true, id: 1},
            ],
        },
        {
            id: 40,
            question: "کدام یک بیشتر بر شما حاکم است؟",
            choices: [
                { text: "عقل شما", answer: true, id: 0},
                { text: "قلب شما", answer: true, id: 1},
            ],
        },
        {
            id: 41,
            question: "با کدام کار راحت‌تر هستید؟",
            choices: [
                { text: "قراردادی است راحت‌تر هستید.", answer: true, id: 0},
                { text: "به صورت غیررسمی انجام می‌شود راحت‌تر هستید", answer: true, id: 1},
            ],
        },
        
        {
            id: 42,
            question: "به کدام وقایع علاقه بیشتری دارید؟",
            choices: [
                { text: "چیزهای منظم", answer: true, id: 0},
                { text:"هر چیزی که پیش بیاید", answer: true, id: 1},
            ],
        },
        {
            id: 43,
            question: "کدام مورد را ترجیح می‌دهید؟",
            choices: [
                { text: "دوستان زیاد با ارتباط کوتاه‌مدت داشته باشید", answer: true, id: 0},
                { text: "چند دوست با ارتباط طولانی‌مدت داشته باشید", answer: true, id: 1},
            ],
        },
        {
            id: 44,
            question: "بیشتر بر کدام اساس تصمیم می‌گیرید؟",
            choices: [
                { text: "حقایق", answer: true, id: 0},
                { text: "اصول", answer: true, id: 1},
            ],
        },
        {
            id: 45,
            question: "بیشتر به کدام علاقه‌مند هستید؟",
            choices: [
                { text: "تولید و توزیع ", answer: true, id: 0},
                { text: "طراحی و تحقیق", answer: true, id: 1},
            ],
        },
        {
            id: 46,
            question: "از نظر شما کدام یک بیشتر تعریف محسوب می‌شود؟",
            choices: [
                { text: "\"این فرد بسیار منطقی است.\"", answer: true, id: 0},
                { text: "\"این فرد بسیار احساساتی است.\"", answer: true, id: 1},
            ],
        },
        {
            id: 47,
            question: "کدام گزینه برای شما یک ارزش است؟",
            choices: [
                { text: "ثابت قدم بودن", answer: true, id: 0},
                { text: "وفادار بودن", answer: true, id: 1},
            ],
        },
        {
            id: 48,
            question: "کدام گزینه را ترجیح می‌دهید؟",
            choices: [
                { text: "بیان نهایی و تغییرناپذیر", answer: true, id: 0},
                { text: "بیان موقت و مقدماتی", answer: true, id: 1},
            ],
        },
        {
            id: 49,
            question: "کدام زمان حس بهتری دارید؟",
            choices: [
                { text: "پس از تصمیم‌گیری", answer: true, id: 0},
                { text: "قبل از تصمیم‌گیری", answer: true, id: 1},
            ],
        },
        
        {
            id: 50,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "به راحتی و با طولانی با غریبه‌ها صحبت می‌کنید.", answer: true, id: 0},
                { text: "چیز زیادی برای گفتن به غریبه‌ها ندارید.", answer: true, id: 1},
            ],
        },
        {
            id: 51,
            question: "بیشتر به کدام اعتماد دارید؟",
            choices: [
                { text: "تجربۀ خود", answer: true, id: 0},
                { text: "حدس خود", answer: true, id: 1},
            ],
        },
        {
            id: 52,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "بیشتر عملی هستید تا مبتکر.", answer: true, id: 0},
                { text: "بیشتر مبتکر هستید تا عملی.", answer: true, id: 1},
            ],
        },
        {
            id: 53,
            question: "کدام شخص بیشتر مستحق تحسین است؟",
            choices: [
                { text: "فردی با استدلال روشن", answer: true, id: 0},
                { text: "فردی با احساس قوی", answer: true, id: 1},
            ],
        },
        {
            id: 54,
            question: "آیا بیشتر تمایل دارید:",
            choices: [
                { text: "منصف باشید.", answer: true, id: 0},
                { text: "همدل باشید.", answer: true, id: 1},
            ],
        },
        {
            id: 55,
            question: "کدام گزینه را ترجیح می‌دهید؟",
            choices: [
                { text: "مطمئن شوید که همه چیز مرتب شده است.", answer: true, id: 0},
                { text: "بگذارید اتفاق‌ها به خودی خود رخ دهند.", answer: true, id: 1},
            ],
        },
        {
            id: 56,
            question: "در روابط آیا باید:",
            choices: [
                { text: "بیشتر چیزها قابل مذاکره مجدد باشند.", answer: true, id: 0},
                { text: "بیشتر چیزها تصادفی و وابسته به شرایط باشند.", answer: true, id: 1},
            ],
        },
        {
            id: 57,
            question: "وقتی تلفن زنگ می‌زند، آیا:",
            choices: [
                { text: "سریع می‌روید تا اول پاسخ دهید.", answer: true, id: 0},
                { text: "امیدوارید کسی دیگر پاسخ دهد.", answer: true, id: 1},
            ],
        },
        
        {
            id: 58,
            question: "کدام گزینه برای شما ارزشمندتر است؟",
            choices: [
                { text: "حس قوی از واقعیت", answer: true, id: 0},
                { text: "تخیل زنده و پویا", answer: true, id: 1},
            ],
        },
        {
            id: 59,
            question: "بیشتر به کدام مورد جذب می‌شوید؟",
            choices: [
                { text: "اصول اساسی", answer: true, id: 0},
                { text: "جزئیات و جوانب", answer: true, id: 1},
            ],
        },
        {
            id: 60,
            question: "کدام خطا بزرگتر به نظر می‌رسد؟",
            choices: [
                { text: "بیش از حد پرشور بودن", answer: true, id: 0},
                { text: "بیش از حد عینی بودن", answer: true, id: 1},
            ],
        }, 
        {
            id: 61,
            question: "خود را اساساً چگونه می‌بینید؟",
            choices: [
                { text: "منطقی و سرسخت", answer: true, id: 0},
                { text: "مهربان و دلسوز", answer: true, id: 1},
            ],
        },
        {
            id: 62,
            question: "کدام وضعیت بیشتر برای شما جذاب است؟",
            choices: [
                { text: "ساختار یافته و برنامه‌ریزی شده ", answer: true, id: 0},
                { text: "بدون ساختار و بدون برنامه‌ریزی", answer: true, id: 1},
            ],
        },
        {
            id: 63,
            question: "کدام گزینه توصیف دقیق‌تری از شماست؟",
            choices: [
                { text: "روتین و منظم هستید تا اهل هوس.", answer: true, id: 0},
                { text: "اهل هوس هستید تا روتین و منظم.", answer: true, id: 1},
            ],
        },
        {
            id: 64,
            question: "آیا بیشتر تمایل دارید که دیگران:",
            choices: [
                { text: "راحت به شما نزدیک شوند.", answer: true, id: 0},
                { text: "کمی محتاط باشند.", answer: true, id: 1},
            ],
        },
        {
            id: 65,
            question: "در نوشته‌ها آیا ترجیح می‌دهید که:",
            choices: [
                { text: "معانی بیشتر تحت‌اللفظی استفاده کنید.", answer: true, id: 0},
                { text: "معانی بیشتر مجازی و تشبیهی استفاده کنید.", answer: true, id: 1},
            ],
        },
        {
            id: 66,
            question: "کدام گزینه برای شما سخت‌تر است؟",
            choices: [
                { text: "با دیگران همدلی کنید.", answer: true, id: 0},
                { text:"از دیگران استفاده کنید.", answer: true, id: 1},
            ],
        },
        {
            id: 67,
            question: "کدام را بیشتر برای خودتان آرزو می‌کنید؟",
            choices: [
                { text: "قدرت استدلال", answer: true, id: 0},
                { text: "قدرت همدلی", answer: true, id: 1},
            ],
        },
        
        {
            id: 68,
            question: "از نظر شما کدام نقص بزرگتری است؟",
            choices: [
                { text:"بی‌تمایز بودن", answer: true, id: 0},
                { text: "انتقادی بودن", answer: true, id: 1},
            ],
        },
        {
            id: 69,
            question: "کدام گزینه را ترجیح می‌دهید؟",
            choices: [
                { text: "رویداد برنامه‌ریزی شده داشته باشید.", answer: true, id: 0},
                { text: "رویداد بدون برنامه داشته باشید.", answer: true, id: 1},
            ],
        },
        {
            id: 70,
            question: "آیا تمایل دارید بیشتر:",
            choices: [
                { text: "سنجیده باشید تا خودجوش", answer: true, id: 0},
                { text:"خودجوش باشید تا سنجیده", answer: true, id: 1},
            ],
        }, 
    ]
}

export default MBTI;