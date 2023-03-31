package status

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "log"
  "net/http"

  "github.com/go-chi/chi/v5"
)

func Create(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
      http.Error(w, "Failed to read request body", http.StatusInternalServerError)
      return
  }
  defer r.Body.Close()

  var data map[string]interface{}
  err = json.Unmarshal([]byte(string(body)), &data)
  if err != nil {
    log.Fatal(err)
  }

  newServer := Server{
    Name:  data["name"].(string),
    Host:  data["host"].(string),
    Port: data["port"].(string),
  }

  Insert(newServer)

  w.WriteHeader(http.StatusOK)
}

func GetFromSlug(w http.ResponseWriter, r *http.Request) {
  server := chi.URLParam(r, "server")
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
