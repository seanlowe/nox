#!/bin/python3

# import sys
import playsound
from gtts import gTTS

def speak(msg):
    tts = gTTS(text=msg, lang="en")
    sound = "voice.mp3"
    tts.save(sound)
    playsound.playsound(sound)
    
# speak(sys.argv[1])