import modules.utility as utility
import os
import pprint


def setUpApiCall():
    addr = utility.getIpAddress()
    coords = utility.getLatLonCoords(addr)

    return coords

def main():
    excludes = "minutely,current"
    units = "imperial"
    apiKey = os.getenv('OPEN_WEATHER_API_KEY')
    coords = setUpApiCall()
    url = f'https://api.openweathermap.org/data/2.5/onecall?lat={coords[0]}&lon={coords[1]}&exclude={excludes}&units={units}&appid={apiKey}'
    
    response = utility.apiGet(url)
    pprint.pp(response)