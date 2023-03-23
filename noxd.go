package main

import (
  "net/http"
  "fmt"
  "log"
  "os"

  "nox/noxd/routes"

  "github.com/joho/godotenv"
  "github.com/go-chi/chi/v5"
)

func main() {
  err := godotenv.Load(".env")
  GO_PORT := os.Getenv("BACKEND_PORT")

  router := chi.NewRouter()
  routes.InitRoutes(router)

  fmt.Printf("starting server at port %s\n", GO_PORT)
  if err = http.ListenAndServe(fmt.Sprintf(":%s", GO_PORT), router); err != nil {
    log.Fatal(err)
  }
}
