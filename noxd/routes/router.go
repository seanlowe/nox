package routes

import (
  meal "nox/noxd/controllers/meal"
  status "nox/noxd/controllers/status"
  weather "nox/noxd/controllers/weather"

  "github.com/go-chi/chi/v5"
)

func InitRoutes(router chi.Router) {
  router.Get("/meal", meal.GetFromSlug)
  router.Get("/meal/week", meal.GetMealWeek)
  // router.Post("/meal/week", meal.CreateMealWeek)

  router.Get("/status", status.GetListOfServers)
  router.Get("/status/{server}", status.GetFromSlug)
  router.Post("/status", status.Create)
  
  router.Get("/uptime", status.GetNoxStatus)
  
  router.Get("/weather", weather.Get)
}
