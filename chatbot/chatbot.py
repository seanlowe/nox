#!/bin/python3

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import os
import talk

def respond(msg, override):
    reply = 'Nox: '
    # vreply = ''
    if (override == 1):
        reply += str(msg)
        # vreply += str(msg)
    else:
        reply += str(bot.get_response(msg))
        # vreply += str(bot.get_response(msg))
    print(reply)
    # talk.speak(vreply)

bot = ChatBot('Nox',
        logic_adapters=[
            'chatterbot.logic.MathematicalEvaluation',
            'chatterbot.logic.TimeLogicAdapter'
        ]
    )
trainer = ListTrainer(bot)

# result = os.path.exists("/home/slowe/Data/Projects/Nox/db.sqlite3")
# if result == False:
# if the db file is not found, generate it.
file_path = "/home/slowe/Data/Projects/Nox/chatbot/training_chats/"
for file in os.listdir(file_path):
    conversation = open(file_path+file,'r').readlines()
    trainer.train(conversation)

while True:
    message = input('You: ')
    if message.strip() == 'exit':
        respond('Here if you need me, Sir.', 1)
        break
    else:
        respond(message, 0)