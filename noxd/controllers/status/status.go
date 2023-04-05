package status

import (
  "encoding/json"
  "net/http"

  "github.com/go-chi/chi/v5"
)

func Create(w http.ResponseWriter, r *http.Request) {
  server := InsertNewRecord(w, r)
  result, _ := json.Marshal(server)

  w.WriteHeader(http.StatusOK)
  w.Write(result)
}

func GetFromSlug(w http.ResponseWriter, r *http.Request) {
  server := chi.URLParam(r, "server")

  if (server == "nox") {
    w.WriteHeader(http.StatusNoContent)
    w.Write([]byte("Skipped."))

    return
  }

  status := GetServerStatus(server, r)

  w.WriteHeader(http.StatusOK)
  w.Write([]byte(status))
}

func GetListOfServers(w http.ResponseWriter, r *http.Request) {
  serversList := GetAllServers()
  result, _ := json.Marshal(serversList)

  w.WriteHeader(http.StatusOK)
  w.Write(result)
}

func GetNoxStatus(w http.ResponseWriter, r *http.Request) {
  // if we receive this request, we know we're up and running so just
  // return a 200 OK and arbitrary message.
  w.WriteHeader(http.StatusOK)
  w.Write([]byte("Nox is Running."))

  // if we do not receive this message, the frontend will throw an error
  // and we'll handle it there.
}
