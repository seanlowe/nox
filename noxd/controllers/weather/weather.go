package weather

import (
	"net/http"
	"net/url"
	
	"nox/noxd/services/weather"
)

func Get(w http.ResponseWriter, r *http.Request) {
  rawQuery := r.URL.RawQuery
  query, _ := url.QueryUnescape(rawQuery)
  w.Header().Set("Access-Control-Allow-Origin", "*")
  weatherData := weather.FetchWeather(query)

  w.Write([]byte(weatherData))
}
