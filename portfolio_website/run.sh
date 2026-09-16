#!/bin/bash
# Portfolio serverini Telegram bildirishnomalari yoqilgan holda ishga tushirish
# Ishlatish: terminalda shu papkaga kirib -> ./run.sh

# O'zingizning bot tokeningiz va chat ID'ingizni shu yerga yozing
# (bu faylni hech qachon GitHub'ga eski/haqiqiy token bilan push qilmang):
export TELEGRAM_BOT_TOKEN="SIZNING_BOT_TOKENINGIZ"
export TELEGRAM_CHAT_ID="SIZNING_CHAT_IDINGIZ"

# Gmail orqali ham email kelishini xohlasangiz, quyidagi 2 qatorni to'ldiring:
# export EMAIL_HOST_USER="sizning_gmail@gmail.com"
# export EMAIL_HOST_PASSWORD="16_xonali_app_parol"

python3 manage.py runserver
