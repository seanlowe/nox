#! /usr/bin/python3.5

#
# spoke something on GoogleHome
#
# use: ./ghome_say [ghome_ip] [text_to_say]
#
#

import sys
import pychromecast
import os
import os.path
from gtts import gTTS
import time
import hashlib

ip=sys.argv[1]
say=sys.argv[2]

#********* retrieve local ip of my rpi3
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
local_ip=s.getsockname()[0]
s.close()
#**********************

# create md5 filename for caching
fname=hashlib.md5(say.encode()).hexdigest()+".mp3" 

castdevice = pychromecast.Chromecast(ip)
castdevice.wait()
vol_prec=castdevice.status.volume_level
castdevice.set_volume(0.0) #set volume 0 for not hear the BEEEP

try:
   os.mkdir("/var/www/html/mp3_cache/")
except:
   pass

if not os.path.isfile("/var/www/html/mp3_cache/"+fname):
   tts = gTTS(say,lang='it')
   tts.save("/var/www/html/mp3_cache/"+fname)

mc = castdevice.media_controller
mc.play_media("http://"+local_ip+"/mp3_cache/"+fname, "audio/mp3")

mc.block_until_active()

mc.pause() # prepare audio and pause...

time.sleep(1)
castdevice.set_volume(vol_prec) #setting volume to precedent value
time.sleep(0.2)

mc.play() #play the mp3

while not mc.status.player_is_idle:
   time.sleep(0.5)

mc.stop()

castdevice.quit_app()