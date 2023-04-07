package weather

import (
	"net/http"
	"net/url"
)

func Get(w http.ResponseWriter, r *http.Request) {
  rawQuery := r.URL.RawQuery
  query, _ := url.QueryUnescape(rawQuery)
  weatherData := FetchWeather(query)

  w.Write([]byte(weatherData))
}
