package routes

import (
  hello "nox/noxd/controllers/hello"
  weather "nox/noxd/controllers/weather"

  "github.com/go-chi/chi/v5"
)

func InitRoutes(router chi.Router) {
  router.Get("/hello", hello.Get)
  router.Get("/weather", weather.Get)
}
