# Abdulhaq — Full-Stack Developer Portfolio

A modern, animated, dark-themed portfolio site built with **Django + HTML + CSS + JavaScript**.

## Features

- Single-page layout: Home, About, Skills, Projects, Services, Contact
- Dark UI with gradients, glassmorphism cards, and a floating "code card" hero visual
- Smooth animations: scroll reveals, hover effects, typing animation, animated skill bars,
  floating elements, animated counters, and project filtering
- **UZ 🇺🇿 / EN 🇬🇧 / RU 🇷🇺** language switcher — instant, client-side, no page reload,
  remembers your choice via `localStorage`
- Working Django contact form — submits via `fetch()`, validated server-side, saved to the
  database (`ContactMessage` model), viewable in the Django admin
- Fully responsive: desktop, tablet, and mobile, including a mobile nav menu

## Project structure

```
portfolio_website/
├── manage.py
├── requirements.txt
├── portfolio_project/        # Django project settings
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── portfolio/                 # Django app
    ├── models.py               # ContactMessage model
    ├── forms.py                 # ContactForm (server-side validation)
    ├── views.py                  # index view + AJAX contact_submit view
    ├── urls.py
    ├── admin.py                  # Contact messages visible in /admin/
    ├── templates/portfolio/index.html
    └── static/portfolio/
        ├── css/style.css
        └── js/
            ├── translations.js   # UZ/EN/RU dictionaries + switching logic
            └── main.js           # nav, typing, reveals, counters, filters, form AJAX
```

## Getting started

1. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate        # Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations** (creates the SQLite database and the `ContactMessage` table)
   ```bash
   python manage.py migrate
   ```

4. **Fill the live demos with sample content** (needed for the blog & todo demos)
   ```bash
   python manage.py seed_demos
   ```

5. **(Optional) Create an admin account** so you can view submitted messages at `/admin/`
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. Open **http://127.0.0.1:8000/** in your browser.

## Live project demos

Each project in the Projects section opens a **real, working Django page** — not a mockup:

| Project | URL | What actually works |
|---|---|---|
| Django Blog | `/demo/blog/` | Post list, search, category filters, post detail, comment form (saved to DB) |
| Todo REST API | `/demo/todo/` | Interactive todo app + live API console; real `GET`/`POST`/`PATCH`/`DELETE` JSON endpoints |
| AI Study Website | `/demo/study/` | Paste notes → generated summary, key terms, and fill-in-the-blank quiz with answer checking |
| Business Website | `/demo/business/` | Full marketing site: hero, services, pricing tiers, opening hours, contact |

**Important:** after migrating, run this once to fill the demos with sample content:

```bash
python manage.py seed_demos
```

Without it the blog and todo demos will simply be empty.

### Todo API endpoints

```
GET    /demo/todo/api/tasks/                 list tasks (?completed=true|false, ?priority=low|medium|high)
POST   /demo/todo/api/tasks/                 create  {"title": "...", "priority": "high"}
GET    /demo/todo/api/tasks/<id>/            retrieve
PATCH  /demo/todo/api/tasks/<id>/            update  {"completed": true}
DELETE /demo/todo/api/tasks/<id>/            delete
```

## Where contact form messages go

Every submitted message goes to **up to three places**:

| Destination | Works out of the box? | Notes |
|---|---|---|
| **Database** | ✅ Always | View them in Django admin at `/admin/` → Contact messages |
| **Email** | ⚠️ Needs setup | Printed to the terminal until Gmail credentials are set (see below) |
| **Telegram** | ⚠️ Needs setup | Instant push notification to your phone (recommended) |

If email/Telegram aren't configured, the form still works perfectly — messages
are just saved to the database only.

### Telegram notifications (recommended — instant phone alerts)

1. In Telegram, open **@BotFather**, send `/newbot`, and follow the prompts.
   You'll get a token like `8123456789:AAH...xyz`.
2. Open **@userinfobot** and send `/start` — it replies with your numeric ID.
3. **Send any message to your new bot once** (a bot can't message you until you
   start the chat).
4. Set the environment variables before running the server:
   ```bash
   export TELEGRAM_BOT_TOKEN="8123456789:AAH...xyz"
   export TELEGRAM_CHAT_ID="123456789"
   ```
   (Windows PowerShell: `$env:TELEGRAM_BOT_TOKEN="..."`)
5. Run the server — every new message now pings your Telegram instantly.

## Getting real email notifications when someone submits the form

By default, every submitted message is (1) saved to the database, and (2) an email is drafted
to `nafisasattorova99@gmail.com` — but without configuration it only prints to your terminal
instead of actually sending, so the site still works with zero setup.

To make it send **real emails to your Gmail inbox**:

1. Turn on **2-Step Verification** on the Google account that will send the emails.
2. Create an **App Password**: https://myaccount.google.com/apppasswords
3. Before running the server, set two environment variables:
   ```bash
   export EMAIL_HOST_USER="your_gmail@gmail.com"
   export EMAIL_HOST_PASSWORD="the_16_character_app_password"
   ```
   (On Windows PowerShell: `$env:EMAIL_HOST_USER="..."` / `$env:EMAIL_HOST_PASSWORD="..."`)
4. Run `python manage.py runserver` as usual — from now on, every contact form submission
   will land in `nafisasattorova99@gmail.com`'s inbox.

To send notifications to a different address, change `CONTACT_RECIPIENT_EMAIL` in
`portfolio_project/settings.py`.

## Customizing content

- **Text & translations:** edit `portfolio/static/portfolio/js/translations.js` — every
  visible string has a `data-i18n` key used in `index.html` and mirrored across `en`, `ru`, `uz`.
- **Skills / skill levels:** edit the skill bars directly in `index.html` (`data-level="85"` etc.)
  in the Skills section.
- **Projects:** each project is an `<article class="project-card">` block in the Projects
  section of `index.html` — swap the inline SVG thumbnail, description, tech pills, and links.
- **Contact info:** update the email/location values in the Contact section of `index.html`.
- **Colors/fonts:** all design tokens (colors, spacing, fonts) are CSS variables at the top of
  `portfolio/static/portfolio/css/style.css` under `:root`.

## Before deploying to production

- Set `DEBUG = False` in `portfolio_project/settings.py`
- Move `SECRET_KEY` into an environment variable
- Set `ALLOWED_HOSTS` to your real domain
- Run `python manage.py collectstatic` and serve static files via your web server / WhiteNoise
- Consider switching from SQLite to PostgreSQL for production use

## Tech stack

HTML5, CSS3 (custom properties, no framework), vanilla JavaScript (no build step), Django 5,
SQLite (dev), Google Fonts (Space Grotesk, Inter, JetBrains Mono).
