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
  // need to stay capitalized so they are accessible outside the struct
  Lat float64 `json:lat`
  Lon float64 `json:lon`
}

func buildParams(lat float64, lon float64) (string) {
  err := godotenv.Load(".env")
  checkAndHandleError(err, "problem parsing .env")
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

func checkAndHandleError(err error, msg string) {
  if err != nil {
    fmt.Println(msg)
    panic(err)
  }
}

func FetchWeather() (string) {
  var client = &http.Client{}
  var c Coordinates
  
  // get IP address
  addr, err := helpers.Get( "https://api.ipify.org/", client )
  checkAndHandleError(err, "no ip addr")
  
  // use the IP address to get Lat/Lon coordinates
  newAddr := fmt.Sprintf("http://ip-api.com/json/%s", addr)
  coords, err := helpers.Get( newAddr, client )
  checkAndHandleError(err, "no lat/lon coords")
  
  // parse the JSON from the Lat/Lon API call
  err = json.Unmarshal([]byte(coords), &c)
  checkAndHandleError(err, "couldn't parse coords")
  
  // build the query and make the request
  weatherUrl := buildParams(c.Lat, c.Lon)
  weather, err := helpers.Get( weatherUrl, client )
  checkAndHandleError(err, "couldn't get weather")

  fmt.Println("succeeded in fetching weather")
  return weather
}
