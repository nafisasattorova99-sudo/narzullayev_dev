# Portfolio serverini Telegram bildirishnomalari yoqilgan holda ishga tushirish
# Ishlatish: PowerShell'da shu papkaga kirib -> .\run_windows.ps1

$env:TELEGRAM_BOT_TOKEN = "8835990946:AAF_P-5XqxiS7qSsO1xwAXAMt5eTb8uKAPU"
$env:TELEGRAM_CHAT_ID   = "6765743332"

# Gmail orqali ham email kelishini xohlasangiz, quyidagi 2 qatorni to'ldiring:
# $env:EMAIL_HOST_USER     = "sizning_gmail@gmail.com"
# $env:EMAIL_HOST_PASSWORD = "16_xonali_app_parol"

python manage.py runserver
