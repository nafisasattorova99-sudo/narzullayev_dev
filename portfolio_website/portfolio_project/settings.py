"""
Django settings for portfolio_project.
"""

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
# Replace this with an environment variable before deploying.
SECRET_KEY = 'django-insecure-CHANGE-ME-BEFORE-DEPLOYMENT-abdulhaq-portfolio'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'portfolio',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', 
]

ROOT_URLCONF = 'portfolio_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'portfolio' / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio_project.wsgi.application'
ASGI_APPLICATION = 'portfolio_project.asgi.application'

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Tashkent'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)

STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'portfolio' / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# Default primary key field type

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ---------------------------------------------------------------------------
# Email — sends a notification to you every time someone submits the
# contact form. By default (no env vars set) it just prints the email to
# the console/terminal, so the site still works out of the box.
#
# To actually receive real emails via Gmail:
#   1. Turn on 2-Step Verification on your Google account
#   2. Create an "App Password": https://myaccount.google.com/apppasswords
#   3. Set these environment variables before running the server:
#        EMAIL_HOST_USER=your_gmail@gmail.com
#        EMAIL_HOST_PASSWORD=the_16_char_app_password
#   (Never put your real Gmail password directly in this file.)
# ---------------------------------------------------------------------------
import os

EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')

if EMAIL_HOST_USER and EMAIL_HOST_PASSWORD:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
else:
    # No credentials configured yet — emails are printed to the terminal
    # instead of actually being sent, so nothing breaks.
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEFAULT_FROM_EMAIL = EMAIL_HOST_USER or 'noreply@abdulhaq-portfolio.local'

# The address that receives a notification for every contact form submission
CONTACT_RECIPIENT_EMAIL = 'nafisasattorova99@gmail.com'

# ---------------------------------------------------------------------------
# Telegram notifications (optional but recommended — instant phone alerts)
#
# Setup:
#   1. Open @BotFather in Telegram, send /newbot, follow the prompts.
#      It gives you a token like 8123456789:AAH...xyz
#   2. Open @userinfobot and send /start — it replies with your numeric ID.
#   3. Send any message to YOUR OWN new bot once (so it can write to you).
#   4. Set these environment variables before running the server:
#        TELEGRAM_BOT_TOKEN=8123456789:AAH...xyz
#        TELEGRAM_CHAT_ID=123456789
#
# If these are empty, Telegram sending is simply skipped — nothing breaks.
# ---------------------------------------------------------------------------
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '')
