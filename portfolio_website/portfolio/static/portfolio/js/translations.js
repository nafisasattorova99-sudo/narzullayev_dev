/* ==========================================================================
   translations.js
   Client-side i18n for UZ / EN / RU. No reload, persists via localStorage.
   ========================================================================== */

const TRANSLATIONS = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.cta": "Let's talk",

    "hero.kicker": "Available for freelance work",
    "hero.greeting": "Hi, I'm Abdulhaq",
    "hero.role1": "Junior Full-Stack Developer",
    "hero.role2": "Django Backend Developer",
    "hero.role3": "REST API Builder",
    "hero.role4": "Problem Solver",
    "hero.description": "I build clean, reliable web applications — from Django backends and REST APIs to fast, responsive interfaces. Currently taking on new freelance projects.",
    "hero.btnProjects": "View My Projects",
    "hero.btnContact": "Let's Work Together",
    "hero.statProjects": "Projects shipped",
    "hero.statTech": "Technologies",
    "hero.statCommits": "Commits this year",

    "about.kicker": "About me",
    "about.title": "Turning ideas into working software",
    "about.p1": "I'm Abdulhaq, a junior full-stack developer focused on Python and Django on the backend, and clean, responsive interfaces on the front end. I like taking a project from a rough idea to something people can actually click through and use.",
    "about.p2": "I'm early in my career, but I treat every project — big or small — like it matters, because to the person who hired me, it does. Clear communication, realistic timelines, and code I'm not embarrassed to hand over.",
    "about.point1Title": "Backend-first thinking",
    "about.point1Text": "Solid data models and clean APIs before a single pixel is styled.",
    "about.point2Title": "Detail-oriented UI",
    "about.point2Text": "Interfaces that feel considered, responsive, and fast.",
    "about.point3Title": "Honest communication",
    "about.point3Text": "You'll always know exactly where your project stands.",
    "about.download": "Hire Me",

    "skills.kicker": "What I work with",
    "skills.title": "Skills & Tools",
    "skills.subtitle": "The stack I use to take a project from idea to deployment.",
    "skills.catFrontend": "Frontend",
    "skills.catBackend": "Backend",
    "skills.catTools": "Tools & Workflow",

    "projects.kicker": "Selected work",
    "projects.title": "Projects",
    "projects.subtitle": "A few things I've built recently — real code, real problems solved.",
    "projects.filterAll": "All",
    "projects.filterDjango": "Django",
    "projects.filterApi": "API",
    "projects.filterFrontend": "Frontend",
    "projects.btnDemo": "Open Live Demo",
    "projects.btnCode": "Source Code",

    "project1.title": "Django Blog",
    "project1.desc": "A full-featured blogging platform with authentication, rich-text posts, comments, categories and an admin dashboard for content management.",
    "project2.title": "Todo REST API",
    "project2.desc": "A token-authenticated REST API for managing tasks, built with Django REST Framework, featuring filtering, pagination and full test coverage.",
    "project3.title": "AI Study Website",
    "project3.desc": "A study companion platform that generates quizzes and summaries from lecture notes, with a Django backend and a fast, distraction-free interface.",
    "project4.title": "Business Website",
    "project4.desc": "A responsive marketing website for a local business, with a Django-powered content backend so the client can update pages without touching code.",

    "services.kicker": "How I can help",
    "services.title": "Services",
    "services.subtitle": "Practical web development, scoped clearly and delivered on time.",
    "service1.title": "Website Development",
    "service1.desc": "Full websites built from scratch — planned, designed and coded to fit your business.",
    "service2.title": "Landing Pages",
    "service2.desc": "Fast, focused landing pages designed to convert visitors into customers.",
    "service3.title": "Django Development",
    "service3.desc": "Robust backends, admin panels and data models built with Python and Django.",
    "service4.title": "REST API",
    "service4.desc": "Clean, documented APIs that connect your app to mobile clients, partners or frontends.",
    "service5.title": "Responsive Websites",
    "service5.desc": "Interfaces that work beautifully on phones, tablets and desktops alike.",
    "services.cta": "Start a project",

    "contact.kicker": "Get in touch",
    "contact.title": "Let's build something together",
    "contact.subtitle": "Have a project in mind? Send a few details and I'll reply within a day.",
    "contact.infoEmail": "Email",
    "contact.infoLocation": "Location",
    "contact.infoLocationValue": "Vobkent district, Bukhara, Uzbekistan",
    "contact.infoAvailability": "Availability",
    "contact.infoAvailabilityValue": "Open to freelance projects",
    "contact.formName": "Name",
    "contact.formEmail": "Email or Telegram",
    "contact.formSubject": "Subject",
    "contact.formMessage": "Message",
    "contact.formSubmit": "Send Message",
    "contact.formSending": "Sending…",
    "contact.formSuccess": "Thanks! Your message has been sent — I'll get back to you soon.",
    "contact.formError": "Something went wrong. Please check the fields and try again.",

    "footer.tagline": "Junior Full-Stack Developer — building with Django, Python and JavaScript.",
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Django, HTML, CSS & JavaScript.",
  },

  ru: {
    "nav.home": "Главная",
    "nav.about": "Обо мне",
    "nav.skills": "Навыки",
    "nav.projects": "Проекты",
    "nav.services": "Услуги",
    "nav.contact": "Контакты",
    "nav.cta": "Связаться",

    "hero.kicker": "Открыт для фриланс-проектов",
    "hero.greeting": "Привет, я Абдулхак",
    "hero.role1": "Junior Full-Stack разработчик",
    "hero.role2": "Django Backend разработчик",
    "hero.role3": "Разработчик REST API",
    "hero.role4": "Решаю сложные задачи",
    "hero.description": "Я создаю понятные и надёжные веб-приложения — от бэкендов на Django и REST API до быстрых, адаптивных интерфейсов. Сейчас беру новые фриланс-проекты.",
    "hero.btnProjects": "Смотреть проекты",
    "hero.btnContact": "Давайте работать вместе",
    "hero.statProjects": "Завершённых проектов",
    "hero.statTech": "Технологий",
    "hero.statCommits": "Коммитов за год",

    "about.kicker": "Обо мне",
    "about.title": "Превращаю идеи в работающий продукт",
    "about.p1": "Я Абдулхак, junior full-stack разработчик. Занимаюсь Python и Django на бэкенде и аккуратными, адаптивными интерфейсами на фронтенде. Мне нравится доводить проект от идеи до готового продукта, которым можно пользоваться.",
    "about.p2": "Я в начале карьеры, но отношусь к каждому проекту — большому или маленькому — серьёзно, потому что для заказчика он важен. Чёткая коммуникация, реалистичные сроки и код, за который не стыдно.",
    "about.point1Title": "Сначала бэкенд",
    "about.point1Text": "Продуманные модели данных и чистые API ещё до вёрстки интерфейса.",
    "about.point2Title": "Внимание к интерфейсу",
    "about.point2Text": "Интерфейсы, которые выглядят продуманно, быстро работают и адаптивны.",
    "about.point3Title": "Честная коммуникация",
    "about.point3Text": "Вы всегда будете точно знать, на каком этапе находится проект.",
    "about.download": "Связаться со мной",

    "skills.kicker": "С чем я работаю",
    "skills.title": "Навыки и инструменты",
    "skills.subtitle": "Стек, который я использую от идеи до релиза проекта.",
    "skills.catFrontend": "Фронтенд",
    "skills.catBackend": "Бэкенд",
    "skills.catTools": "Инструменты",

    "projects.kicker": "Избранные работы",
    "projects.title": "Проекты",
    "projects.subtitle": "Несколько недавних работ — реальный код, реальные задачи.",
    "projects.filterAll": "Все",
    "projects.filterDjango": "Django",
    "projects.filterApi": "API",
    "projects.filterFrontend": "Фронтенд",
    "projects.btnDemo": "Открыть демо",
    "projects.btnCode": "Исходный код",

    "project1.title": "Блог на Django",
    "project1.desc": "Полноценная платформа для блога с авторизацией, форматированными постами, комментариями, категориями и админ-панелью.",
    "project2.title": "Todo REST API",
    "project2.desc": "REST API для управления задачами с токен-аутентификацией на Django REST Framework, с фильтрацией, пагинацией и тестами.",
    "project3.title": "Сайт для учёбы с ИИ",
    "project3.desc": "Платформа-помощник для учёбы, которая создаёт тесты и конспекты из лекций, с бэкендом на Django и быстрым интерфейсом.",
    "project4.title": "Бизнес-сайт",
    "project4.desc": "Адаптивный сайт для локального бизнеса с управлением контентом на Django — клиент может менять страницы без кода.",

    "services.kicker": "Чем я могу помочь",
    "services.title": "Услуги",
    "services.subtitle": "Практичная веб-разработка с понятным объёмом работ и сроками.",
    "service1.title": "Разработка сайтов",
    "service1.desc": "Сайты с нуля — спланированные, спроектированные и написанные под ваш бизнес.",
    "service2.title": "Лендинги",
    "service2.desc": "Быстрые, целевые лендинги, созданные для конверсии посетителей в клиентов.",
    "service3.title": "Разработка на Django",
    "service3.desc": "Надёжные бэкенды, админ-панели и модели данных на Python и Django.",
    "service4.title": "REST API",
    "service4.desc": "Понятные, задокументированные API для мобильных приложений и других сервисов.",
    "service5.title": "Адаптивные сайты",
    "service5.desc": "Интерфейсы, которые отлично выглядят на телефонах, планшетах и компьютерах.",
    "services.cta": "Начать проект",

    "contact.kicker": "Связаться",
    "contact.title": "Давайте создадим что-то вместе",
    "contact.subtitle": "Есть идея проекта? Напишите пару деталей — отвечу в течение дня.",
    "contact.infoEmail": "Email",
    "contact.infoLocation": "Локация",
    "contact.infoLocationValue": "Вобкентский район, Бухара, Узбекистан",
    "contact.infoAvailability": "Доступность",
    "contact.infoAvailabilityValue": "Открыт для фриланс-проектов",
    "contact.formName": "Имя",
    "contact.formEmail": "Email или Telegram",
    "contact.formSubject": "Тема",
    "contact.formMessage": "Сообщение",
    "contact.formSubmit": "Отправить",
    "contact.formSending": "Отправка…",
    "contact.formSuccess": "Спасибо! Сообщение отправлено — я отвечу в ближайшее время.",
    "contact.formError": "Что-то пошло не так. Проверьте поля и попробуйте снова.",

    "footer.tagline": "Junior Full-Stack разработчик — работаю с Django, Python и JavaScript.",
    "footer.rights": "Все права защищены.",
    "footer.builtWith": "Создано на Django, HTML, CSS и JavaScript.",
  },

  uz: {
    "nav.home": "Bosh sahifa",
    "nav.about": "Men haqimda",
    "nav.skills": "Ko'nikmalar",
    "nav.projects": "Loyihalar",
    "nav.services": "Xizmatlar",
    "nav.contact": "Aloqa",
    "nav.cta": "Bog'lanish",

    "hero.kicker": "Frilanс loyihalarga ochiqman",
    "hero.greeting": "Salom, men Abdulhaqman",
    "hero.role1": "Junior Full-Stack dasturchi",
    "hero.role2": "Django Backend dasturchi",
    "hero.role3": "REST API yaratuvchi",
    "hero.role4": "Muammolarni hal qiluvchi",
    "hero.description": "Men Django backend va REST API'dan tortib, tez va moslashuvchan interfeyslargacha — toza va ishonchli veb-ilovalar yarataman. Hozirda yangi frilans loyihalarni qabul qilyapman.",
    "hero.btnProjects": "Loyihalarimni ko'rish",
    "hero.btnContact": "Birga ishlaylik",
    "hero.statProjects": "Yakunlangan loyihalar",
    "hero.statTech": "Texnologiyalar",
    "hero.statCommits": "Shu yilgi commitlar",

    "about.kicker": "Men haqimda",
    "about.title": "G'oyalarni ishlaydigan mahsulotga aylantiraman",
    "about.p1": "Men Abdulhaq, junior full-stack dasturchiman. Backend tomonda Python va Django, frontend tomonda esa toza va moslashuvchan interfeyslar bilan ishlayman. Loyihani xom g'oyadan odamlar foydalana oladigan mahsulotga aylantirishni yaxshi ko'raman.",
    "about.p2": "Men kasbiy yo'limning boshida turibman, lekin har bir loyihaga — katta yoki kichik — muhim narsa sifatida qarayman, chunki mijoz uchun u muhim. Aniq muloqot, real muddatlar va topshirishdan uyalmaydigan kod.",
    "about.point1Title": "Avval backend",
    "about.point1Text": "Bironta piksel dizayn qilinishidan oldin puxta ma'lumotlar modeli va toza API.",
    "about.point2Title": "Interfeysga e'tibor",
    "about.point2Text": "O'ylangan, moslashuvchan va tez ishlaydigan interfeyslar.",
    "about.point3Title": "Ochiq muloqot",
    "about.point3Text": "Loyihangiz qaysi bosqichda ekanini har doim aniq bilasiz.",
    "about.download": "Men bilan bog'laning",

    "skills.kicker": "Men bilan ishlaydigan narsalar",
    "skills.title": "Ko'nikmalar va vositalar",
    "skills.subtitle": "Loyihani g'oyadan ishga tushirishgacha olib boradigan stek.",
    "skills.catFrontend": "Frontend",
    "skills.catBackend": "Backend",
    "skills.catTools": "Vositalar",

    "projects.kicker": "Tanlangan ishlar",
    "projects.title": "Loyihalar",
    "projects.subtitle": "Yaqinda yaratgan ba'zi ishlarim — real kod, real yechilgan muammolar.",
    "projects.filterAll": "Barchasi",
    "projects.filterDjango": "Django",
    "projects.filterApi": "API",
    "projects.filterFrontend": "Frontend",
    "projects.btnDemo": "Demoni ochish",
    "projects.btnCode": "Manba kodi",

    "project1.title": "Django Blog",
    "project1.desc": "Autentifikatsiya, boy matnli postlar, izohlar, kategoriyalar va admin panelga ega to'liq blog platformasi.",
    "project2.title": "Todo REST API",
    "project2.desc": "Django REST Framework asosida yaratilgan, token orqali autentifikatsiya, filtrlash, sahifalash va testlarga ega vazifalarni boshqarish API'si.",
    "project3.title": "AI o'quv sayti",
    "project3.desc": "Lektsiya konspektlaridan test va xulosalar yaratadigan, Django backend va tez interfeysli o'quv yordamchisi platformasi.",
    "project4.title": "Biznes sayti",
    "project4.desc": "Mahalliy biznes uchun moslashuvchan marketing sayti, mijoz kodga tegmasdan sahifalarni yangilashi uchun Django kontent boshqaruvi bilan.",

    "services.kicker": "Qanday yordam bera olaman",
    "services.title": "Xizmatlar",
    "services.subtitle": "Aniq belgilangan va o'z vaqtida yetkaziladigan amaliy veb-dasturlash.",
    "service1.title": "Veb-sayt yaratish",
    "service1.desc": "Noldan qurilgan, biznesingizga mos rejalashtirilgan va kodlashtirilgan saytlar.",
    "service2.title": "Lending sahifalar",
    "service2.desc": "Tashrif buyuruvchilarni mijozga aylantirish uchun mo'ljallangan tez va maqsadli lending sahifalar.",
    "service3.title": "Django dasturlash",
    "service3.desc": "Python va Django asosida mustahkam backend, admin panel va ma'lumotlar modellari.",
    "service4.title": "REST API",
    "service4.desc": "Ilovangizni mobil ilovalar, hamkorlar yoki frontend bilan bog'laydigan toza, hujjatlashtirilgan API'lar.",
    "service5.title": "Moslashuvchan saytlar",
    "service5.desc": "Telefon, planshet va kompyuterlarda bir xil chiroyli ishlaydigan interfeyslar.",
    "services.cta": "Loyihani boshlash",

    "contact.kicker": "Bog'laning",
    "contact.title": "Birga biror narsa yarataylik",
    "contact.subtitle": "Loyiha g'oyangiz bormi? Bir nechta tafsilot yozing — bir kun ichida javob beraman.",
    "contact.infoEmail": "Email",
    "contact.infoLocation": "Manzil",
    "contact.infoLocationValue": "Vobkent tumani, Buxoro, O'zbekiston",
    "contact.infoAvailability": "Mavjudlik",
    "contact.infoAvailabilityValue": "Frilans loyihalarga ochiqman",
    "contact.formName": "Ism",
    "contact.formEmail": "Email yoki Telegram",
    "contact.formSubject": "Mavzu",
    "contact.formMessage": "Xabar",
    "contact.formSubmit": "Xabar yuborish",
    "contact.formSending": "Yuborilmoqda…",
    "contact.formSuccess": "Rahmat! Xabaringiz yuborildi — tez orada javob beraman.",
    "contact.formError": "Nimadir xato ketdi. Maydonlarni tekshirib, qayta urinib ko'ring.",

    "footer.tagline": "Junior Full-Stack dasturchi — Django, Python va JavaScript bilan ishlayman.",
    "footer.rights": "Barcha huquqlar himoyalangan.",
    "footer.builtWith": "Django, HTML, CSS va JavaScript yordamida yaratildi.",
  },
};

const LANG_STORAGE_KEY = 'abdulhaq_portfolio_lang';

function getStoredLang() {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored && TRANSLATIONS[stored]) return stored;
  return 'en';
}

function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('.lang-option').forEach((el) => {
    el.classList.toggle('is-active', el.getAttribute('data-lang') === lang);
  });
  const currentLabel = document.querySelector('[data-current-lang]');
  if (currentLabel) {
    currentLabel.textContent = lang.toUpperCase();
  }

  localStorage.setItem(LANG_STORAGE_KEY, lang);
  window.CURRENT_LANG = lang;
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(getStoredLang());

  document.querySelectorAll('.lang-option').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = el.getAttribute('data-lang');
      applyTranslations(lang);
      const dropdown = document.querySelector('.lang-switcher');
      if (dropdown) dropdown.classList.remove('is-open');
    });
  });

  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      document.querySelector('.lang-switcher').classList.toggle('is-open');
    });
    document.addEventListener('click', (e) => {
      const switcher = document.querySelector('.lang-switcher');
      if (switcher && !switcher.contains(e.target)) {
        switcher.classList.remove('is-open');
      }
    });
  }
});
