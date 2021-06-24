#!/bin/python3

# speak something thru Google Home
#
# use: ./ghome_say [ghome_ip] [text_to_say]

import sys
import pychromecast
import os
from gtts import gTTS
import time
import hashlib

IP = "192.168.1.6"
msg = sys.argv[1]

# create md5 filename for caching
# filename = hashlib.md5(msg.encode()).hexdigest()+".mp3"
filename = "sound.mp3"

ghome = pychromecast.Chromecast(IP)
ghome.wait()
vol_prec = ghome.status.volume_level
# set volume 0 to silence the beep
ghome.set_volume(0.0)

try:
   os.mkdir("/home/slowe/Data/Projects/Nox/messages")
except:
   pass

if not os.path.isfile("/home/slowe/Data/Projects/Nox/messages/" + filename):
   tts = gTTS(text=msg, lang='en')
   tts.save("/home/slowe/Data/Projects/Nox/messages/" + filename)

mc = ghome.media_controller
# mc.play_media("http://"+local_ip+"/mp3_cache/"+filename, "audio/mp3")
# mc.play_media("/home/slowe/Data/Projects/Nox/messages/" + filename, "audio/mp3")
mc.play_media("/home/slowe/Data/Projects/Nox/voice.mp3", "audio/mp3")

mc.block_until_active()

# prepare audio and pause...
mc.pause()

time.sleep(1)
# setting volume to precedent value
ghome.set_volume(vol_prec)
time.sleep(0.2)

# play the mp3
mc.play()

while not mc.status.player_is_idle:
   time.sleep(0.5)

mc.stop()

ghome.quit_app()