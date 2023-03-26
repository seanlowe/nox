package status

import (
  "fmt"
  "net/http"
  "io/ioutil"

  "github.com/go-chi/chi/v5"
)

func Create(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
      http.Error(w, "Failed to read request body", http.StatusInternalServerError)
      return
  }
  defer r.Body.Close()

  bodyString := string(body)
  fmt.Printf("%v\n", bodyString)

  w.WriteHeader(http.StatusOK)
}

func GetFromSlug(w http.ResponseWriter, r *http.Request) {
  server := chi.URLParam(r, "server")
  
  GetServerStatus(server, r)
}
