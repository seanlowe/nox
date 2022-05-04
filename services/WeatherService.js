import axios from 'axios'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

const getIPAddress = async () => {
  const address = await axios.get('https://api.ipify.org/')
  return address.data
}

const getLatLonCoords = async (address) => {
  const response = await axios.get(`http://ip-api.com/json/${address}`)

  if (response.data.status !== 'success') {
    return 'Unable to get Lat/Long coordinates!'
  }

  return [response.data['lat'], response.data['lon']]
}

const geocode = async (query) => {
  // @TODO: eventually support returning multiple locations and populating
  // those locations in a dropdown select
  const response = await axios.get(GEO_URL, {
    params: {
      q: query,
      limit: 1,
      appid: OPEN_WEATHER_API_KEY,
    },
  })

  return [response.data[0].lat, response.data[0].lon]
}

const setUpAPICall = async (query) => {
  if (query) {
    // only if we searched for something
    // update the address using OpenWeatherMap's
    // direct geocoding functionality
    return geocode(query)
  }

  const addr = await getIPAddress()
  const coords = await getLatLonCoords(addr)

  return coords
}

// fetch weather at current location
export const fetchWeather = async (query) => {
  const coords = await setUpAPICall(query)
  const response = await axios.get(WEATHER_URL, {
    params: {
      lat: coords[0],
      lon: coords[1],
      units: 'imperial',
      appid: OPEN_WEATHER_API_KEY,
    },
  })

  return response.data
}
