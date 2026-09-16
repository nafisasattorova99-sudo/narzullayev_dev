#!/bin/bash
# Portfolio serverini Telegram bildirishnomalari yoqilgan holda ishga tushirish
# Ishlatish: terminalda shu papkaga kirib -> ./run.sh

export TELEGRAM_BOT_TOKEN="8835990946:AAF_P-5XqxiS7qSsO1xwAXAMt5eTb8uKAPU"
export TELEGRAM_CHAT_ID="6765743332"

# Gmail orqali ham email kelishini xohlasangiz, quyidagi 2 qatorni to'ldiring:
# export EMAIL_HOST_USER="sizning_gmail@gmail.com"
# export EMAIL_HOST_PASSWORD="16_xonali_app_parol"

python3 manage.py runserver
