package status

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "log"
  "net"
  "net/http"
  "time"

  "nox/noxd/globals"

  dbLib "github.com/upper/db/v4"
)

func isDbConnectionValid(conn dbLib.Session) {
  if conn == nil {
    log.Fatal("The DB connection is invalid or broken.")
    panic("No DB connection.")
  }
}

func InsertNewRecord(w http.ResponseWriter, r *http.Request) {
  var db = globals.DbConn

  isDbConnectionValid(db)

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
    Name: data["name"].(string),
    Host: data["host"].(string),
    Port: data["port"].(string),
  }

  serverCollection := db.Collection("Server")
  _, err = serverCollection.Insert(&newServer)
  if err != nil {
    log.Fatal("Insert: ", err)
  }
}

// get an individual server's details based on its name
func retrieveConnectionDetailsFromServerName(serverName string, r *http.Request) (string, string) {
  var db = globals.DbConn
  var foundServer Server

  isDbConnectionValid(db)

  res := db.SQL().SelectFrom("Server")
  err := res.Where("name = ?", serverName).One(&foundServer)
  if err != nil {
    log.Fatal("Where: ", err)
  }

  return foundServer.Host, foundServer.Port
}

// get if a server is running
func GetServerStatus(server string, r *http.Request) (s string) {
  host, port := retrieveConnectionDetailsFromServerName(server, r)
  timeout := time.Second * 5

  conn, err := net.DialTimeout("tcp", net.JoinHostPort(host, port), timeout)
  if err != nil {
    fmt.Println("Server is not running:", err)
    return ServerStatuses.OFFLINE
  }

  conn.Close()
  return ServerStatuses.ONLINE
}

// get a list of all servers
func GetAllServers() ([]Server) {
  var db = globals.DbConn
  var serverList []Server

  isDbConnectionValid(db)

  err := db.SQL().SelectFrom("Server").All(&serverList)
  if err != nil {
    log.Fatal("All: ", err)
  }

  return serverList
}
