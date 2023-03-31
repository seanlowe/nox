package main

import (
  "net/http"
  "fmt"
  "log"
  "os"

  "nox/noxd/routes"
  "nox/noxd/globals"

  "github.com/joho/godotenv"
  "github.com/go-chi/chi/v5"
  "github.com/upper/db/v4/adapter/postgresql"
)

func init() {
  fmt.Println("Initializing NOX . . . ")

  err := godotenv.Load(".env")

  DATABASE_URL := os.Getenv("DATABASE_URL_UPPER")
  connURL, err := postgresql.ParseURL(DATABASE_URL)
	if err != nil {
		log.Fatal("ParseURL: ", err)
	}

  sess, err := postgresql.Open(connURL)
  if err != nil {
    log.Fatal("Open: ", err)
  }

	globals.DbConn = sess
}

func main() {
  GO_PORT := os.Getenv("BACKEND_PORT")

  router := chi.NewRouter()
  cors := routes.BuildCors()
  router.Use(cors.Handler)
  routes.InitRoutes(router)

  fmt.Printf("starting server at port %s\n", GO_PORT)
  if err := http.ListenAndServe(fmt.Sprintf(":%s", GO_PORT), router); err != nil {
    log.Fatal(err)
  }

  defer globals.DbConn.Close()
}
