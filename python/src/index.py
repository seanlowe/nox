#!/usr/bin/python3

# to do:
# - weather api
#


# import modules.utility as util
import modules.weather as weather
from dotenv import load_dotenv


def hello():
    # coords = util.getIpAddress()
    # print(util.getLatLonCoords(coords))
    weather.main()


if __name__ == '__main__':
    load_dotenv()
    hello()
