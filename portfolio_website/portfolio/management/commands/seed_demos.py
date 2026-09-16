"""Populate the live demos with sample content.

Run once after migrating:  python manage.py seed_demos
"""

from django.core.management.base import BaseCommand

from portfolio.models import DemoPost, DemoComment, DemoTask


POSTS = [
    {
        'title': 'Django loyihasini noldan boshlash',
        'slug': 'django-loyihasini-noldan-boshlash',
        'category': 'Django',
        'excerpt': "Virtual muhit yaratishdan tortib birinchi sahifani ishga tushirishgacha bo'lgan qadamlar.",
        'body': (
            "Django bilan ishlashni boshlash uchun avvalo virtual muhit yaratamiz. Bu loyihaning "
            "kutubxonalarini tizimdagi boshqa loyihalardan ajratib turadi.\n\n"
            "Keyin django-admin startproject buyrug'i orqali loyiha skeletini yaratamiz. Bu bizga "
            "settings.py, urls.py va manage.py fayllarini beradi.\n\n"
            "Eng muhimi — models.py da ma'lumotlar strukturasini to'g'ri loyihalash. Yaxshi model "
            "keyinchalik koddagi ko'p muammolarning oldini oladi."
        ),
    },
    {
        'title': "REST API yaratishda 5 ta keng tarqalgan xato",
        'slug': 'rest-api-5-xato',
        'category': 'API',
        'excerpt': "Pagination yo'qligi, noto'g'ri status kodlar va boshqa muammolar haqida.",
        'body': (
            "Birinchi xato — pagination qo'ymaslik. Baza kattalashganda bitta so'rov minglab yozuvni "
            "qaytarib, serverni sekinlashtiradi.\n\n"
            "Ikkinchisi — noto'g'ri HTTP status kodlar. Yaratilgan resurs uchun 201, o'chirilgani uchun "
            "204 qaytarish kerak, hammasiga 200 emas.\n\n"
            "Uchinchisi — validatsiyani faqat frontendda qilish. Server tomonda ham tekshirish shart, "
            "chunki API ga to'g'ridan-to'g'ri murojaat qilish mumkin."
        ),
    },
    {
        'title': "CSS Grid va Flexbox: qachon qaysi birini ishlatish",
        'slug': 'css-grid-va-flexbox',
        'category': 'Frontend',
        'excerpt': "Ikki tartiblash tizimining farqi va amaliy misollar.",
        'body': (
            "Flexbox bir o'lchamli tartiblash uchun — ya'ni elementlarni bir qatorda yoki bir ustunda "
            "joylashtirishda qulay.\n\n"
            "Grid esa ikki o'lchamli — bir vaqtning o'zida qator va ustunlarni boshqarish kerak "
            "bo'lganda ishlatiladi.\n\n"
            "Amalda ko'pincha ikkalasi birga ishlatiladi: sahifaning umumiy tuzilishi Grid bilan, "
            "ichidagi kichik bloklar Flexbox bilan tartiblanadi."
        ),
    },
    {
        'title': "Django ORM so'rovlarini tezlashtirish",
        'slug': 'django-orm-tezlashtirish',
        'category': 'Django',
        'excerpt': "select_related va prefetch_related yordamida N+1 muammosini hal qilish.",
        'body': (
            "N+1 muammosi — bu eng keng tarqalgan ORM xatosi. Har bir obyekt uchun alohida so'rov "
            "yuborilsa, 100 ta yozuv uchun 101 ta so'rov ketadi.\n\n"
            "select_related ForeignKey bog'lanishlari uchun JOIN ishlatadi va bitta so'rovda "
            "hamma narsani oladi.\n\n"
            "prefetch_related esa ManyToMany va teskari bog'lanishlar uchun mos — u alohida so'rov "
            "yuboradi, lekin Python tomonda birlashtiradi."
        ),
    },
]

TASKS = [
    ('Mijoz bilan uchrashuvni belgilash', False, 'high'),
    ('Bosh sahifa dizaynini tayyorlash', False, 'high'),
    ('Ma\'lumotlar bazasi modelini yozish', True, 'medium'),
    ('API endpointlarni hujjatlashtirish', False, 'medium'),
    ('Testlarni yozish', False, 'low'),
    ('Serverga deploy qilish', False, 'low'),
]


class Command(BaseCommand):
    help = 'Seed sample content for the live project demos.'

    def handle(self, *args, **options):
        if DemoPost.objects.exists() or DemoTask.objects.exists():
            self.stdout.write(self.style.WARNING('Demo content already exists — skipping.'))
            return

        for data in POSTS:
            post = DemoPost.objects.create(**data)
            self.stdout.write(f'  + post: {post.title}')

        first = DemoPost.objects.order_by('id').first()
        if first:
            DemoComment.objects.create(
                post=first, author='Jasur',
                body="Juda foydali maqola bo'libdi, rahmat! Virtual muhit qismini endi tushundim.")
            DemoComment.objects.create(
                post=first, author='Malika',
                body='models.py haqida alohida maqola yozsangiz zo\'r bo\'lardi.')

        for title, completed, priority in TASKS:
            DemoTask.objects.create(title=title, completed=completed, priority=priority)
        self.stdout.write(f'  + {len(TASKS)} tasks')

        self.stdout.write(self.style.SUCCESS('Demo content created.'))
