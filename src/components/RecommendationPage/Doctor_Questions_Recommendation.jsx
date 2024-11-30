const Doctor_Recommendation_Question = {
    totalQuestions: 16,
    questions: [
        {
            id: 0,
            question: "ترجیح شما برای نحوه حضور در جلسات درمانی چیست؟",
            choices: [
                { text: "حضوری", answer: true, id: 0 },
                { text: "مجازی", answer: true, id: 1 },
            ],
        },
        {
            id: 1,
            question: "بیشتر بیماران تحت نظر شما در چه رده سنی قرار دارند؟",
            choices: [
                { text: "کودک", answer: true, id: 0 },
                { text: "نوجوان", answer: true, id: 1 },
                { text: "جوان", answer: true, id: 2 },
                { text: "بزرگسال", answer: true, id: 3 },
                { text: "مسن", answer: true, id: 4 },
                { text: "فرقی ندارد", answer: true, id: 5 },
            ],
        },
        {
            id: 2,
            question: "چه انتظاراتی از سوی بیماران قابل پاسخ‌گویی توسط شما است؟",
            choices: [
                { text: "گوش دادن به صحبت", answer: true, id: 0 },
                { text: "علت یابی مشکل ها در گذشته اش", answer: true, id: 1 },
                { text: "آموزش مهارت های جدید", answer: true, id: 2 },
                { text: "عوض کردن اعتقادات اسیب رسان", answer: true, id: 3 },
                { text: "تکلیف داده به بیمار", answer: true, id: 4 },
                { text: "راهنمایی برای انتخاب اهداف", answer: true, id: 5 },
                { text: "چک کردن فعالانه بیمار", answer: true, id: 6 },
                { text: "موارد دیگر", answer: true, id: 7 },
            ],
        },
        {
            id: 3,
            question: "آیا مذهبی هستید؟",
            choices: [
                { text: "بله", answer: true, id: 0},
                { text: "خیر", answer: true, id: 1},
            ],
        },
        {
            id: 4,
            question: " از میان بیماری های شایع زیر کدام در حیطه تخصص شما قرار دارد ؟ ",
            choices: [
                { text: "فوبیا", answer: true, id: 0 },
                { text: "اضطراب", answer: true, id: 1 },
                { text: "خودکشی", answer: true, id: 2 },
                { text: "پارانویا", answer: true, id: 3 },
                { text: "افسردگی", answer: true, id: 4 },
                { text: "اختلال غذا خوردن", answer: true, id: 5 },
                { text: "اگوسیم", answer: true, id: 6 },
                { text: "ADHD", answer: true, id: 7 },
                { text: "رفتار مخرب و اختلالات غیراجتماعی", answer: true, id: 8 },
                { text: "عدم تمرکز", answer: true, id: 9 },
                { text: "پنیک", answer: true, id: 10 },
                { text: "موارد دیگر", answer: true, id: 11 },

            ],
        },
        {
            id: 5,
            question: "چگونه ترجیح می دهید با بیمار خود خارج از جلسات در ارتباط باشید؟",
            choices: [
                { text: "پیام دادن", answer: true, id: 0},
                { text: "تماس تلفنی", answer: true, id: 1},
                { text: "ایمیل", answer: true, id: 2},
                { text: "خارج از جلسات درمانی در اتباط  نباشم", answer: true, id: 2},
            ],
        },
    ]
}

export default Doctor_Recommendation_Question;