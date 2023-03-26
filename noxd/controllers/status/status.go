package status

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func Create(w http.ResponseWriter, r *http.Request) {
	fmt.Println("not implemented yet")
}

func GetFromSlug(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	server := chi.URLParam(r, "server")
  
	GetServerStatus(server, r)
}
