package service

import (
  "fmt"
  "encoding/json"
  "net/http"
  "net/url"
  "os"

  "github.com/joho/godotenv"
  "nox/noxd/helpers"
)

type Coordinates struct {
  Lat float64 `json:"lat"`
  Lon float64 `json:"lon"`
}

type GeocodingResponse struct {
  Lat float64 `json:"lat"`
  Lon float64 `json:"lon"`
  Name string `json:"name"`
  Country string `json:"country"`
  State string `json:"state"`
}

func buildWeatherParams(lat float64, lon float64) (string) {
  WEATHER_URL := os.Getenv("WEATHER_URL")
  WEATHER_API_KEY := os.Getenv("WEATHER_API_KEY")

  params := url.Values{}
  params.Add("lat", fmt.Sprintf("%f", lat))
  params.Add("lon", fmt.Sprintf("%f", lon))
  params.Add("units", "imperial")
  params.Add("appid", WEATHER_API_KEY)
  rawQuery := params.Encode()
  weatherUrl := fmt.Sprintf("%s?%s", WEATHER_URL, rawQuery)

  return weatherUrl
}

func buildGeoParams(query string) (string) {
  GEO_URL := os.Getenv("GEO_URL")
  WEATHER_API_KEY := os.Getenv("WEATHER_API_KEY")

  params := url.Values{}
  params.Add("q", query)
  params.Add("limit", "1")
  params.Add("appid", WEATHER_API_KEY)
  rawQuery := params.Encode()
  geoUrl := fmt.Sprintf("%s?%s", GEO_URL, rawQuery)

  return geoUrl
}

func checkAndHandleError(err error, msg string) {
  if err != nil {
    fmt.Println(msg)
    panic(err)
  }
}

func handleGeoCode(client *http.Client, query string, c *Coordinates) {
  geoAddr := buildGeoParams(query)
  coords, err := helpers.Get(geoAddr, client)
  checkAndHandleError(err, "no lat/lon coords\n")

  // parse the JSON from the Lat/Lon API call
  var locations []GeocodingResponse
  err = json.Unmarshal([]byte(coords), &locations)
  checkAndHandleError(err, "couldn't parse coords (geocoding)\n")

  c.Lat = locations[0].Lat
  c.Lon = locations[0].Lon
}

func handleNoQuery(client *http.Client, c *Coordinates) {
  // get IP address
  addr, err := helpers.Get( "https://api.ipify.org/", client )
  checkAndHandleError(err, "no ip addr\n")

  // use the IP address to get Lat/Lon coordinates
  newAddr := fmt.Sprintf("http://ip-api.com/json/%s", addr)
  coords, err := helpers.Get( newAddr, client )
  checkAndHandleError(err, "no lat/lon coords\n")

  // parse the JSON from the Lat/Lon API call
  err = json.Unmarshal([]byte(coords), &c)
  checkAndHandleError(err, "couldn't parse coords\n")
}

func FetchWeather(query string) (string) {
  err := godotenv.Load(".env")
  checkAndHandleError(err, "problem parsing .env\n")
  var client = &http.Client{}
  var c Coordinates
  
  if (query != "") {
    handleGeoCode(client, query, &c)
  } else {
    handleNoQuery(client, &c)
  }
  
  // build the query and make the request
  weatherUrl := buildWeatherParams(c.Lat, c.Lon)
  weather, err := helpers.Get( weatherUrl, client )
  checkAndHandleError(err, "couldn't get weather\n")

  fmt.Println("succeeded in fetching weather")
  return weather
}
