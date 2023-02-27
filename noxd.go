package main

import (
  // "nox/noxd/cmd"
  "nox/noxd/service"
  "net/http"
  "net/url"
  "fmt"
  "log"
  "os"

  "github.com/joho/godotenv"
)

func main() {
  err := godotenv.Load(".env")
  GO_PORT := os.Getenv("BACKEND_PORT")

  // cmd.Execute()
  http.HandleFunc("/hello", hello)
  http.HandleFunc("/weather", weatherFn)

  fmt.Printf("starting server at port %s\n", GO_PORT)
  if err = http.ListenAndServe(fmt.Sprintf(":%s", GO_PORT), nil); err != nil {
    log.Fatal(err)
  }
}

func hello(w http.ResponseWriter, req *http.Request) {
  fmt.Printf("Hello!\n")
}

func weatherFn(w http.ResponseWriter, r *http.Request) {
  rawQuery := r.URL.RawQuery
  query, _ := url.QueryUnescape(rawQuery)
  w.Header().Set("Access-Control-Allow-Origin", "*")
  weather := service.FetchWeather(query)

  w.Write([]byte(weather))
}
