package routes

import (
	"github.com/go-chi/cors"
)

func BuildCors() (*cors.Cors) {
	return cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})
}
