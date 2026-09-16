import json
import logging
import urllib.parse
import urllib.request

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from django.utils.html import escape
from django.views.decorators.http import require_http_methods

from .forms import ContactForm

logger = logging.getLogger(__name__)


def index(request):
    """Render the single-page portfolio."""
    return render(request, 'portfolio/index.html', {
        'form': ContactForm(),
    })


def _notify_owner(message_obj):
    """Email the site owner about a new contact form submission.

    Failures here are logged but never break the form submission — the
    message is already safely saved in the database either way.
    """
    subject = f"New portfolio message from {message_obj.name}"
    body = (
        f"You've got a new message from your portfolio site.\n\n"
        f"Name: {message_obj.name}\n"
        f"Email: {message_obj.email}\n"
        f"Subject: {message_obj.subject or '(no subject)'}\n\n"
        f"Message:\n{message_obj.message}\n"
    )
    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_RECIPIENT_EMAIL],
            fail_silently=False,
        )
    except Exception:
        logger.exception('Failed to send contact form notification email')


def _notify_telegram(message_obj):
    """Send an instant Telegram alert about a new message.

    Uses only the standard library so no extra dependency is required.
    Silently skipped if no bot token / chat id is configured.
    """
    token = getattr(settings, 'TELEGRAM_BOT_TOKEN', '')
    chat_id = getattr(settings, 'TELEGRAM_CHAT_ID', '')
    if not token or not chat_id:
        return

    text = (
        "🔔 <b>Yangi xabar — portfolio sayt</b>\n\n"
        f"👤 <b>Ism:</b> {escape(message_obj.name)}\n"
        f"✉️ <b>Email:</b> {escape(message_obj.email)}\n"
        f"📌 <b>Mavzu:</b> {escape(message_obj.subject or '—')}\n\n"
        f"💬 {escape(message_obj.message)}"
    )

    payload = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
    }).encode('utf-8')

    url = f'https://api.telegram.org/bot{token}/sendMessage'
    try:
        request = urllib.request.Request(url, data=payload)
        with urllib.request.urlopen(request, timeout=10) as response:
            response.read()
    except Exception:
        logger.exception('Failed to send Telegram notification')


@require_http_methods(['POST'])
def contact_submit(request):
    """Handle the contact form submission via fetch()/AJAX and persist it.

    Returns JSON so the front end can show a success or validation state
    without a full page reload. Also emails and Telegrams the site owner.
    """
    if request.content_type == 'application/json':
        try:
            data = json.loads(request.body.decode('utf-8'))
        except (ValueError, UnicodeDecodeError):
            data = {}
    else:
        data = request.POST

    form = ContactForm(data)

    if form.is_valid():
        message_obj = form.save()
        _notify_owner(message_obj)
        _notify_telegram(message_obj)
        return JsonResponse({
            'success': True,
            'message': "Thanks! Your message has been sent — I'll get back to you soon.",
        })

    return JsonResponse({
        'success': False,
        'errors': form.errors,
    }, status=400)
