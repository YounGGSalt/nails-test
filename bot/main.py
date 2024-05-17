import telebot
import config
import json
import socket
from telebot import types
from urllib.request import Request, urlopen
from pathlib import Path
from typing import Any, Dict

app           =  socket.socket(socket.AF_INET, socket.SOCK_STREAM)
bot           =  telebot.TeleBot(config.TOKEN)
serverJSON    =  './data/server.json'
serverData    =  json.loads(Path('./data/server.json').read_text())
telegramJSON  =  './data/telegram.json'
telegramData  =  json.loads(Path('./data/telegram.json').read_text())

def readJSON(toRead):
  with open(toRead, "r",) as json_file:
    data = json.load(json_file)
    
  return data
def writeJSON(toRead, toDumb):
  with open(toRead, "w",) as json_file:
    json.dump(toDumb, json_file)

PORT                  =  app.bind(('', 0))
serverData['python']  =  app.getsockname()[1]
server                =  'http://127.0.0.1:' + str(readJSON(serverJSON)['node'])
writeJSON(serverJSON, serverData)

def getData():
  ...
async def postData(task_data: str, body_data: Dict[str, Any]) -> Dict[str, Any]:
    body = json.dumps(body_data)
    response = await fetch(f"{server}/{task_data}", {
        "method": "POST",
        "mode": "cors",
        "cache": "no-cache",
        "credentials": "same-origin",
        "headers": {
            "Content-Type": "application/json"
        },
        "redirect": "follow",
        "referrer": "no-referrer",
        "body": body
    })
    return await response.json()
def sendText(message, markup, text):
  if markup == 0:
    bot.send_message(message.chat.id, text, parse_mode = 'Markdown')
  else:
    bot.send_message(message.chat.id, text, reply_markup = markup, parse_mode = 'Markdown')
def sendPhoto(message, img, markup, text):
  if markup != 0 and text == 0:
    bot.send_photo(message.chat.id, photo = open(img, 'rb'), reply_markup = markup)
  elif markup == 0 and text != 0:
    bot.send_photo(message.chat.id, photo = open(img, 'rb'), caption = text, parse_mode = 'Markdown')
  elif markup != 0 and text != 0:
    bot.send_photo(message.chat.id, photo = open(img, 'rb'), reply_markup = markup, caption = text, parse_mode = 'Markdown')
  elif markup == 0 and text == 0:
    bot.send_photo(message.chat.id, photo = open(img, 'rb'))
def sendAudio(message, audio):
  bot.send_audio(message.chat.id, audio)
def sendDoc(message, document):
  bot.senddocument(message.chat.id, document)
def sendVideo(message, video):
  bot.send_video(message.chat.id, video)
def sendLocation(message, latitude, longitude):
  bot.sendlocation(message.chat.id, latitude, longitude)
def replyTo(message, markup, text):
  if markup == 0:
    bot.reply_to(message.chat.id, text, parse_mode = 'Markdown')
  else:
    bot.reply_to(message.chat.id, text, reply_markup = markup, parse_mode = 'Markdown')
def editMessage(message, markup, message_id, text):
  if markup == 0:
    bot.edit_message_text(message.chat.id, text, parse_mode = 'Markdown')
  else:
    bot.edit_message_text(message.chat.id, message_id, text, reply_markup = markup, parse_mode = 'Markdown')
def deleteMessage(message, message_id):
  bot.send_video(message.chat.id, message_id)
def getID(message):
  userID = message.from_user.id

  return str(userID)
def getUName(message):
  userName = message.from_user.first_name

  return str(userName)
def getFName(message):
  FirstName = message.from_user.first_name

  return str(FirstName)
def getLName(message):
  LastName = message.from_user.last_name

  return str(LastName)

@bot.message_handler(commands = ['start'])
def start(message):
  keyboard = types.InlineKeyboardMarkup()
  keyboard.add(
    types.InlineKeyboardButton('СПИСОК КОМАНД', callback_data = 'list')
  )
  sendText(message, keyboard, 'Привет, *' + getFName(message) + '* 👋\nДобро пожаловать в телеграм канал *' + bot.get_me().first_name + '*!\nЗдесь вы можете зарегистрироваться на нашем сайте, а также записаться к нам на приём прямиком из телеграма.\n\nДля этого вам необходимо выбрать нужную вам команду и следовать дальнейшим инструкциям.\n\nСсылка на официальный сайт: https://www.google.ru/?hl=ru')
  bot.set_my_commands(
    commands = [
      types.BotCommand('/start', 'Приветствие'),
      types.BotCommand('/info', 'Информация'),
      types.BotCommand('/list', 'Список команд'),
      types.BotCommand('/reg', 'Регистрация'),
      types.BotCommand('/masters', 'Мастеры'),
      types.BotCommand('/services', 'Услуги')
    ],
    scope = telebot.types.BotCommandScopeChat(message.chat.id)
  )

@bot.message_handler(commands = ['info'])
def info(message):
  sendText(message, 0, 'ИНФОРМАЦИЯ\n')

@bot.message_handler(commands = ['list'])
def list(message):
  keyboard = types.InlineKeyboardMarkup()
  keyboard.add(
    types.InlineKeyboardButton('ПРИВЕТСТВИЕ', callback_data = 'start'),
    types.InlineKeyboardButton('ИНФОРМАЦИЯ', callback_data = 'info'),
    types.InlineKeyboardButton('РЕГИСТРАЦИЯ', callback_data = 'reg'),
    types.InlineKeyboardButton('МАСТЕРЫ', callback_data = 'masters'),
    types.InlineKeyboardButton('УСЛУГИ', callback_data = 'services')
  )
  sendText(message, keyboard, '*СПИСОК КОМАНД*\n/help | Инфомация\n/list | Список команд\n/reg | Регистрация\n/masters | Мастеров\n/services | Услуги')

@bot.message_handler(commands = ['reg'])
def reg(message):
  sendText(message, 0, 'РЕГИСТРАЦИЯ')
  

@bot.message_handler(commands = ['masters'])
def masters(message):
  keyboard = types.InlineKeyboardMarkup()
  keyboard.add(
    types.InlineKeyboardButton('ЗАПИСАТЬСЯ', callback_data = 'start')
  )
  sendPhoto(message, r'./bot/src/img/MZ.jpg', keyboard, '*Марина Юрьевна*\nМастер маникюра\nОпыт работы | 3 года\nWhatsApp | https://www.google.ru/?hl=ru\nTelegram | https://www.google.ru/?hl=ru\nПодробнее | https://www.google.ru/?hl=ru\n\n')

@bot.message_handler(commands = ['services'])
def services(message):
  sendText(message, 0, 'УСЛУГИ\n')

# @bot.message_handler(content_types = ['text'])
# 

# @bot.message_handler(content_types = ['photo'])
# 

@bot.callback_query_handler(func = lambda call: True)
def callback(call):
  if call.message:
    if call.data == 'start':
      start(call.message)
    elif call.data == 'info':
      info(call.message)
    elif call.data == 'list':
      list(call.message)
    elif call.data == 'reg':
      reg(call.message)
    elif call.data == 'masters':
      masters(call.message)
    elif call.data == 'services':
      services(call.message)

bot.polling(none_stop = True)