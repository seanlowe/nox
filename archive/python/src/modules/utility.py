import requests;
from pprint import pprint;
import json;

def getIpAddress():
    address = requests.get("https://api.ipify.org/")
    return address.text

def getLatLonCoords(addr):
    url = f"http://ip-api.com/json/{addr}"
    response = apiGet(url)

    if (response['status'] != 'success'):
        return 'Unable to get Lat/Lon coordinates!'

    lat = response['lat']
    lon = response['lon']
    
    return [lat, lon]


def apiGet(url):
    rawResponse = requests.get(url)
    response = json.loads(rawResponse.text)

    return response