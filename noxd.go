package main

import (
  // "nox/noxd/cmd"
  "nox/noxd/service"
  "net/http"
  "fmt"
  "log"
)

func main() {
  // cmd.Execute()
  http.HandleFunc("/hello", hello)
  http.HandleFunc("/weather", weatherFn)

  fmt.Printf("starting server at port 8080\n")
  if err := http.ListenAndServe(":8080", nil); err != nil {
    log.Fatal(err)
  }
}

func hello(w http.ResponseWriter, req *http.Request) {
  fmt.Printf("Hello!\n")
}

func weatherFn(w http.ResponseWriter, r *http.Request) {
  service.FetchWeather()
}
