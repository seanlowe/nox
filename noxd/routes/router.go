package routes

import (
  weather "nox/noxd/controllers/weather"
  status "nox/noxd/controllers/status"

  "github.com/go-chi/chi/v5"
)

func InitRoutes(router chi.Router) {

  router.Get("/status", status.GetListOfServers)
  router.Get("/status/{server}", status.GetFromSlug)
  router.Post("/status", status.Create)
  
  router.Get("/uptime", status.GetNoxStatus)
  
  router.Get("/weather", weather.Get)
}
