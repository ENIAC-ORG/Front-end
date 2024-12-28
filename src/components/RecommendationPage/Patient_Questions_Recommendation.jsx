const Patient_Recommendation_Question = {
    totalQuestions: 19,
    questions: [
        {
            id: 1,
            question: "سن شما چند سال است؟",
            field: "age",
            choices: [
                // { text: "اضطراب", answer: true, id: 0 },
                // { text: "افسردگی", answer: true, id: 1 },
            ],
        },
        {
            id: 2,
            question: "سطح انرژی خود را چگونه ارزیابی می‌کنید؟",
            field: "energy_level",
            choices: [
                { text: "کم", answer: true, id: 0 },
                { text: "متوسط", answer: true, id: 1 },
                { text: "زیاد", answer: true, id: 3 },
            ],
        },
        {
            id: 3,
            question: "آیا داروی خاصی مصرف می‌کنید؟ اگر بله، لطفاً نام ببرید.",
            field: "current_medications",
            choices: [
                { text: "بله", answer: true, id: 0 },
                { text: "خیر", answer: true, id: 1 },
            ],
        },
        {
            id: 4,
            question: "آیا مشکلات جسمی خاصی دارید که روی روان شما تأثیر می‌گذارد؟",
            field: "physical_issues",
            choices: [
                { text: "بله", answer: true, id: 0 },
                { text: "خیر", answer: true, id: 1 },
            ],
        },
        {
            id: 5,
            question: "چه علائمی دارید؟",
            field: "symptoms",
            choices: [
                { text: "اضطراب", answer: true, id: 0 },
                { text: "افسردگی", answer: true, id: 1 },
                { text: "مشکلات خواب", answer: true, id: 2 },
                { text: "مشکلات رفتاری", answer: true, id: 3 },
                { text: "اختلالات خوردن", answer: true, id: 4 },
                { text: "مشکلات تمرکز", answer: true, id: 5 },
                { text: "مشکلات روابط", answer: true, id: 6 },
                { text: "ترس‌ها", answer: true, id: 7 },
                { text: "پارانویا", answer: true, id: 8 },
                { text: "ADHD", answer: true, id: 9 },
                { text: "هیچ‌کدام", answer: true, id: 10 },
            ],
        },
        {
            id: 6,
            question: "آیا قبلاً درمان روانشناختی یا روان‌پزشکی انجام داده‌اید؟ اگر بله، توضیح دهید.",
            field: "past_treatments",
            choices: [
                { text: "بله", answer: true, id: 0 },
                { text: "خیر", answer: true, id: 1 },
            ],
        },
        {
            id: 7,
            question: "آخرین باری که به خودکشی فکر کردید، چه زمانی بود؟",
            field: "suicidal_thoughts",
            choices: [
                { text: "هرگز", answer: true, id: 0 },
                { text: "یک ماه پیش", answer: true, id: 1 },
                { text: "هفته گذشته", answer: true, id: 2 },
                { text: "همین حالا", answer: true, id: 3 },
            ],
        },
        {
            id: 8,
            question: "سطح استرس روزانه خود را از ۱ تا ۱۰ ارزیابی کنید.",
            field: "stress_level",
            choices: [
                // { text: "۱", answer: true, id: 0 },
                { text: "1", answer: true, id: 0 },
                { text: "۲", answer: true, id: 1 },
                { text: "۳", answer: true, id: 2 },
                { text: "۴", answer: true, id: 3 },
                { text: "۵", answer: true, id: 4 },
                { text: "۶", answer: true, id: 5 },
                { text: "۷", answer: true, id: 6 },
                { text: "۸", answer: true, id: 7 },
                { text: "۹", answer: true, id: 8 },
                { text: "۱۰", answer: true, id: 9 },
            ],
        },
        {
            id: 9,
            question: "به طور متوسط چند ساعت در شبانه‌روز می‌خوابید؟",
            field: "sleep_hours",
            choices: [
                // { text: "اغلب اوقات", answer: true, id: 0},
                // { text: "بعضی اوقات", answer: true, id: 1},
                // { text: "هیچوقت", answer: true, id: 2},
            ],
        },
        {
            id: 10,
            question: "آیا به طور منظم در فعالیت‌های اجتماعی یا گروهی شرکت می‌کنید؟",
            field: "social_activities",
            choices: [
                { text: "بله", answer: true, id: 0 },
                { text: "خیر", answer: true, id: 1 },
            ],
        },
        {
            id: 11,
            question: "چقدر از حمایت اجتماعی و عاطفی اطرافیان خود برخوردار هستید؟",
            field: "support_system",
            choices: [
                { text: "کم", answer: true, id: 0 },
                { text: "متوسط", answer: true, id: 1 },
                { text: "زیاد", answer: true, id: 3 },
            ],
        },
        {
            id: 12,
            question: "مدت زمان درمان مورد انتظار شما چیست؟",
            field: "treatment_duration",
            choices: [
                { text: "کوتاه‌مدت", answer: true, id: 0 },
                { text: "بلندمدت", answer: true, id: 1 },
            ],
        },
        {
            id: 13,
            question: "آیا شما خود را مذهبی می‌دانید؟",
            field: "religion_preference",
            choices: [
                { text: "مذهبی", answer: true, id: 0 },
                { text: "غیرمذهبی", answer: true, id: 1 },
                { text: "فرقی نمی‌کند", answer: true, id: 2 },
            ],
        },
        {
            id: 14,
            question: "ترجیح شما برای جنسیت درمانگر چیست؟",
            field: "therapist_gender_preference",
            choices: [
                { text: "زن", answer: true, id: 0 },
                { text: "مرد", answer: true, id: 1 },
                { text: "فرقی نمی‌کند", answer: true, id: 2 },
            ],
        },
        {
            id: 15,
            question: "ترجیح شما برای نوع جلسات چیست؟",
            field: "presentation_preference",
            choices: [
                { text: "حضوری", answer: true, id: 0 },
                { text: "مجازی", answer: true, id: 1 },
                { text: "فرقی نمی‌کند", answer: true, id: 2 },
            ],
        },
        {
            id: 16,
            question: "چه روش‌های درمانی را ترجیح می‌دهید؟ (لیستی از روش‌ها را وارد کنید)",
            field: "preferred_therapy_methods",
            choices: [
                { text: "درمان شناختی-رفتاری (CBT)", answer: true, id: 0 },
                { text: "آگاهی‌حاضر (Mindfulness)", answer: true, id: 1 },
                { text: "درمان خانواده", answer: true, id: 3 },
                { text: "درمان روان‌تحلیلی", answer: true, id: 4 },
                { text: "درمان هنری", answer: true, id: 5 },
                { text: "درمان گروهی", answer: true, id: 6 },
            ],
        },
        {
            id: 17,
            question: "چه روش‌هایی را برای ارتباط با درمانگر خود ترجیح می‌دهید؟",
            field: "communication_preference",
            choices: [
                { text: "تماس تلفنی", answer: true, id: 0 },
                { text: "ایمیل", answer: true, id: 1 },
                { text: "پیام‌رسانی", answer: true, id: 2 },
            ],
        },
        {
            id: 18,
            question: "چه انتظاری از درمانگر خود دارید؟",
            field: "expectations",
            choices: [
                { text: "گوش دهد", answer: true, id: 0 },
                { text: "گذشته من را کاوش کند", answer: true, id: 1 },
                { text: "به من مهارت جدید آموزش دهد", answer: true, id: 2 },
                { text: "اعتقادات مرا به چالش بکشد", answer: true, id: 3 },
                { text: "به من تکلیف بدهد", answer: true, id: 4 },
                { text: "راهنمایی‌ام کند که هدف هایم را مشخص کنم", answer: true, id: 5 },
                { text: "فعالانه مرا چک کند", answer: true, id: 6 },
                // { text: "موارد دیگر", answer: true, id: 7 },
            ],
        },
        {
            id: 19,
            question: "هر توضیح دیگری که می‌تواند کمک کند، در اینجا وارد کنید.",
            field: "additional_notes",
            choices: [
                // { text: "خیلی زیاد", answer: true, id: 0},
                // { text: "به ندرت", answer: true, id: 1},
                // { text: "اصلا", answer: true, id: 2},
            ],
        },
    ]
}

export default Patient_Recommendation_Question;